# 🚀 Smart Task Scheduling System

A professional Full-Stack RESTful API built with **Node.js**, **Express**, and **PostgreSQL**. This system automatically generates an optimized daily work schedule using a **Greedy Scheduling Algorithm**.

---

## 📌 Introduction

The **Smart Task Scheduling System** is designed to help users efficiently manage and schedule tasks within a standard 8-hour workday. It uses a **Greedy Algorithm (Earliest Deadline First + Priority Weighting)** to intelligently allocate tasks based on urgency and importance.



## ✨ Features

* ✅ Full CRUD: Create, Read, Update, Delete tasks
* 🧠 Smart Scheduler (8-hour workday: 09:00 AM – 05:00 PM)
* 🎨 Frontend Dashboard 
* 🔐 JWT Authentication
* 🧪 Unit Testing with Jest
* 🐳 Dockerized Setup

---

## 🛠️ Tech Stack

| Layer    | Technology                      |
| -------- | ------------------------------- |
| Backend  | Node.js, Express.js             |
| Database | PostgreSQL 15                   |
| Frontend | HTML5, JavaScript, Tailwind CSS |
| Security | JWT, BcryptJS                   |
| Testing  | Jest                            |
| DevOps   | Docker, Docker Compose          |

---

## ⚙️ Setup & Installation

### 1️⃣ Quick Start (Docker - Recommended)

```bash
docker-compose up --build -d
```

🌐 Access the app at:

```
http://localhost:3000
```

---

### 2️⃣ Manual Setup

#### Install Dependencies

```bash
npm install
```

#### Setup Database

Create a `.env` file:

```env
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_db
JWT_SECRET=your_secret_key
```

#### Start Server

```bash
npm run dev
```

---

## ▶️ Usage

1. Login using:

   * Username: `admin`
   * Password: `admin123`

2. Create tasks via API or frontend dashboard

3. Generate schedule:

```bash
POST /tasks/schedule
```

---

## 📡 API Documentation

### 🔐 Authentication

| Method | Endpoint | Description       |
| ------ | -------- | ----------------- |
| POST   | `/login` | Authenticate user |

---

### 📋 Task Management

| Method | Endpoint     | Description        |
| ------ | ------------ | ------------------ |
| GET    | `/tasks`     | Retrieve all tasks |
| POST   | `/tasks`     | Create a task      |
| PUT    | `/tasks/:id` | Update task        |
| DELETE | `/tasks/:id` | Delete task        |

---

### 🗓️ Scheduling

| Method | Endpoint          | Description             |
| ------ | ----------------- | ----------------------- |
| POST   | `/tasks/schedule` | Generate daily schedule |

---

## 🧠 Scheduling Logic (The Algorithm)

The system uses a **Greedy Algorithm** combining:

### 1. Sorting

* Priority (High → Low)
* Deadline (Earliest first)

### 2. Allocation

* Fits tasks into a **480-minute window**
* Starts at **09:00 AM**

### 3. Validation

* Tasks exceeding **05:00 PM** are marked as:

  * ❌ *Unscheduled*

---

## 🧪 Running Unit Tests

Run tests with:

```bash
npm test
```

This validates scheduling accuracy .

---

## ⚙️ Configuration

Environment variables:

```env
PORT=3000
JWT_SECRET=your_secret
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=tasks_db
```

---

## ☁️ Deployment

### Docker (Production)

```bash
docker-compose up -d
```

### Notes

* Set strong `JWT_SECRET`
* Use managed PostgreSQL (AWS RDS, etc.)
* Enable HTTPS in production

---

## 🐞 Troubleshooting

| Issue               | Solution                            |
| ------------------- | ----------------------------------- |
| DB not connecting   | Check `.env` credentials            |
| Port already in use | Change `PORT` value                 |
| Docker issues       | Run `docker-compose down` and retry |

---

## 👨‍💻 Contributors

* Suneth Madhuwantha

---

## ⭐ Final Notes

This project demonstrates:

* Full-stack API development
* Algorithm-based scheduling
* Secure authentication
* Production-ready DevOps setup

Feel free to fork, improve, and scale 
