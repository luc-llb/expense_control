import { useEffect, useState } from "react";
import { Transaction } from "../../models/Transaction";
import Popup from "../popup/PopUp";
import Button from "../button/Button";
import { Person } from "../../models/Person";

/**
 * Component to add a new transaction to the database.
 * @param {function} update - Function to update the transaction list in your page.
 * @returns {JSX.Element} Returns a button that opens a pop-up with a form for entering a new transaction.
 */
export default function AddTransaction({update}: {update: () => void}) {
    // Função para abrir o popup com os detalhes da transação
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newTransaction, setNewTransaction] = useState<Transaction | null>(null);
    const [persons, setPersons] = useState<Person[]>([]);

    // Obtem a lista de pessoas atualizada
    useEffect(() => {
        const request = async () => {
            const response = await fetch("http://localhost:5042/api/persons");
            const data = await response.json();
            setPersons(data);
        }
        request();
    }, []);

    // Função para abrir o popup
    const openPopup = () => {
        setNewTransaction(new Transaction(0, "", 0, 1, 0));
        setIsPopupOpen(true);
    };

    // Função para salvar a transação no banco de dados
    const saveTransaction = () => {
        const request = async () => {
            const dtoTransaction = { // Objeto para enviar a transação para o backend, Transaction sem o ID
                description: newTransaction!.description,
                value: newTransaction!.value,
                type: newTransaction!.type,
                personId: newTransaction!.personId
            };
            const response = await fetch("http://localhost:5042/api/transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dtoTransaction)
            });
            const data = await response.json();
            console.log(data);
            if(data.status == 400) {
                alert("Não foi possivel adicionar a transação, por favor tente novamente");
            }else{
                update(); // Atualiza a lista de transações
                setIsPopupOpen(false); // Fecha o popup
            }
        }
        request();
    };

    // Função para corrigir e travar o seletor de tipo transação quando a pessoa possui menos de 18 anos
    const checkAge = ()=>{
        const currentPerson = persons.find(p => p.id === newTransaction!.personId);
        if (currentPerson?.age < 18) {
            if (newTransaction!.type !== 2) {
                setNewTransaction({ ...newTransaction!, type: 2 });
            }
            return true; // Desabilita o seletor
        }
        return false; // Mantém o seletor ativo
    }

    return (
        <div>
            <Button 
                text="Adicionar Transação"
                onClick={()=>openPopup()}
                AddStyle="px-4 py-2"
            />
            {/* Conteúdo do Pop-Up */}
            {newTransaction && (
                <Popup
                    isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                    title="Nova da Transação"
                    className="w-[70vh]"
                    onAction={saveTransaction}
                    textAction="Salvar"
                >
                    <p className="mb-4 space-x-4">
                        <strong>Descrição:</strong><br /> 
                        <input
                            placeholder="Descrição"
                            type="text"
                            value={newTransaction.description}
                            onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                            className="w-1/1 h-10 border-2 border-gray-500 rounded-lg p-2 text-black focus:border-blue-900 focus:outline-none" 
                        />
                    </p>
                    <div className="mb-4 space-x-4">

                    </div>
                    <p className="mb-4 space-x-4">
                        <strong>Valor:</strong><br />
                        <input
                            placeholder="0.00"
                            type="number" min="0"
                            value={newTransaction.value}
                            onChange={(e) => setNewTransaction({...newTransaction, value: parseFloat(e.target.value)})}
                            className="h-10 border-2 border-gray-500 rounded-lg p-2 text-black focus:border-blue-900 focus:outline-none" 
                        />
                        <strong>Tipo:</strong>
                        <select 
                            className="h-10 border-2 border-gray-500 rounded-lg p-2 text-black focus:border-blue-900 focus:outline-none"
                            value={newTransaction.type}
                            onChange={(e) => {setNewTransaction({...newTransaction, type: parseInt(e.target.value)})}}
                            disabled = {checkAge()}
                        >
                            <option value="1">Fatura</option>
                            <option value="2">Receita</option>
                        </select>
                    </p>
                    <p className="mb-4 space-x-4">
                        <strong>Pessoa:</strong><br />
                        <select 
                            className="w-2/3 h-10 border-2 border-gray-500 rounded-lg p-2 text-black focus:border-blue-900 focus:outline-none"
                            value={newTransaction.personId}
                            onChange={(e) => setNewTransaction({...newTransaction, personId: parseInt(e.target.value)})}
                        >
                            <option value="0">Selecione uma pessoa</option>
                            {persons.map((person) => (
                                <option key={person.id} value={person.id}>{person.name}</option>
                            ))}
                        </select>
                    </p>
                </Popup>
            )}
        </div>
    );
}