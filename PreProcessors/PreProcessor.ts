import * as fs from 'fs';

const cleaningstring = /[0-9{}☿♀🜨♂♃⛢5⚶♄⚳☾⯰♇♅♆1♇1.,!@#$%^&*()_+=-~`"':;.><,/?☉₹]/g;

function preprocessText(inputText: string): string {
  // Lowercasing the dataset
  const lowercaseText: string = inputText.toLowerCase();
  // Remove characters using regular expression
  const cleanedText: string = lowercaseText.replace(cleaningstring, '');

  // Split the input text into an array of lines
  const lines: string[] = cleanedText.split('\n');

  // Define a regular expression pattern to match gibberish lines
  const gibberishPattern: RegExp = /^[^\w\d]*$/;

  // Filter out blank lines and gibberish lines
  const filteredLines: string[] = lines.filter((line: string) => {
    // Remove leading and trailing white spaces from each line
    const trimmedLine: string = line.trim();

    // Check if the line is not blank and doesn't consist entirely of gibberish
    return trimmedLine !== '' && !gibberishPattern.test(trimmedLine);
  });

  // Join the filtered lines to reconstruct the preprocessed text
  const preprocessedText: string = filteredLines.join('\n');

  return preprocessedText;
}

// File paths for input and output
const inputFileName: string = 'Datasets/dataset.txt'; // Replace with your input file path
const timestamp: number = Date.now(); // Get the current timestamp
const outputFileName: string = `PreProcessed_Data/output_${timestamp}.txt`; // Create the file name

// Read the input text from the file
fs.readFile(inputFileName, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading input file:', err);
    return;
  }

  // Preprocess the input text
  const preprocessedText: string = preprocessText(data);

  // Check if the output file exists, and if not, create it
  fs.stat(outputFileName, (err, stats) => {
    if (err && err.code === 'ENOENT') {
      // The file doesn't exist, so create it
      fs.writeFile(outputFileName, preprocessedText, 'utf8', (err) => {
        if (err) {
          console.error('Error creating output file:', err);
          return;
        }

        console.log('Preprocessing complete. The preprocessed text is saved in', outputFileName);
      });
    } else if (!err) {
      // The file already exists, so overwrite it
      fs.writeFile(outputFileName, preprocessedText, 'utf8', (err) => {
        if (err) {
          console.error('Error writing output file:', err);
          return;
        }

        console.log('Preprocessing complete. The preprocessed text is saved in', outputFileName);
      });
    } else {
      console.error('Error checking output file:', err);
    }
  });
});
