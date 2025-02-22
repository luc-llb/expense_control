using ExpenseControl.Dtos;
using ExpenseControl.Exceptions;
using ExpenseControl.Models;
using ExpenseControl.Repository;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseControl.Controllers
{

    /// <summary>
    /// Controller responsible for managing transactions.
    /// Implements the CRUD operations: Create, Read, Update and Delete.
    /// </summary>
    [Route("api/transactions")]
    [Consumes("application/json")]
    [Produces("application/json")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {

        private readonly ITransactionRepository _transactionRepository;

        public TransactionsController(ITransactionRepository transactionRepository)
        {
            _transactionRepository = transactionRepository;
        }

        /// <summary>
        /// Method to list all transactions.
        /// Possibility to filter by person and value.
        /// </summary>
        /// <param name="personFilter">Person ID</param>
        /// <param name="value_">Value of transaction</param>
        /// <returns>All previously saved transactions</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Transaction>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Get([FromQuery] int personFilter)
        {
            if (personFilter < 0)
                return BadRequest(new ProblemDetails()
                {
                    Title = "Parâmetros invalidos",
                    Detail = "personFilter e value_ devem ser maiores que 0"
                });

            var list = _transactionRepository.GetListTransactions();
            if (list.Count != 0)
            {
                List<Transaction> response = list;

                if (personFilter != 0)
                    response = list.Where(x => x.PersonId == personFilter).ToList();

                return Ok(response);
            }

            return Ok(list);
        }

        /// <summary>
        /// Method to get a transaction by id.
        /// </summary>
        /// <param name="id">Transaction ID</param>
        /// <returns>The transaction referring to the id or NotFound</returns>
        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Transaction))]
        public IActionResult GetTransaction([FromRoute] int id)
        {
            if (id <= 0)
                return BadRequest(new ProblemDetails()
                {
                    Title = "ID invalido",
                    Detail = "O ID deve ser maior do que 0"
                });

            Transaction transaction = _transactionRepository.GetListTransactions().FirstOrDefault(t => t.Id == id);
            if (transaction == null)
                return NotFound();

            return Ok(transaction);
        }

        /// <summary>
        /// Method to create and save a transaction
        /// </summary>
        /// <param name="dto">A helper with the data to create a Transaction</param>
        /// <returns>The status of the operation</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Transaction))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult CreateTransaction([FromBody] DtoTransactions dto)
        {
            try
            {
                Transaction transaction = _transactionRepository.AddTransacition(dto);
                return CreatedAtAction(nameof(GetTransaction), new { transaction.Id }, transaction);
            }
            catch (InvalidIdException e)
            {
                return BadRequest(new ProblemDetails()
                {
                    Title = "ID invalido",
                    Detail = e.Message
                });
            }
        }

        /// <summary>
        /// Method to update a transaction
        /// </summary>
        /// <param name="id">The transaction ID</param>
        /// <param name="dto">A helper with the mew data to a transaction</param>
        /// <returns>The status of the operation</returns>
        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Transaction))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult UpdateTransaction([FromRoute] int id, [FromBody] DtoTransactions dto)
        {
            if (id <= 0)
                return BadRequest(new ProblemDetails()
                {
                    Title = "ID invalido",
                    Detail = "O ID deve ser maior do que 0"
                });

            // Check if the person exists
            try
            {
                _transactionRepository.ThisPersonExist(dto.PersonId);
            }
            catch (InvalidIdException e)
            {
                return BadRequest(new ProblemDetails()
                {
                    Title = "ID da pessoa invalido",
                    Detail = e.Message
                });
            }

            var list = _transactionRepository.GetListTransactions();
            var transaction = list.FirstOrDefault(t => t.Id == id);

            if (transaction == null)
                return NotFound();

            // Atualiza os valores
            var index = list.IndexOf(transaction);
            list[index].Description = dto.Description;
            list[index].Value = dto.Value;
            list[index].Type = dto.Type;
            list[index].PersonId = dto.PersonId;
            _transactionRepository.SaveListTransactions(list); // salva as mudanças
            return Ok(list[index]);
        }

        /// <summary>
        /// Method to delete a transaction
        /// </summary>
        /// <param name="id">The transaction ID</param>
        /// <returns>The status of the operation</returns>
        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult RemoveTransaction([FromRoute] int id)
        {
            if (id <= 0)
                return BadRequest(new ProblemDetails()
                {
                    Title = "ID invalido",
                    Detail = "O ID deve ser maior do que 0"
                });
            var list = _transactionRepository.GetListTransactions();
            var transaction = list.FirstOrDefault(t => t.Id == id);
            if (transaction == null)
                return NotFound();
            list.Remove(transaction);
            _transactionRepository.SaveListTransactions(list);
            return NoContent();
        }
    }
}
