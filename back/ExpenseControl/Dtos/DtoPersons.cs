using System.ComponentModel.DataAnnotations;

namespace ExpenseControl.Dtos
{
    /// <summary>
    /// Assistant representing a person to correct the absence of the id.
    /// </summary>
    public record DtoPerson
    {
        [Required]
        [MinLength(3, ErrorMessage = "Informe um nome valido")]
        public string Name { get; init; }

        [Required]
        [Range(1, 120, ErrorMessage = "Idade invalida")]
        public int Age { get; init; }
    }
}
