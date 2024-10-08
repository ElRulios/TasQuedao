'use client'
import { use, useState } from "react";
import BloqueNota from "./bloqueNota";
import NotaNecesaria from "./semestral";
import logo from "../public/logo.png";
import Image from "next/image";

export default function Main (){
  const [lanota, setLanota] = useState<number>(0)
  const [elporcentaje, setElporcentaje] = useState<number>(0)
  const [porcentajeSemestral, setPorcentajeSemestral] = useState<number | null>(null)
  const [showSemestral, setShowsemestral] = useState(false)
  const [semestral, setSemestral] = useState(0)
  const [inputSemestral, setInputSemestral] = useState(true)
  const [inputSemestral1, setInputSemestral1] = useState(false)

  const handleAccumulation = (amount: number) => {
    setLanota(prevValue => prevValue + amount);
  };

  const handlePorcentaje = (amount: number) => {
    setElporcentaje(prevValue => prevValue + amount)
  }

  const resultado = () => {
    let porcentajeNecesario = 0

    if (porcentajeSemestral === null) {
      alert("Por favor, ingresa un porcentaje para el semestral.");
      return;
    }

    const nuevoPorcentaje = elporcentaje + porcentajeSemestral;
    
    if (nuevoPorcentaje == 100){
      porcentajeNecesario = 71 - lanota;
      setSemestral((porcentajeNecesario/porcentajeSemestral)*100);
      setShowsemestral(!showSemestral)
      setInputSemestral(!inputSemestral)
      setInputSemestral1(!inputSemestral1)
    } else {
      alert("Verifique que los porcentajes coincidan")
    }

    setElporcentaje(nuevoPorcentaje)

  }
  
  return(
    <div className="m-10"> 
      <div className='flex justify-center my-5'>
        <div className="size-full sm:md:size-3/5">
          <Image src={logo} alt="logo"/>
        </div>
      </div>
      <div>
        <div  className='flex justify-center my-5'>
          <div className="size-full sm:size-2/5 rounded-3xl shadow-2xl border-1 ">
            <h1 className="font-bold text-2xl p-5">Nota Principal 1</h1>
            <BloqueNota setlaNota={handleAccumulation} setelPorcentaje={handlePorcentaje} valor={0} porcentaje={0}/>
          </div>
        </div>
        <div className="flex justify-center my-5">
          <div className="size-full sm:size-2/5 rounded-3xl shadow-2xl border-1 ">
            <h1 className="font-bold text-2xl p-5">Nota Principal 2</h1>
            <BloqueNota setlaNota={handleAccumulation} setelPorcentaje={handlePorcentaje} valor={0} porcentaje={0}/>
          </div>
        </div>
        <div className="flex justify-center my-5">
          <div className="size-full sm:size-2/5 rounded-3xl shadow-2xl border-1 ">
            <h1 className="font-bold text-2xl p-5">Notas Secundarias</h1>
            <BloqueNota setlaNota={handleAccumulation} setelPorcentaje={handlePorcentaje} valor={0} porcentaje={0}/>
          </div>
        </div>
        <div className="flex justify-center my-5">
          <div className="size-full sm:size-2/5 rounded-3xl shadow-2xl border-1 p-5">
            <h1 className="font-bold text-2xl pb-5">Porcentaje del semestral (%)</h1>
            {inputSemestral && (
            <input className="border-2 p-2 size-1/2 mr-4 rounded-full mb-2" type="number" min={1} max={100} value={porcentajeSemestral !== null ? porcentajeSemestral : ""} onChange={(e)=> setPorcentajeSemestral(e.target.value ? Number(e.target.value) : null)}></input>)}
            {inputSemestral1 && (<div>
              <p>Porcentaje (%)</p>
              <p>{porcentajeSemestral}</p>
              </div>)}
          </div>        
        </div>
        {inputSemestral && (<div className="flex justify-center p-5">
          <button className="border-2 px-4 py-2 size-max sm:size-1/4 rounded-full hover:bg-black hover:text-white transition duration-300" onClick={resultado}> Obtener nota necesaria </button>
        </div>)}
        {showSemestral && (<div>
          <NotaNecesaria notaSemestral={semestral}/>
          </div>)}
      </div>
    </div>
  )
}
