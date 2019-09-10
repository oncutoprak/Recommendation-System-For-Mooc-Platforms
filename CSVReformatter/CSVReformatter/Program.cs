using System.IO;
using System.Text;
using System.Reflection;
using System;

namespace CSVReformatter
{
    class Program
    {
        private static void RemoveNonclusterComments(string sourceDir, string outputDir)
        {
            using (FileStream source = new FileStream(sourceDir, FileMode.Open, FileAccess.Read))
            {
                using (FileStream output = new FileStream(outputDir, FileMode.Create, FileAccess.Write))
                {
                    StreamReader reader = new StreamReader(source);
                    StreamWriter writer = new StreamWriter(output);

                    while (!reader.EndOfStream)
                    {
                        string line;
                        if ((line = reader.ReadLine()).Contains("True"))
                            writer.WriteLine(line);
                    }
                }
            }
        }

        static void Main(string[] args)
        {
            if (args.Length == 2 && args[0] == "-n")
            {
                string fileContent = "";
                using (FileStream file = new FileStream(args[1], FileMode.Open, FileAccess.Read))
                {
                    using (StreamReader reader = new StreamReader(file))
                        while (!reader.EndOfStream)
                            fileContent += reader.ReadLine();
                    fileContent = fileContent.Replace("\"\"", $"\"{Environment.NewLine}\"");
                }
                using (FileStream file = new FileStream(args[1], FileMode.Truncate, FileAccess.Write))
                {
                    StreamWriter writer = new StreamWriter(file, Encoding.UTF8);
                    writer.Write(fileContent);
                }
            }
            else if (args.Length == 4 && args[0] == "-True" && args[2] == "-o")
                RemoveNonclusterComments(args[1], args[3]);
            else if (args.Length == 4 && args[2] == "-True" && args[0] == "-o")
                RemoveNonclusterComments(args[3], args[1]);
            else if (args.Length == 2 && args[0] == "-True")
                RemoveNonclusterComments(args[1], $"{Assembly.GetEntryAssembly().Location}\\output.csv");
            else
                Console.WriteLine("Argument error");
        }
    }
}
