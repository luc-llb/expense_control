using System.ComponentModel.DataAnnotations;

namespace ExpenseControl.Models
{
    /// <summary>
    /// Class that represents a consultation.
    /// Stores the person's id, the total income and the total expenses.
    /// </summary>
    public class Consultation
    {
        [Required]
        public string PersonName { get; set; }

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "O valor das receitas deve ser maior ou igual a 0")]
        public decimal Incomes { get; set; }

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "O valor das despesas deve ser maior ou igual a 0")]
        public decimal Invoices { get; set; }

        [Required]
        public decimal Total { get; set; }

        public Consultation(string name, decimal incomes, decimal invoices)
        {
            PersonName = name;
            Incomes = incomes;
            Invoices = invoices;
            Total = incomes - invoices;
        }
    }
}
