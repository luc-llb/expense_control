import { useEffect, useState } from "react";
import { Transaction } from "../../models/Transaction";
import Popup from "../popup/PopUp";
import { Person } from "../../models/Person";
import Button from "../button/Button";

/**Transaction with the name of the person*/
interface TransactionNamed extends Transaction {
    personName: string;
}   

/**
 * Transactions table -- contains the fields Name, Amount, Type and a button that opens 
 * a pop-up to show the description.
 * @param {Transaction[]} transactions - the list of transactions to be displayed
 * @returns {JSX.Element} Div with a table containing the transactions
 */
export default function TableTransactions({transactions}: {transactions: Transaction[]}) {
    
    // Função para abrir o popup com os detalhes da transação
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<TransactionNamed | null>(null);
    const openPopup = (transaction: TransactionNamed) => {
        setSelectedTransaction(transaction);
        setIsPopupOpen(true);
    };
    
    // Busca os nomes das pessoas para uma melhor apresentação na tabela
    const [transactionsWithNames, setTransactionsWithNames] = useState<TransactionNamed[] | null>([]);
    useEffect(() => {
        async function request(): Promise<void> {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/persons`);
            const data: Person[] = await response.json();
            const transactionsNamed = transactions.map((transaction) => {
                const person = data.find((person) => person.id === transaction.personId);
                return {
                    ...transaction,
                    personName: person ? person.name : "Pessoa não encontrada",
                };
            });
            setTransactionsWithNames(transactionsNamed);
        }
        request();
    }, [transactions]);

    return (
        <div>
            <table className="w-full h-max-[80vh]">
                <thead className="text-center text-black">
                    <tr className="border-y border-gray-500">
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Tipo</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="text-center text-black">
                    {transactionsWithNames!.map((transaction) => (
                        <tr key={transaction.id} className="border-y border-gray-500 h-10 overflow-auto">
                            <td className="w-40 max-w-70 whitespace-normal break-words">{transaction.personName}</td>
                            <td className="max-w-20 whitespace-normal break-words">R${transaction.value.toFixed(2)}</td>
                            <td>{transaction.type == 1 ? "Fatura" : "Receita"}</td>
                            <td className="space-x-2">
                                <Button 
                                    text="Detalhes"
                                    AddStyle="bg-blue-500 px-2 py-1" 
                                    onClick={
                                        () => {
                                            openPopup(transaction);
                                        }
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedTransaction && (
                <Popup
                    isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                    title="Detalhes da Transação"
                >
                    <p><strong>ID:</strong> {selectedTransaction.id}</p>
                    <p><strong>Descrição:</strong> {selectedTransaction.description}</p>
                    <p><strong>Valor:</strong> R$ {selectedTransaction.value.toFixed(2)}</p>
                    <p><strong>Tipo:</strong> {selectedTransaction.type == 1 ? "Lucro" : "Despesa"}</p>
                </Popup>
            )}
        </div>
    );   
}