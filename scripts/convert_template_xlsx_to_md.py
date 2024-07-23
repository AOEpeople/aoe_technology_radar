"""
Module Description:
This module converts each row of a specified Excel file into individual Markdown files.
Each Markdown file is named after the 'name' column of the row and contains metadata and descriptions
based on the row's content. The files are saved in a specified directory.
"""

import pandas as pd
import os

def convert_excel_to_markdown(excel_path, output_directory):
    """
    Converts each row of an Excel file into individual Markdown files.

    Parameters:
    - excel_path (str): The path to the Excel file.
    - output_directory (str): The directory to save the Markdown files.
    """

    # Step 1: Read the Excel file
    df = pd.read_excel(excel_path)

    # Step 2: Iterate through each row
    for index, row in df.iterrows():
        # Extract necessary information
        title = row['name'].replace("/", "")
        ring = row['ring'].lower()
        quadrant = row['quadrant']
        isNew = 'TRUE' if row['isNew'] == True else ''
        description = row['description'] if not pd.isnull(row['description']) else ''
    
        # Format the Markdown content
        markdown_content = f"""---
    title: "{title}"
    ring: {ring}
    quadrant: {quadrant}
    isNew: {isNew}
    """

        # Step 3: Save as Markdown file
        # Replace spaces and slashes for file compatibility
        file_name = f"{title}.md".replace(" ", "_").replace("/", "_")  
        file_path = os.path.join(output_directory, file_name)
        with open(file_path, 'w') as file:
            file.write(markdown_content)

if __name__ == "__main__":
    excel_path = 'data/radar/2024-07-23_template.xlsx'
    output_directory = 'data/radar/2024-07-23'
    convert_excel_to_markdown(excel_path, output_directory)