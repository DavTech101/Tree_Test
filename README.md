# Tree_TEST: Treenodes

## Description

Displays nodes from given object into a hierachical D3 tree graph.

## Installation

- Run npm install from the root folder.
- Run npm install from the client folder.
- Make an .env file and fill the variables as shown in example-env

## Usage

- Data:
  There are two ways to provide data to the appication either through Gist or data file:

  - Gist way: Enter a Gist file ID in the .env file and the file name ending in .json. The gist file should should be in the same format as api/data/nodes.js -> {data: [<dataObjects>]}.
  - Data way: Leave the Gist variables empty in the .env file and use the api/data/nodes.js as input.

- NEO4J Database connect:

  - To Connect to the database enter your credentials in .env file.

- To start the application:
  Run npm run dev from the root folder.
- View client Application on port 8080 and api Application on port 4000.
