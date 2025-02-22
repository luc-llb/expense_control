using System.Text.Json;

namespace ExpenseControl.services
{
    /// <summary>
    /// LocalData class is used to save and load data from local files.
    /// Since I don't need to use a database, I chose to use JSON files to save data.
    /// </summary>
    /// <typeparam name="T">
    /// The type of data to be saved, usually a List.
    /// </typeparam>
    public class LocalData<T> where T : class
    {

        /// <summary>
        /// Caminho base onde os arquivos de dados serão salvos.
        /// </summary>
        private readonly static string _basePath = "./Datas";

        /// <summary>
        /// Nome do arquivo que contem os dados de algum modelo.
        /// </summary>
        private string FileName { get; init; }

        /// <summary>
        /// Nome do arquivo que contem o valor do contador de algum modelo.
        /// </summary>
        private string FileCounter { get; init; }

        public LocalData(string? fileName) {
            FileName = fileName;
            
            /// O arquivo contador sera criado com o mesmo nome do arquivo de dados concatenado com "Counter".
            FileCounter = fileName.Replace(".json", "Counter.json");

            if (!Directory.Exists(_basePath))
            {
                // Cria um novo diretorio caso não exista
                Directory.CreateDirectory(_basePath);
            }
        }

        /// <summary>
        /// Save data to a file.
        /// </summary>
        /// <param name="data">A List containing the new objects to be saved</param>
        public void Save(List<T> data)
        {
            var path = Path.Combine(_basePath, FileName);
            var json = JsonSerializer.Serialize(data);
            File.WriteAllText(path, json);
        }

        /// <summary>
        /// Load data from a file.
        /// </summary>
        /// <returns>A List<T> containing the saved objects</returns>
        public List<T>? Load()
        {
            var path = Path.Combine(_basePath, FileName);
            if (!File.Exists(path))
            {
                File.Create(path).Dispose();
                File.WriteAllText(path, "[]");
            }
            var json = File.ReadAllText(path);
            return JsonSerializer.Deserialize<List<T>>(json);
        }

        /// <summary>
        /// Load the data of the counter.
        /// </summary>
        /// <returns>The last saved counter value</returns>
        public int GetCounter() {
            var path = Path.Combine(_basePath, FileCounter);
            if (!File.Exists(path))
            {
                File.Create(path).Dispose();
                File.WriteAllText(path, "1");
            }
            var json = File.ReadAllText(path);
            return JsonSerializer.Deserialize<int>(json);
        }

        /// <summary>
        /// Update the counter file with the nem value.
        /// </summary>
        /// <param name="count">New counter value</param>
        public void UpdateCounter(int count)
        {
            var path = Path.Combine(_basePath, FileCounter);
            var json = JsonSerializer.Serialize(count);
            File.WriteAllText(path, json);
        }
    }
}
