namespace ExpenseControl.Exceptions
{
    public class InvalidIdException : Exception
    {
        private string _message;
        public string Message { get => _message; init => _message = value; }
        public InvalidIdException(string message)
        {
            Message = message;
        }
    }
}
