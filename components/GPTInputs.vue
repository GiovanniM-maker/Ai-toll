<template>
  <div>
    <div v-if="gpt === 'generico'">
      <!-- Campi specifici per GPT generico -->
      <label>
        <span class="label-input">Azienda:</span>
        <select class="select-style" v-model="inputs.azienda">
          <option disabled value="">-- Seleziona un'opzione --</option>
          <option value="Hippocrates Holding">Hippocrates Holding</option>
          <option value="TopFarmacia">TopFarmacia</option>
        </select>
      </label>
      <label>
        <span class="label-input">Job Title o Attività da Svolgere:</span>
        <input v-model="inputs.jobtitle" type="text" placeholder="Inserisci il tuo job title" />
      </label>
      <label>
        <span class="label-input">Soft Skill:</span>
        <input v-model="inputs.softskill" type="text" placeholder="Inserisci la soft skill" />
      </label>
      <div class="form-footer">
        <button class="button" type="button" @click="generateJobDescriptionGenerico">
          <div class="dots_border"></div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="sparkle">
            <!-- SVG content -->
          </svg>
          <span class="text_button">Genera la Job description</span>
        </button>
      </div>
    </div>

    <div v-else-if="gpt === 'speciale'">
      <!-- Sezione per GPT speciale con upload e mappatura file -->
      <FileUploadMapping />
      <form class="gpt-inputs-form card" @submit.prevent="$emit('submitForm')">
        
        <div class="form-footer">
          <button type="button" @click="modifyMapping">Modifica mappatura</button>
          <button class="button" type="button" @click="generateJobDescriptionSpeciale">
            <div class="dots_border"></div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="sparkle">
              <!-- SVG content -->
            </svg>
            <span class="text_button">Genera</span>
          </button>
        </div>
      </form>
    </div>

    <div v-else>
      <p>Seleziona un GPT dalla sidebar per impostare i parametri.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useConversationStore } from '@/stores/conversationStore'
import { useFileStore } from '@/stores/fileStore'
import { processFileWithStories } from '@/utils/fileAutomation'
import FileUploadMapping from '@/components/FileUploadMapping.vue'

interface Props {
  gpt: string
}

const props = defineProps<Props>()
const conversationStore = useConversationStore()
const fileStore = useFileStore()

const inputs = computed({
  get: () => conversationStore.getGptInputs(props.gpt),
  set: (value: any) => conversationStore.setGptInputs(props.gpt, value)
})

// Funzione per GPT generico: non utilizza elaborazione file
async function generateJobDescriptionGenerico() {
  // Validazione dei campi per GPT generico
  const { azienda, jobtitle, softskill } = inputs.value
  if (!azienda || !jobtitle || !softskill) {
    alert('Completa tutti i campi richiesti.')
    return
  }
  // Costruisci un prompt semplice
  const prompt = `Genera una job description per ${azienda}, ruolo ${jobtitle}, con soft skill ${softskill}.`
  try {
    const res = await $fetch('/api/ask', {
      method: 'POST',
      body: { messages: [{ role: 'user', content: prompt }], gptType: 'generico' }
    })
    // Salva la risposta nel conversationStore e avvia la chat
    conversationStore.addMessageToGpt('generico', 'assistant', res.answer)
    conversationStore.startChat()
  } catch (error) {
    console.error(error)
    alert('Errore nella generazione della job description.')
  }
}

// Funzione per GPT speciale: utilizza file e mappature
async function generateJobDescriptionSpeciale() {
  if (!fileStore.uploadedFile) {
    alert('Nessun file caricato.')
    return
  }
  if (!fileStore.mappingConfirmed) {
    alert('Completa prima la mappatura dei campi.')
    return
  }
  
  // Avvia la chat e mostra un messaggio di attesa
  conversationStore.startChat();
  conversationStore.addMessageToGpt('speciale', 'assistant', 'Sto preparando la tua Job Description...');
  
  try {
    const resultBlob = await processFileWithStories(fileStore.uploadedFile, fileStore.fieldMappings)
    // Crea un URL per il file risultante
    const url = URL.createObjectURL(resultBlob);
    
    // Crea un link HTML per il download
    const downloadLink = `<a href="${url}" download="risultati_speciale.xlsx">Clicca qui per scaricare il file</a>`;
    
    // Aggiungi un messaggio con il link alla chat
    conversationStore.addMessageToGpt('speciale', 'assistant', `Elaborazione completata. ${downloadLink}`);
  } catch (error) {
    console.error('Errore durante l\'elaborazione del file speciale:', error);
    conversationStore.addMessageToGpt('speciale', 'assistant', 'Errore durante l\'elaborazione del file speciale.');
  }
}

function modifyMapping() {
  fileStore.resetMapping()
}
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
  