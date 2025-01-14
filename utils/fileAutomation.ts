// utils/fileAutomation.ts
import * as XLSX from 'xlsx'
import Papa from 'papaparse'

interface FieldMappings {
  [key: string]: string;
}

interface RowData {
  [key: string]: any;
}

export async function processFileWithStories(
  file: File,
  fieldMappings: FieldMappings
): Promise<Blob> {
  // Leggi tutto il contenuto del file (CSV o Excel)
  let data: any;
  const extension = file.name.split('.').pop()?.toLowerCase();

  if (extension === 'csv') {
    data = await new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete: (results) => resolve(results.data),
        error: reject
      });
    });
  } else if (extension === 'xls' || extension === 'xlsx') {
    data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const workbook = XLSX.read(e.target?.result, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          // Converte in array di oggetti usando le intestazioni dalla prima riga
          const jsonData = XLSX.utils.sheet_to_json<RowData>(worksheet, { defval: null });
          resolve(jsonData);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  } else {
    throw new Error('Tipo di file non supportato.');
  }

  // Assumi che `data` sia un array di oggetti con intestazioni come chiavi
  const rows: RowData[] = Array.isArray(data) ? data : [];

  // Processa ogni riga: costruisce prompt, chiama API e inserisce risultato
  for (let row of rows) {
    const email = row[fieldMappings['email']];
    const nome = row[fieldMappings['nome']];
    const cognome = row[fieldMappings['cognome']];

    // Costruisci il prompt semplice
    const prompt = `Genera una storia per un personaggio che si chiama ${nome} ${cognome} ed ha questa mail ${email}.`;

    try {
      // Esegui la chiamata API; qui si assume che tu abbia un endpoint /api/ask configurato per gestire richieste con prompt
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: prompt }], gptType: 'custom' })
      });
      const result = await response.json();
      const story = result.answer;

      // Inserisci la storia in una nuova colonna nella riga
      row['storia'] = story;

      // Puoi opzionalmente informare l'utente qui, ad esempio con console.log o aggiornando l'interfaccia
      console.log(`Storia generata per ${nome} ${cognome}: ${story}`);
    } catch (error) {
      console.error(`Errore nella generazione della storia per ${nome} ${cognome}:`, error);
      row['storia'] = '';
    }
  }

  // Dopo aver processato tutte le righe, crea un nuovo file Excel con i risultati
  const newWorkbook = XLSX.utils.book_new();
  const newWorksheet = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Risultati');

  // Genera un blob dal workbook
  const wbout = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'array' });
  return new Blob([wbout], { type: 'application/octet-stream' });
}
