# TextileHub 🧵

A production-ready, enterprise-level MERN Stack Textile/Fabric E-Commerce Platform built as a DevOps portfolio project.

---

## 📋 Overview

TextileHub is a modern textile marketplace where manufacturers, wholesalers, and customers can browse, search, and purchase fabrics online. It features a clean, scalable architecture following industry best practices.

---

## 🚀 Tech Stack

### Frontend
- **React 19** + **Vite** — Modern build tooling
- **Tailwind CSS** — Utility-first styling
- **Redux Toolkit** — Global state management
- **React Router** — Client-side routing
- **Axios** — HTTP client with interceptors
- **Framer Motion** — Animations
- **React Icons** — Icon library

### Backend
- **Node.js** + **Express.js** — REST API server
- **MongoDB** + **Mongoose** — Database and ODM
- **JWT** — Authentication
- **Bcrypt** — Password hashing
- **Multer** — File/image uploads
- **Helmet** — Security headers
- **Morgan** — HTTP request logging
- **CORS** — Cross-origin requests

---

## 📁 Project Structure

```
e-commerce/
├── frontend/
│   └── src/
│       ├── components/         # Navbar, Footer, ProductCard
│       ├── pages/              # All page components
│       │   └── admin/          # Admin panel pages
│       ├── redux/
│       │   └── slices/         # authSlice, cartSlice, productSlice, orderSlice
│       ├── services/           # axios api.js
│       ├── hooks/              # useCart custom hook
│       └── utils/              # helper functions
├── backend/
│   └── src/
│       ├── config/             # MongoDB connection
│       ├── controllers/        # Business logic
│       ├── routes/             # Express routes
│       ├── models/             # Mongoose schemas
│       ├── middlewares/        # Auth, error, upload
│       └── utils/              # generateToken, upload
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🔐 User Roles

| Role | Permissions |
|------|------------|
| Customer | Browse, Cart, Checkout, Order tracking, Profile |
| Admin | All customer features + Manage Products, Categories, Orders, Users |

---

## 🛍️ Product Categories

Cotton, Silk, Linen, Denim, Polyester, Rayon, Velvet, Wool, Khaddar, Printed Fabric, Embroidery Fabric, Curtain Fabric, Sofa Fabric, Bedsheets, Uniform Fabric, Industrial Fabric

---

## 🔌 REST API Endpoints

### Auth (`/api/v1/auth`)
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/register` | Public |
| POST | `/login` | Public |
| GET | `/profile` | Private |
| PUT | `/profile` | Private |

### Products (`/api/v1/products`)
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/` | Public |
| GET | `/:id` | Public |
| POST | `/` | Admin |
| PUT | `/:id` | Admin |
| DELETE | `/:id` | Admin |
| POST | `/:id/reviews` | Private |

### Orders (`/api/v1/orders`)
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/` | Private |
| GET | `/myorders` | Private |
| GET | `/:id` | Private |
| PUT | `/:id/pay` | Private |
| GET | `/` | Admin |
| PUT | `/:id/status` | Admin |

### Categories (`/api/v1/categories`)
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/` | Public |
| POST | `/` | Admin |
| DELETE | `/:id` | Admin |

### Users (`/api/v1/users`)
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/` | Admin |
| DELETE | `/:id` | Admin |

---

## 🛠️ Local Development Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm

### 1. Clone the repository
```bash
git clone <repository-url>
cd e-commerce
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env    # Edit with your values
npm install
npm run dev             # Runs on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
cp .env.example .env
npm install
npm run dev             # Runs on http://localhost:5173
```

---

## 🐳 Docker Setup

### Start all services with Docker Compose
```bash
docker-compose up --build
```

This starts:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **MongoDB**: localhost:27017

---

## 🔧 Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/textilehub
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=30d
NODE_ENV=development
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api/v1
```

---

## 🏗️ DevOps Ready

This project is structured for deployment using:
- **Docker** — Multi-stage builds for frontend and backend
- **Docker Compose** — Local orchestration
- **Jenkins** — CI/CD pipelines
- **Terraform** — Infrastructure as Code (AWS)
- **Ansible** — Configuration management
- **Amazon ECR** — Container registry
- **Amazon EKS** — Kubernetes cluster
- **Helm** — Kubernetes package manager
- **Prometheus + Grafana** — Monitoring and alerting
- **CloudWatch** — AWS observability

---

## ✨ Features

- ✅ User Registration & Login with JWT
- ✅ Role-based access (Customer / Admin)
- ✅ Product catalog with search, filter, pagination
- ✅ Product details with reviews and ratings
- ✅ Shopping cart with localStorage persistence
- ✅ Multi-step checkout (Shipping → Payment → Review)
- ✅ Order tracking with status pipeline
- ✅ Order history for customers
- ✅ Admin Dashboard with analytics
- ✅ Admin Product CRUD with image upload
- ✅ Admin Order status management
- ✅ Admin User management
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Loading skeletons
- ✅ 404 page

---

## 🔮 Future Improvements

- [ ] Email notifications (SendGrid/Nodemailer)
- [ ] Stripe payment integration
- [ ] Redis caching for product listings
- [ ] Elasticsearch for advanced search
- [ ] Coupon and discount system
- [ ] Wishlist with persistent storage
- [ ] Product image zoom feature
- [ ] GraphQL API option
- [ ] Unit & integration test coverage
- [ ] Dark mode toggle

---

## 📄 License

MIT License — free to use for portfolio and commercial projects.

---

*Built with ❤️ as an enterprise DevOps portfolio project.*
