# Cat Lovers Application: Dockerized

This project is a **Dockerized version** of the Cat Lovers application built with Node.js and MongoDB. The application allows users to add their favorite cat names and photos to a gallery.

---

## 📋 Prerequisites

Before you get started, ensure you have the following installed on your system:

- **Docker**: [Download and Install Docker](https://www.docker.com/products/docker-desktop)  
- **Docker Compose**: Comes pre-installed with Docker Desktop. Verify using:
  ```bash
  docker-compose --version
  ```

---

## 🚀 Getting Started

### 1. Clone the Repository
Clone this repository to your local machine using the following command:
```bash
git clone [<repository-link>](https://github.com/stellajo99/SIT725.git)
cd <directory-of-the-cloned-project>
```

---

### 2. Running the Application

To build and run the Docker containers for this application, follow these steps:

1. **Start the application using Docker Compose**:
   ```bash
   docker-compose up --build
   ```
   - This will build the required Docker images and start the `app` and `mongodb` containers.

2. **Access the application**:
   - Open your browser and go to:  
     ```
     http://localhost:8080
     ```

---

### 3. Stopping the Application

To stop the running containers, execute:
```bash
docker-compose down
```
This will shut down all services defined in the `docker-compose.yml` file.

---

### 4. MongoDB Configuration

- **MongoDB Connection**: The application connects to MongoDB using the following connection string:
  ```
  mongodb://mongodb:27017/catDB
  ```
- **Default MongoDB Port**: 27017

---

## 🛠 Project Structure

Here is a breakdown of the project structure:

```
project-folder/
│
├── public/                 # Static assets (CSS, JS, etc.)
├── views/                  # HTML templates
├── config/                 # Configuration files (MongoDB connection)
├── controllers/            # Application logic
├── models/                 # Database schema
├── Dockerfile              # Docker build instructions
├── docker-compose.yml      # Multi-container configuration
├── package.json            # Node.js dependencies
└── README.md               # Project documentation
```

---

## 🔗 Repository Link

You can access the full repository here:  
[GitHub Repository](https://github.com/stellajo99/SIT725.git)

---

## 🤔 Troubleshooting

- **Issue: App not accessible at `http://localhost:8080`**  
  Solution: Ensure the containers are running by checking:
  ```bash
  docker ps
  ```

- **Issue: MongoDB not connecting**  
  Solution: Verify that the MongoDB container is running and the `MONGO_URL` in `docker-compose.yml` is correct.

---

## ✨ Credits

- **Developer**: Stella Jo 
- **Course**: SIT725 (Applied Software Engineering)

