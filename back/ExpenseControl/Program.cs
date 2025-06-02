using ExpenseControl.Exceptions;
using ExpenseControl.Repository;

var builder = WebApplication.CreateBuilder(args);

// Adiciona os serviços ao contêiner de injeção de dependência
builder.Services.AddSingleton<IPersonRepository, PersonRepository>(); // Injeção de dependência do repositório de pessoas
builder.Services.AddSingleton<ITransactionRepository, TransactionRepository>(); // Injeção de dependência do repositório de transações
builder.Services.AddControllers(options => options.Filters.Add<ExceptionFilter>()); // Adiciona o filtro de exceção personalizado aos controladores

// ---------------- Swagger (documentação da API) ----------------
// Adiciona suporte ao Swagger para geração de documentação da API
// Esses dois métodos permitem gerar a documentação (JSON) e criar uma interface visual (UI) com Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// --------------------------------------------------------------

// ---------------- CORS ----------------------------------------
// Corrige erro: AddDefaultPolicy não aceita nome. Use AddPolicy para nomear a política
builder.Services.AddCors(options =>
{
    options.AddPolicy("VarcelCors", policy =>
    {
        policy.WithOrigins("https://expense-control-view.vercel.app",
            "https://expense-control-view-lucas-projects-3b3c1bc5.vercel.app/")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
// --------------------------------------------------------------

var app = builder.Build();

// ---------------- Pipeline HTTP -------------------------------
if (app.Environment.IsDevelopment())
{
    // Ativa o Swagger apenas no ambiente de desenvolvimento
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Middleware de redirecionamento HTTPS
app.UseHttpsRedirection();

// Habilita CORS (precisa estar antes do MapControllers)
app.UseCors("VarcelCors");

// Autorização (pode ser ignorado se não estiver usando autenticação)
app.UseAuthorization();

// Mapeia os controladores da API
app.MapControllers();

app.Run();
