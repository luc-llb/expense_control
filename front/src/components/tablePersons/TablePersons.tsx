import { useState } from "react";
import Popup from "../popup/PopUp";
import { Person } from "../../models/Person";
import Button from "../button/Button";
import { FileUser, Trash2, UserRoundPen } from "lucide-react";

/**
 * Peoples table -- contains the fields Name and Age. Permiting CRUD operations.
 * Each operation has a pop-up, described at the end of the component.
 * @param {Transaction[]} persons - the list of peoples to be displayed.
 * @returns {JSX.Element} Div with a table containing the peoples and the pop-ups for each operation.
 */
export default function TablePersons({persons, update}: {persons: Person[], update: ()=>void}) {
    
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    const [newPerson, setNewPerson] = useState<Person>(new Person(0,"",0));

    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeletOpen, setIsDeletOpen] = useState(false);
    
    // Função para abrir o popup com os detalhes da pessoa (funciona com cada uma das três operações: read, update e delete)
    function openPopup(person: Person, setOpen: React.Dispatch<React.SetStateAction<boolean>>){
        setSelectedPerson(person);
        setNewPerson(person);
        setOpen(true);
    }

    // Função para editar a pessoa no banco de dados
    async function editPerson(person: Person){
        const dtoPerson = {
            name: person.name,
            age: person.age
        }
        const responce = await fetch(`${import.meta.env.VITE_API_URL}/persons`+person.id.toString(),
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dtoPerson)
            }
        );
        const data = await responce.json();
        if(data.status == 400 || data.status == 404){
            alert("Ocorreu um erro ao editar a pessoa. Por favor tente novamente.");
        }else{
            update(); // atualiza a lista realizando uma busca
            setIsEditOpen(false);
        }
    }

    async function deletePerson(id: number) {
        const responce = await fetch(`${import.meta.env.VITE_API_URL}/persons`+id.toString(), {method: "DELETE"});
        if(responce.status == 204){
            update(); // atualiza a lista realizando uma busca
            setIsDeletOpen(false);
            return;
        }
        
        if(responce.status == 404){
            alert("Ocorreu um erro ao apagar a pessoa. Por favor tente novamente.");
        }else if (responce.status == 400){
            alert("Informe uma pessoa existente");
        }
    }

    return (
        <div className="">
            <table className="w-full">
                <thead className="text-center text-black">
                    <tr className="border-y border-gray-500">
                        <th>Nome</th>
                        <th>Idade</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="text-center text-black">
                    {persons.map((person) => (
                        <tr key={person.id} className="border-y border-gray-500 h-10 overflow-auto">
                            <td className="w-50 max-w-70 whitespace-normal break-words">{person.name}</td>
                            <td className="w-5 whitespace-normal break-words">{person.age}</td>
                            {/*Botões que abrem os pop-ups descritos ao final do componente*/}
                            <td className="space-x-2 w-40">
                                <Button
                                    AddStyle="px-2 py-1" 
                                    onClick={() => {openPopup(person, setIsViewOpen);}} // View
                                >
                                    <FileUser size={22}></FileUser>
                                </Button>
                                <Button 
                                    AddStyle="px-2 py-1 bg-purple-700 hover:bg-purple-950" 
                                    onClick={() => {openPopup(person, setIsEditOpen);}} // Edit
                                >
                                    <UserRoundPen size={22}></UserRoundPen>
                                </Button>
                                <Button 
                                    AddStyle="bg-red-500 px-2 py-1 hover:bg-red-800" 
                                    onClick={() => {openPopup(person, setIsDeletOpen);}} // Delete
                                >
                                    <Trash2 size={22}></Trash2>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/*Pop-up de vizualização*/}
            {selectedPerson && (
                <Popup
                    isOpen={isViewOpen}
                    onClose={() => setIsViewOpen(false)}
                    title="Detalhes da Pessoa"
                >
                    <p><strong>ID:</strong> {selectedPerson.id}</p>
                    <p><strong>Descrição:</strong> {selectedPerson.name}</p>
                    <p><strong>Idade:</strong> {selectedPerson.age}</p>
                </Popup>
            )}
            {/*Pop-up de edição*/}
            {selectedPerson && (
                <Popup
                    onAction={()=>{editPerson(newPerson)}}
                    textAction="Editar"
                    isOpen={isEditOpen}
                    onClose={() => {
                        setNewPerson({age: 0, name: "", id: 0})
                        setIsEditOpen(false);
                    }}
                    title="Editar Pessoa"
                >
                    <p><strong>ID:</strong> {selectedPerson.id}</p>
                    <p><strong>Nome:</strong> <br/>
                        <input
                            defaultValue={selectedPerson.name}
                            onChange={(e)=>{
                                const person = new Person(newPerson.id, e.target.value, newPerson.age);
                                setNewPerson(person);
                            }}
                            className="w-1/1 h-10 border-2 border-gray-500 rounded-lg p-2 text-black focus:border-blue-900 focus:outline-none"
                        />
                    </p>
                    <p><strong>Idade</strong> <br/>
                        <input
                            defaultValue={selectedPerson.age}
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
            {/*Pop-up de deleção*/}
            {selectedPerson && (
                <Popup
                    onAction={()=>(deletePerson(selectedPerson.id))}
                    textAction="Excluir"
                    isOpen={isDeletOpen}
                    onClose={() => setIsDeletOpen(false)}
                    title="Deletar"
                >
                    <p>
                        <strong>Aviso:</strong> Essa ação irá excluir {selectedPerson.name} e 
                        todas as transações ligadas a essa pessoa.
                    </p>
                </Popup>
            )}
        </div>
    );   
}