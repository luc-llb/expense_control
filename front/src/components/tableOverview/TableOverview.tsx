import { Consultation } from "../../models/Consultation";

/**
 * Table to show the overview of the transactions for each person.
 * @param {Consultation[]} consults - The list of consultations.
 * @returns {JSX.Element} The table overview.
 */
export default function TableOverview({consults}: {consults: Consultation[]}) {
    return (
        <table className="w-full">
            <thead className="text-center text-black">
                <tr className="border-y border-gray-500 h-10">
                    <th>Nome</th>
                    <th>Receita</th>
                    <th>Fatura</th>
                    <th>Saldo</th>
                </tr>
            </thead>
            <tbody className="text-center text-black">
                {consults!.map((consult) => (
                    <tr key={consult.personName} className="border-y border-gray-500 h-10 overflow-auto">
                        <td className="w-40 max-w-70 whitespace-normal break-words">{consult.personName}</td>
                        <td className="max-w-20 whitespace-normal break-words">R${consult.incomes.toFixed(2)}</td>
                        <td className="max-w-20 whitespace-normal break-words">R${consult.invoices.toFixed(2)}</td>
                        <td className="max-w-20 whitespace-normal break-words">R${consult.total.toFixed(2)}</td>
                    </tr>
                ))}
                {/* <tr key={0} className="h-10 overflow-auto font-bold text-gray-900">
                        <td className="w-40 max-w-70 whitespace-normal break-words">Total</td>
                        <td className="max-w-20 whitespace-normal break-words">
                            R${consults?.reduce((acc, consult) => acc + consult.incomes, 0).toFixed(2)}
                        </td>
                        <td className="max-w-20 whitespace-normal break-words">
                            R${consults?.reduce((acc, consult) => acc + consult.invoices, 0).toFixed(2)}
                        </td>
                        <td className="max-w-20 whitespace-normal break-words">
                            R${consults?.reduce((acc, consult) => acc + consult.total, 0).toFixed(2)}
                        </td>
                </tr> */}
            </tbody>
        </table>
    );
}
