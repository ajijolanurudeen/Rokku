# Rokku-test
 #Project Overview
This is a RESTful API built with Node.js, TypeScript, Express, and SQLite. It provides user management functionalities, including user authentication, address handling, and post management.

 #Features
User Management: Create, list, and retrieve user details.
Address Management: Store and retrieve user addresses.
Post Management: Create, retrieve, and delete user posts.
SQLite Database: Uses Knex.js as the query builder.
Validation & Error Handling: Ensures data integrity.
Pagination Support: Fetch paginated user lists.


SET UP INSTRUCTIONS
CLONE THE REPOSITORY
NPM INSTALL
CREATE ENVIRONMENT VARIABLES
SET UP THE DATABASE : npx knex migrate:latest
START THE SERVER:
npm run dev
