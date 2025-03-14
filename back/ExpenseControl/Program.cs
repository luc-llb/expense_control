using ExpenseControl.Exceptions;
using ExpenseControl.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<IPersonRepository, PersonRepository>(); // Dependency injection for the PersonRepository class
builder.Services.AddSingleton<ITransactionRepository, TransactionRepository>(); // Dependency injection for the TransactionRepository class
builder.Services.AddControllers(options => options.Filters.Add<ExceptionFilter>()); // Add the ExceptionFilter class to the pipeline

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()   // Permite qualquer origem (AJUSTE EM PRODU��O!)
                  .AllowAnyMethod()   // Permite qualquer m�todo (GET, POST, PUT, DELETE)
                  .AllowAnyHeader();  // Permite qualquer cabe�alho
        });
});

var app = builder.Build();

app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
