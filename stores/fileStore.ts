// stores/fileStore.ts
import { defineStore } from 'pinia'

export const useFileStore = defineStore('file', {
  state: () => ({
    uploadedFile: null as File | null,
    fileColumns: [] as string[],
    fieldMappings: {} as Record<string, string>,
    mappingConfirmed: false,
  }),
  actions: {
    setUploadedFile(file: File) {
      this.uploadedFile = file
    },
    setFileColumns(columns: string[]) {
      this.fileColumns = columns
    },
    setFieldMappings(mappings: Record<string, string>) {
      this.fieldMappings = mappings
    },
    confirmMapping() {
      this.mappingConfirmed = true
    },
    resetMapping() {
      this.mappingConfirmed = false
      // Resetta eventuali mappature se necessario
    }
  }
})
