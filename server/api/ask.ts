// server/api/ask.ts
import { defineEventHandler, readBody, H3Event } from 'h3'

// Configurazione delle variabili di ambiente
const AZURE_API_KEY: string = process.env.AZURE_API_KEY || ""
const AZURE_ENDPOINT_URL: string = process.env.AZURE_ENDPOINT_URL || ""

// Tipizzazione dei messaggi attesi
interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

// Tipizzazione della richiesta e della risposta
interface AskRequestBody {
  messages: Message[]
}

interface AskResponse {
  answer: string
}

export default defineEventHandler(async (event: H3Event): Promise<AskResponse> => {
  try {
    // Lettura del corpo della richiesta
    const body: AskRequestBody = await readBody(event)
    const { messages } = body

    console.log('Richiesta ricevuta:', messages)

    // Validazione dei messaggi
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.warn('Richiesta non valida: Mancano i messaggi.')
      return { answer: 'Richiesta non valida. Mancano i messaggi.' }
    }

    // Log del payload inviato ad Azure
    console.log('Payload inviato ad Azure:', messages)

    // Costruzione del payload per Azure API
    const payload = {
      messages: messages,
      max_tokens: 800,
      temperature: 0.7
    }

    // Chiamata all'API di Azure
    const response = await fetch(AZURE_ENDPOINT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': AZURE_API_KEY
      },
      body: JSON.stringify(payload)
    })

    console.log('Risposta HTTP Status:', response.status)

    // Gestione degli errori HTTP
    if (!response.ok) {
      const errorData = await response.json()
      console.error('Errore API Azure:', errorData)
      return { answer: 'Errore nella chiamata all’API di Azure' }
    }

    // Parsing della risposta
    const data = await response.json()
    console.log('Risposta Azure:', data)

    // Validazione della risposta di Azure
    if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
      console.error('Risposta vuota o formato non valido:', data)
      return { answer: 'Nessuna risposta dall’API di Azure' }
    }

    // Estrazione della risposta dall'array delle scelte
    const azureAnswer: string = data.choices[0].message.content

    return { answer: azureAnswer }

  } catch (error) {
    console.error('Errore nella chiamata API:', error)
    return { answer: 'Errore nel contattare l’API di Azure' }
  }
})
