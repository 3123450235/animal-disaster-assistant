"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

interface Ayuda {
  id: number
  usuario: string
  contenido: string
  imagen: string
  likes: string[]
  comentarios: { id: number; usuario: string; contenido: string }[]
}

export default function AyudasRecientesPage() {
  const [ayudas, setAyudas] = useState<Ayuda[]>([])
  const [nuevoComentario, setNuevoComentario] = useState("")
  const [usuarioActual, setUsuarioActual] = useState("")

  useEffect(() => {
    const ayudasGuardadas = localStorage.getItem("ayudas")
    if (ayudasGuardadas) {
      setAyudas(JSON.parse(ayudasGuardadas))
    }
    const perfilGuardado = localStorage.getItem("perfil")
    if (perfilGuardado) {
      const perfil = JSON.parse(perfilGuardado)
      setUsuarioActual(perfil.nombre)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("ayudas", JSON.stringify(ayudas))
  }, [ayudas])

  const handleLike = (ayudaId: number) => {
    setAyudas(
      ayudas.map((ayuda) =>
        ayuda.id === ayudaId
          ? ayuda.likes.includes(usuarioActual)
            ? { ...ayuda, likes: ayuda.likes.filter((u) => u !== usuarioActual) }
            : { ...ayuda, likes: [...ayuda.likes, usuarioActual] }
          : ayuda
      )
    )
  }

  const handleComment = (ayudaId: number) => {
    if (nuevoComentario.trim() === "") return

    setAyudas(
      ayudas.map((ayuda) =>
        ayuda.id === ayudaId
          ? {
              ...ayuda,
              comentarios: [
                ...ayuda.comentarios,
                { id: Date.now(), usuario: usuarioActual, contenido: nuevoComentario.trim() },
              ],
            }
          : ayuda
      )
    )
    setNuevoComentario("")
    toast({
      title: "Comentario añadido",
      description: "Tu comentario ha sido publicado.",
    })
  }

  const handleShare = (ayudaId: number) => {
    const ayuda = ayudas.find((a) => a.id === ayudaId)
    if (ayuda) {
      navigator.clipboard.writeText(`${window.location.origin}/ayuda/${ayudaId}`)
      toast({
        title: "Enlace copiado",
        description: "El enlace de la ayuda ha sido copiado al portapapeles.",
      })
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Ayudas Recientes</h1>
      <div className="space-y-6">
        {ayudas.map((ayuda) => (
          <Card key={ayuda.id} className="bg-lightBlue-100 bg-opacity-70 backdrop-blur-lg border-lightBlue-300">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{ayuda.usuario[0]}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-blue-800">{ayuda.usuario}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 mb-4">{ayuda.contenido}</p>
              <img
                src={ayuda.imagen || "/placeholder.svg"}
                alt="Imagen de ayuda"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  className={`text-blue-600 ${ayuda.likes.includes(usuarioActual) ? "bg-blue-100" : ""}`}
                  onClick={() => handleLike(ayuda.id)}
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  {ayuda.likes.length} Me gusta
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="text-blue-600">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {ayuda.comentarios.length} Comentarios
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Comentarios</DialogTitle>
                    </DialogHeader>
                    <div className="max-h-[300px] overflow-y-auto">
                      {ayuda.comentarios.map((comentario) => (
                        <div key={comentario.id} className="mb-2">
                          <p className="font-semibold">{comentario.usuario}</p>
                          <p>{comentario.contenido}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex mt-4">
                      <Input
                        value={nuevoComentario}
                        onChange={(e) => setNuevoComentario(e.target.value)}
                        placeholder="Escribe un comentario..."
                        className="mr-2"
                      />
                      <Button onClick={() => handleComment(ayuda.id)}>Comentar</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="ghost" className="text-blue-600" onClick={() => handleShare(ayuda.id)}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}