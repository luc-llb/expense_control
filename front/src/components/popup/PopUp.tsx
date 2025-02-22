import React from "react";

/**Defining component properties*/
interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  onAction?: () => void;
  textAction?: string;
}

/**
 * Popup base component. The body of the popup is passed as a child.
 * @param {boolean} isOpen - If the popup is open.
 * @param {function} onClose - The function to call when the popup is closed.
 * @param {string} title - The title of the popup.
 * @param {React.ReactNode} children - The content of the popup.
 * @returns {JSX.Element} The base popup component.
 */
export default function Popup(props: PopupProps) {
  if (!props.isOpen) return null; // Se não estiver aberto, não renderiza nada

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70"> {/* Fundo preto com 70% de opacidade*/}
      <div className={"bg-gray-300 p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-auto "+props.className}> {/* Cardo do pop-up */}
        <h2 className="text-lg font-bold mb-4 text-gray-600">{props.title}</h2>
        <div className="text-gray-700 whitespace-normal break-words">{props.children}</div>
        <div className="flex justify-end space-x-4">
          {/* Botões do pop-up */}
          <button 
            onClick={props.onClose}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
          >
            Fechar
          </button>
          {/* Botão que realiza alguma ação definida pelo usuário, sendo opcional */}
          {props.onAction && (
            <button 
            onClick={props.onAction}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer"
            >
              {props.textAction}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
