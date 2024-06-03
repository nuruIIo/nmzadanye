# User Management API

This is a Node.js-based user management API that allows for user registration, login, profile updates, and profile retrieval. The project uses Express.js, Sequelize (with MySQL), bcrypt for password hashing, and JWT for authentication.

## Features

- User registration
- User login
- Update user profile
- Retrieve user profile
- Retrieve all user profiles with pagination
- JWT authentication
- Input validation

## Requirements

- Node.js
- npm (or yarn)
- MySQL

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up the database**

   - Make sure MySQL is installed and running.
   - Create a new MySQL database.
   - Update the `config/config.json` file with your database credentials.

4. **Set up environment variables**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=yourdatabase
   JWT_SECRET=yourjwtsecret
   ```

5. **Run the application**

   ```bash
   npm start
   ```

## Usage

### Endpoints

- **Register User**

  ```http
  POST /api/register
  ```

  **Request Body:**

  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

- **Login User**

  ```http
  POST /api/login
  ```

  **Request Body:**

  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

- **Update User Profile**

  ```http
  PUT /api/profile/:id
  ```

  **Request Body:**

  ```json
  {
    "name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "gender": "male",
    "photo": "path/to/photo.jpg"
  }
  ```

- **Get User Profile**

  ```http
  GET /api/profile/:id
  ```

- **Get All User Profiles**

  ```http
  GET /api/profiles?page=1&limit=10
  ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## Acknowledgements

- [Express.js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
```

Replace placeholders like `yourusername/your-repo-name`, `yourpassword`, `yourdatabase`, and `yourjwtsecret` with the actual values for your project. This `README.md` should give users a clear understanding of how to set up and use your user management API.
