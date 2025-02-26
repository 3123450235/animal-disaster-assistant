"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportMap } from "@/components/report-map"
import { toast } from "@/components/ui/use-toast"

export default function ReportarPage() {
  const [descripcion, setDescripcion] = useState("")
  const [ubicacion, setUbicacion] = useState("")
  const [imagen, setImagen] = useState<File | null>(null)
  const [tipoReporte, setTipoReporte] = useState("normal")
  const [mostrarMapa, setMostrarMapa] = useState(false)
  const imagenRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Aquí iría la lógica para enviar el reporte
    console.log("Reporte enviado", { descripcion, ubicacion, imagen, tipoReporte })

    // Simular una llamada a API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Reporte enviado",
      description: "Tu reporte ha sido enviado con éxito.",
    })

    setIsSubmitting(false)
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Reportar</h1>
      <Tabs defaultValue="nuevo-reporte" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="nuevo-reporte">Nuevo Reporte</TabsTrigger>
          <TabsTrigger value="ver-reportes" onClick={() => setMostrarMapa(true)}>
            Ver Reportes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="nuevo-reporte">
          <Card className="w-full max-w-2xl mx-auto bg-lightBlue-100 bg-opacity-70 backdrop-blur-lg border-lightBlue-300">
            <CardHeader>
              <CardTitle className="text-blue-800">Crear Nuevo Reporte</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea
                  placeholder="Describe lo que estás reportando"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="bg-white bg-opacity-50 border-lightBlue-300 text-blue-800 placeholder-blue-400"
                />
                <Input
                  placeholder="Ubicación exacta"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  className="bg-white bg-opacity-50 border-lightBlue-300 text-blue-800 placeholder-blue-400"
                />
                <Input
                  type="file"
                  onChange={(e) => setImagen(e.target.files?.[0] || null)}
                  accept="image/*"
                  className="bg-white bg-opacity-50 border-lightBlue-300 text-blue-800"
                  ref={imagenRef}
                />
                <RadioGroup defaultValue="normal" onValueChange={setTipoReporte}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="normal" />
                    <Label htmlFor="normal">Reporte Normal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="emergencia" id="emergencia" />
                    <Label htmlFor="emergencia">Reporte de Emergencia</Label>
                  </div>
                </RadioGroup>
                <Button
                  type="submit"
                  className="w-full bg-lightBlue-500 hover:bg-lightBlue-600 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Reporte"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ver-reportes">
          <Card className="w-full bg-lightBlue-100 bg-opacity-70 backdrop-blur-lg border-lightBlue-300">
            <CardHeader>
              <CardTitle className="text-blue-800">Mapa de Reportes en Tiempo Real</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex justify-between items-center">
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-blue-800">Reporte Normal</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-blue-800">Emergencia</span>
                  </div>
                </div>
                <div className="text-blue-800">Actualizando en tiempo real...</div>
              </div>
              <ReportMap />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}