'use client'
import { useState, useEffect } from "react"

interface SemestralProps{
    setPorcentajeSemestral: (porcentajeSemestral: number) => void
}


export default function Semestral ({setPorcentajeSemestral}: SemestralProps){
    const [semestral, setSemestral] = useState<number>(0)

    useEffect(() => {
        if (semestral !== null) {
            setPorcentajeSemestral(semestral);
          }
    }, [semestral, setPorcentajeSemestral]);

    return(
        <div className="border p-4 rounded-lg shadow-md bg-gray-50">
            <input
                type="number"
                min={1}
                max={100}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter grade (0-100)"
                value={semestral}
                onChange={(e) => {setSemestral(Number(e.target.value))}}
            />
        </div>
    )
}