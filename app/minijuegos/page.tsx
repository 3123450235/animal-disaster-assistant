"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gamepad2 } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

const minijuegos = [
  { id: 1, titulo: "Rompecabezas de Animales", descripcion: "Arma rompecabezas de animales en peligro de extinción" },
  { id: 2, titulo: "Sudoku de Desastres", descripcion: "Resuelve sudokus con símbolos de desastres naturales" },
  {
    id: 3,
    titulo: "Quiz de Supervivencia",
    descripcion: "Pon a prueba tus conocimientos de supervivencia en desastres",
  },
]

export default function MinijuegosPage() {
  const [juegoActivo, setJuegoActivo] = useState<number | null>(null)

  const RompecabezasAnimales = () => {
    const [piezas, setPiezas] = useState<number[]>([])
    const [movimientos, setMovimientos] = useState(0)
    const [completado, setCompletado] = useState(false)

    useEffect(() => {
      const piezasIniciales = Array.from({ length: 9 }, (_, i) => i)
      setPiezas(piezasIniciales.sort(() => Math.random() - 0.5))
    }, [])

    const moverPieza = (index: number) => {
      const espacioVacioIndex = piezas.indexOf(8)
      if (
        (index === espacioVacioIndex - 1 && espacioVacioIndex % 3 !== 0) ||
        (index === espacioVacioIndex + 1 && espacioVacioIndex % 3 !== 2) ||
        index === espacioVacioIndex - 3 ||
        index === espacioVacioIndex + 3
      ) {
        const nuevasPiezas = [...piezas]
        ;[nuevasPiezas[index], nuevasPiezas[espacioVacioIndex]] = [nuevasPiezas[espacioVacioIndex], nuevasPiezas[index]]
        setPiezas(nuevasPiezas)
        setMovimientos(movimientos + 1)

        if (nuevasPiezas.every((pieza, i) => pieza === i)) {
          setCompletado(true)
        }
      }
    }

    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Rompecabezas de Animales</CardTitle>
        </CardHeader>
        <CardContent>
          {completado ? (
            <div>
              <p>¡Felicidades! Has completado el rompecabezas en {movimientos} movimientos.</p>
              <Button onClick={() => setJuegoActivo(null)} className="mt-4">
                Volver a la lista de juegos
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-1 mb-4">
                {piezas.map((pieza, index) => (
                  <Button
                    key={index}
                    onClick={() => moverPieza(index)}
                    className="h-20 w-20 text-2xl"
                    variant={pieza === 8 ? "outline" : "default"}
                  >
                    {pieza === 8 ? "" : pieza + 1}
                  </Button>
                ))}
              </div>
              <p>Movimientos: {movimientos}</p>
            </>
          )}
        </CardContent>
      </Card>
    )
  }

  const SudokuDesastres = () => {
    const [sudoku, setSudoku] = useState<(number | null)[][]>(
      Array(9)
        .fill(null)
        .map(() => Array(9).fill(null))
    )
    const [seleccionado, setSeleccionado] = useState<[number, number] | null>(null)
    const [completado, setCompletado] = useState(false)

    const simbolos = ["🌪️", "🌊", "🌋", "🔥", "🌡️", "❄️", "☢️", "☣️", "🌪️"]

    useEffect(() => {
      // Generar un sudoku válido (simplificado para este ejemplo)
      const nuevoSudoku = Array(9)
        .fill(null)
        .map(() => Array(9).fill(null))
      for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
          const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5)
          for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
              nuevoSudoku[i + x][j + y] = numeros[x * 3 + y]
            }
          }
        }
      }
      // Eliminar algunos números para crear el puzzle
      for (let i = 0; i < 40; i++) {
        const x = Math.floor(Math.random() * 9)
        const y = Math.floor(Math.random() * 9)
        nuevoSudoku[x][y] = null
      }
      setSudoku(nuevoSudoku)
    }, [])

    const seleccionarCelda = (fila: number, columna: number) => {
      setSeleccionado([fila, columna])
    }

    const ingresarNumero = (numero: number) => {
      if (seleccionado) {
        const [fila, columna] = seleccionado
        const nuevoSudoku = sudoku.map((filaActual, i) =>
          filaActual.map((valor, j) => (i === fila && j === columna ? numero : valor))
        )
        setSudoku(nuevoSudoku)

        // Verificar si el sudoku está completo
        if (nuevoSudoku.every((fila) => fila.every((valor) => valor !== null))) {
          setCompletado(true)
        }
      }
    }

    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Sudoku de Desastres</CardTitle>
        </CardHeader>
        <CardContent>
          {completado ? (
            <div>
              <p>¡Felicidades! Has completado el Sudoku de Desastres.</p>
              <Button onClick={() => setJuegoActivo(null)} className="mt-4">
                Volver a la lista de juegos
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-9 gap-1 mb-4">
                {sudoku.map((fila, i) =>
                  fila.map((valor, j) => (
                    <Button
                      key={`${i}-${j}`}
                      onClick={() => seleccionarCelda(i, j)}
                      className={`h-8 w-8 p-0 text-xs ${
                        seleccionado && seleccionado[0] === i && seleccionado[1] === j ? "ring-2 ring-blue-500" : ""
                      }`}
                      variant={valor === null ? "outline" : "default"}
                    >
                      {valor ? simbolos[valor - 1] : ""}
                    </Button>
                  ))
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((numero) => (
                  <Button key={numero} onClick={() => ingresarNumero(numero)} className="text-lg">
                    {simbolos[numero - 1]}
                  </Button>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    )
  }

  const QuizSupervivencia = () => {
    const [preguntaActual, setPreguntaActual] = useState(0)
    const [puntuacion, setPuntuacion] = useState(0)
    const [terminado, setTerminado] = useState(false)

    const preguntas = [
      {
        pregunta: "¿Cuál es la regla de tres para la supervivencia?",
        opciones: [
          "3 minutos sin aire, 3 horas sin refugio, 3 días sin agua, 3 semanas sin comida",
          "3 horas sin aire, 3 días sin refugio, 3 semanas sin agua, 3 meses sin comida",
          "3 segundos sin aire, 3 minutos sin refugio, 3 horas sin agua, 3 días sin comida",
          "3 días sin aire, 3 semanas sin refugio, 3 meses sin agua, 3 años sin comida",
        ],
        respuestaCorrecta: 0,
      },
      {
        pregunta: "En caso de terremoto, ¿qué debes hacer primero?",
        opciones: [
          "Correr hacia afuera del edificio",
          "Esconderte debajo de una mesa resistente",
          "Llamar a emergencias",
          "Abrir todas las puertas y ventanas",
        ],
        respuestaCorrecta: 1,
      },
      {
        pregunta: "¿Cuál es la mejor manera de purificar agua en una situación de emergencia?",
        opciones: [
          "Añadir sal",
          "Dejarla reposar por una hora",
          "Hervirla durante al menos un minuto",
          "Filtrarla a través de una camiseta",
        ],
        respuestaCorrecta: 2,
      },
      {
        pregunta: "En caso de inundación, ¿hacia dónde debes evacuar?",
        opciones: [
          "Hacia el sótano",
          "Hacia un terreno más bajo",
          "Hacia un terreno más alto",
          "Hacia el centro de la ciudad",
        ],
        respuestaCorrecta: 2,
      },
      {
        pregunta: "¿Qué debes incluir en un kit básico de emergencia?",
        opciones: [
          "Televisor portátil, juegos de mesa, snacks",
          "Agua, alimentos no perecederos, linterna, radio a pilas, botiquín de primeros auxilios",
          "Laptop, cargador solar, libros",
          "Ropa de gala, joyas, documentos importantes",
        ],
        respuestaCorrecta: 1,
      },
    ]

    const handleRespuesta = (indice: number) => {
      if (indice === preguntas[preguntaActual].respuestaCorrecta) {
        setPuntuacion(puntuacion + 1)
      }
      if (preguntaActual < preguntas.length - 1) {
        setPreguntaActual(preguntaActual + 1)
      } else {
        setTerminado(true)
      }
    }

    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Quiz de Supervivencia</CardTitle>
        </CardHeader>
        <CardContent>
          {terminado ? (
            <div>
              <p>
                Quiz terminado. Tu puntuación: {puntuacion} de {preguntas.length}
              </p>
              <Button onClick={() => setJuegoActivo(null)} className="mt-4">
                Volver a la lista de juegos
              </Button>
            </div>
          ) : (
            <>
              <Progress value={(preguntaActual / preguntas.length) * 100} className="mb-4" />
              <p className="mb-4">{preguntas[preguntaActual].pregunta}</p>
              <div className="space-y-2">
                {preguntas[preguntaActual].opciones.map((opcion, index) => (
                  <Button key={index} onClick={() => handleRespuesta(index)} className="w-full">
                    {opcion}
                  </Button>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Minijuegos Educativos</h1>
      {juegoActivo === null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {minijuegos.map((juego) => (
            <Card
              key={juego.id}
              className="h-full bg-lightBlue-100 bg-opacity-70 backdrop-blur-lg border-lightBlue-300 hover:bg-lightBlue-200 transition-colors cursor-pointer"
              onClick={() => setJuegoActivo(juego.id)}
            >
              <CardHeader>
                <CardTitle className="text-blue-800 flex items-center">
                  <Gamepad2 className="mr-2" />
                  {juego.titulo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700">{juego.descripcion}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {juegoActivo === 1 && <RompecabezasAnimales />}
          {juegoActivo === 2 && <SudokuDesastres />}
          {juegoActivo === 3 && <QuizSupervivencia />}
          <Button onClick={() => setJuegoActivo(null)} className="mt-4 mx-auto block">
            Volver a la lista de juegos
          </Button>
        </>
      )}
    </div>
  )
}