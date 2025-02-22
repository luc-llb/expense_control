import { useNavigate } from "react-router-dom";
import Title1 from "../../components/title1/Title1";
import Button from "../../components/button/Button";

/**
 * @returns {JSX.Element} Home page
 */
export default function Home() {
    const navigate = useNavigate();
    const styleButton = "text-sm font-bold w-43 min-h-16 px-4 py-2";
    return (
        <>
            <div className="mt-50">
                <Title1 text="Controlador de Gastos Residenciais" />
            </div>
            <div className="mt-10 space-y-10 space-x-10 inline-block">
                <Button 
                    AddStyle={styleButton} 
                    text="Gerenciar transações" 
                    onClick={() => navigate("/transactions")} 
                />
                <Button 
                    AddStyle={styleButton} 
                    text="Gerenciar pessoas" 
                    onClick={() => navigate("/persons")}
                />
                <Button 
                    AddStyle={styleButton} 
                    text="Visão geral" 
                    onClick={() => navigate("/overview")}
                />
            </div>
        </>
    );
}