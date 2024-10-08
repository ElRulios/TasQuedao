import { useActionState, useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface NnotasProps {
    valor: number;
    porcentaje: number | null;
    setlaNota: (lanota: number) => void;
    setelPorcentaje: (resultadoPorcentaje: number) => void;
}

function Nnotas({valor, porcentaje, setlaNota, setelPorcentaje}: NnotasProps){
    let notas = []
    const [nota, setNota] = useState(Array(valor).fill(""));
    const [notaPorcentaje, setNotaPorcentaje] = useState(Array(valor).fill(""));
    let resultado:  number[] = []
    let resultadoRedonda: number[] = []
    let resultadoPorcentaje = 0
    const [mensaje, setMensaje] = useState(false)
    let lanota = 0;
    let lanotaRedonda = 0
    const [showNotas, setShowNotas] = useState(true)
    const [showBresultado, setShowBresultados] = useState(false)

    const handleNotaChange = (index: number, newValue: number) => {
        const newNotas = [...nota];
        newNotas[index] = newValue;
        setNota(newNotas);
    };
    
    const handleNotaPorcentajeChange = (index: number, newValue: number) => {
        const newNotaPorcentajes = [...notaPorcentaje];
        newNotaPorcentajes[index] = newValue;
        setNotaPorcentaje(newNotaPorcentajes);
    };

    const calcularResultados = () => {
    
        if (resultadoPorcentaje === porcentaje) {
            setShowNotas(!showNotas)
            setShowBresultados(!showBresultado)
            setMensaje(true);
            setlaNota(lanota);
            setelPorcentaje(resultadoPorcentaje);
            console.log(lanota)
        } else {
          setMensaje(false);
          alert("Verifique que coincidan los porcentajes");
        }
    };

    for (let i = 0; i < valor; i++){
        notas.push(
        <li key = {i}>
            <input className="border-2 p-2 size-1/2 mr-4 rounded-full mb-2" 
            type="text" 
            min={1} 
            max={100} 
            value={nota[i] ?? ''} 
            onChange={(e) => (handleNotaChange(i, Number(e.target.value)), setShowBresultados(true))}>
            </input>
            <input 
                className="border-2 p-2 size-1/3 rounded-full mb-2" 
                type="number" 
                min={1} max={100} 
                value={notaPorcentaje[i] ?? ''} 
                onChange={(e) => (handleNotaPorcentajeChange(i, Number(e.target.value)), setShowBresultados(true))}>
            </input>
        </li>)

        resultado[i] = (nota[i] / 100) * notaPorcentaje[i];
        resultadoPorcentaje += notaPorcentaje[i];
        lanota += resultado[i]
        lanotaRedonda = Number(lanota.toFixed(0));
        resultadoRedonda = resultado.map(resultadow => Number(resultadow.toFixed(0)));
    }

    return (
        <div>
            {showNotas && (<div>
                <ul>{notas}</ul>
            </div>)}
            {showBresultado && (<div className="flex justify-center mt-5">
                    <button className="border-2 px-6 py-2 rounded-full hover:bg-black hover:text-white transition duration-300" onClick={calcularResultados}>Obtener porcentaje</button>
                </div>)}
            {mensaje && 
                (<div>
                    <div>{resultadoRedonda.map((resultado, index) => (
                        <p key={index}>{resultado}</p>
                    ))}</div>
                    <p className="mt-4">Porcentaje obtenido (%)</p>
                    <p>{lanotaRedonda}</p>
                </div>)
            }

        </div>
    )
}


export default function BloqueNota({setlaNota, setelPorcentaje}: NnotasProps){
    const valores = [1, 2, 3, 4, 5];
    let [show, setShow] = useState(false);
    let [numeroNotas, setNumeroNotas] = useState(0);
    const [porcentaje, setPorcentaje] = useState<number | null>(null);
    const [showValores, setShowValores] = useState(false)
    const [showPorcentaje, setShowporcentaje] = useState(true)
    const [showPorcentaje2, setNotaPorcentaje2] = useState(false)
    const [showCantidad, setShowCantidad] = useState(false)

    const processPorcen = () => {
        if (porcentaje === null || porcentaje === 0 || porcentaje > 100 || porcentaje < 0){
            alert("Verifique el numero del porcentaje")
        }
        else {
            setShowporcentaje(!showPorcentaje)
            setNotaPorcentaje2(!showPorcentaje2)
            setShowValores(!showValores)
            setShowCantidad(!showCantidad)
        }
    }

    return (
        <div>
            <div className="p-5">
                <p>Porcentaje (%)</p>
                {showPorcentaje && (<div className="flex flex-col">
                    <input className="border-2 w-3/4 p-2 rounded-full mb-2" type="number" min={1} max={100} value={porcentaje !== null ? porcentaje : ""} onChange={(e)=> setPorcentaje(Number(e.target.value))}></input>
                    <div className="size-1/4">
                    <button className="border-2 px-4 py-2 rounded-full hover:bg-black hover:text-white transition duration-300 " onClick={processPorcen}>Confirmar</button>
                    </div>
                </div>)}
                {showPorcentaje2 && (<p>{porcentaje}</p>)}
                {showCantidad && (<div className="flex mt-4 mb-2">
                        <p>Resultados de evaluaciones</p>
                        <p className="ml-10">%</p>
                    </div>)}
                {showValores && (<div>
                    <div className="flex items-center cursor-pointer">
                        <p>Cantidad</p>
                        <ArrowDropDownIcon onClick={() => {setShow(!show)}}/>
                    </div>
                    {show && (<div className="flex justify-end size-1/3 sm:md:size-1/4 pr-3">
                        <ul className="bg-white border border-gray-300 rounded-md shadow-lg p-3">
                                {valores.map((valor) => (
                                    <li key={valor} onClick={() => (setNumeroNotas(valor), setShowValores(!showValores))}>
                                        {valor}
                                    </li>
                                ))
                                }
                            </ul>
                            </div>)
                    } 
                </div>)}
                <Nnotas valor = {numeroNotas} porcentaje={porcentaje} setlaNota={setlaNota} setelPorcentaje={setelPorcentaje}/>
            </div>
        </div>
    )
}
