using ExpenseControl.Dtos;
using ExpenseControl.Exceptions;
using ExpenseControl.Models;
using ExpenseControl.services;

namespace ExpenseControl.Repository
{
    /// <summary>
    /// This class is responsible for managing the data of the Transaction model.
    /// Documentation for each method is in the ITransactionRepository interface.
    /// </summary>
    public class TransactionRepository : ITransactionRepository
    {
        private static readonly LocalData<Transaction> _dataFile = new("transactions.json");
        private int _count = _dataFile.GetCounter(); // Incrementador dos IDs

        public TransactionRepository() 
        {
            /* 
             * Tenta pegar o ID do ultimo item para comparação com o ultimo valor salvo do contador.
             * Isso é feito para evitar problemas de inconsistencia caso a lista esteja previamente populada.
             */
            var list = GetListTransactions();
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
        public void ThisPersonExist(int id)
        {
            var personsFile = new LocalData<Person>("persons.json");
            var persons = personsFile.Load();

            if (persons.Count == 0 || persons.Find(x => x.Id == id) == null)
                throw new InvalidIdException("Essa pessoa não esta cadastrada na lista.");
        }

        public Transaction AddTransacition(DtoTransactions helper)
        {
            var transactions = GetListTransactions();

            ThisPersonExist(helper.PersonId);

            var transaction = new Transaction(_count++, helper.Description, helper.Value, helper.Type, helper.PersonId);
            transactions.Add(transaction);
            SaveListTransactions(transactions);

            // O contador só é alterado quando um item é adicionado, por isso salvamos o contador aqui.
            _dataFile.UpdateCounter(_count); 

            return transaction;
        }

        public List<Transaction> GetListTransactions()
        {
            return _dataFile.Load() ?? new List<Transaction>();
        }

        public void SaveListTransactions(List<Transaction> transactions)
        {
            _dataFile.Save(transactions);
        }
    }
}
