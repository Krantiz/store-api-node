# Apparel Store
This server supports some crud operations of the Apparel Store

## Steps to set up the server.
To setup this server locally:
- Clone the project fron github
- Install the dependency by running ``` npm install```
- After that run ```npm run dev``` to spin the server in local
- Use postman collection in the root folder to test the APIs

## Technical Design Requirements
- Store all the data in a local JSON file. 
    ```=> {./src/data} this folder consists of all the data in JSON files.```
- You should not lose data if the server restarts. 
   ``` => we can ensure this by making few changes like:
        1. By Centralized error handling and logging mechanism
        2. By running the server on PM2 with clustered mode on (Added a sample pm2 config file to run)```
- Use typescript.
    ```=> I have used typescript in the project by most of the places type is defined as ```any```, it is just because of the time limit. We can create a common interface files to store all the tyo\pes and export them easily.```
- Just develop the REST APIs needed for this use case.
   ``` => Added the post man for the developed endpoints/APIs```

## Assumptions and Explanations
Assumption (Tyopescript, Folder structure, Not all APIs, What can be done)
- This Project is built on Typescript using express and some other npm libraries
- On running   ```npm run build``` we will find the final production ready app under ```build``` folder.

## API definition
- Role: Anyone
  Description: This API is used to seed the stocks data dynamically into the JSON file.
  Information: Method(POST) url(/create/stock/:items/:stockInEachItemRange/)

- Role: Vendor
  Description: This API is used to update quality and price for any one of the product's code & size
  Information: Method(PATCH) url(/update/stock/:code/:size/quality-and-price)

Note: Rest 3 APIs are pending, but I can develop them if i get some more time.

## UnitTest Cases
- Basic Unit test cases are added in the unit-test-cases.txt in root folder

