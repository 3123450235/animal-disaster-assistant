import { AIAssistant } from "@/components/ai-assistant"

export default function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Bienvenido a la App de Asistencia Animal y Desastres
      </h1>
      <AIAssistant />
    </div>
  )
}