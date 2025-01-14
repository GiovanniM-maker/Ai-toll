<!-- src/components/ChatBox.vue -->
<!-- src/components/ChatBox.vue -->
<template>
    <div class="chat-container">
      <!-- Chat Messages -->
      <div class="chat-messages" 
      ref="chatMessages" 
      @scroll="handleScroll" >
        <div v-if="messages.length === 0" class="no-messages">
            <a href="#" class="btn-shine">Le tue note appariranno qua</a>
        </div>
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message', msg.role]"
        >
          <template v-if="msg.role === 'assistant'">
            <!-- Contenitore unico per l'header e la risposta dell'assistente -->
            <div class="assistant-container">
              <!-- Header con icona e testo -->
              <div class="assistant-header">
                <div class="brain-icon">
                  <!-- Icona del cervelletto stilizzato (SVG) -->
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="24" height="24">
                    <path d="M32 2C15.432 2 2 15.432 2 32s13.432 30 30 30 30-13.432 30-30S48.568 2 32 2zm0 56C17.664 58 6 46.336 6 32S17.664 6 32 6s26 11.664 26 26-11.664 26-26 26z" fill="#6c6c6c"/>
                    <!-- Aggiungi ulteriori dettagli dell'icona del cervelletto se necessario -->
                  </svg>
                </div>
                <span class="assistant-label">GPT</span>
              </div>
              <!-- Contenuto della risposta con pulsante copia -->
              <div class="assistant-response">
                <p class="assistant-text shadow">{{ msg.content }}</p>
                
  <button class="copy"
  @click="copyMessage(msg.content)"
  aria-label="Copia Risposta">
    <span data-text-end="Copied!" data-text-initial="Copy to clipboard" class="tooltip"></span>
    <span>
      <svg xml:space="preserve" style="enable-background:new 0 0 512 512" viewBox="0 0 6.35 6.35" y="0" x="0" height="20" width="20" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg" class="clipboard">
        <g>
          <path fill="currentColor" d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"></path>
        </g>
      </svg>
      <svg xml:space="preserve" style="enable-background:new 0 0 512 512" viewBox="0 0 24 24" y="0" x="0" height="18" width="18" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg" class="checkmark">
        <g>
          <path data-original="#000000" fill="currentColor" d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"></path>
        </g>
      </svg>
    </span>
  </button>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="user-bubble">
              <p class="user-text">{{ msg.content }}</p>
            </div>
          </template>
        </div>
  
        
  
        <!-- Indicatore Thinking -->
  <div class="card" v-if="isThinking">
    <div class="loader">
      <p>GPT: </p>
      <div class="words">
        <span class="word">thinking</span>
        <span class="word">reasoning</span>
        <span class="word">understanding</span>
        <span class="word">organizing</span>
        <span class="word">arranging</span>
      </div>
    </div>
  </div>
      </div>
      <!-- Input Area -->
      <div class="div-input-sfumatura">
      <div class="div-input">
        <!-- Pulsante di Scroll -->
        <button v-show="showScrollButton" class="scroll-button" @click="scrollToBottom">
          Scroll to Bottom
        </button>
        
        <div class="input-area-wrapper">
          <div class="input-area">
            <button class="button"
            @click="clearChat"
              aria-label="Clear Chat">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 69 14"
      class="svgIcon bin-top"
    >
      <g clip-path="url(#clip0_35_24)">
        <path
          fill="black"
          d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_35_24">
          <rect fill="white" height="14" width="69"></rect>
        </clipPath>
      </defs>
    </svg>
  
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 69 57"
      class="svgIcon bin-bottom"
    >
      <g clip-path="url(#clip0_35_22)">
        <path
          fill="black"
          d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_35_22">
          <rect fill="white" height="57" width="69"></rect>
        </clipPath>
      </defs>
    </svg>
  </button>
  
            <input 
              required 
              id="messageInput"
              placeholder="Message..." 
              type="text" 
              v-model="currentMessage"
              @keyup.enter="sendMessage"
              :disabled="isThinking"
            />
            <button id="sendButton" @click="sendMessage"
              class="send-btn"
              aria-label="Send Message"
              :disabled="isThinking">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
                <path
                  fill="none"
                  d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                ></path>
                <path
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="33.67"
                  stroke="#6c6c6c"
                  d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                ></path>
              </svg>
            </button>
            
          </div>
        </div> 
      </div>
      </div>
    </div>
  </template>
  
  
  <script setup lang="ts">
  import { ref, computed, watch, onMounted, nextTick } from 'vue'
  import { useConversationStore } from '@/stores/conversationStore'
  
  
  
  // Definizione delle proprietà attese dal componente
  const props = defineProps<{
    gpt: string,
    scrollThreshold?: number // Percentuale per mostrare il pulsante
  }>()
  
  // Imposta un valore di default per scrollThreshold (es. 10%)
  const scrollThreshold = ref(props.scrollThreshold || 10)
  
  // Inizializzazione dello store di conversazione
  const conversationStore = useConversationStore()
  
  // Stato per il messaggio corrente dell'input
  const currentMessage = ref('')
  
  // Stato per indicare se il sistema sta pensando (attivo la spina "thinking")
  const isThinking = ref(false)
  
  // Computed property per ottenere i messaggi della conversazione
  const messages = computed(() => conversationStore.getMessagesForGpt(props.gpt))
  
  // Funzione per inviare un messaggio
  async function sendMessage() {
    if (currentMessage.value.trim() === '') return
  
    // Aggiungi il messaggio dell'utente
    conversationStore.addMessageToGpt(props.gpt, 'user', currentMessage.value)
    const payloadMessages = messages.value.map(m => ({ role: m.role, content: m.content }))
  
    // Pulisci l'input
    currentMessage.value = ''
    isThinking.value = true
  
    // Chiamata all'API per ottenere la risposta dell'assistente
    try {
      const res = await $fetch('/api/ask', {
        method: 'POST',
        body: {
        messages: payloadMessages,
        gptType: props.gpt
      }
      })
      conversationStore.addMessageToGpt(props.gpt, 'assistant', res.answer)
    } catch (error) {
      console.error(error)
      conversationStore.addMessageToGpt(props.gpt, 'assistant', 'Errore nel contattare l’API.')
    } finally {
      isThinking.value = false
    }
  }
  
  // Funzione per pulire la chat
  function clearChat() {
    conversationStore.clearMessagesForGpt(props.gpt)
  }
  
  // Riferimento al container dei messaggi per gestire lo scroll
  const chatMessages = ref<HTMLElement | null>(null)
  
  const showScrollButton = ref(false)
  
  // Auto-scroll to the bottom when messages change
  watch(messages, async () => {
    await nextTick()
    if (chatMessages.value) {
      chatMessages.value.scrollTop = chatMessages.value.scrollHeight
    }
  })
  
  // Effettua lo scroll in fondo al montare il componente
  function scrollToBottom() {
    if (chatMessages.value) {
      chatMessages.value.scrollTo({
        top: chatMessages.value.scrollHeight,
        behavior: 'smooth', // Abilita lo scroll fluido
      })
      console.log('Scrolled to bottom smoothly')
    } else {
      console.log('chatMessages is null')
    }
  }
  
  
  // Auto-scroll to the bottom when messages change
  watch(
    messages,
    async () => {
      console.log('Messages changed, attempting to scroll to bottom')
      await nextTick()
      scrollToBottom()
    },
    { immediate: false, deep: true }
  )
  
  // Effettua lo scroll in fondo al montare il componente
  onMounted(async () => {
    console.log('Component mounted, attempting to scroll to bottom')
    await nextTick()
    scrollToBottom()
  })
  
  function handleScroll() {
    if (!chatMessages.value) return
  
    const { scrollTop, scrollHeight, clientHeight } = chatMessages.value
  
    // Calcola quanto manca per arrivare in fondo (in percentuale)
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight)
    const distancePercent = (distanceFromBottom / scrollHeight) * 100
  
    // Mostra il pulsante se la distanza è maggiore del threshold
    showScrollButton.value = distancePercent > scrollThreshold.value
  }
  
  
  // Stato per gestire il tooltip del bottone copia
  const copyStatus = ref<{ [key: number]: string }>({})
  
  // Funzione per copiare un messaggio negli appunti e gestire il tooltip
  function copyMessage(content: string, index: number) {
    navigator.clipboard.writeText(content)
      .then(() => {
        // Imposta lo stato del tooltip per questo messaggio
        copyStatus.value[index] = 'Copied!'
        // Ripristina il testo del tooltip dopo 2 secondi
        setTimeout(() => {
          copyStatus.value[index] = 'Copy to clipboard'
        }, 2000)
      })
      .catch(err => {
        console.error('Errore nella copia: ', err)
        alert('C\'è stato un errore nel copiare la risposta.')
      })
  }
  </script>
  
  
  <style scoped>
  .chat-container {
    margin-top: 70px;
    bottom: 0;       /* Posiziona la div nella parte inferiore dello schermo */
    position:center;        /* Allinea la div a sinistra */
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: transparent;
    backdrop-filter: var(--v2-chat-blur, blur(0px));
    position: center; /* Per posizionare elementi figli assoluti */
    margin-left: 0%;
    width: 100%;
    display: flex; /* Utilizza Flexbox per allineare gli elementi interni */
    align-items: center; /* Centra verticalmente gli elementi */
    justify-content: space-between; /* Distribuisce lo spazio tra gli elementi */
    z-index: 1000; /* Assicura che la div sia sopra altri elementi */
  
  }
  
  /* Media query per tablet e desktop */
  @media (min-width: 880px) {
    .chat-container {
      margin-left: 10%;
      width: 80%;
      max-width: 800px; /* Puoi regolare questo valore secondo le tue esigenze */
      
    }
  }
  
  @media (min-width: 880px) {
    .chat-container {
      margin-left: 20%;
      width: 60%;
      max-width: 1200px; /* Puoi regolare questo valore secondo le tue esigenze */
     
    }
  }
  
  /* Media query per schermi molto grandi (opzionale) */
  @media (min-width: 1200px) {
    .chat-container {
      margin-left: 25%;
      width: 50%;
      max-width: 1600px; /* Puoi regolare questo valore secondo le tue esigenze */
    }
  }
  
  
  .chat-messages {
  overflow-y: auto;
  display: flex;
  height: calc(100vh - 270px - 20px);
  width: 95vh;
  margin-top: 10px;
  flex-direction: column;
  gap: 0.5rem;
  padding-right: 10px; /* Spazio per la scrollbar */
}

