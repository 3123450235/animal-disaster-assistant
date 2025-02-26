"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Pin, MessageSquare, Send, X } from 'lucide-react'

const usuarios = [
  { id: 1, nombre: "Ana García", foto: "/placeholder.svg" },
  { id: 2, nombre: "Carlos Rodríguez", foto: "/placeholder.svg" },
  { id: 3, nombre: "Elena Martínez", foto: "/placeholder.svg" },
  { id: 4, nombre: "David López", foto: "/placeholder.svg" },
]

export default function ChatPage() {
  const [busqueda, setBusqueda] = useState("")
  const [usuariosFijados, setUsuariosFijados] = useState<number[]>([])
  const [chatActivo, setChatActivo] = useState<number | null>(null)
  const [mensajes, setMensajes] = useState<{ [key: number]: { sender: string; content: string }[] }>({})
  const [nuevoMensaje, setNuevoMensaje] = useState("")

  useEffect(() => {
    const storedUsuariosFijados = localStorage.getItem("usuariosFijados")
    const storedMensajes = localStorage.getItem("mensajes")
    if (storedUsuariosFijados) {
      setUsuariosFijados(JSON.parse(storedUsuariosFijados))
    }
    if (storedMensajes) {
      setMensajes(JSON.parse(storedMensajes))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("usuariosFijados", JSON.stringify(usuariosFijados))
  }, [usuariosFijados])

  useEffect(() => {
    localStorage.setItem("mensajes", JSON.stringify(mensajes))
  }, [mensajes])

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  const toggleUsuarioFijado = (id: number) => {
    setUsuariosFijados((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    )
  }

  const enviarMensaje = () => {
    if (chatActivo && nuevoMensaje.trim()) {
      setMensajes((prev) => ({
        ...prev,
        [chatActivo]: [...(prev[chatActivo] || []), { sender: "Tú", content: nuevoMensaje.trim() }],
      }))
      setNuevoMensaje("")
    }
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Chat</h1>
      <div className="mb-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Buscar contactos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 space-y-2">
          {usuariosFijados.map((id) => {
            const usuario = usuarios.find((u) => u.id === id)
            if (!usuario) return null
            return (
              <ContactoCard
                key={usuario.id}
                usuario={usuario}
                estaFijado={true}
                onToggleFijar={() => toggleUsuarioFijado(usuario.id)}
                onIniciarChat={() => setChatActivo(usuario.id)}
              />
            )
          })}
          {usuariosFiltrados
            .filter((u) => !usuariosFijados.includes(u.id))
            .map((usuario) => (
              <ContactoCard
                key={usuario.id}
                usuario={usuario}
                estaFijado={usuariosFijados.includes(usuario.id)}
                onToggleFijar={() => toggleUsuarioFijado(usuario.id)}
                onIniciarChat={() => setChatActivo(usuario.id)}
              />
            ))}
        </div>

        <div className="md:col-span-2">
          {chatActivo && (
            <Card className="bg-lightBlue-100 bg-opacity-70 backdrop-blur-lg border-lightBlue-300">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold text-blue-800">
                    Chat con {usuarios.find((u) => u.id === chatActivo)?.nombre}
                  </h2>
                  <Button variant="ghost" size="icon" onClick={() => setChatActivo(null)} className="text-blue-800">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="h-64 overflow-y-auto mb-4 p-2 bg-white bg-opacity-50 rounded">
                  {mensajes[chatActivo]?.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.sender === "Tú" ? "text-right" : "text-left"}`}>
                      <span
                        className={`inline-block p-2 rounded-lg ${
                          msg.sender === "Tú" ? "bg-blue-500 text-white" : "bg-gray-200 text-blue-800"
                        }`}
                      >
                        {msg.content}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    value={nuevoMensaje}
                    onChange={(e) => setNuevoMensaje(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    onKeyPress={(e) => e.key === "Enter" && enviarMensaje()}
                  />
                  <Button onClick={enviarMensaje}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

function ContactoCard({ usuario, estaFijado, onToggleFijar, onIniciarChat }) {
  return (
    <Card className="bg-lightBlue-100 bg-opacity-70 backdrop-blur-lg border-lightBlue-300">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4" onClick={onIniciarChat}>
          <Avatar>
            <AvatarImage src={usuario.foto} alt={usuario.nombre} />
            <AvatarFallback>{usuario.nombre[0]}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-blue-800">{usuario.nombre}</span>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={onToggleFijar}>
            <Pin className={`h-4 w-4 ${estaFijado ? "text-blue-500" : "text-gray-400"}`} />
          </Button>
          <Button variant="ghost" size="icon" onClick={onIniciarChat}>
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}