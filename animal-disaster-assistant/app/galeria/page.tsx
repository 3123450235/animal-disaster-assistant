"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Recuerdo {
  id: number
  titulo: string
  descripcion: string
  imagen: string
  fecha: string
}

export default function GaleriaPage() {
  const [recuerdos, setRecuerdos] = useState<Recuerdo[]>([])

  useEffect(() => {
    const recuerdosGuardados = localStorage.getItem("recuerdos")
    if (recuerdosGuardados) {
      setRecuerdos(JSON.parse(recuerdosGuardados))
    }
  }, [])

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Galería de Recuerdos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recuerdos.map((recuerdo) => (
          <Dialog key={recuerdo.id}>
            <DialogTrigger asChild>
              <Card className="bg-lightBlue-100 bg-opacity-70 backdrop-blur-lg border-lightBlue-300 cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-blue-800">{recuerdo.titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={recuerdo.imagen || "/placeholder.svg"}
                    alt={recuerdo.titulo}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <p className="text-blue-700 truncate">{recuerdo.descripcion}</p>
                  <p className="text-sm text-blue-600 mt-2">{recuerdo.fecha}</p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{recuerdo.titulo}</DialogTitle>
              </DialogHeader>
              <img
                src={recuerdo.imagen || "/placeholder.svg"}
                alt={recuerdo.titulo}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-blue-700">{recuerdo.descripcion}</p>
              <p className="text-sm text-blue-600 mt-2">{recuerdo.fecha}</p>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}