using ExpenseControl.Models;
using System.ComponentModel.DataAnnotations;

namespace ExpenseControl.Dtos
{
    /// <summary>
    /// Assistant representing a transaction to correct the absence of the id.
    /// </summary>
    public record DtoTransactions
    {
        public string Description { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Informe um valor maior do que 0")]
        public decimal Value { get; set; }

        [Required]
        [Range(1, 2, ErrorMessage = "O tipo da transação deve ser Despesa ou Receita")]
        public TransactionType Type { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "O id da pessoa deve ser maior do que 0")]
        public int PersonId { get; set; }
    }
}
