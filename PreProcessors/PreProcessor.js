const fs = require("fs")
let cleaningstring = /[0-9{}☿♀🜨♂♃⛢5⚶♄⚳☾⯰♇♅♆1♇1.,?☉₹^%$]/g

function preprocessText(inputText) {
  //Lowercasing the dataset
  const lowercaseText = inputText.toLowerCase();
  // Remove numbers and curly braces {} using regular expressions, Special characters
  const cleanedText = lowercaseText.replace(cleaningstring, '');

  // Split the input text into an array of lines
  const lines = cleanedText.split('\n');

  // Define a regular expression pattern to match gibberish lines
  const gibberishPattern = /^[^\w\d]*$/;

  // Filter out blank lines and gibberish lines
  const filteredLines = lines.filter((line) => {
    // Remove leading and trailing white spaces from each line
    const trimmedLine = line.trim();

    // Check if the line is not blank and doesn't consist entirely of gibberish
    return trimmedLine !== '' && !gibberishPattern.test(trimmedLine);
  });

  // Join the filtered lines to reconstruct the preprocessed text
  const preprocessedText = filteredLines.join('\n');

  return preprocessedText;
}

// File paths for input and output
const inputFile = 'Datasets/dataset.txt'; // Replace with your input file path
const timestamp = Date.now(); // Get the current timestamp
const outputFile = `PreProcessed_Data/output_${timestamp}.txt`; // Create the file name

// Read the input text from the file
fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading input file:', err);
    return;
  }

  // Preprocess the input text
  const preprocessedText = preprocessText(data);

  // Check if the output file exists, and if not, create it
  fs.stat(outputFile, (err, stats) => {
    if (err && err.code === 'ENOENT') {
      // The file doesn't exist, so create it
      fs.writeFile(outputFile, preprocessedText, 'utf8', (err) => {
        if (err) {
          console.error('Error creating output file:', err);
          return;
        }

        console.log('Preprocessing complete. The preprocessed text is saved in', outputFile);
      });
    } else if (!err) {
      // The file already exists, so overwrite it
      fs.writeFile(outputFile, preprocessedText, 'utf8', (err) => {
        if (err) {
          console.error('Error writing output file:', err);
          return;
        }

        console.log('Preprocessing complete. The preprocessed text is saved in', outputFile);
      });
    } else {
      console.error('Error checking output file:', err);
    }
  });
});