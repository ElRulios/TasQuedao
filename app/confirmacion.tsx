
interface ConfirmacionProps {
    onClose: () => void;
    showResult: () => void;
}
export default function Confirmacion ({onClose, showResult}: ConfirmacionProps){

    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <p className="text-gray-800 mb-4">Estas seguro de haber puesto los valores correctos?</p>
            <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Regresar
            </button>
            <button
                onClick={showResult}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Ver Resultado
            </button>
            </div>
        </div>
    )
}