/* Responsività per dispositivi più piccoli */
@media (max-width: 767px) {
  .chat-messages {
    height: calc(100vh - 200px - 25px); /* Altezza adattata per schermi più piccoli */
  }
}
  .no-messages {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    text-align: center;
    color: var(--text-deemphasis, #c3c6d6);
    font-size: var(--font-size-base, 1rem);
  }
  
  .message {
    display: flex;
  
  }
  
  .assistant-text, .user-text {
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
  }
  
  .assistant-text {
    color: black;
    background: transparent;
    border-radius: 10px;
    padding: 0px 43px 5px;
    margin: 15px;
    font-size: 16px;
    font-weight: 100;
    transition: border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  }
  
  
  
  .user-bubble {
    border-radius: var(--border-radius);
    padding: 0.75rem;
    max-width: 60%;
    margin-left: auto;
    word-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
  }
  
  .user-text {
    color: white;
    margin: 0;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 14px;
  }
  
  .thinking {
    text-align: left;
    color: #F6F6F5;
    font-size: var(--font-size-base, 1rem);
    margin-top: 10px;
    opacity: 1;
    transition: opacity var(--transition-speed);
  }
  
  .dots span {
    display: inline-block;
    width: 4px;
    height: 4px;
    margin: 0 2px;
    background-color: #F6F6F5;
    border-radius: 50%;
    animation: blink 1s infinite;
  }
  
  @keyframes blink {
    0% { opacity: 0.2; }
    20% { opacity: 1; }
    100% { opacity: 0.2; }
  }
  
  .input-area-wrapper {
    margin-top: 1rem;
    flex-shrink: 0;
  }
  
  
  .input-area {
    position: fixed; /* Fissa la div rispetto al viewport */
    bottom: 0;       /* Posiziona la div nella parte inferiore dello schermo */
    left: 0;         /* Allinea la div a sinistra */
    width: 100%;     /* Copre tutta la larghezza dello schermo */
    height: 200px;   /* Altezza fissa di 200px */
    background: black; /* Sfondo bianco */
    border-top-left-radius: 29px; /* Arrotondamento solo degli angoli superiori */
    border-top-right-radius: 29px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); /* Aggiunge un'ombra leggera sopra la div */
    box-sizing: border-box; /* Include padding e bordi nel calcolo della larghezza */
    padding: 20px; /* Spazio interno */
    display: flex; /* Utilizza Flexbox per allineare gli elementi interni */
    align-items: center; /* Centra verticalmente gli elementi */
    justify-content: space-between; /* Distribuisce lo spazio tra gli elementi */
    z-index: 1000; /* Assicura che la div sia sopra altri elementi */
  }
  
  /* Responsività per dispositivi più piccoli */
  @media (max-width: 767px) {
    .input-area {
      height: 150px; /* Riduce l'altezza su schermi più piccoli */
      padding: 15px; /* Riduce il padding */
      border-top-left-radius: 20px; /* Arrotondamento leggermente minore */
      border-top-right-radius: 20px;
    }
  }
  
  /* Responsività per schermi molto grandi */
  @media (min-width: 1200px) {
    .input-area {
      width: 100%; /* Limita la larghezza al 80% su schermi molto grandi */
      border-top-left-radius: 29px;
      border-top-right-radius: 29px;
    }
  }
  
  .trash-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    transition: var(--transition-speed);
    border-radius: 50%;
  }
  
  .trash-btn .material-icons {
    color: #F6F6F5;
    font-size: 20px;
  }
  
  .trash-btn:hover {
    background: rgba(240, 240, 240, 0.1);
  }
  
  input {
    flex: 1;
    background: #0B0B0B;
    color: var(--text-primary, #eef0ff);
    border: none;
    font-size: var(--font-size-base, 1rem);
    font-weight: var(--font-weight-normal, 400);
    padding: 0.5rem 0.75rem;
    outline: none;
    border-radius: var(--border-radius);
    word-wrap: break-word;
  }
  
  input::placeholder {
    color: #F6F6F5;
    opacity: 0.8;
    font-weight: 300;
  }
  
  .send-btn {
    width: fit-content;
    height: 100%;
    background-color: transparent;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    margin-bottom:10%;
  }
  .send-btn svg {
    height: 18px;
    transition: all 0.3s;
  }
  .send-btn svg path {
    transition: all 0.3s;
  }
  .send-btn:hover svg path {
    fill: #3c3c3c;
    stroke: white;
  }
  
  .arrow-icon {
    color: #F6F6F5;
    font-size: 24px;
    transition: transform var(--transition-speed);
  }
  
  .send-btn:hover .arrow-icon {
    transform: scale(1.05);
  }
  
  .mistake-note {
    text-align: center;
    color: #F6F6F5;
    font-size: var(--font-size-base, 0.75rem);
    font-weight: var(--font-weight-normal, 400);
    margin-top: 10px;
  }
  
  /* Scrollbar Styling (opzionale) */
  .chat-messages::-webkit-scrollbar {
    width: 8px;
  }
  
  .chat-messages::-webkit-scrollbar-track {
    background: var(--scrollbar-track, #1f1f1f);
  }
  
  .chat-messages::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb-background, rgba(255,255,255,0.2));
    border-radius: 4px;
  }
  
  #messageInput {
    width: 200px;
    height: 100%;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 16px;
    background-color: transparent;
    outline: none;
    border: none;
    padding-left: 10px;
    color: white;
    margin-bottom:10%;
  }
  #messageInput:focus ~ #sendButton svg path,
  #messageInput:valid ~ #sendButton svg path {
    fill: #3c3c3c;
    stroke: white;
  }
  
  /* From Uiverse.io by vinodjangid07 */ 
  .button {
    width: 50px;
    height: 50px;
    margin-bottom: 10%;
    border-radius: 50%;
    background-color: rgb(20, 20, 20);
    border: none;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
    cursor: pointer;
    transition-duration: 0.3s;
    overflow: hidden;
    position: relative;
    gap: 2px;
  }
  
  .svgIcon {
    width: 12px;
    transition-duration: 0.3s;
  }
  
  .svgIcon path {
    fill: white;
  }
  
  .button:hover {
    transition-duration: 0.3s;
    background-color: rgb(255, 69, 69);
    align-items: center;
    gap: 0;
  }
  
  .bin-top {
    transform-origin: bottom right;
  }
  .button:hover .bin-top {
    transition-duration: 0.5s;
    transform: rotate(160deg);
  }
  
  .tooltip {
    position: absolute;
    top: -40px;
    display: none;
    opacity: 0;
    color: white;
    font-size: 10px;
    text-wrap: nowrap;
    background-color: #000;
    padding: 6px 10px;
    border: 1px solid #3c3c3c;
    border-radius: 5px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.596);
    transition: all 0.3s;
  }
  
  .assistant-container {
    border: 1px solid #e0e0e0;
    border-radius: 25px;
    padding: 8px;
    width: 80%;
    margin-bottom: 10px;
    margin-top: 10px;
    background-color: #f9f9f9;
    margin-left: 1%;
  }
  
  .assistant-header {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
  
  .brain-icon {
    width: 32px;
    height: 32px;
    margin-right: 0px;
    margin-top: 8px;
    margin-left: 10px;
  }
  
  .assistant-label {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: black;
  }
  
  .assistant-response {
    position: relative;
    padding: 0px;
    background-color: transparent;
    border-radius: 5px;
  }
  
  .assistant-text {
    margin: 0;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #303030;
  }
  
  /* From Uiverse.io by Galahhad */ 
  /* tooltip settings 👇 */
  
  .copy {
    /* button */
    margin-left:7%;
    padding:2px 0px 0px;
  
    --button-bg: white;
    --button-hover-bg: black;
    --button-text-color: black;
    --button-hover-text-color: white;
    --button-border-radius: 20px;
    --button-diameter: 36px;
    --button-outline-width: 1px;
    --button-outline-color: rgb(141, 141, 141);
    /* tooltip */
    --tooltip-bg: #f4f3f3;
    --toolptip-border-radius: 4px;
    --tooltip-font-family: Menlo, Roboto Mono, monospace;
    /* 👆 this field should not be empty */
    --tooltip-font-size: 12px;
    /* 👆 this field should not be empty */
    --tootip-text-color: rgb(50, 50, 50);
    --tooltip-padding-x: 7px;
    --tooltip-padding-y: 7px;
    --tooltip-offset: 8px;
    /* --tooltip-transition-duration: 0.1s; */
    /* 👆 if you need a transition, 
    just remove the comment,
    but I didn't like the transition :| */
  }
  
  .copy {
    box-sizing: border-box;
    width: var(--button-diameter);
    height: var(--button-diameter);
    border-radius: var(--button-border-radius);
    background-color: var(--button-bg);
    color: var(--button-text-color);
    border: none;
    cursor: pointer;
    position: relative;
    outline: none;
  }
  
  .tooltip {
    position: absolute;
    opacity: 0;
    visibility: 0;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font: var(--tooltip-font-size) var(--tooltip-font-family);
    color: var(--tootip-text-color);
    background: var(--tooltip-bg);
    padding: var(--tooltip-padding-y) var(--tooltip-padding-x);
    border-radius: var(--toolptip-border-radius);
    pointer-events: none;
    transition: all var(--tooltip-transition-duration) cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  
  .tooltip::before {
    content: attr(data-text-initial);
  }
  
  .tooltip::after {
    content: "";
    position: absolute;
    bottom: calc(var(--tooltip-padding-y) / 2 * -1);
    width: var(--tooltip-padding-y);
    height: var(--tooltip-padding-y);
    background: inherit;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    z-index: -999;
    pointer-events: none;
  }
  
  .copy svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .checkmark {
    display: none;
  }
  
  /* actions */
  
  .copy:hover .tooltip,
  .copy:focus:not(:focus-visible) .tooltip {
    opacity: 1;
    visibility: visible;
    top: calc((100% + var(--tooltip-offset)) * -1);
  }
  
  .copy:focus:not(:focus-visible) .tooltip::before {
    content: attr(data-text-end);
  }
  
  .copy:focus:not(:focus-visible) .clipboard {
    display: none;
  }
  
  .copy:focus:not(:focus-visible) .checkmark {
    display: block;
  }
  
  .copy:hover,
  .copy:focus {
    background-color: var(--button-hover-bg);
  }
  
  .copy:active {
    outline: var(--button-outline-width) solid var(--button-outline-color);
  }
  
  .copy:hover svg {
    color: var(--button-hover-text-color);
  }
  
.div-input {
  position: fixed; /* Fissa la div in posizione */
  bottom: 0;       /* Posiziona la div nella parte inferiore dello schermo */
  left: 0;         /* Allinea la div a sinistra */
  width: 100%;     /* Copre tutta la larghezza dello schermo */
  height: 250px;   /* Altezza fissa di 200px */
  background: white; /* Sfondo bianco */
  border-top-left-radius: 29px; /* Arrotondamento solo degli angoli superiori */
  border-top-right-radius: 29px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); /* Aggiunge un'ombra leggera sopra la div */
  box-sizing: border-box; /* Include padding e bordi nel calcolo della larghezza */
  display: flex; /* Utilizza Flexbox per allineare gli elementi interni */
  align-items: center; /* Centra verticalmente gli elementi */
  justify-content: space-between; /* Distribuisce lo spazio tra gli elementi */
  z-index: 1000; /* Assicura che la div sia sopra altri elementi */
}

/* Responsività per dispositivi più piccoli */
@media (max-width: 767px) {
  .div-input {
    height: 200px; /* Riduce l'altezza su schermi più piccoli */
    padding: 15px; /* Riduce il padding */
    border-top-left-radius: 20px; /* Arrotondamento leggermente minore */
    border-top-right-radius: 20px;
  }
}

/* Responsività per schermi molto grandi */
@media (min-width: 1200px) {
  .div-input {
    width: 100%; /* Limita la larghezza al 80% su schermi molto grandi */
    border-top-left-radius: 29px;
    border-top-right-radius: 29px;
  }
}


.div-input-sfumatura {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 250px;
  background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, white 100%);
  border-top-left-radius: 29px;
  border-top-right-radius: 29px;
  box-shadow: 0 -10px 10px rgba(0, 0, 0, 1);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
}

