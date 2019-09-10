Requirements
----------------------------------

- Python 3 (3.6 is advised, required by ClusterPlotter, Webscraper and Clustering API)
- .NET Framework 4.6.1 (is likely to be present in your PC, required by CSVReformatter)
- NLTK Average Perceptron (installation process is described later in this document)

You can install the required Python libraries by running "pip install -r requirements.txt"

Order of Usage
----------------------------------
Webscraper --- (CSV file) --> CSVReformatter -n example.csv --- (Reformatted CSV file) --> Clustering API ---
(Clustered CSV file) --> CSVReformatter -True example.csv --- (Clustered CSV file) --> ClusterPlotter

Usage
----------------------------------
Webscraper: Simply run webscraper.py file via "python webscraper.py" command, then navigate to 127.0.0.1:5000 or localhost:5000 via
your browser.

CSVReformatter: A simple program which finds multiline entries and reformats them as single line ones, and cleans clustered CSV files
from non-clustered entries. Is ran by following inputs:
"CSVReformatter -n example.csv": Reformats multiline entries in a CSV file as single line ones (this option modifies the input file, be warned)
"CSVReformatter -True example.csv -o output.csv": Removes non-clustered entries from a CSV file and outputs the result as the following file name
"CSVReformatter -True example.csv -o output.csv": Ditto
"CSVReformatter -True example.csv": Ditto but outputs the results to a new file named output.csv

Clustering API: Run CLAAS_public3.py and then navigate to localhost:8180/apidocs/#/ via your browser.

ClusterPlotter: Creates bar graphs according to clustered entries, showing how many entries exist in a cluster for a course, ran as
"python plotter.py example.csv" with CSV file being a file generated from clustering entries
(I highly recommend you to clean the CSV file of non-clustered entries by putting it through CSVReformatter first)

Installing NLTK Average Perceptron
----------------------------------

- Open Command Prompt (or your UNIX terminal)
- Type "python" (or whatever your Python command is)
- Type "import nltk", if you already installed the required libraries it shouldn't give "no module named 'NLTK'" error
- If it still does, type "exit()", install it with "pip install NLTK", get back into Python and try importing it again
- Type "nltk.download()"
- On the window that has just opened, navigate to Models, find Averaged Perceptron Tagger and download it
- That's it, you may close the window and your Command Prompt safely now

P.S. If you counter any "no module named 'herpderp'" errors, just simply type "pip install herpderp" and the said module should be
installed and the problem be fixed