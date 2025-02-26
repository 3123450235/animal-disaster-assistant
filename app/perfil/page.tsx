"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Github, Twitter } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

export default function PerfilPage() {
  const [nombre, setNombre] = useState("")
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null)
  const [bio, setBio] = useState("")
  const [intereses, setIntereses] = useState("")
  const [tipoUsuario, setTipoUsuario] = useState("voluntario")
  const [estaRegistrado, setEstaRegistrado] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const perfilGuardado = localStorage.getItem("perfil")
    if (perfilGuardado) {
      const perfil = JSON.parse(perfilGuardado)
      setNombre(perfil.nombre)
      setBio(perfil.bio)
      setIntereses(perfil.intereses)
      setTipoUsuario(perfil.tipoUsuario)
      setFotoPerfil(perfil.fotoPerfil)
      setEstaRegistrado(true)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const perfil = { nombre, bio, intereses, tipoUsuario, fotoPerfil }
    localStorage.setItem("perfil", JSON.stringify(perfil))
    setEstaRegistrado(true)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFotoPerfil(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleExternalLogin = (platform: string) => {
    // Aquí iría la lógica para iniciar sesión con la plataforma externa
    console.log(`Iniciando sesión con ${platform}`)
    // Simulamos un inicio de sesión exitoso
    setEstaRegistrado(true)
    // Guardamos información básica del usuario
    const perfilSimulado = {
      nombre: `Usuario de ${platform}`,
      bio: "",
      intereses: "",
      tipoUsuario: "voluntario",
      fotoPerfil: null,
    }
    localStorage.setItem("perfil", JSON.stringify(perfilSimulado))
    setNombre(perfilSimulado.nombre)
    setBio(perfilSimulado.bio)
    setIntereses(perfilSimulado.intereses)
    setTipoUsuario(perfilSimulado.tipoUsuario)
    setFotoPerfil(perfilSimulado.fotoPerfil)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para registrar al usuario
    console.log("Registrando usuario", { nombre, email, password })

    // Simular una llamada a API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Registro exitoso",
      description: "Tu cuenta ha sido creada. Por favor, inicia sesión.",
    })

    setEstaRegistrado(true)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para iniciar sesión
    console.log("Iniciando sesión", { email, password })

    // Simular una llamada a API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Inicio de sesión exitoso",
      description: "Has iniciado sesión correctamente.",
    })

    setEstaRegistrado(true)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Perfil</CardTitle>
      </CardHeader>
      <CardContent>
        {!estaRegistrado ? (
          <div className="space-y-4">
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                <TabsTrigger value="register">Registrarse</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button type="submit" className="w-full">
                    Iniciar Sesión
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <Input
                    placeholder="Nombre de usuario"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button type="submit" className="w-full">
                    Registrarse
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            <div className="text-center">
              <p>O inicia sesión con:</p>
              <div className="flex justify-center space-x-4 mt-2">
                <Button onClick={() => handleExternalLogin("Google")} className="bg-red-500 hover:bg-red-600">
                  <Mail className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button onClick={() => handleExternalLogin("GitHub")} className="bg-gray-800 hover:bg-gray-900">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
                <Button onClick={() => handleExternalLogin("Twitter")} className="bg-blue-400 hover:bg-blue-500">
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={fotoPerfil || "/placeholder.svg"} alt="Foto de perfil" />
                <AvatarFallback>FP</AvatarFallback>
              </Avatar>
            </div>
            <Input type="file" onChange={handleImageUpload} accept="image/*" />
            <Input placeholder="Nombre de usuario" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <Textarea placeholder="Biografía" value={bio} onChange={(e) => setBio(e.target.value)} />
            <Textarea
              placeholder="Intereses (separados por comas)"
              value={intereses}
              onChange={(e) => setIntereses(e.target.value)}
            />
            <Select value={tipoUsuario} onValueChange={setTipoUsuario}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de usuario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="voluntario">Voluntario</SelectItem>
                <SelectItem value="organizacion">Organización</SelectItem>
                <SelectItem value="profesional">Profesional</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
              Actualizar Perfil
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}