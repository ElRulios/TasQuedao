"use client";
import { useState, useEffect } from "react";

interface NnotasProps {
  index: number;
  setNota: (notas: number) => void;
  setNotaPorcentaje: (notaPorcentaje: number) => void;
}

export default function Nnotas({
  index,
  setNota,
  setNotaPorcentaje,
}: NnotasProps) {
  const [nota, setLocalNota] = useState(0);
  const [notaPorcentaje, setLocalNotaPorcentaje] = useState(0);

  useEffect(() => {
    setNota(nota);
  }, [nota, setNota]);

  useEffect(() => {
    setNotaPorcentaje(notaPorcentaje);
  }, [notaPorcentaje, setNotaPorcentaje]);

  return (
    <div className="flex gap-4 items-center">
      <input
        id={`nota-${index}`}
        type="number"
        min={0}
        max={100}
        className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        placeholder="Nota (0-100)"
        onChange={(e) => setLocalNota(Number(e.target.value))}
      />

      <input
        id={`porcentaje-${index}`}
        type="number"
        min={1}
        max={100}
        className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        placeholder="Porcentaje"
        onChange={(e) => setLocalNotaPorcentaje(Number(e.target.value))}
      />
    </div>
  );
}
