"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import logo from "../public/logo.png";
import Seccion from "./calcularSeccion";
import Semestral from "./semestral";
import ResultadoFinal from "./resultadoFinal";

export default function Home() {
  const [porcentajeObtenidoSecciones, setPorcentajeObtenidoSecciones] = useState<number>(0);
  const [porcentajeSeccion, setPorcentajeSeccion] = useState<number>(0);
  const [todosPorcentajeObtenidoSeccion, setTodosPorcentajeObtenidoSeccion] = useState<number[]>([])
  const [porcentajeSemestral, setPorcentajeSemestral] = useState<number>(0);
  const [notaNecesario, setNotaNecesario] = useState<number | null>(null);
  const [calculateControl, setCalculateControl] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);

  useEffect(() => {
      const porcentajeNecesario = 71 - porcentajeObtenidoSecciones
      const result = ((porcentajeNecesario/ porcentajeSemestral) * 100);
      setNotaNecesario(result);
      console.log('resultado final ' + result)
      console.log('porcentajes Obtenidos' + todosPorcentajeObtenidoSeccion)
  }, [todosPorcentajeObtenidoSeccion, porcentajeObtenidoSecciones, porcentajeSemestral, porcentajeSeccion]);

  const handlePorcentajeSeccion = useCallback((amount: number) => {
    setPorcentajeSeccion((prevValue) => prevValue + amount);
  }, []);

  const handlePorcentajeObtenido = useCallback((amount: number) => {
    setPorcentajeObtenidoSecciones((prevValue) => prevValue + amount);
    setTodosPorcentajeObtenidoSeccion((prevPorcentajeDSecciones) => {
      const updated = [...prevPorcentajeDSecciones];
      updated[updated.length] = amount; // Update the specific index
      return updated;
    });
  }, []);

  const handleResult = () => {
    if(porcentajeSeccion + porcentajeSemestral === 100){
      setCalculateControl(!calculateControl);
      setShowResult(!showResult)
    } else {
      alert("Hubo un problema con los porcentajes. Verifique que los porcentajes")
    }
  }

  if (showResult && notaNecesario != 0 && notaNecesario != 284) {
    return (
      <ResultadoFinal 
      notaNecesario={notaNecesario || 0} 
      todosPorcentajeObtenidoSeccion={todosPorcentajeObtenidoSeccion}
    />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
        <div className='flex justify-center my-5'>
          <div className="size-full sm:md:size-3/5">
            <Image src={logo} alt="logo"/>
          </div>
        </div>

        <div>
          <p className="font-semibold text-gray-600">Nota Principal 1</p>
          <Seccion setPorcentajeObtenidoSecciones={handlePorcentajeObtenido} setPorcentajeSecciones={handlePorcentajeSeccion} calculateControl={calculateControl}/>
        </div>

        <div>
          <p className="font-semibold text-gray-600">Nota Principal 2</p>
          <Seccion setPorcentajeObtenidoSecciones={handlePorcentajeObtenido} setPorcentajeSecciones={handlePorcentajeSeccion} calculateControl={calculateControl}/>
        </div>

        <div>
          <p className="font-semibold text-gray-600">Notas Secundarias</p>
          <Seccion setPorcentajeObtenidoSecciones={handlePorcentajeObtenido} setPorcentajeSecciones={handlePorcentajeSeccion} calculateControl={calculateControl}/>
        </div>

        <div>
          <p className="font-semibold text-gray-600">Porcentaje del Semestral</p>
          <Semestral setPorcentajeSemestral={setPorcentajeSemestral} />
        </div>

        <button
          onClick={handleResult}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Obtener Resultado
        </button>
      </div>
    </div>
  );
}