using ExpenseControl.Dtos;
using ExpenseControl.Models;

namespace ExpenseControl.Repository
{
    /// <summary>
    /// Interface responsible for managing the data of the Person model.
    /// Create for dependency injection.
    /// </summary>
    public interface IPersonRepository
    {
        /// <summary>
        /// Get the list of persons from the file.
        /// </summary>
        /// <returns></returns>
        public List<Person> GetListPersons();

        /// <summary>
        /// Save the list of persons in the file.
        /// </summary>
        /// <param name="persons">List to be saved</param>
        public void SaveListPersons(List<Person> persons);

        /// <summary>
        /// Add a person to the list of persons and save it in the file.
        /// </summary>
        /// <param name="helper">Object with new data to be saved</param>
        /// <returns>The object Person created</returns>
        public Person AddPerson(DtoPerson helper);

        /// <summary>
        /// Remove all references to a person in the list of transactions.
        /// </summary>
        /// <param name="id">Person ID from removed</param>
        public void RemoveReferences(int id);
    }
}
