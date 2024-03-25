# Project Beer Collection API

## Introduction
The Project Beer Collection API is a web-based back-end service designed to facilitate the management of a collection of beers. It offers a set of endpoints allowing users to perform various operations such as creating new beers, listing all entries, searching for beers by name, and updating beer ratings.

## Project Beer Collection API Features
- Ability to add a new beer to the collection.
- Capability to list all beers in the collection.
- Functionality to search for a beer by name.
- Option to update the rating of a specific beer.

## Installation Guide
1. Clone this repository from [GitHub](https://github.com/mariomos/web-base-backend-js).
2. Navigate to the project directory in your terminal.
3. Execute `npm install` to install all dependencies.
4. For simplicity, the API_KEY is not stored in a .env file in this demonstration. In a real-world scenario, it is recommended to utilize environment variables for sensitive information.

## Usage
1. Run `npm run dev` to start the application.
2. Access the API endpoints using Postman or any other API testing tool.
3. The API will be available at `http://localhost:3000`.
4. To sort all the products by name, type, rating or createdAt in ascending or descending order, use the following query parameters:
   - Sort by name:
     - `/api/products/?sortBy=name&order=desc` (descending order)
     - `/api/products/?sortBy=name&order=asc` (ascending order)
   - Sort by type:
     - `/api/products/?sortBy=type&order=desc` (descending order)
     - `/api/products/?sortBy=type&order=asc` (ascending order).

Example:
[http://localhost:3000/api/products/?sortBy=name&order=desc](http://localhost:3000/api/products/?sortBy=name&order=desc)

## API Endpoints
| HTTP Method | Endpoint                   | Description                     |
|-------------|----------------------------|---------------------------------|
| POST        | /api/products              | Create a new beer               |
| GET         | /api/products              | Get all beers                   |
| GET         | /api/products/:id          | Get a beer by ID                |
| GET         | /api/products/search/:name | Search for a beer by name       |
| PUT         | /api/products/:id          | Update a beer's rating          |
| PATCH       | /api/products/updateRating/:id | Update a beer's rating by ID |
| DELETE      | /api/products/:id          | Delete a beer                   |

## Technologies Used
- Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- Express.js: A minimalist web application framework for Node.js.
- MongoDB: A popular NoSQL document database.
- Mongoose: An elegant MongoDB object modeling tool designed for Node.js.

## Authors
- Mario Moshigannis (https://github.com/mariomos) - Project Lead
