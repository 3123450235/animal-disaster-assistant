"use client"
import { useState } from "react"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useChat } from "ai/react"
import { Loader2 } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"

export function AIAssistant() {
  const [error, setError] = useState<string | null>(null)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    onError: (err) => {
      console.error("Error en el chat:", err)
      toast({
        title: "Error",
        description: "No se pudo obtener una respuesta del asistente. Por favor, intenta de nuevo.",
        variant: "destructive",
      })
    },
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return
    handleSubmit(e)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-lightBlue-100 bg-opacity-70 backdrop-blur-lg border-lightBlue-300">
      <CardHeader>
        <CardTitle className="text-blue-800">Asistente IA de Animales y Desastres Naturales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[400px] overflow-y-auto mb-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`p-4 rounded-lg ${
                m.role === "user" ? "bg-lightBlue-200 text-blue-800" : "bg-white text-blue-900"
              }`}
            >
              <p>
                <strong>{m.role === "user" ? "Tú:" : "Asistente:"}</strong> {m.content}
              </p>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
              <span className="ml-2 text-blue-800">El asistente está pensando...</span>
            </div>
          )}
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Haz una pregunta sobre animales o desastres naturales"
            className="bg-white bg-opacity-50 border-lightBlue-300 text-blue-800 placeholder-blue-400"
          />
          <Button
            type="submit"
            className="w-full bg-lightBlue-500 hover:bg-lightBlue-600 text-white"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? "Pensando..." : "Enviar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}