/* Responsività per dispositivi più piccoli */
@media (max-width: 767px) {
  .div-input-sfumatura {
    height: 200px; /* Riduce l'altezza su schermi più piccoli */
    padding: 15px; /* Riduce il padding */
    border-top-left-radius: 20px; /* Arrotondamento leggermente minore */
    border-top-right-radius: 20px;
  }
}

/* Responsività per schermi molto grandi */
@media (min-width: 1200px) {
  .div-input-sfumatura {
    width: 100%; /* Limita la larghezza al 80% su schermi molto grandi */
    left: 00%; /* Centra la div orizzontalmente */
    border-top-left-radius: 29px;
    border-top-right-radius: 29px;
  }
}

  /* From Uiverse.io by Ali-Tahmazi99 */ 
  .load-row {
    width: 100px;
    height: 50px;
    line-height: 50px;
    margin-left: 5px;
    text-align: left;
  }
  
  .load-row span {
    display: inline-block;
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50px;
    animation: up-down6 0.5s ease-in infinite alternate;
  }
  
  .load-row span:nth-child(2) {
    background: #F0F0F0;
    animation-delay: 0.16s;
  }
  
  .load-row span:nth-child(3) {
    background: #DFDFDF;
    animation-delay: 0.32s;
  }
  
  .load-row span:nth-child(4) {
    background: #D2D2D2;
    animation-delay: 0.48s;
  }
  
  @keyframes up-down6 {
    0% {
      transform: translateY(-10px);
    }
  
    100% {
      transform: translateY(10px);
    }
  }
  
  .scroll-button{
    margin-bottom: 200px;
  }
  
  /* From Uiverse.io by kennyotsu */ 
  .card {
    /* color used to softly clip top and bottom of the .words container */
    --bg-color: transparent;
    background-color: var(--bg-color);
    padding: 1rem 2rem;
    border-radius: 1.25rem;
  }
  .loader {
    color: rgb(124, 124, 124);
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 14px;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    height: 40px;
    padding: 10px 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border-radius: 8px;
  }
  
  .words {
    overflow: hidden;
    position: relative;
  }
  .words::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      var(--bg-color) 10%,
      transparent 30%,
      transparent 70%,
      var(--bg-color) 90%
    );
    z-index: 20;
  }
  
  .word {
    display: block;
    height: 100%;
    padding-left: 6px;
    color: #EFEFEF;
    animation: spin_4991 4s infinite;
  }
  
  @keyframes spin_4991 {
    10% {
      -webkit-transform: translateY(-102%);
      transform: translateY(-102%);
    }
  
    25% {
      -webkit-transform: translateY(-100%);
      transform: translateY(-100%);
    }
  
    35% {
      -webkit-transform: translateY(-202%);
      transform: translateY(-202%);
    }
  
    50% {
      -webkit-transform: translateY(-200%);
      transform: translateY(-200%);
    }
  
    60% {
      -webkit-transform: translateY(-302%);
      transform: translateY(-302%);
    }
  
    75% {
      -webkit-transform: translateY(-300%);
      transform: translateY(-300%);
    }
  
    85% {
      -webkit-transform: translateY(-402%);
      transform: translateY(-402%);
    }
  
    100% {
      -webkit-transform: translateY(-400%);
      transform: translateY(-400%);
    }
  }
  
  /* From Uiverse.io by neerajbaniwal */ 
.btn-shine {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 18px 60px;
  color: #fff;
  background: linear-gradient(to right, #9f9f9f 0, #fff 10%, #868686 20%);
  background-position: 0;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s infinite linear;
  animation-fill-mode: forwards;
  -webkit-text-size-adjust: none;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  white-space: nowrap;
  font-family: "Poppins", sans-serif;
}
@-moz-keyframes shine {
  0% {
    background-position: 0;
  }
  60% {
    background-position: 400px;
  }
  100% {
    background-position: 400px;
  }
}
@-webkit-keyframes shine {
  0% {
    background-position: 0;
  }
  60% {
    background-position: 400px;
  }
  100% {
    background-position: 400px;
  }
}
@-o-keyframes shine {
  0% {
    background-position: 0;
  }
  60% {
    background-position: 400px;
  }
  100% {
    background-position: 400px;
  }
}
@keyframes shine {
  0% {
    background-position: 0;
  }
  60% {
    background-position: 400px;
  }
  100% {
    background-position: 400px;
  }
}

  /* From Uiverse.io by ArturCodeCraft */ 
  /* <reset-style> ============================ */
    
  </style>
  