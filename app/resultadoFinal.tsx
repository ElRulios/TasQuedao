import Image from "next/image";
import emoticonAprobado from "../public/emoticonAprobado.png";
import emoticonQuedao from "../public/emoticonQuedao.png";
import emoticonComplicado from "../public/emoticonComplicado.png";

interface SemestrapProps {
  notaNecesario: number;
  todosPorcentajeObtenidoSeccion: number[];
}

export default function ResultadoFinal({ notaNecesario, todosPorcentajeObtenidoSeccion }: SemestrapProps) {
  const Emoji = () => {
    if (-100 <= notaNecesario && notaNecesario <= 70) {
      return <Image src={emoticonAprobado} alt="Aprobado" />;
    } else if (71 <= notaNecesario && notaNecesario <= 100) {
      return <Image src={emoticonComplicado} alt="Complicado" />;
    } else if (notaNecesario > 100) {
      return <Image src={emoticonQuedao} alt="Quedao" />;
    }
    return null;
  };

  const listarPorcentajeSecciones = () => {
    return todosPorcentajeObtenidoSeccion.map((porcentaje, index) => (
      <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg shadow-sm mb-2">
        <span className="font-medium text-gray-700">Nota {index + 1}</span>
        <span className="font-semibold text-blue-600">{porcentaje}%</span>
      </li>
    ));
  };

  return (
    <div className="flex flex-col items-center space-y-6 mt-5">
      {/* Section: Result Details */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Detalle de Notas</h2>
        <ul className="space-y-2">{listarPorcentajeSecciones()}</ul>
      </div>

      {/* Section: Final Result */}
      <div className="w-full max-w-md bg-blue-50 rounded-lg shadow-lg p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Necesitas obtener <span className="text-blue-600">{notaNecesario.toFixed(2)}</span> en el semestral para
          pasar la materia con C
        </h1>
        {Emoji()}
      </div>
    </div>
  );
}
