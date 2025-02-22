
interface CardProps {
    children?: React.ReactNode;
    className?: string;
    title?: string;
}

/**
 * Card component
 * @param {CardProps} props - The props of the component (className, title, children)
 * @returns {JSX.Element} - The JSX element
 */
export default function Card(props: CardProps) {
    return (
        <div className={"px-8 py-1 text-center text-gray-200 rounded-lg shadow-md grid grid-line-3 " + props.className}>
            <div className="text-xl font-bold">
                {props.title}
            </div>
            <div className="text-2xl font-bold">
                {props.children}
            </div>
        </div>
    );
}