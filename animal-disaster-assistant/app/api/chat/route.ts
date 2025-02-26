import { GoogleGenerativeAI } from "@google/generative-ai"
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai"

// Usamos la variable de entorno en lugar de la clave hardcodeada
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!)

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    console.log("Recibida solicitud de chat")

    if (!messages || messages.length === 0) {
      throw new Error("No se recibieron mensajes")
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts:
            "Eres un asistente especializado en animales y desastres naturales. Proporciona información precisa y útil sobre estos temas.",
        },
        {
          role: "model",
          parts:
            "Entendido. Soy un asistente especializado en animales y desastres naturales. Estoy aquí para proporcionar información precisa y útil sobre estos temas. ¿En qué puedo ayudarte hoy?",
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    })

    const lastMessage = messages[messages.length - 1].content
    const result = await chat.sendMessageStream(lastMessage)
    const stream = GoogleGenerativeAIStream(result)

    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error("Error en el asistente:", error)
    return new Response(
      JSON.stringify({
        error: true,
        message: "Error en el asistente. Por favor, inténtalo de nuevo más tarde.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}