import { ChevronLeft } from "lucide-react";
import Card from "../../components/card/Card";
import Title1 from "../../components/title1/Title1";
import { useNavigate } from "react-router-dom";
import TableOverview from "../../components/tableOverview/TableOverview";
import { useEffect, useState } from "react";
import { Consultation } from "../../models/Consultation";

/**
 * Overview page
 * @returns {JSX.Element} - The JSX element
 */
export default function Overview() {
    const navigate = useNavigate();
    const [consults, setConsults] = useState<Consultation[]>([]);

    // Pega os dados da API ao carregar a página
    useEffect(() => {
        async function request(): Promise<void> {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/consultations`);
            const data = await response.json();
            setConsults(data);
        }
        request();    
    }, []);
    
    return (
        <>
            <div className="absolute top-4 left-4 flex items-center space-x-2 cursor-pointer"
                onClick={() => navigate("/")}    
            >
                <ChevronLeft className="w-6 h-6 text-gray-500"/>
                <h5 className="text-2xl font-bold text-gray-500">Voltar</h5>
            </div>
            <div className="mb-10">
                <Title1 text="Visão Geral"/>
            </div>
            {/* Adiciona os cards com a listagem total (soma de todas receitas, faturas e saldos)*/}
            <div className="grid grid-cols-3 gap-7 mt-2">
                <Card title="Receita Total" className="bg-blue-600">
                    R${consults?.reduce((acc, consult) => acc + consult.incomes, 0).toFixed(2)}
                </Card>
                <Card title="Saldo Total" className="bg-purple-700">
                    R${consults?.reduce((acc, consult) => acc + consult.total, 0).toFixed(2)}
                </Card>
                <Card title="Fatura Total" className="bg-red-600">
                    R${consults?.reduce((acc, consult) => acc + consult.invoices, 0).toFixed(2)}
                </Card>
            </div>
            {/* Adiciona a tabela listando receitas, faturas e saldos por pessoa*/}
            <div className="bg-gray-300 w-150 rounded-lg p-5 m-7">
                <TableOverview consults={consults}/>
            </div>
        </>
    );
}