"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function ChatPrivadoPage() {
  const [mensaje, setMensaje] = useState("")
  const [mensajes, setMensajes] = useState([
    { id: 1, sender: "Juan", content: "Hola, ¿cómo puedo ayudarte con el rescate de animales?" },
    { id: 2, sender: "Tú", content: "Hola Juan, necesito consejos para rescatar un gato atrapado en un árbol." },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mensaje.trim()) {
      setMensajes([...mensajes, { id: mensajes.length + 1, sender: "Tú", content: mensaje }])
      setMensaje("")
    }
  }

  return (
    <div className="container mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Chat Privado</h1>
      <Card className="bg-lightBlue-100 bg-opacity-70 backdrop-blur-lg border-lightBlue-300">
        <CardHeader>
          <CardTitle className="text-blue-800">Conversación con Juan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
            {mensajes.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "Tú" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-start space-x-2 max-w-[70%] ${msg.sender === "Tú" ? "flex-row-reverse" : ""}`}
                >
                  <Avatar>
                    <AvatarFallback>{msg.sender[0]}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`p-3 rounded-lg ${
                      msg.sender === "Tú" ? "bg-blue-500 text-white" : "bg-white text-blue-800"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-grow"
            />
            <Button type="submit">Enviar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}