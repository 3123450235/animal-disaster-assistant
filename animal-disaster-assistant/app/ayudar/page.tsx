"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

export default function AyudarPage() {
  const [animal, setAnimal] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [imagenAntes, setImagenAntes] = useState<File | null>(null)
  const [imagenDespues, setImagenDespues] = useState<File | null>(null)
  const [palabras, setPalabras] = useState("")
  const imagenAntesRef = useRef<HTMLInputElement>(null)
  const imagenDespuesRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Aquí iría la lógica para publicar la ayuda
    console.log("Ayuda publicada", { animal, descripcion, imagenAntes, imagenDespues, palabras })

    // Simular una llamada a API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Ayuda publicada",
      description: "Tu ayuda ha sido publicada con éxito.",
    })

    setIsSubmitting(false)
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Ayudar</h1>
      <Card className="w-full max-w-2xl mx-auto bg-lightBlue-100 bg-opacity-70 backdrop-blur-lg border-lightBlue-300">
        <CardHeader>
          <CardTitle className="text-blue-800">Registra tu ayuda</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="animal" className="block text-sm font-medium text-gray-700">
                Animal
              </label>
              <input
                type="text"
                id="animal"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={animal}
                onChange={(e) => setAnimal(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                id="descripcion"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="imagenAntes" className="block text-sm font-medium text-gray-700">
                Imagen Antes
              </label>
              <input
                type="file"
                id="imagenAntes"
                className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImagenAntes(e.target.files[0])
                  }
                }}
                ref={imagenAntesRef}
              />
            </div>
            <div>
              <label htmlFor="imagenDespues" className="block text-sm font-medium text-gray-700">
                Imagen Después
              </label>
              <input
                type="file"
                id="imagenDespues"
                className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImagenDespues(e.target.files[0])
                  }
                }}
                ref={imagenDespuesRef}
              />
            </div>
            <div>
              <label htmlFor="palabras" className="block text-sm font-medium text-gray-700">
                Palabras Clave (separadas por comas)
              </label>
              <input
                type="text"
                id="palabras"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={palabras}
                onChange={(e) => setPalabras(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isSubmitting}>
              {isSubmitting ? "Publicando..." : "Publicar Ayuda"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}