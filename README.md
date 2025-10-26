<div align="center">

# 🏠 Dau Hostel Management System

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v16+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0.3-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Material-UI](https://img.shields.io/badge/Material--UI-7.3.2-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)

### A comprehensive digital solution for modern hostel administration

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Documentation](#-documentation) •

---

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)


---

## 🎯 Overview

**Dau Hostel Management System** is a full-stack web application designed to streamline hostel operations for both students and administrators. The system provides a centralized platform for room allocation, fee management, complaint handling, visitor passes, events, and more.

### Key Highlights

✨ **Student-Centric Features**: Room selection, fee tracking, complaints, visitor passes, and event registration  
🛡️ **Admin Dashboard**: Comprehensive management tools for rooms, fees, complaints, analytics  
📱 **Responsive Design**: Modern UI built with Material-UI for seamless mobile experience  
🔐 **Secure Authentication**: JWT-based authentication with role-based access control  
🚀 **Performance**: Optimized with caching, rate limiting, and efficient database queries  

---

## ✨ Features

### 🎓 Student Portal

| Feature | Description |
|---------|-------------|
| 🏢 **Room Management** | Browse and request rooms with real-time availability |
| 💰 **Fee Tracking** | View dues, payment history, and upcoming deadlines |
| 🛠️ **Complaints** | Submit maintenance requests with photo upload |
| 🎫 **Visitor Pass** | Request guest entry with QR code generation |
| 📅 **Hostel Events** | Register for hostel events and activities |
| 🔍 **Lost & Found** | Report and claim lost items |
| 📬 **Notifications** | Real-time updates and announcements |
| 🏨 **Leave Requests** | Apply for hostel leave approvals |

### 👨‍💼 Admin Portal

| Feature | Description |
|---------|-------------|
| 📊 **Dashboard** | Overview of hostel statistics and analytics |
| 🏠 **Room Allocation** | Manage room assignments and room requests |
| 💵 **Fee Management** | Generate bills, track payments, send reminders |
| 🛠️ **Complaint Management** | Review, update status, and add admin notes |
| 🎫 **Visitor Pass Approval** | Approve/reject visitor requests with QR codes |
| 📅 **Event Management** | Create and manage hostel events |
| 📢 **Announcements** | Publish important notices to students |
| 📈 **Analytics** | View detailed reports and statistics |

### 🔒 Security Features

- ✅ **JWT Authentication**: Secure token-based authentication
- ✅ **Role-Based Access Control**: Student and Admin permissions
- ✅ **Rate Limiting**: API protection against abuse
- ✅ **Input Validation**: Request validation using Joi
- ✅ **CORS Protection**: Cross-origin resource sharing control
- ✅ **Password Hashing**: Bcrypt for secure password storage

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.1 | UI framework |
| **Material-UI** | 7.3.2 | Component library |
| **React Router** | 7.8.2 | Navigation |
| **Axios** | 1.11.0 | HTTP client |
| **React Hook Form** | 7.62.0 | Form management |
| **Yup** | 1.7.0 | Schema validation |
| **React Toastify** | 11.0.5 | Notifications |
| **Vite** | 7.1.4 | Build tool |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 16+ | Runtime environment |
| **Express** | 4.18.2 | Web framework |
| **MongoDB** | 8.0.3 | Database |
| **Mongoose** | 8.0.3 | ODM |
| **JWT** | 9.0.2 | Authentication |
| **Bcryptjs** | 2.4.3 | Password hashing |
| **Nodemailer** | 7.0.6 | Email service |
| **QRCode** | 1.5.4 | QR generation |
| **Multer** | 1.4.5 | File upload |
| **Helmet** | 7.1.0 | Security |
| **Express Rate Limit** | 7.1.5 | Rate limiting |
| **Joi** | 17.13.3 | Validation |

---

## 📁 Project Structure

