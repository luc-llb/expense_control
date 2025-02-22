using ExpenseControl.Models;
using ExpenseControl.Dtos;
using Microsoft.AspNetCore.Mvc;
using ExpenseControl.Repository;

namespace ExpenseControl.Controllers
{
    /// <summary>
    /// Controller responsible for managing the Person model.
    /// Implements the CRUD operations: Create, Read, Update and Delete.
    /// </summary>
    [Route("api/persons")]
    [Produces("application/json")]
    [ApiController]
    public class PersonsController : ControllerBase
    {
        private readonly IPersonRepository _persons;

        public PersonsController(IPersonRepository persons)
        {
            this._persons = persons;
        }

        /// <summary>
        /// Method to list all persons
        /// </summary>
        /// <param name="filterName">Filter by name</param>
        /// <param name="filterAge">Filter by age</param>
        /// <returns>All previously saved people</returns>
        [HttpGet]
        [Produces("application/json")]
        [ProducesResponseType(statusCode: 200, Type = typeof(List<Person>))]        
        public IActionResult ListPersons([FromQuery] string? filterName)
        {
            var list = _persons.GetListPersons();
            if (list.Count != 0)
            {
                if (!string.IsNullOrEmpty(filterName))
                    return Ok(list.FindAll(p => p.Name.Contains(filterName, 
                        StringComparison.InvariantCultureIgnoreCase)));
            }
            return Ok(list);
        }

        /// <summary>
        /// Method to get a person by id
        /// </summary>
        /// <param name="id">The person id</param>
        /// <returns>The person referring to the id or NotFound</returns>
        [HttpGet("{id:int}", Name = nameof(GetPerson))]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(Person))]
        [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
        [ProducesResponseType(statusCode: StatusCodes.Status400BadRequest)]
        public IActionResult GetPerson([FromRoute] int id)
        {
            if (id <= 0)
                return BadRequest( new ProblemDetails()
                    {
                        Title = "ID invalido",
                        Detail = "O ID deve ser maior do que 0"
                    });

            var person = _persons.GetListPersons().FirstOrDefault(p => p.Id == id);
            if (person == null)
                return NotFound();

            return Ok(person);
        }

        /// <summary>
        /// Method to create and save a person
        /// </summary>
        /// <param name="dto">A helper with the data to create a person</param>
        /// <returns>The person referring to the id or NotFound</returns>
        [HttpPost]
        [ProducesResponseType(statusCode: StatusCodes.Status201Created, Type = typeof(Person))]
        [ProducesResponseType(statusCode: StatusCodes.Status400BadRequest)]        
        public IActionResult CreatedPerson([FromBody] DtoPerson dto)
        {
            // Try to convert the DtoPerson to Person
            try
            {
                Person person = _persons.AddPerson(dto);
                return CreatedAtAction(nameof(GetPerson), new { person.Id }, person);
            }
            catch
            {
                return BadRequest();
            }

        }

        /// <summary>
        /// A method to update a person
        /// </summary>
        /// <param name="id">The person id</param>
        /// <param name="dto">A helper with the new data to a person</param>
        /// <returns>The status of the operation</returns>
        [HttpPut("{id:int}")]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, Type = typeof(Person))]
        [ProducesResponseType(statusCode: StatusCodes.Status400BadRequest)]
        [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]        
        public IActionResult UpdatePerson([FromRoute] int id, [FromBody] DtoPerson dto)
        {
            // Não foi imposta uma regra para a idade, então considerei que a idade tem que ser maior que 0
            if (dto.Age <= 0)
                return BadRequest(error: "Idade deve ser maior que 0");

            if (id <= 0)
                return BadRequest(new ProblemDetails()
                {
                    Title = "ID invalido",
                    Detail = "O ID deve ser maior do que 0"
                });

            var list = _persons.GetListPersons();
            var person = list.FirstOrDefault(p => p.Id == id);            
           
            if (person == null)
                return NotFound();

            var index = list.IndexOf(person);
            list[index].Name = dto.Name;
            list[index].Age = dto.Age;
            _persons.SaveListPersons(list);
            return Ok(list[index]);
        }

        /// <summary>
        /// A method to delete a person
        /// </summary>
        /// <param name="id">The person id</param>
        /// <returns>The status of the operation</returns>
        [HttpDelete("{id:int}")]
        [ProducesResponseType(statusCode: StatusCodes.Status204NoContent)]
        [ProducesResponseType(statusCode: StatusCodes.Status404NotFound)]
        [ProducesResponseType(statusCode: StatusCodes.Status400BadRequest)]
        public IActionResult DeletePerson([FromRoute] int id)
        {
            if(id <= 0)
                return BadRequest(new ProblemDetails()
                {
                    Title = "ID invalido",
                    Detail = "O ID deve ser maior do que 0"
                });

            var list = _persons.GetListPersons();
            var person = list.FirstOrDefault(p => p.Id == id);

            if (person == null)
                return NotFound();

            list.Remove(person);
            _persons.RemoveReferences(id);
            _persons.SaveListPersons(list);
            return NoContent();
        }
    }
}
