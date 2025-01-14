// stores/uiStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const isSidebarOpen = ref(true)

  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value
    console.log('Sidebar aperta:', isSidebarOpen.value)
  }

  return { isSidebarOpen, toggleSidebar }
})
