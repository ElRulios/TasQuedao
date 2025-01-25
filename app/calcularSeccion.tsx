"use client";
import { useState, useEffect } from "react";
import Nnotas from "./nnotas";
import { FaPlus } from "react-icons/fa";

interface SeccionProps {
  setPorcentajeObtenidoSecciones: (porcentaje: number) => void;
  setPorcentajeSecciones: (porcentaje: number) => void;
  calculateControl: boolean;
}

export default function Seccion({ setPorcentajeObtenidoSecciones, setPorcentajeSecciones, calculateControl}: SeccionProps) {
  const [evaluacion, setEvaluacion] = useState<JSX.Element[1]>([]);
  const [notas, setNotas] = useState<number[]>([]);
  const [notaPorcentajes, setNotaPorcentajes] = useState<number[]>([]);
  const [porcentajeSeccion, setPorcentajeSeccion] = useState<number>(0);

  useEffect(() => {
    const initialvalue = 0
    const sumaPorcentaje = notaPorcentajes.reduce(
      (accumulator, currentValue) => accumulator + currentValue, initialvalue)
    if (sumaPorcentaje === porcentajeSeccion){
      setPorcentajeSecciones(porcentajeSeccion);
    }
  }, [porcentajeSeccion, setPorcentajeSecciones, notaPorcentajes]);


  useEffect(() => {
    if(calculateControl){
    const sumaNotas = notas.reduce((acc, val, i) => {
      return acc + (val / 100) * notaPorcentajes[i];
    }, 0);
    setPorcentajeObtenidoSecciones(sumaNotas);
    console.log('porcentaje de esta seccion' + sumaNotas)
  }}, [notas, notaPorcentajes, calculateControl, setPorcentajeObtenidoSecciones]);

  const addNnotas = () => {
    const index = evaluacion.length;

    setEvaluacion((prev) => [
      ...prev,
      <Nnotas
        key={index}
        index={index}
        setNota={(nota) =>
          setNotas((prevNotas) => {
            const updated = [...prevNotas];
            updated[index] = nota;
            return updated;
          })
        }
        setNotaPorcentaje={(notaPorcentaje) =>
          setNotaPorcentajes((prevPorcentajes) => {
            const updated = [...prevPorcentajes];
            updated[index] = notaPorcentaje;
            return updated;
          })
        }
      />,
    ]);
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-gray-50">
      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">
          Porcentaje
        </label>
        <input
          type="number"
          min={1}
          max={100}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Porcentaje (1-100)"
          onChange={(e) => setPorcentajeSeccion(Number(e.target.value))}
        />
      </div>

      <div className="space-y-4">{evaluacion}</div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={addNnotas}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          <FaPlus />
          Añadir Nota
        </button>
        
      </div>
    </div>
  );
}
