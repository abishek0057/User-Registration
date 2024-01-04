### User Management API Endpoints

| HTTP Method | Endpoint           | Description                                           |
|-------------|--------------------|-------------------------------------------------------|
| GET         | /user/:email   | Get details of a single user by email                  |
| GET         | /users         | Get a list of all users                               |
| POST        | /register      | Register a new user                                    |
| POST        | /login         | Login                                                   |
| PATCH       | /reset         | Reset user password                                    |
| DELETE      | /remove        | Delete a user                                          |

The table summarizes the API endpoints available for managing users. These endpoints handle operations like fetching user details, registering new users, logging in, resetting passwords, and deleting users. The endpoints handle various HTTP methods like GET, POST, PATCH, and DELETE for performing specific actions related to user management.
