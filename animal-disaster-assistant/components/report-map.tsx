"use client"

import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

type ReportType = "normal" | "emergencia"

interface Report {
  id: number
  lat: number
  lng: number
  tipo: ReportType
  descripcion: string
}

const blueIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export function ReportMap() {
  const [reportes, setReportes] = useState<Report[]>([])

  useEffect(() => {
    // En una aplicación real, aquí se cargarían los reportes desde una API
    const reportesGuardados = localStorage.getItem("reportes")
    if (reportesGuardados) {
      setReportes(JSON.parse(reportesGuardados))
    }
  }, [])

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden border border-lightBlue-300">
      <MapContainer center={[40.7128, -74.006]} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {reportes.map((reporte) => (
          <Marker
            key={reporte.id}
            position={[reporte.lat, reporte.lng]}
            icon={reporte.tipo === "normal" ? blueIcon : redIcon}
          >
            <Popup>
              <div className="text-blue-800">
                <p className="font-bold">{reporte.tipo === "normal" ? "Reporte Normal" : "Emergencia"}</p>
                <p>{reporte.descripcion}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}