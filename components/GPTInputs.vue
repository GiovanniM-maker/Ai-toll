<!-- GPTInputs.vue -->
<template>
    <form class="gpt-inputs-form card" @submit.prevent="$emit('submitForm')">
      <h3 class="card-title">Imposta Parametri</h3>
  
      <div v-if="gpt === 'generico'">
    <label>
      <span class="label-input">Azienda:</span>
      <select class="select-style" v-model="inputs.azienda">
        <option class="option" disabled value="">-- Seleziona un'opzione --</option>
        <option class="option" value="opzione1">Hippocrates Holding</option>
        <option class="option" value="opzione2">TopFarmacia</option>
      </select>
    </label>
    <label>
      <span class="label-input">Job Title o Attività da Svolgere:</span>
      <input v-model="inputs.jobtitle" type="text" placeholder="Inserisci il tuo cognome" />
    </label>
    <label>
      <span class="label-input">Soft Skill:</span>
      <input v-model="inputs.softskill" type="text" placeholder="Inserisci la tua età" />
    </label>
  </div>
  
  
      <div v-else-if="gpt === 'speciale'">
        
    <!-- Altri contenuti della pagina -->
    <FileUploadMapping />
    <!-- Altri contenuti della pagina -->
      </div>
  
      <div v-else>
        <p>Seleziona un GPT dalla sidebar per impostare i parametri.</p>
      </div>
  
      <!-- Unico pulsante Invia, in basso a destra -->
      <div class="form-footer">
        <button class="button">
    <div class="dots_border"></div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="sparkle"
    >
      <path
        class="path"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke="black"
        fill="black"
        d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
      ></path>
      <path
        class="path"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke="black"
        fill="black"
        d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
      ></path>
      <path
        class="path"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke="black"
        fill="black"
        d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
      ></path>
    </svg>
    <span class="text_button">Genera la Job description</span>
  </button>
  
      </div>
    </form>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useConversationStore } from '@/stores/conversationStore'
  import FileUploadMapping from '@/components/FileUploadMapping.vue'
  
  // Definizione delle proprietà attese dal componente
  interface Props {
    gpt: string
  }
  
  const props = defineProps<Props>()
  
  // Inizializzazione dello store di conversazione
  const conversationStore = useConversationStore()
  
  // Computed property per gestire gli input del form
  const inputs = computed({
    get: () => conversationStore.getGptInputs(props.gpt),
    set: (value: any) => conversationStore.setGptInputs(props.gpt, value)
  })
  
  // Eventuale logica aggiuntiva o funzioni per il form possono essere aggiunte qui
  </script>
  
  
  <style scoped>

.select-style {
  width: 100%; /* Larghezza piena del contenitore */
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.2); /* Bordo sottile e visibile */
    outline: none;
    padding: 10px 20px;
    font-family: "Poppins", sans-serif;
    font-weight: 300;
    font-size: 14px;
    border-radius: 9999px;
    color: #fff;
    box-shadow: inset 2px 5px 10px rgba(5, 5, 5, 0.7);
    transition: border 0.3s ease;
    margin: 0px 0px 20px;
}

.select-style:hover {
  background-color: #444;
}

/* Stile al focus */
.select-style:focus {
  border: 1px solid #fff; /* Cambia colore del bordo al focus */
}

