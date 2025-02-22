using ExpenseControl.Models;
using ExpenseControl.Repository;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseControl.Controllers
{
    /// <summary>
    /// Controller responsible for managing the Consultation model.
    /// Implement the Read operation, to list all consultations.
    /// This alleviates processing on the front-end.
    /// </summary>
    [Route("api/consultations")]
    [Produces("application/json")]
    [ApiController]
    public class ConsultationsController : ControllerBase
    {
        private readonly IPersonRepository _personRepository;
        private readonly ITransactionRepository _transactionRepository;

        public ConsultationsController(IPersonRepository personRepository, ITransactionRepository transactionRepository) {
            _personRepository = personRepository;
            _transactionRepository = transactionRepository;
        }

        /// <summary>
        /// Get the list of consultations.
        /// </summary>
        /// <returns>A list with all the information of each registered person</returns>
        private List<Consultation> ListConsultations()
        {
            var persons = _personRepository.GetListPersons();
            var transactions = _transactionRepository.GetListTransactions();
            var consultations = new List<Consultation>();

            if(persons.Count == 0 || transactions.Count == 0)
                return consultations;

            foreach (var person in persons)
            {
                var incomes = transactions.Where(t => t.PersonId == person.Id && t.Type == TransactionType.Income).Sum(t => t.Value);
                var invoices = transactions.Where(t => t.PersonId == person.Id && t.Type == TransactionType.Invoice).Sum(t => t.Value);
                consultations.Add(new Consultation(person.Name, incomes, invoices));
            }
            return consultations;
        }

        /// <summary>
        /// Method to list all consultations.
        /// </summary>
        /// <returns>A list with all the information of each registered person</returns>
        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(List<Consultation>))]
        public IActionResult GetConsultations()
        {
            return Ok(ListConsultations());
        }
    }
}
