/**
 * Title component for the first level of the title hierarchy.
 * @param {string} text - The text of the title.
 * @returns JSX.Element
 */
export default function Title1({ text }: { text: string }) {
    return (
        <h1 className="text-4xl font-bold mt-10">{text}</h1>
    );
}