/* Stile quando il select è disabilitato */
.select-style:disabled {
  background-color: #999;
  cursor: not-allowed;
}

  .card {
    background: transparent;
    border: transparent;
    border-radius: 12px;
    padding: 1.5rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  /* Contenitore principale */
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Altezza piena della finestra */
    margin: 0;
    background-color: #1a1a1a; /* Colore di sfondo per contrasto */
  }
  
  .gpt-inputs-form {
    width: 90%; /* Larghezza relativa per mantenere la responsività */
    max-width: 400px; /* Limite massimo per non espandersi troppo */
    background: transparent; /* Sfondo trasparente per effetto moderno */
    border-radius: 12px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin: 0 auto;
  }
  
  .card-title {
    margin-bottom: 1rem;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 18px;
    color: white;
    text-align: left; /* Allineamento a sinistra */
  }
  
  label {
    display: flex; /* Utilizza flexbox */
    flex-direction: column; /* Disposizione verticale */
    gap: 0.5rem; /* Spaziatura tra label e input */
  }
  
  .label-input {
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: white;
    padding: 0px 0px 5px;
  }
  
  input {
    width: 100%; /* Larghezza piena del contenitore */
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.2); /* Bordo sottile e visibile */
    outline: none;
    padding: 10px 20px;
    font-family: "Poppins", sans-serif;
    font-weight: 300;
    font-size: 14px;
    border-radius: 9999px;
    color: #fff;
    box-shadow: inset 2px 5px 10px rgba(5, 5, 5, 0.7);
    transition: border 0.3s ease;
    margin: 0px 0px 20px;
  }
  
  input:focus {
    border: 1px solid #fff; /* Cambia colore del bordo al focus */
  }
  
  
  
  
  /* From Uiverse.io by shadowmurphy */ 
  div label {
    display: flex; /* Utilizza flexbox */
    flex-direction: column; /* Disposizione verticale */
    width: 100%; /* Assicura che il contenitore occupi tutta la larghezza */
  }
  
  
  
  
  
  
  p {
    font-size: 1rem;
    font-weight: 300;
    color: #555;
  }
  
  .form-footer {
    display: flex;
    justify-content: flex-start; /* Pulsante a sinistra */
  }
  
  /* From Uiverse.io by MuhammadHasann */ 
  .button {
    --black-700: hsla(0 0% 12% / 1);
    --border_radius: 9999px;
    --transtion: 0.3s ease-in-out;
    --offset: 2px;
  
    cursor: pointer;
    position: relative;
  
    display: flex;
    align-items: center;
    gap: 0.5rem;
  
    transform-origin: center;
  
    padding: 0.5rem 1rem;
    background-color: transparent;
  
    border: none;
    border-radius: var(--border_radius);
    transform: scale(calc(1 + (var(--active, 0) * 0.1)));
  
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 14px;
  
    transition: transform var(--transtion);
  }
  
  .button::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  
    width: 100%;
    height: 100%;
    background-color: var(--black-700);
  
    border-radius: var(--border_radius);
    box-shadow: inset 0 0.5px hsl(0, 0%, 100%), inset 0 -1px 2px 0 hsl(0, 0%, 0%),
      0px 4px 10px -4px hsla(0 0% 0% / calc(1 - var(--active, 0)));
  
    transition: all var(--transtion);
    z-index: 0;
  }
  
  .button::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  
    width: 100%;
    height: 100%;
    background-color: var(--black-700);
    background-position: top;
  
    opacity: var(--active, 0);border-radius: var(--border_radius);
    box-shadow: inset 0 0.5px hsl(0, 0%, 100%), inset 0 -1px 2px 0 hsl(0, 0%, 0%),
      0px 4px 10px -4px hsla(0 0% 0% / calc(1 - var(--active, 0)));
    
    transition: opacity var(--transtion);
    z-index: 2;
  }
  
  .button:is(:hover, :focus-visible) {
    --active: 0.5;
  }
  .button:active {
    transform: scale(1);
  }
  
  .button .dots_border {
  
    overflow: hidden;
  
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  
    width: var(--size_border);
    height: var(--size_border);
    background-color: transparent;
  
    border-radius: var(--border_radius);
    z-index: -10;
  }
  
  .button .dots_border::before {
    content: "";
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform-origin: left;
    transform: rotate(0deg);
  
    width: 100%;
    height: 2rem;
    background-color: white;
  
    mask: linear-gradient(transparent 0%, white 120%);
    animation: rotate 2s linear infinite;
  }
  
  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
  
  .button .sparkle {
    position: relative;
    z-index: 10;
  
    width: 1.75rem;
  }
  
  .button .sparkle .path {
    fill: currentColor;
    stroke: currentColor;
  
    transform-origin: center;
  
    color: hsl(0, 0%, 100%);
  }
  
  .button:is(:hover, :focus) .sparkle .path {
    animation: path 1.5s linear 0.5s infinite;
  }
  
  .button .sparkle .path:nth-child(1) {
    --scale_path_1: 1.2;
  }
  .button .sparkle .path:nth-child(2) {
    --scale_path_2: 1.2;
  }
  .button .sparkle .path:nth-child(3) {
    --scale_path_3: 1.2;
  }
  
  @keyframes path {
    0%,
    34%,
    71%,
    100% {
      transform: scale(1);
    }
    17% {
      transform: scale(var(--scale_path_1, 1));
    }
    49% {
      transform: scale(var(--scale_path_2, 1));
    }
    83% {
      transform: scale(var(--scale_path_3, 1));
    }
  }
  
  .button .text_button {
    position: relative;
    z-index: 10;
  
    background-image: linear-gradient(
      90deg,
      hsla(0 0% 100% / 1) 0%,
      hsla(0 0% 100% / var(--active, 0)) 120%
    );
    background-clip: text;
  
    font-size: 1rem;
    color: transparent;
  }
  
  
  </style>
  