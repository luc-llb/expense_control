using System.ComponentModel.DataAnnotations;

namespace ExpenseControl.Models
{
    public class Transaction
    {
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "O id deve ser maior do que 0")]
        public int Id { get; set; }
        public string Description { get; set; }

        [Required]
        public decimal Value { get; set; }

        [Required]
        [Range(1,2, ErrorMessage = "O tipo da transação deve ser Despesa ou Receita")]
        public TransactionType Type { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "O id da pessoa deve ser maior do que 0")]
        public int PersonId { get; set; }

        public Transaction(int id, string description, decimal value, TransactionType type, int personId)
        {
            Id = id;
            Description = description;
            Value = value;
            Type = type;
            PersonId = personId;
        }
    }

    public enum TransactionType
    {
        Invoice=1, Income=2
    }
}
