<!-- src/pages/index.vue -->

<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      
    <div class="app-container">
      <!-- Sidebar -->
      <aside :class="['sidebar', { 'sidebar-closed': !isSidebarOpen }]">
        <div class="sidebar-header">
          <h2>Mini GPT</h2>
          <!-- Icona "X" per chiudere la sidebar -->
          <button @click="toggleSidebar" class="close-sidebar-btn" aria-label="Chiudi Sidebar">
            <span class="material-icons">close</span>
          </button>
        </div>
        <ul>
          <li>
            <a href="#" @click.prevent="selectGPT('generico')" :class="{ active: selectedGPT === 'generico' }">
              Job Description generator
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="selectGPT('speciale')" :class="{ active: selectedGPT === 'speciale' }">
              GPT Speciale
            </a>
          </li>
          <li>
            <a href="#" @click.prevent="selectGPT('altro')" :class="{ active: selectedGPT === 'altro' }">
              GPT Altro
            </a>
          </li>
        </ul>
      </aside>
  
      <!-- Main Area -->
      <div class="main-area">
        <!-- Header (Barra Superiore) -->
       
  
        <!-- Overlay per mobile quando sidebar è aperta -->
        <div v-if="isSidebarOpen && isMobile" class="overlay" @click="toggleSidebar"></div>
  
        <!-- Page Content -->
        <main class="page-content">
          <div class="top-bar-right">
            <div class="menu">
    <div class="item">
      <a href="#" class="link">
        <span> Our Services </span>
        <svg viewBox="0 0 360 360" xml:space="preserve">
          <g id="SVGRepo_iconCarrier">
            <path
              id="XMLID_225_"
              d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
            ></path>
          </g>
        </svg>
      </a>
      <div class="submenu">
        <div class="submenu-item">
          <a href="#" class="submenu-link"> Reparto 1 </a>
        </div>
        <div class="submenu-item">
          <a href="#" class="submenu-link"> Reparto 2 </a>
        </div>
        <div class="submenu-item">
          <a href="#" class="submenu-link"> Reparto 3 </a>
        </div>
        <div class="submenu-item">
          <a href="#" class="submenu-link"> Reparto 4 </a>
        </div>
      </div>
    </div>
  </div>
  
            
            <label class="popup">
    <input type="checkbox" />
    <div tabindex="0" class="burger">
      <svg
        viewBox="0 0 24 24"
        fill="white"
        height="20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"
        ></path>
      </svg>
    </div>
    <nav class="popup-window">
      <legend>Quick Start</legend>
      <ul>
        <li>
          <button>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 4v6.406l-3.753 3.741-6.463-6.462 3.7-3.685h6.516zm2-2h-12.388l1.497 1.5-4.171 4.167 9.291 9.291 4.161-4.193 1.61 1.623v-12.388zm-5 4c.552 0 1 .449 1 1s-.448 1-1 1-1-.449-1-1 .448-1 1-1zm0-1c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm6.708.292l-.708.708v3.097l2-2.065-1.292-1.74zm-12.675 9.294l-1.414 1.414h-2.619v2h-2v2h-2v-2.17l5.636-5.626-1.417-1.407-6.219 6.203v5h6v-2h2v-2h2l1.729-1.729-1.696-1.685z"
              ></path>
            </svg>
            <span>Log In</span>
          </button>
        </li>
        <li>
          <button>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.598 9h-1.055c1.482-4.638 5.83-8 10.957-8 6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5c-5.127 0-9.475-3.362-10.957-8h1.055c1.443 4.076 5.334 7 9.902 7 5.795 0 10.5-4.705 10.5-10.5s-4.705-10.5-10.5-10.5c-4.568 0-8.459 2.923-9.902 7zm12.228 3l-4.604-3.747.666-.753 6.112 5-6.101 5-.679-.737 4.608-3.763h-14.828v-1h14.826z"
              ></path>
            </svg>
            <span>Sign Up</span>
          </button>
        </li>
      </ul>
    </nav>
  </label>
  
          </div>
          <div class="top-bar-left">
          </div>
          
          <div v-if="!selectedGPT">
            <p>Scegli un GPT dalla sidebar per iniziare.</p>
          </div>
          <div v-else-if="!chatStarted">
            <!-- SOLO GPTInputs con il form interno -->
            <ClientOnly>
              <GPTInputs :gpt="selectedGPT" @submitForm="submitInputs"/>
            </ClientOnly>
          </div>
          <div v-else>
            <!-- Chat -->
            <ClientOnly>
              <ChatBox :gpt="selectedGPT" />
            </ClientOnly>
            
          </div>
        
        </main>
      </div>
  
      <!-- Icona hamburger per aprire la sidebar quando chiusa -->
      <button v-if="!isSidebarOpen" @click="toggleSidebar" class="open-sidebar-btn" aria-label="Apri Sidebar">
        <span class="material-icons">menu</span>
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import GPTInputs from '~/components/GPTInputs.vue'
  import ChatBox from '~/components/ChatBox.vue'
  import { useConversationStore } from '~/stores/conversationStore'
  import { useUIStore } from '~/stores/uiStore'
  import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
  import GenerazioneJobDescription from '~/assets/prompts/GenerazioneJobDescription.txt?raw'
  
  // src/index.js
  
  // Resto del codice...
  
  // Importa ClientOnly se utilizzi Nuxt o un plugin simile
  // import { ClientOnly } from 'vue'
  
  const conversationStore = useConversationStore()
  const uiStore = useUIStore()
  
  const selectedGPT = computed(() => conversationStore.selectedGPT)
  const chatStarted = computed(() => conversationStore.chatStarted)
  const isSidebarOpen = computed(() => uiStore.isSidebarOpen)
  
  const isMobile = ref(false)
  
  function updateIsMobile() {

    conversationStore.loadState()
    isMobile.value = window.innerWidth <= 768
  }
  
  onMounted(() => {
    updateIsMobile()
    window.addEventListener('resize', updateIsMobile)
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateIsMobile)
  })
  
  function selectGPT(gpt: string) {
    conversationStore.selectGPT(gpt)
  }
  
  function toggleSidebar() {
    uiStore.toggleSidebar()
  }
  
  function selectDepartment(department: string) {
    // Implementa la logica per selezionare il reparto, se necessario
    console.log(`Selezionato reparto: ${department}`)
  }
  
  async function submitInputs() {
    const gptInputs = conversationStore.getGptInputs(selectedGPT.value)
  
    // Validazione
    if (selectedGPT.value === 'generico') {
      const { nome, cognome, eta, email } = gptInputs
      if (!nome || !cognome || !eta || !email) {
        alert('Per favore completa tutti i campi richiesti.')
        return
      }
    } else if (selectedGPT.value === 'speciale') {
      const { reparto, progetto, ruolo, genere } = gptInputs
      if (!reparto || !progetto || !ruolo || !genere) {
        alert('Per favore completa tutti i campi richiesti.')
        return
      }
    }
  
    const systemMessage = buildSystemMessage(selectedGPT.value, gptInputs)
    const payloadMessages = [
      { role: 'system', content: systemMessage }
    ]
  
    try {
      const res = await $fetch('/api/ask', {
        method: 'POST',
        body: { messages: payloadMessages }
      })
  
      // Prima risposta dall'API
      conversationStore.addMessageToGpt(selectedGPT.value, 'assistant', res.answer)
      // Avvia la chat
      conversationStore.startChat()
    } catch (error) {
      console.error(error)
      alert('Errore nella chiamata all’API.')
    }
  }
  
  function buildSystemMessage(gpt: string, inputs: Record<string, string>): string {
    if (gpt === 'generico') {
     return GenerazioneJobDescription
      .replace('{azienda}', inputs.azienda || '')
      .replace('{job-title}', inputs.jobtitle || '')
      .replace('{soft-skill}', inputs.softskill || '')
    } else if (gpt === 'speciale') {
      return `Raccontami i dati: Reparto=${inputs.reparto}, Progetto=${inputs.progetto}, Ruolo=${inputs.ruolo}, Genere=${inputs.genere}`
    } else if (gpt === 'altro') {
      return `Raccontami i dati: Competenze=${inputs.skills}, Obiettivi=${inputs.goals}`
    }
    return 'Raccontami i dati: nessun dato disponibile.'
  }
  
  onMounted(() => {
  const popup = document.querySelector('.popup-window');
  const popupContainer = document.querySelector('.popup');

  if(popup && popupContainer) {
    // Mostra il popup quando il mouse entra
    popupContainer.addEventListener('mouseenter', () => {
      popup.style.visibility = 'visible';
      popup.style.opacity = '1';
      popup.style.transform = 'scale(1)';
    });

    // Nascondi il popup quando il mouse esce
    popupContainer.addEventListener('mouseleave', () => {
      popup.style.visibility = 'hidden';
      popup.style.opacity = '0';
      popup.style.transform = 'scale(var(--nav-default-scale))';
    });
  }
});
  
  </script>
  
  <style scoped>
  .app-container {
    display: flex;
    flex-direction: row;
    height: 100vh;
    background: var(--background, #303030);
    color: var(--text-primary, white);
  }
  
  
  
  /* Main Area */
  .main-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  
  /* Header (Barra Superiore) */
  .top-bar {
    background: transparent;
    color: var(--text-primary, white);
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--page-header-height, 64px);
    flex-shrink: 0;
  }
  
  .top-bar-left .brand {
    margin: 0;
    font-size: 1.5rem;
    color: var(--text-primary, white);
  }
  
  .top-bar-right {
    position: absolute; /* Permette il posizionamento relativo al contenitore */
    top: var(--top-margin, 10px); /* Margine dall'alto, modificabile tramite variabile */
    right: var(--right-margin, 10px); /* Margine da destra, modificabile tramite variabile */
    display: flex; /* Imposta un layout flessibile */
    align-items: center; /* Centra verticalmente gli elementi */
    gap: 15px; /* Spaziatura tra gli elementi */
    z-index: 100; /* Assicura che l'elemento sia sopra il contenuto del div */
  }
  
  
  .dropdown {
    position: relative;
  }
  
  .dropdown-toggle {
    background: black;
    color: var(--text-primary, white);
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 9999px;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 14px;
  }
  
  .dropdown-toggle:hover {
    background: var(--surface-container, #666);
  }
  
  .dropdown-menu {
    position: absolute;
    top: 35px;
    right: 0;
    background: var(--surface-container, #555);
    color: var(--text-primary, white);
    border-radius: var(--border-radius, 4px);
    display: none;
    flex-direction: column;
    min-width: 150px;
    z-index: 1000;
  }
  
  .dropdown:hover .dropdown-menu {
    display: flex;
  }
  
  .dropdown-menu button {
    background: transparent;
    border: none;
    color: var(--text-primary, white);
    padding: 10px;
    text-align: left;
    cursor: pointer;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 14px;
  }
  
  .dropdown-menu button:hover {
    background: var(--surface-container, #666);
  }
  
  
  /* Page Content */
  .page-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0px;
    background: radial-gradient(
      circle at 50% 50%,
      #222222, /* Centro predefinito (50% 50% corrisponde al centro del div) */
      #1A1A1A         /* Nero leggermente più chiaro verso l'esterno */
    );
  ;
    color: #222222;
    overflow: hidden; /* Previene overflow indesiderati */
  }
  
  .page-content.full-width {
    width: 100%;
  }
  
  /* Icona hamburger */
  .open-sidebar-btn {
    position: fixed;
    top: 10px;
    left: 15px;
    background: transparent; /* Sfondo semi-trasparente */
    border: none;
    color: var(--text-primary, white);
    cursor: pointer;
    font-size: 28px;
    z-index: 1000;
    transition: color var(--transition-speed), background var(--transition-speed);
    padding: 8px;
    border-radius: 50%;
  }
  
  .open-sidebar-btn:hover {
    color: #bbb;
    background:transparent; /* Cambia lo sfondo al passaggio del mouse */
  }
  
  /* Sidebar */
  .sidebar {
    width: 200px;
    background: var(--surface-container, #333);
    color: var(--text-primary, white);
    padding: 20px;
    transition: transform var(--transition-speed), opacity var(--transition-speed);
    position: relative;
    z-index: 1001;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    height: 100%;
    box-sizing: border-box;
  }
  
  .sidebar.sidebar-closed {
    transform: translateX(-100%);
    opacity: 0;
    display: none;
  }
  
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .close-sidebar-btn {
    background: transparent;
    border: none;
    color: var(--text-primary, white);
    cursor: pointer;
    font-size: 24px;
  }
  
  .close-sidebar-btn:hover {
    color: #bbb; /* Puoi sostituirlo con una variabile se necessario */
  }
  
  .sidebar h2 {
    margin: 0;
    font-size: 1.2rem;
    color: var(--text-primary, white);
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar li {
    margin-bottom: 10px;
  }
  
  .sidebar a {
    color: var(--text-primary, white);
    text-decoration: none;
    font-size: var(--font-size-base, 1rem);
  }
  
  .sidebar a.active {
    font-weight: var(--font-weight-bold, bold);
    text-decoration: underline;
  }
  
  /* Responsività */
  @media (max-width: 768px) {
    .app-container {
      flex-direction: column;
    }
  
    .sidebar {
    position: fixed; /* Fissa per sovrapporsi al contenuto */
    top: 0;
    left: 0;
    width: 80%; /* Occupa l'80% della larghezza dello schermo */
    max-width: 300px; /* Limita la larghezza massima */
    height: 100%; /* Occupa tutta l'altezza dello schermo */
    background: var(--surface-container, #333); /* Sfondo scuro */
    color: var(--text-primary, white); /* Colore del testo */
    padding: 20px; /* Spazi interni */
    box-sizing: border-box; /* Include padding e bordi nella larghezza */
    z-index: 1001; /* Sopra l'overlay */
    transform: translateX(0); /* Nasconde la sidebar fuori dallo schermo */
    opacity: 1; /* Invisibile di default */
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out; /* Transizione fluida */
  }
  
  .sidebar.sidebar-closed {
    transform: translateX(-100%); /* Nasconde la sidebar */
    opacity: 0; /* Invisibile */
  }
  
    .sidebar.sidebar-open {
    transform: translateX(0); /* Mostra la sidebar */
    opacity: 1; /* Visibile */
  }
  
  
    .main-area {
      flex: 1;
    }
  
    .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%; /* Copre tutto lo schermo */
    height: 100%; /* Copre tutta l'altezza dello schermo */
    background: var(--scrim, rgba(0, 0, 0, 0.6));
    z-index: 1000; /* Sotto la sidebar */
    opacity: 1; /* Invisibile */
    pointer-events: none; /* Disabilita interazioni */
    transition: opacity 0.3s ease-in-out;
  }
  
  .overlay.overlay-visible {
    opacity: 1; /* Visibile */
    pointer-events: auto; /* Abilita interazioni */
  }
  
  .open-sidebar-btn {
      top: 20px; /* Aggiusta la posizione superiore per dispositivi più piccoli */
      left: 15px;
      font-size: 24px; /* Riduce leggermente la dimensione dell'icona */
      z-index: 1100; /* Mantieni un alto valore per essere sopra l'overlay */
    }
  }
  
  /* From Uiverse.io by devkatyall */ 
  /* The design is inspired from Galahhad*/
  
  .popup {
    --burger-line-width: 1.125em;
    --burger-line-height: 0.125em;
    --burger-offset: 0.625em;
    --burger-bg: #00bf63;
    --burger-color:black;
    --burger-line-border-radius: 0.1875em;
    --burger-diameter: 2.5em;
    --burger-btn-border-radius: calc(var(--burger-diameter) / 2);
    --burger-line-transition: 0.3s;
    --burger-transition: all 0.1s ease-in-out;
    --burger-hover-scale: 1.1;
    --burger-active-scale: 0.95;
    --burger-enable-outline-color: var(--burger-bg);
    --burger-enable-outline-width: 0.125em;
    --burger-enable-outline-offset: var(--burger-enable-outline-width);
    /* nav */
    --nav-padding-x: 0.25em;
    --nav-padding-y: 0.625em;
    --nav-border-radius: 0.375em;
    --nav-border-color: #ccc;
    --nav-border-width: 0.0625em;
    --nav-shadow-color: transparent;
    --nav-shadow-width: 0 1px 5px;
    --nav-bg: #eee;
    --nav-font-family: "Poppins", sans-serif;
    --nav-default-scale: 0.8;
    --nav-active-scale: 1;
    --nav-position-left: 0;
    --nav-position-right: unset;
    /* if you want to change sides just switch one property */
    /* from properties to "unset" and the other to 0 */
    /* title */
    --nav-title-size: 0.625em;
    --nav-title-color: #777;
    --nav-title-padding-x: 1rem;
    --nav-title-padding-y: 0.25em;
    /* nav button */
    --nav-button-padding-x: 1rem;
    --nav-button-padding-y: 0.375em;
    --nav-button-border-radius: 0.375em;
    --nav-button-font-size: 17px;
    --nav-button-hover-bg: Black;
    --nav-button-hover-text-color: #fff;
    --nav-button-distance: 0.875em;
    /* underline */
    --underline-border-width: 0.0625em;
    --underline-border-color: #ccc;
    --underline-margin-y: 0.3125em;
  }
  
  /* popup settings 👆 */
  
  .popup {
    display: inline-block;
    text-rendering: optimizeLegibility;
    position: relative;
  }
  
  .popup input {
    display: none;
  }
  
  .burger {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background: var(--burger-bg);
    width: var(--burger-diameter);
    height: var(--burger-diameter);
    border-radius: var(--burger-btn-border-radius);
    border: none;
    cursor: pointer;
    overflow: hidden;
    transition: var(--burger-transition);
    outline: var(--burger-enable-outline-width) solid transparent;
    outline-offset: 0;
  }
  
  .popup-window {
    transform: scale(var(--nav-default-scale));
    visibility: hidden;
    opacity: 0;
    position: absolute;
    padding: var(--nav-padding-y) var(--nav-padding-x);
    background: white;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: white;
    border-radius: 25px;
    box-shadow: var(--nav-shadow-width) var(--nav-shadow-color);
    border: var(--nav-border-width) solid var(--nav-border-color);
    top: calc(
      var(--burger-diameter) + var(--burger-enable-outline-width) +
        var(--burger-enable-outline-offset)
    );
    left: auto; /* Lascia che il browser calcoli il lato sinistro */
    right: 0; /* Allinea il popup al bordo destro del pulsante */
    transition: var(--burger-transition);
    margin-top: 10px;
    min-width: 200px; /* Larghezza minima per evitare ridimensionamenti troppo piccoli */
    max-width: calc(100vw - 20px); /* Garantisce che il popup non esca fuori dallo schermo */
    overflow-wrap: break-word; /* Gestisce il testo troppo lungo */
    box-sizing: border-box;
  }
  
  /* Regola per adattarsi quando il popup esce dal viewport */
  @media (max-width: 768px) {
    .popup-window {
      right: 0; /* Disabilita il lato destro */
      left: auto; /* Riposiziona il popup a sinistra per adattarsi */
    }
  }
  
  
  .popup-window legend {
    padding: var(--nav-title-padding-y) var(--nav-title-padding-x);
    margin: 0;
    color: var(--nav-title-color);
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 12px;
    text-transform: uppercase;
  }
  
  .popup-window ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  
  .popup-window ul button {
    outline: none;
    width: 100%;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    color: var(--burger-color);
    font-size: var(--nav-button-font-size);
    padding: var(--nav-button-padding-y) var(--nav-button-padding-x);
    white-space: nowrap;
    border-radius: 25px;
    cursor: pointer;
    column-gap: var(--nav-button-distance);
  }
  
  .popup-window ul li:nth-child(1) svg,
  .popup-window ul li:nth-child(2) svg {
    color: Black;
    width: 16px;
  }
  
  .popup-window ul li:nth-child(4) svg,
  .popup-window ul li:nth-child(5) svg {
    color: rgb(153, 153, 153);
  }
  
  .popup-window ul li:nth-child(7) svg {
    color: red;
  }
  
  .popup-window hr {
    margin: var(--underline-margin-y) 0;
    border: none;
    border-bottom: var(--underline-border-width) solid
      var(--underline-border-color);
  }
  
  /* actions */
  
  .popup-window ul button:hover svg{
    background: transparent;
    color: white;
  
  }
  
  .popup-window ul button:hover,
  .popup-window ul button:focus-visible,
  .popup-window ul button:focus-visible svg {
    color: white;
    background: var(--nav-button-hover-bg);
  }
  
  .burger:hover {
    transform: scale(var(--burger-hover-scale));
  }
  
  .burger:active {
    transform: scale(var(--burger-active-scale));
  }
  
  .burger:focus:not(:hover) {
    outline-color: var(--burger-enable-outline-color);
    outline-offset: var(--burger-enable-outline-offset);
  }
  
  .popup input:checked + .burger span:nth-child(1) {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }
  
  .popup input:checked + .burger span:nth-child(2) {
    bottom: 50%;
    transform: translateY(50%) rotate(-45deg);
  }
  
  .popup input:checked + .burger span:nth-child(3) {
    transform: translateX(
      calc(var(--burger-diameter) * -1 - var(--burger-line-width))
    );
  }
  
  .popup input:checked ~ nav {
    transform: scale(var(--nav-active-scale));
    visibility: visible;
    opacity: 1;
  }
  
  
  .prova{
    background: white;
    width: 20px;
    height: 20px;
  }
  
  /* From Uiverse.io by gharsh11032000 */ 
  .menu {
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.6;
    color: white;
    width: fit-content;
    display: flex;
    list-style: none;
  }
  
  .menu a {
    text-decoration: none;
    color: white;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }
  
  .menu .link {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 12px 36px;
    border-radius: 16px;
    overflow: hidden;
  }
  
  .menu .link::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: -1;
    transform: scaleX(0);
    transform-origin: left;
  }
  
  .menu .link svg {
    width: 14px;
    height: 14px;
    fill: white;
  }
  
  .menu .item {
    position: relative;
  }
  
  .menu .item .submenu {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 100%;
    border-radius: 0 0 16px 16px;
    left: 0;
    width: 100%;
    overflow: hidden;
    border: 1px solid #cccccc;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-12px);
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 1;
    pointer-events: none;
    list-style: none;
  }
  
  .menu .item:hover .submenu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
    border-top: transparent;
    border-color: white;
  }
  
  .menu .item:hover .link {
    color: black;
    border-radius: 16px 16px 0 0;
  }
  
  .menu .item:hover .link::after {
    transform: scaleX(1);
    transform-origin: right;
  }
  
  .menu .item:hover .link svg {
    fill: black;
    transform: rotate(-180deg);
  }
  
  .submenu .submenu-item {
    width: 100%;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .submenu .submenu-link {
    display: block;
    padding: 12px 24px;
    width: 100%;
    position: relative;
    text-align: center;
  }
  
  .submenu .submenu-item:last-child .submenu-link {
    border-bottom: none;
  }
  
  .submenu .submenu-link::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transform: scaleX(0);
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: -1;
    transform-origin: left;
  }
  
  .submenu .submenu-link:hover:before {
    transform: scaleX(1);
    transform-origin: right;
  }
  
  .submenu .submenu-link:hover {
    color: black;
  }
  
  </style>
  