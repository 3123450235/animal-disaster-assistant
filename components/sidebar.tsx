import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, LifeBuoy, AlertTriangle, Image, User, MessageSquare, Gamepad, Clock } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="w-64 bg-lightBlue-300 bg-opacity-50 backdrop-blur-lg h-full p-4 border-r border-lightBlue-400">
      <nav className="space-y-2">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start text-blue-800 hover:bg-lightBlue-400">
            <Home className="mr-2 h-4 w-4" />
            Inicio
          </Button>
        </Link>
        <Link href="/ayudar">
          <Button variant="ghost" className="w-full justify-start text-blue-800 hover:bg-lightBlue-400">
            <LifeBuoy className="mr-2 h-4 w-4" />
            Ayudar
          </Button>
        </Link>
        <Link href="/reportar">
          <Button variant="ghost" className="w-full justify-start text-blue-800 hover:bg-lightBlue-400">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Reportar
          </Button>
        </Link>
        <Link href="/galeria">
          <Button variant="ghost" className="w-full justify-start text-blue-800 hover:bg-lightBlue-400">
            <Image className="mr-2 h-4 w-4" />
            Galería de Recuerdos
          </Button>
        </Link>
        <Link href="/minijuegos">
          <Button variant="ghost" className="w-full justify-start text-blue-800 hover:bg-lightBlue-400">
            <Gamepad className="mr-2 h-4 w-4" />
            Minijuegos
          </Button>
        </Link>
        <Link href="/chat">
          <Button variant="ghost" className="w-full justify-start text-blue-800 hover:bg-lightBlue-400">
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat
          </Button>
        </Link>
        <Link href="/ayudas-recientes">
          <Button variant="ghost" className="w-full justify-start text-blue-800 hover:bg-lightBlue-400">
            <Clock className="mr-2 h-4 w-4" />
            Ayudas Recientes
          </Button>
        </Link>
        <Link href="/perfil">
          <Button variant="ghost" className="w-full justify-start text-blue-800 hover:bg-lightBlue-400">
            <User className="mr-2 h-4 w-4" />
            Perfil
          </Button>
        </Link>
      </nav>
    </div>
  )
}