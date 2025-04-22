# 💬 Real-Time Chat Application

A full-stack real-time chat application built with **Spring Boot**, **MySQL**, and **React.js**. The app supports user authentication, contact management, and real-time messaging (both one-to-one and group chats) using WebSockets and STOMP protocol.

---

## 🚀 Features

- ✅ User registration and login with JWT authentication
- ✅ Add and manage contacts
- ✅ One-to-one real-time chat
- ✅ Group chat functionality
- ✅ WebSocket-based real-time communication using STOMP
- ✅ Responsive frontend UI using React and Material-UI (MUI)

---

## 🛠️ Tech Stack

### Backend
- Java with **Spring Boot**
- **Spring Security** with JWT-based authentication and authorization
- **Spring Data JPA** and **Hibernate ORM**
- **MySQL** as the relational database
- **Lombok** to reduce boilerplate code
- **WebSocket & STOMP** for real-time communication

### Frontend
- **React.js**
- **SockJS** and **STOMP.js** for WebSocket integration
- **Material-UI (MUI)** for styling and responsive UI components

---

## 📦 Installation & Setup

### Prerequisites
- Java 17+
- Node.js & npm
- MySQL Server

### Backend Setup
#### Update application.properties with your DB credentials
```bash
cd chatservice
./mvnw spring-boot:run
```

### Frontend Setup
```bash
cd chatclient
npm install
npm run dev
```
### 🌐 Frontend Development Server

Once the React app is running, open it in your browser:

[http://localhost:5173/](http://localhost:5173/)

---
## 🔒 Authentication Flow
  JWT is used to secure endpoints after login.
  Access tokens are stored and attached to every request to secure communication.
  User roles and authorization are managed using Spring Security.

## 🌐 WebSocket Integration
  Real-time communication powered by WebSocket, STOMP, and SockJS.
  Channels are created for one-to-one and group conversations.
  The frontend listens for incoming messages via subscriptions and renders them in real-time.

## 🙌 Contributing
  Contributions, issues, and feature requests are welcome!
  Feel free to fork the repo and submit a pull request.
  
---
