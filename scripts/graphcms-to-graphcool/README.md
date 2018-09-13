# Objective

Move product data from GraphCMS into Graphcool

# Approach

Do a full query from GraphCMS to get all the data into a JSON file. Write node code to read the JSON and wrangle it
into Graphcool's data model. Push to Graphcool.

# Usage

Set `input_filename`, `project_id` appropriately in `run.py`, then `python3 run.py`.