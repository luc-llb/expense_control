using ExpenseControl.Dtos;
using ExpenseControl.Models;

namespace ExpenseControl.Repository
{
    public interface ITransactionRepository
    {
        /// <summary>
        /// Add a transaction to the list of transactions and save it in the file.
        /// </summary>
        /// <param name="helper">Object with new data to be saved</param>
        /// <returns>The object Transaction created</returns>
        public Transaction AddTransacition(DtoTransactions helper);

        /// <summary>
        /// Get the list of transactions from the file.
        /// </summary>
        /// <returns>The list with the transactions</returns>
        public List<Transaction> GetListTransactions();

        /// <summary>
        /// Save the list of transactions in the file.
        /// </summary>
        /// <param name="transactions">List to be saved</param>
        public void SaveListTransactions(List<Transaction> persons);

        /// <summary>
        /// Check if the person exists in the list of people.
        /// </summary>
        /// <param name="id">The person id</param>
        /// <exception cref="InvalidIdException">
        /// If the person is not in the list, it throws an error
        /// </exception>
        public void ThisPersonExist(int id);
    }
}
