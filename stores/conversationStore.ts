// stores/conversationStore.ts
import { defineStore } from 'pinia'

interface Message {
  role: 'assistant' | 'user'
  content: string
}

interface GPTInputs {
  [key: string]: string
}

interface Conversations {
  [gpt: string]: Message[]
}

export const useConversationStore = defineStore('conversationStore', {
  state: () => ({
    selectedGPT: '' as string,
    conversations: {} as Conversations,
    gptInputs: {} as Record<string, GPTInputs>,
    chatStarted: false
  }),
  actions: {
    selectGPT(gpt: string) {
      this.selectedGPT = gpt
      this.chatStarted = false
      this.gptInputs[gpt] = this.gptInputs[gpt] || {}
      if (!this.conversations[gpt]) {
        this.conversations[gpt] = []
      }
      this.saveState()
    },
    addMessageToGpt(gpt: string, role: 'assistant'|'user', content:string) {
      if (!this.conversations[gpt]) {
        this.conversations[gpt] = []
      }
      this.conversations[gpt].push({ role, content })
      this.saveState()
    },
    getMessagesForGpt(gpt:string) {
      return this.conversations[gpt] || []
    },
    setGptInputs(gpt:string, inputs: GPTInputs) {
      this.gptInputs[gpt] = inputs
      this.saveState()
    },
    getGptInputs(gpt:string) {
      return this.gptInputs[gpt] || {}
    },
    startChat() {
      this.chatStarted = true
      this.saveState()
    },
    clearMessagesForGpt(gpt: string) {
      if (this.conversations[gpt]) {
        this.conversations[gpt] = []
        this.saveState()
      }
    },
    saveState() {
      if (process.client) {
        localStorage.setItem('conversationStore', JSON.stringify(this.$state))
      }
    },
    loadState() {
      if (process.client) {
        const data = localStorage.getItem('conversationStore')
        if (data) {
          Object.assign(this.$state, JSON.parse(data))
        }
      }
    }
  }
})
