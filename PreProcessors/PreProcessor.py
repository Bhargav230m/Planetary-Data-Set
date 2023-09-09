import re
import os

# Define a regular expression pattern to match characters for cleaning
cleaningstring = r'[0-9{}☿♀🜨♂♃⛢5⚶♄⚳☾⯰♇♅♆1♇1.,!@#$%^&*()_+=-~`"\':;.><,/?☉₹]'

def preprocess_text(input_text):
    # Lowercasing the dataset
    lowercase_text = input_text.lower()
    # Remove characters using regular expression
    cleaned_text = re.sub(cleaningstring, '', lowercase_text)

    # Split the input text into an array of lines
    lines = cleaned_text.split('\n')

    # Define a regular expression pattern to match gibberish lines
    gibberish_pattern = r'^[^\w\d]*'

    # Filter out blank lines and gibberish lines
    filtered_lines = [line for line in lines if line.strip() != '' and not re.match(gibberish_pattern, line)]

    # Join the filtered lines to reconstruct the preprocessed text
    preprocessed_text = '\n'.join(filtered_lines)

    return preprocessed_text

# File paths for input and output
input_file = 'Datasets/dataset.txt'  # Replace with your input file path
timestamp = int(time.time())  # Get the current timestamp
output_file = f'PreProcessed_Data/output_{timestamp}.txt'  # Create the file name

# Read the input text from the file
try:
    with open(input_file, 'r', encoding='utf8') as file:
        data = file.read()
except FileNotFoundError as e:
    print(f'Error reading input file: {e}')
    exit()

# Preprocess the input text
preprocessed_text = preprocess_text(data)

# Check if the output file exists, and if not, create it
if not os.path.isfile(output_file):
    try:
        with open(output_file, 'w', encoding='utf8') as file:
            file.write(preprocessed_text)
        print('Preprocessing complete. The preprocessed text is saved in', output_file)
    except Exception as e:
        print(f'Error creating output file: {e}')
else:
    try:
        with open(output_file, 'w', encoding='utf8') as file:
            file.write(preprocessed_text)
        print('Preprocessing complete. The preprocessed text is saved in', output_file)
    except Exception as e:
        print(f'Error writing output file: {e}')
