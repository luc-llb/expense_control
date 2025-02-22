import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Title1 from "../../components/title1/Title1";
import { useEffect, useState } from "react";
import { Person } from "../../models/Person";
import TablePersons from "../../components/tablePersons/TablePersons";
import Popup from "../../components/popup/PopUp";

/**
 * Page to view persons. Supports the CRUD operations.
 * @returns {JSX.Element} The page persons view.
 */
export default function PersonsView() {
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>("");
    const [persons, setPersons] = useState<Person[]>([]);
    
    // Realiza a chamada da API de pessoas, podendo incluir um filtro de nome
    const handleSearch = async () => {
        const responce = await fetch("http://localhost:5042/api/persons"+(search ? `?filterName=${search}` : ""))
        const data = await responce.json();
        setPersons(data);
    }

    // Chama a API ao carregar a página
    useEffect(() => {handleSearch();},[]);

    // Estado para adicionar uma nova pessoa
    const [newPerson, setNewPerson] = useState<Person>(new Person(0,"",0));
    const [isOpen, setIsOpen] = useState(false); // Estado para abrir o popup de adicionar pessoa

    // Função para adicionar uma pessoa
    const addPerson = async (person: Person) => {
        const dtoPerson = { name: person.name, age:person.age};
        const responce = await fetch("http://localhost:5042/api/persons", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dtoPerson)
            }
        )
        const data = await responce.json();
        if(data.status == 400){
            alert("Algum dos dados enviados está incorreto. Por favor, verifique e tente novamente.")
            return;
        }
        handleSearch(); // Chama a API "refreshando" a lista de pessoas
        setNewPerson({age: 0, name: "", id: 0});
        setIsOpen(false);
    }

    return (
        <>
            <div>
                <Title1 text="Pessoas Cadastradas" />
            </div>
            <div className="flex justify-center items-center mt-5 space-x-5">
                <Button 
                    AddStyle="py-2 px-4" 
                    text="Voltar" 
                    onClick={() => navigate("/")} 
                />
                <Button 
                    AddStyle="py-2 px-4" 
                    text="Adicionar Pessoa" 
                    onClick={() => {setIsOpen(true)}} 
                />
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
                <TablePersons persons={persons} update={handleSearch} />
            </div>
            {newPerson && (
                <Popup
                onAction={()=>{addPerson(newPerson)}}
                    textAction="Adicionar Pessoa"
                    isOpen={isOpen}
                    onClose={() => {
                        setNewPerson({age: 0, name: "", id: 0})
                        setIsOpen(false);
                    }}
                    title="Editar Pessoa"
                >
                    <p><strong>Nome:</strong> <br/>
                        <input
                            placeholder="Digite um nome"
                            value={newPerson.name}
                            onChange={(e)=>{
                                const person = new Person(newPerson.id, e.target.value, newPerson.age);
                                setNewPerson(person);
                            }}
                            className="w-1/1 h-10 border-2 border-gray-500 rounded-lg p-2 text-black focus:border-blue-900 focus:outline-none"
                        />
                    </p>
                    <p><strong>Idade</strong> <br/>
                        <input
                            value={newPerson.age}
                            onChange={(e)=>{
                                const person = new Person(newPerson.id, newPerson.name, Number(e.target.value));
                                setNewPerson(person);
                            }}
                            type="number"
                            className="w-3/7 h-10 border-2 border-gray-500 rounded-lg p-2 text-black focus:border-blue-900 focus:outline-none"
                        />
                    </p>
                </Popup>
            )}
        </>
    ); 
}