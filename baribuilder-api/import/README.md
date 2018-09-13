# Overview

Read more about Graphcool Data Import: https://www.graph.cool/docs/reference/data-import-and-export/data-import-ol2eoh8xie

Steps:

1) Pull data from existing data source (SQL, MongoDB, etc)
2) Transform it into Graphcool's NDF (nodes, lists, and relations)
3) Use import tooling (e.g. Graphcool CLI) to chunk upload

Notes:
* 10mb max per NDF file

# Importing NDF

`graphcool import --data import/data.zip`