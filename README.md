# Auto Deposit

# Description

This is a full-stack application that imitates a deposit for auto pieces, including pieces that are sold, clients, categories, providers and orders (their names will appear in Romanian, my native language, as the project has been started after creating the database in Romanian, and decided to keep the theme).

The purpose of this application was to exercise implementing Spring Boot and React into a full-stack application (with PostgreSQL as the database solution).


# Installation

In order to run this project locally, please follow these steps:

  1. Fork the repository on to your machine
  2. Open the "Frontend" folder in Visual Studio Code (or the editor of your choice) and run "npm install". You can then run the Frontend with npm "npm run dev".
  3. Create a database utilizing the "PGScript" file (PostgreSQL was utilized for this project).
  4. Open the "Backend" folder in IntelliJ IDEA (or the IDE of your choice) and, in the "Application Properties" file (found at src -> main -> resources) replace the Database credentials with your own.
  5. Run the Backend through AutoDepositApplication (found at src -> main -> java -> deposit.AutoDeposit).
  6. You are now ready to navigate this project at localhost:5173


# Languages / Frameworks used

Frontend: React + Typescript

Backend: Spring Boot + Java

Database: PostgreSQL

Other used technologies worth mentioning: Maven, Node.js, Axios, Bootstrap, Tailwind, Postman


# Structure (high-level overview)

A high-level overview of the project structure:

### Backend (Spring Boot)

In the Backend, the Java classes are structured in the following folders: 
  1. Controller: Handles HTTP requests and defines API endpoints.
  2. DTO: Transfers specific data between layers, ensuring security and clarity.
  3. Entity: Maps to database tables and defines the data structure.
  4. Repository: Handles database operations like queries and CRUD.
  5. Service: Implements business logic and connects Controller to Repository.

![image](https://github.com/user-attachments/assets/e71d569a-2293-4137-b332-826059953b2b) 

### Frontend (React)

In the Frontend, the structure contains the following:
  1. Components folder, where you can find the React components.
  2. The App component, which defines the Routes and renders the other components
  3. The Main component, which defines the Root and renders the App.

![image](https://github.com/user-attachments/assets/ceedbc35-47e9-437e-9ff1-21c3ec1e0afc)

### Database (PostgreSQL)

In the Database, the structure contains all the tables that make up the Database.

![image](https://github.com/user-attachments/assets/791f3c4c-fa63-48c8-b1a8-bb97021a4e3a)


# Walkthrough

### Homepage:

This is the page that the user is greeted on. There is a header present with other options he can click on, and, if he scrolls down, he can see the Providers for the Auto Pieces (from the Database)

![image](https://github.com/user-attachments/assets/29cae660-1219-4c9f-97f6-7ab8280bda54)


### Pieces

This page shows a list of all the auto parts available (as entries in the Database). Each auto part has a button for deletion (which delets the entry from the Database) and for editting (which brings up a form for editting the entry).

Above the available auto parts, the user can see all the parts categories that are currently present in the database.

The user can scroll down and see a form for creating new auto parts.

![image](https://github.com/user-attachments/assets/4e8fa8ec-a160-44e1-9631-efb39c301962)


### Orders

This page shows a form for creating an order (where you select the piece and the client according to what is available in the database).

When scrolling down, the user sees a history of orders.

![image](https://github.com/user-attachments/assets/2be84e7d-2266-491b-85b9-b7bf833aa428)


### Clients

This page presents a list of all the current clients (taken as entries from the database).

User can delete or edit these entries.

User can also scroll down to find a form for creating a new client.

![image](https://github.com/user-attachments/assets/8b0d139b-ae23-46cc-887a-cdf3db30ca5e)


# Future Improvements

  1. Create authentication system through Auth0, so each client represents an actual account.
  2. Create checkout form for "buying" the auto parts, and have them deleted after buying them - this should only work for a logged in user.
  3. Limit only accounts with certain roles to edit and create new auto parts.

# Thank you for reading!


