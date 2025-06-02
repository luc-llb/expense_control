import { useNavigate } from "react-router-dom";
import Title1 from "../../components/title1/Title1";
import Button from "../../components/button/Button";
import TableTransactions from "../../components/tableTransactions/TableTransactions";
import { useEffect, useState } from "react";
import { Transaction } from "../../models/Transaction";
import { Person } from "../../models/Person";
import AddTransaction from "../../components/addTransaction/AddTransaction";

/**
 * Page to view transactions.
 * @returns {JSX.Element} The page transactions view.
 */
export default function TransactionsView() {
    const navigate = useNavigate();
    
    // Consumindo a api de transações
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    useEffect(() => {
        async function request(): Promise<void> {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/transactions`);
            const data = await response.json();
            console.log(data);
            setTransactions(data);
        }
        request();
    }, []);
    
    
    // Função para realizar a busca de transações por nome
    const [search, setSearch] = useState<string>("");
    const handleSearch = async () => {
        // Consumindo a api de pessoas para buscar o id da pessoa
        const response = await fetch(`${import.meta.env.VITE_API_URL}/persons`+(search ? `?filterName=${search}` : ""));
        const data: Person[] = await response.json();
        if(data.length === 0) {
            alert("Nenhuma transação encontrada");
            return;
        }
        // Consumindo a api de transações para buscar as transações da pessoa
        const responseTransactions = await fetch(`${import.meta.env.REACT_APP_API_URL}/transactions`+(search ? `?personFilter=${data[0].id}` : ""));
        const dataTransactions: Transaction[] = await responseTransactions.json();
        setTransactions(dataTransactions);
    }

    return (
        <>
            <div>
                <Title1 text="Transações" />
            </div>
            <div className="flex justify-center items-center mt-5 space-x-5">
                <Button 
                    AddStyle="py-2 px-4" 
                    text="Voltar" 
                    onClick={() => navigate("/")} 
                />
                <AddTransaction update={handleSearch}/>
            </div>
            <div className="bg-gray-300 w-150 rounded-lg m-5 p-2">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} 
                    type="text" 
                    placeholder="Pesquise por um nome" 
                    className="w-5/7 h-10 border-2 border-gray-500 rounded-lg m-5 p-2 text-black focus:border-blue-900 focus:outline-none" 
                />
                <Button 
                    AddStyle="py-2 px-4" 
                    text="Pesquisar" 
                    onClick={handleSearch} 
                />
            </div>
            <div className="bg-gray-300 w-150 rounded-lg p-5">
                <TableTransactions transactions={transactions} />
            </div>

        </>
    );
}