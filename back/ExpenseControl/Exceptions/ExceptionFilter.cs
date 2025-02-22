using Microsoft.AspNetCore.Mvc.Filters;

namespace ExpenseControl.Exceptions
{
    /// <summary>
    /// Class responsible for handling exceptions, reducing the exposure of internal errors.
    /// </summary>
    public class ExceptionFilter : IExceptionFilter
    {
        const string _message = "An error occurred while processing your request.";
        public void OnException(ExceptionContext context)
        {
            var exception = context.Exception;
            context.Result = new Microsoft.AspNetCore.Mvc.JsonResult(new { message = _message });
        }
    }
}
