using System.ComponentModel.DataAnnotations;

namespace ExpenseControl.Models
{
    /// <summary>
    /// Represents a person with id, name and age.
    /// </summary>
    public class Person
    {
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "O id deve ser maior que 0")]
        public int Id { get; set; }

        [Required]
        [MinLength(3)]
        public string Name { get; set; }

        [Required]
        [Range(1, 120, ErrorMessage = "Idade invalida")]
        public int Age { get; set; }

        public Person(int id, string name, int age)
        {
            Id = id;
            Name = name;
            Age = age;
        }
    }
}
