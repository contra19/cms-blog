# CMS Blog

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![Handlebars.js](https://img.shields.io/badge/Handlebars.js-000000?style=for-the-badge&logo=handlebarsdotjs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

## Overview

CMS Blog is a content management system designed for managing blog posts. It provides an easy-to-use interface for creating, editing, and deleting blog posts.

## Features

- User authentication and authorization
- Create, read, update, and delete blog posts
- Comment on blog posts
- Responsive design

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Sequelize
- Handlebars.js
- JavaScript
- Render (for deployment)

## Installation

This application is deployed on Render at https://cms-blog-t3b8.onrender.com/. <br>To run this application locally follow the instructions below:</br>

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Steps

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/cms-blog.git
    cd cms-blog
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    - Copy the `.env.TEMPLATE` file to `.env`:
        ```bash
        cp .env.TEMPLATE .env
        ```
    - Edit the `.env` file with your configuration.
      ```env
      DB_NAME='your_database_name'
      DB_USER='your_database_user'
      DB_PASSWORD='your_database_password'
      DB_HOST='localhost'
      DB_DIALECT='postgres'
      SESSION_SECRET='your_secret_key'
      ```

4. **Set up the database:**
    - Log in to PostgreSQL and create the database:
      ```sql
      CREATE DATABASE your_database_name;
      ```

5. **Start the application:**
    ```bash
    npm start
    ```

6. **If you would like to seed the database:**
    ```bash
    - stop the application from running
    - make sure that 'npm start' was used at least once prior to initialize the tables
    - execute the command: npm run seed
    - execute the command: npm start
    ``` 

## Usage

Once the server is running, you can access the application at `http://localhost:3000`.

## Deployment on Render

1. **Create a new Web Service on Render:**
   - Go to [Render](https://render.com/).
   - Click on "New" and select "Web Service".

2. **Connect your repository:**
   - Connect to your GitHub repository.
   - Select the repository for this project.

3. **Configure the environment variables:**
   - Add the environment variables listed in your `.env` file to the Render environment settings.

4. **Build and deploy:**
   - Render will automatically build and deploy your application.

## Project Structure

- `config/` - Configuration files
- `controllers/` - Controller logic
- `db/` - Database setup and models
- `middleware/` - Custom middleware
- `models/` - Database models
- `public/` - Static files
- `seeds/` - Seed files
- `utils/` - Utility functions
- `views/` - Handlebars templates

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to my classmates [Tristin Rohr](https://github.com/TristinRohr) and [Nick Zamboni](https://github.com/ndzamboni) for letting me bounce ideas and questions off of them as I progressed throughout this project.
- Special thanks to [ChatGPT](https://openai.com/chatgpt) for code review and helping when I got stuck.
