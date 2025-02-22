/**Button properties*/
interface ButtonProps{
    onClick: () => void;
    AddStyle?: string;
    text?: string
    children?: React.ReactNode;
}

/**
 * Buttom component.
 * @param {string} text - The text of the buttom.
 * @param {function} onClick - The function to call when the buttom is clicked.
 * @param {string} style - Additional style for the button.
 * @returns {JSX.Element} The buttom component.
 */
export default function Button(props: ButtonProps) {
    return (
        <button 
            className={props.AddStyle + " bg-blue-500 hover:bg-blue-700 text-white rounded-lg shadow-md cursor-pointer"}
            onClick={props.onClick}
        >
                {props.text}
                {props.children}
        </button>
    );
}
