using ExpenseControl.Controllers;
using ExpenseControl.Dtos;
using ExpenseControl.Models;
using ExpenseControl.services;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace ExpenseControl.Repository
{
    /// <summary>
    /// This class is responsible for managing the data of the Person model.
    /// Documentation for each method is in the IPersonRepository interface.
    /// </summary>
    public class PersonRepository : IPersonRepository
    {
        private static readonly LocalData<Person> _dataFile = new("persons.json");

        // Incrementador dos IDs
        private int _count = _dataFile.GetCounter();

        public PersonRepository()
        {
            /* 
             * Tenta pegar o ID do ultimo item para comparação com o ultimo valor salvo do contador.
             * Isso é feito para evitar problemas de inconsistencia caso a lista esteja previamente populada.
             */
            var list = GetListPersons();
            if (list.Count > 0)
            {
                var lastId = list.Last().Id;
                if (_count < lastId)
                {
                    _count = lastId + 1;
                    _dataFile.UpdateCounter(_count);
                }
            }

        }

        public List<Person> GetListPersons()
        {
            return _dataFile.Load() ?? new List<Person>();
        }

        public void SaveListPersons(List<Person> persons)
        {
            _dataFile.Save(persons);
        }

        public Person AddPerson(DtoPerson helper)
        {
            var persons = GetListPersons();
            var person = new Person(_count++, helper.Name, helper.Age);
            persons.Add(person);
            SaveListPersons(persons);
            _dataFile.UpdateCounter(_count);
            return person;
        }
  
        public void RemoveReferences(int id)
        {
            var transactions = new TransactionRepository().GetListTransactions();
            var newTransactions = transactions.FindAll(t => t.PersonId != id);
            new TransactionRepository().SaveListTransactions(newTransactions);
        }
    }
}