```
DauHostelManagement/
├── 📂 backend/                    # Backend API
│   ├── 📂 src/
│   │   ├── 📂 config/            # Configuration (DB, env)
│   │   ├── 📂 controllers/       # Request handlers
│   │   ├── 📂 middleware/        # Custom middleware
│   │   ├── 📂 models/            # MongoDB schemas
│   │   ├── 📂 routes/            # API routes
│   │   ├── 📂 services/          # Business logic
│   │   ├── 📂 utils/             # Helper functions
│   │   └── 📂 validations/       # Input validation
│   ├── 📂 uploads/               # Uploaded files
│   ├── package.json
│   └── server.js
│
└── 📂 frontend/                   # Frontend React App
    ├── 📂 public/
    ├── 📂 src/
    │   ├── 📂 assets/            # Images, logos
    │   ├── 📂 components/        # Reusable components
    │   ├── 📂 context/           # React contexts
    │   ├── 📂 hooks/             # Custom hooks
    │   ├── 📂 layouts/           # Page layouts
    │   ├── 📂 pages/             # Page components
    │   ├── 📂 routes/            # Routing logic
    │   ├── 📂 services/          # API services
    │   ├── 📂 styles/            # CSS & themes
    │   ├── 📂 utils/             # Utilities
    │   └── 📂 validations/       # Form validations
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Installation

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v16.0.0 or higher)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn**
- **Git**

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/DauHostelManagement.git
cd DauHostelManagement
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Step 4: Environment Configuration

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/dau-hostel

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRES_IN=1d

# Cloudinary (for image uploads)
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Optional - for notifications)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

---

## ⚙️ Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | No (default: 5000) |
| `MONGO_URI` | MongoDB connection string | **Yes** |
| `JWT_SECRET` | Secret key for JWT tokens | **Yes** |
| `JWT_EXPIRES_IN` | JWT token expiration time | No (default: 1d) |
| `CLOUDINARY_NAME` | Cloudinary cloud name | For image uploads |
| `CLOUDINARY_API_KEY` | Cloudinary API key | For image uploads |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | For image uploads |
| `EMAIL_USER` | Email address | For email notifications |
| `EMAIL_PASS` | Email password | For email notifications |

---

## 💻 Usage

### Development Mode

#### Start Backend Server

```bash
cd backend
npm run dev    # Using nodemon for auto-restart
# or
npm start      # Normal start
```

The backend server will run on `http://localhost:5000`

#### Start Frontend Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173` (Vite default port)

### Production Build

#### Build Frontend

```bash
cd frontend
npm run build
```

The production build will be in the `dist` folder.

#### Deploy Backend

Deploy the backend to platforms like:
- **Heroku**
- **Railway**
- **Render**
- **AWS EC2**

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Main Endpoints

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/auth/register` | POST | User registration | No |
| `/api/auth/login` | POST | User login | No |
| `/api/rooms` | GET | Get all rooms | Yes |
| `/api/rooms` | POST | Create room | Admin Only |
| `/api/room-requests` | GET | Get room requests | Yes |
| `/api/room-requests` | POST | Create room request | Yes |
| `/api/fees` | GET | Get fees | Yes |
| `/api/fees` | POST | Create fee | Admin Only |
| `/api/complaints` | GET | Get complaints | Yes |
| `/api/complaints` | POST | Create complaint | Yes |
| `/api/visitor-passes` | GET | Get visitor passes | Yes |
| `/api/visitor-passes` | POST | Create visitor pass | Yes |
| `/api/hostel-events` | GET | Get events | Yes |
| `/api/hostel-events` | POST | Create event | Admin Only |
| `/api/lost-found` | GET | Get lost & found items | Yes |
| `/api/lost-found` | POST | Create lost & found post | Yes |
| `/api/notifications` | GET | Get notifications | Yes |

### Health Check
```bash
GET /health
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/DauHostelManagement.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Commit your changes**
   ```bash
   git commit -m "Add: amazing feature"
   ```

4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly

---


## 👥 Authors

**Dau Hostel Management Team**
- GitHub: [@Vitragshah2108](https://github.com/Vitragshah2108)

---

## 🙏 Acknowledgments

- **Material-UI** for the amazing component library
- **Vite** for the lightning-fast build tool
- **Express.js** for the robust backend framework
- **MongoDB** for the flexible database solution
- All the amazing open-source libraries that made this project possible

---

## 📞 Contact

For questions or support, please contact:
- 📧 Email: 202412100@dau.ac.in

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

Made with ❤️ by the Dau Hostel Management Team

[⬆ Back to Top](#-dau-hostel-management-system)

</div>

