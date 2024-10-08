'use client'
import Image from "next/image";
import emoticonAprobado from "../public/emoticonAprobado.png";
import emoticonQuedao from "../public/emoticonQuedao.png";
import emoticonComplicado from "../public/emoticonComplicado.png";
import { use, useState } from "react";

interface SemestrapProps{
    notaSemestral: number;
}

function Emoji({notaSemestral}: SemestrapProps){

  if(-100 <= notaSemestral && notaSemestral <= 70){
    return <Image src={emoticonAprobado} alt="emoticonAprobado"/>
  } if (71 <= notaSemestral && notaSemestral <= 100){
    return <Image src={emoticonComplicado} alt="emoticonComplicado"/>
  } else if (notaSemestral > 100){
    return <Image src={emoticonQuedao} alt="emoticonQuedao"/>
  }
}

export default function NotaNecesaria({notaSemestral}: SemestrapProps){
  const semestralRedonda = Number(notaSemestral.toFixed(0))
  
  return(
    <div className='flex justify-center my-5'>
      <div className="sm:md:size-1/2 rounded-3xl shadow-2xl border-1 p-5">
        <h1 className="font-bold text-2xl">Necesitas obtener {semestralRedonda} en el semestral para pasar la materia con C</h1>
        <Emoji notaSemestral={notaSemestral}/>
      </div>
    </div>
  )
}