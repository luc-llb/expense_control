# Controlador de Finanças Residenciais

Nesse projeto foi implementado um sistema para o gerenciamento de gastos, permitindo o cadastro de pessoas e atribuição de faturas ou receitas
geradas para cada pessoa cadastrada.

A `/front` possui a implementação da interface de web em **React**, enquanto a pasta `/back` possui a implementação da API em **C#**.

## Estrutura do diretório

```
expense_control
 |-- back 
        |-- ExpenseControl
                |-- Controllers /*Controladores pas as rotas da API*/
                |-- Datas /*Banco de dados local -- arquivos JSON*/
                |-- Dtos /*Classes auxiliares*/
                |-- Exceptions /*Filtro de exceção e exceções personalizadas*/
                |-- Models /*Classes modelo*/
                |-- Repository /*Classes que implemetam as lógicas de gestão dos modelos*/
                |-- services /*Classes que fornecem algum serviço -- apenas a classe LocalData para salvamento dos dados*/
                /*outras pastas e arquivos do projeto*/
 |-- front 
        |-- public
        |-- src 
                |-- assets
                |-- components /*Implementação dos componentes base*/
                |-- models /*Classes modelos*/
                |-- pages /*Implementação dos componentes que utilizados como paginas*/
                |-- App.tsx /*Arquivo de definição das rotas*/
        /*outras pastas e arquivos do projeto*/
```

## 🖥 API
Para o desenvolvimento da API foi utilizado o framework **ASP.NET** em **C#** no ambiente do *Visual Studio 2022* com o **.NET 8**.

### Principais Funcionalidades
- Requisições GET, POST, PUT e DELETE para pessoas utilizando as rotas `/api/persons` e `/api/persons/:id`.
- Requisições GET, POST, PUT e DELETE para transações utilizando as rotas `/api/transactions` e `/api/transactions/:id`.
- Requisição GET para consultas pela rota `/api/consultations`, utilizada para retornar a soma de receitas, faturas e saldos de todas as pessoas cadastradas.
- Lógica desacoplada: os *Controladores* (`ExpenseControl/Controllers`) cuidam do gerenciamento das rotas enquanto os *Repositórios* (`ExpenseControl/Repository`)implementam as lógicas de cada tipo de objeto.
- Salvamento dos dados em arquivos JSON (já que não era necessário um banco de dados). Toda a lógica para o gerenciamento desses arquivos está implementada em `ExpenseControl/Services/LocalData.cs`.

### Como utilizar
1. Certifique-se de possuir o dotnet (.NET) instalado. Para isso, utilize o comando:
```bash
dotnet --version
```
Esse projeto foi implementado utilizando o .NET 8, certifique-se de possuir a mesma versão

2. Abra a pasta onde se encontra o projeto:
```bash
cd  <seu-diretório>/expense_control/back/ExpenseControl
```

3. Rode a API:
```bash
dotnet run
```

Caso opte por utilizar o Visual Studio, será aberto o navegador na página do Swagger.

## 💻 Interface Web
Para o desenvolvimento da interface web foi utilizado o **React**+**Typescript** e **Tailwind.css**, usando o *vite* no ambiente do *VS Code*.

### Principais Funcionalidades
- Página **Home** para facilitar a navegação dentro da aplicação.
- As transações podem ser vistas e adicionadas pela página `/transactions`.
- O gerenciamento das pessoas (Cadastro, visualização, edição e exclusão) pode ser feito pela página `persons`.
- Na página `/overview` é dada uma visão geral sobre as pessoas cadastradas no sistema, informado o total de suas receitas e faturas, além de seus saldos finais. A página ainda mostra o somatório de todas as faturas, lucros e receitas.

### Como Utilizar
1. Certifique-se de que o Node.js e o npm estão instalados em sua máquina, caso não esteja instale-os aqui. Utilize os seguintes comandos no cmd/bash para verificar:
```bash
node -v && npm -v
```

2. Entre na pasta front:
```bash
cd  <seu-diretório>/expense_control/front
```

3. Instale as dependências:
```bash
npm install
```

4. Certifique-se de que a URL da API está correta no arquivo `App.tsx`. Também é necessário que a API esteja ativa para o devido funcionamento da interface.

5. Rode o projeto:
```bash
npm run dev
```

