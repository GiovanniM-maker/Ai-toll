<template>
    <div>
      <!-- Input per il caricamento del file -->
      <input type="file" @change="handleFileUpload" accept=".csv, .xls, .xlsx" />
  
      <!-- Popup Modal per la mappatura delle colonne -->
      <div v-if="showMappingModal" class="modal-overlay">
        <div class="modal">
          <!-- Pulsante di chiusura -->
          <button class="close-button" @click="closeModal">✕</button>
          
          <h3>Associa i campi ai dati del file</h3>
          <div v-for="field in requiredFields" :key="field" class="mapping-row">
            <label>{{ field }}</label>
            <select v-model="fieldMappings[field]">
              <option disabled value="">Seleziona colonna</option>
              <option v-for="(col, idx) in fileColumns" :key="idx" :value="col">
                {{ col }}
              </option>
            </select>
          </div>
          <button @click="confirmMapping">Conferma</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, watch } from 'vue'
  import Papa from 'papaparse'
  import * as XLSX from 'xlsx'
  import { useFileStore } from '@/stores/fileStore'
  
  const fileStore = useFileStore()
  
  const showMappingModal = ref(false)
  const fileColumns = ref<string[]>([])
  const requiredFields = ['email', 'nome', 'cognome']
  const fieldMappings = reactive<Record<string, string>>({})
  requiredFields.forEach(field => { fieldMappings[field] = '' })
  
  function handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement
    if (!input.files || input.files.length === 0) return
    const file = input.files[0]
    fileStore.setUploadedFile(file)
    const extension = file.name.split('.').pop()?.toLowerCase()
  
    if (extension === 'csv') {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          if (results.meta && results.meta.fields) {
            fileColumns.value = results.meta.fields as string[]
            fileStore.setFileColumns(fileColumns.value)
            showMappingModal.value = true
          } else {
            alert('Non è stato possibile leggere le intestazioni del file.')
          }
        },
        error: (error) => {
          console.error('Errore nel parsing del file CSV:', error)
        }
      })
    } else if (extension === 'xls' || extension === 'xlsx') {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer)
          const workbook = XLSX.read(data, { type: 'array' })
          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
  
          const range = XLSX.utils.decode_range(worksheet['!ref']!)
          const firstRow = range.s.r
          const columns: string[] = []
          for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellRef = XLSX.utils.encode_cell({ r: firstRow, c: C })
            const cell = worksheet[cellRef]
            columns.push(cell ? String(cell.v) : `Colonna ${C + 1}`)
          }
          if (columns.length > 0) {
            fileColumns.value = columns
            fileStore.setFileColumns(columns)
            showMappingModal.value = true
          } else {
            alert('Il file Excel non contiene intestazioni valide.')
          }
        } catch (error) {
          console.error('Errore nella lettura del file Excel:', error)
        }
      }
      reader.onerror = (e) => {
        console.error('Errore nel FileReader:', e)
      }
      reader.readAsArrayBuffer(file)
    } else {
      alert('Tipo di file non supportato. Usa CSV, XLS o XLSX.')
    }
  }
  
  function confirmMapping() {
    const allMapped = requiredFields.every(field => fieldMappings[field] !== '')
    if (!allMapped) {
      alert('Completa la mappatura per tutti i campi.')
      return
    }
    fileStore.setFieldMappings({ ...fieldMappings })
    fileStore.confirmMapping()
    showMappingModal.value = false
    console.log('Mappatura confermata:', fieldMappings)
    // L'elaborazione non parte qui
  }
  
  function closeModal() {
    showMappingModal.value = false
  }
  
  // Watcher per riaprire il popup se la mappatura viene resettata
  watch(() => fileStore.mappingConfirmed, (newVal) => {
    if (!newVal && fileStore.uploadedFile) {
      showMappingModal.value = true
    }
  })
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal {
    position: relative;
    background: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
  }
  
  .close-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .mapping-row {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .mapping-row label {
    width: 100px;
    font-weight: bold;
  }
  
  .mapping-row select {
    flex: 1;
  }
  </style>
  