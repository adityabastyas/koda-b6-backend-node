# Koda B6 Backend (Node.js)

Backend API untuk aplikasi Koda B6 - Platform E-Commerce yang dibangun menggunakan **Node.js** dengan framework **Express**, **PostgreSQL** sebagai database, dan **Redis** untuk caching.

## 📋 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Struktur Proyek](#struktur-proyek)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Docker Deployment](#docker-deployment)
- [Dokumentasi API](#dokumentasi-api)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

---

## ✨ Fitur Utama

### Authentication & Authorization
- ✅ User Registration dan Login
- ✅ JWT Token Authentication
- ✅ Role-Based Access Control (RBAC) untuk Admin
- ✅ Forgot Password dengan Email Verification
- ✅ User Profile Management & Photo Upload

### Product Management
- ✅ CRUD Operations untuk Products
- ✅ Multiple Product Images per Product
- ✅ Product Variants dan Sizes
- ✅ Product Categories
- ✅ Stock Management

### Shopping Features
- ✅ Shopping Cart Management
- ✅ Cart Items Management
- ✅ Discount & Promo System
- ✅ Transactions & Order History
- ✅ Order Details dengan Product Information
- ✅ Product Reviews & Ratings

### Additional Features
- ✅ CORS Support
- ✅ File Upload dengan Multer (Product Images, User Photos)
- ✅ Redis Caching
- ✅ Swagger API Documentation
- ✅ Database Migrations
- ✅ Error Handling & Validation

---

## 🛠 Tech Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Runtime** | Node.js | 24 (Alpine) |
| **Framework** | Express | 5.2.1 |
| **Language** | JavaScript (ES Modules) | Latest |
| **Database** | PostgreSQL | 18+ |
| **Cache** | Redis | 8.0+ |
| **Authentication** | JWT | 9.0.3 |
| **Password Hashing** | Argon2 | 0.44.0 |
| **File Upload** | Multer | 2.1.1 |
| **API Documentation** | Swagger/JSDoc | 6.2.8 |
| **CORS** | Cors Middleware | 2.8.6 |
| **Linter** | ESLint | 10.2.0 |
| **Containerization** | Docker | Latest |

---

## 📋 Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

- **Node.js** >= 18 ([Download](https://nodejs.org/))
- **npm** atau **yarn** (biasanya sudah tersedia dengan Node.js)
- **PostgreSQL** >= 15 ([Download](https://www.postgresql.org/download/))
- **Redis** >= 7.0 ([Download](https://redis.io/download))
- **Docker & Docker Compose** (Optional untuk containerization)
- **Git**
- **Postman** atau **curl** (untuk testing API)

---

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/adityabastyas/koda-b6-backend-node.git
cd koda-b6-backend-node
```

### 2. Install Dependencies

```bash
npm install
# atau jika menggunakan yarn
yarn install
```

### 3. Setup Database

Buat database PostgreSQL:

```bash
# Masuk ke PostgreSQL
psql -U postgres

# Buat database
CREATE DATABASE koda_b6;

# Exit
\q
```

### 4. Run Database Migrations (Jika Ada)

Jalankan file SQL migration (jika available):

```bash
# Masuk ke database
psql -U postgres -d koda_b6 -f migrations/001_init_db.sql
```

### 5. Setup Environment Variables

Buat file `.env` di root directory:

```bash
cp .env.example .env
# atau buat baru
touch .env
```

Isi `.env` dengan konfigurasi berikut:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=koda_b6

# Server Configuration
PORT=8888
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRATION=24h

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0

# Email Configuration (untuk Forgot Password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880  # 5MB dalam bytes

# API Documentation
API_VERSION=1.0.0
API_TITLE=Koda B6 Backend API
```

---

## ⚙️ Konfigurasi Environment Detail

### Database Configuration

```env
DB_HOST=localhost              # Host PostgreSQL
DB_PORT=5432                   # Port PostgreSQL
DB_USER=postgres               # Username database
DB_PASSWORD=your_password      # Password database
DB_NAME=koda_b6               # Nama database
```

### Server Configuration

```env
PORT=8888                      # Port server berjalan
NODE_ENV=development           # Environment (development/production)
```

### JWT & Authentication

```env
JWT_SECRET=your_secret_key    # Secret key untuk signing JWT (minimal 32 char)
JWT_EXPIRATION=24h            # Token expiration time
```

### Redis Configuration

```env
REDIS_HOST=localhost          # Host Redis
REDIS_PORT=6379              # Port Redis
REDIS_DB=0                   # Redis database number
REDIS_PASSWORD=              # Password Redis (jika ada)
```

### File Upload Configuration

```env
UPLOAD_PATH=./uploads         # Direktori untuk upload files
MAX_FILE_SIZE=5242880        # Max file size dalam bytes (5MB)
ALLOWED_MIME_TYPES=image/jpeg,image/png,image/webp  # Tipe file yang diizinkan
```

---

## 🏃 Menjalankan Aplikasi

### Development Mode (Dengan Auto Reload)

```bash
npm run dev
```

Fitur watch otomatis akan restart server ketika ada perubahan file.

**Output:**
```
App listening on port 8888
database berhasil terhubung
```

### Production Mode

```bash
npm start
```

### Debug Mode

```bash
# Dengan debugging information
DEBUG=* npm start

# Atau gunakan Node inspector
node --inspect src/main.js
```

---

## 📁 Struktur Proyek

```
koda-b6-backend-node/
├── src/
│   ├── controllers/              # Request handlers
│   │   ├── auth.controller.js    # Authentication logic
│   │   ├── product.controller.js # Product CRUD
│   │   ├── users.controller.js   # User management
│   │   ├── cart.controller.js    # Cart operations
│   │   ├── transaction.controller.js  # Transactions
│   │   ├── reviews.controller.js      # Reviews & ratings
│   │   ├── discount.controller.js     # Discounts
│   │   ├── promo.controller.js        # Promos
│   │   ├── kategory.controller.js     # Categories
│   │   ├── productImages.controller.js
│   │   ├── productSize.controller.js
│   │   ├── productVariant.controller.js
│   │   ├── cartItem.controller.js
│   │   └── transactionProduct.controller.js
│   │
│   ├── models/                   # Database queries
│   │   ├── users.models.js
│   │   ├── product.models.js
│   │   ├── cart.models.js
│   │   ├── cartItem.models.js
│   │   ├── transaction.models.js  (if exists)
│   │   ├── reviews.models.js
│   │   ├── discount.models.js
│   │   ├── promo.models.js
│   │   ├── kategory.models.js
│   │   ├── productImages.models.js
│   │   ├── productSize.models.js
│   │   ├── productVariant.models.js
│   │   ├── forgotPassword.models.js
│   │   └── transactionProduct.models.js
│   │
│   ├── routes/                   # API routes
│   │   ├── auth.router.js        # /auth routes
│   │   ├── users.router.js       # /users routes
│   │   ├── product.router.js     # /products routes
│   │   ├── cart.router.js        # /carts routes
│   │   ├── cartItem.router.js    # /cart-items routes
│   │   ├── transaction.router.js # /transactions routes
│   │   ├── reviews.router.js     # /reviews routes
│   │   ├── discount.router.js    # /discounts routes
│   │   ├── promo.router.js       # /promos routes
│   │   ├── kategory.router.js    # /kategorys routes
│   │   ├── productImages.router.js
│   │   ├── productSize.router.js
│   │   ├── productVariant.router.js
│   │   ├── transactionProduct.router.js
│   │   └── docs.js               # Swagger documentation
│   │
│   ├── middlewares/              # Express middlewares
│   │   ├── auth.middleware.js    # JWT verification
│   │   ├── rbac.middleware.js    # Role-based access control
│   │   └── upload.middleware.js  # File upload handling
│   │
│   ├── lib/                      # Utility functions
│   │   ├── db.js                 # PostgreSQL connection pool
│   │   ├── redis.js              # Redis client setup
│   │   ├── jwt.js                # JWT utilities
│   │   ├── hash.js               # Password hashing
│   │   └── cors.js               # CORS configuration
│   │
│   └── main.js                   # Entry point
│
├── uploads/                      # Uploaded files (images, etc)
│   └── [user-uploaded files]
│
├── migrations/                   # Database migrations (if any)
│   └── 001_init_db.sql
│
├── package.json                  # NPM dependencies
├── package-lock.json             # Dependency lock file
├── Dockerfile                    # Docker image configuration
├── docker-compose.yml            # (Optional) Multi-container setup
├── .env.example                  # Environment variables template
├── eslint.config.js              # ESLint configuration
├── .gitignore                    # Git ignore rules
└── README.md                     # Project documentation
```

---

## 🔌 API Endpoints

### Authentication Routes
```
POST   /auth/register              # Register user baru
POST   /auth/login                 # Login user
POST   /auth/forgot-password       # Request forgot password
PATCH  /auth/forgot-password       # Reset password dengan token
```

### User Routes
```
GET    /users                      # Get all users (Protected)
GET    /users/:id                  # Get user by ID (Protected)
POST   /users/upload               # Upload user photo (Protected)
PATCH  /users/profile              # Update user profile (Protected)
```

### Product Routes
```
GET    /products                   # Get all products
GET    /products/:id               # Get product by ID
GET    /products/category/:catId   # Get products by category
POST   /products                   # Create product (Admin)
PATCH  /products/:id               # Update product (Admin)
DELETE /products/:id               # Delete product (Admin)
```

### Category Routes
```
GET    /kategorys                  # Get all categories
GET    /kategorys/:id              # Get category by ID
POST   /kategorys                  # Create category (Admin)
PATCH  /kategorys/:id              # Update category (Admin)
DELETE /kategorys/:id              # Delete category (Admin)
```

### Promo Routes
```
GET    /promos                     # Get all promos
GET    /promos/:id                 # Get promo by ID
POST   /promos                     # Create promo (Admin)
PATCH  /promos/:id                 # Update promo (Admin)
DELETE /promos/:id                 # Delete promo (Admin)
```

### Discount Routes
```
GET    /discounts                  # Get all discounts
GET    /discounts/:id              # Get discount by ID
POST   /discounts                  # Create discount (Protected)
PATCH  /discounts/:id              # Update discount (Protected)
DELETE /discounts/:id              # Delete discount (Protected)
```

### Cart Routes
```
GET    /carts                      # Get all carts (Protected)
GET    /carts/:user_id             # Get cart by user ID (Protected)
```

### Cart Item Routes
```
GET    /cart-items/:user_id        # Get cart items by user (Protected)
POST   /cart-items/:user_id        # Add item to cart (Protected)
PATCH  /cart-items/:id             # Update cart item (Protected)
DELETE /cart-items/:id             # Delete cart item (Protected)
```

### Transaction Routes
```
GET    /transactions               # Get all transactions (Protected)
GET    /transactions/:id           # Get transaction by ID (Protected)
GET    /transactions/user/:user_id # Get user transactions (Protected)
POST   /transactions               # Create transaction (Protected)
DELETE /transactions/:id           # Delete transaction (Protected)
```

### Transaction Product Routes
```
GET    /transaction-products/:transaction_id  # Get products (Protected)
POST   /transaction-products/:transaction_id  # Add product (Protected)
DELETE /transaction-products/:id              # Delete product (Protected)
```

### Product Variant Routes
```
GET    /product-variants/:product_id          # Get variants
GET    /product-variants/detail/:id           # Get variant detail
POST   /product-variants                      # Create (Protected)
PATCH  /product-variants/:id                  # Update (Protected)
DELETE /product-variants/:id                  # Delete (Protected)
```

### Product Size Routes
```
GET    /product-sizes/:product_id             # Get sizes
GET    /product-sizes/detail/:id              # Get size detail
POST   /product-sizes                         # Create (Protected)
PATCH  /product-sizes/:id                     # Update (Protected)
DELETE /product-sizes/:id                     # Delete (Protected)
```

### Product Image Routes
```
GET    /product-images/:product_id            # Get images
POST   /product-images                        # Upload image (Protected)
DELETE /product-images/:id                    # Delete image (Protected)
```

### Review Routes
```
GET    /reviews                               # Get all reviews
GET    /reviews/product/:product_id           # Get product reviews
GET    /reviews/user/:user_id                 # Get user reviews (Protected)
POST   /reviews/:user_id                      # Create review (Protected)
DELETE /reviews/:id                           # Delete review (Protected)
```

---

## 🗄️ Database Schema

### Tables Overview

```
┌─────────────────┐     ┌──────────────────┐
│     users       │     │   categories     │
├─────────────────┤     ├──────────────────┤
│ id (PK)         │     │ id (PK)          │
│ email           │     │ name             │
│ password        │     │ description      │
│ name            │     │ created_at       │
│ photo_url       │     │ updated_at       │
│ role            │     └──────────────────┘
│ created_at      │              │
│ updated_at      │              │ 1:N
│ deleted_at      │              │
└─────────────────┘              │
        │                         │
        │ 1:N                     │
        │                    ┌──────────────┐
        │                    │   products   │
        │                    ├──────────────┤
        │                    │ id (PK)      │
        │                    │ name         │
        │                    │ description  │
        │                    │ price        │
        │                    │ category_id  │
        │                    │ stock        │
        │                    │ created_at   │
        │                    │ updated_at   │
        │                    │ deleted_at   │
        │                    └──────────────┘
        │                           │
        ├──────────────┬────────────┤
        │              │            │
        │         1:N  │            │ 1:N
        │              │            │
   ┌────────────┐  ┌────────────────────┐  ┌─────────────────┐
   │   carts    │  │ product_variants   │  │ product_images  │
   ├────────────┤  ├────────────────────┤  ├─────────────────┤
   │ id (PK)    │  │ id (PK)            │  │ id (PK)         │
   │ user_id(FK)│  │ product_id (FK)    │  │ product_id (FK) │
   │ total      │  │ color              │  │ url             │
   │ created_at │  │ size_id (FK)       │  │ created_at      │
   │ updated_at │  │ created_at         │  │ updated_at      │
   └────────────┘  │ updated_at         │  └─────────────────┘
        │          │ deleted_at         │
        │          └────────────────────┘
        │ 1:N              │
        │                  │ 1:N
   ┌─────────────┐    ┌──────────────────┐
   │ cart_items  │    │ product_sizes    │
   ├─────────────┤    ├──────────────────┤
   │ id (PK)     │    │ id (PK)          │
   │ cart_id(FK) │    │ product_id (FK)  │
   │ product_id  │    │ size             │
   │ quantity    │    │ stock            │
   │ price       │    │ created_at       │
   │ created_at  │    │ updated_at       │
   │ updated_at  │    │ deleted_at       │
   └─────────────┘    └──────────────────┘

┌──────────────────┐     ┌──────────────────────┐
│  transactions    │     │ transaction_products │
├──────────────────┤     ├──────────────────────┤
│ id (PK)          │     │ id (PK)              │
│ user_id (FK)     │     │ transaction_id (FK)  │
│ total_amount     │     │ product_id (FK)      │
│ status           │     │ quantity             │
│ created_at       │     │ price                │
│ updated_at       │     │ created_at           │
│ deleted_at       │     │ updated_at           │
└──────────────────┘     └──────────────────────┘

┌───────────────────┐      ┌──────────────┐
│     reviews       │      │   discounts  │
├───────────────────┤      ├──────────────┤
│ id (PK)           │      │ id (PK)      │
│ user_id (FK)      │      │ name         │
│ product_id (FK)   │      │ code         │
│ rating            │      │ discount_pct │
│ comment           │      │ active       │
│ created_at        │      │ created_at   │
│ updated_at        │      │ updated_at   │
│ deleted_at        │      │ deleted_at   │
└───────────────────┘      └──────────────┘

┌──────────────────────┐
│      promos          │
├──────────────────────┤
│ id (PK)              │
│ title                │
│ description          │
│ discount_pct         │
│ active               │
│ start_date           │
│ end_date             │
│ created_at           │
│ updated_at           │
│ deleted_at           │
└──────────────────────┘
```

### Sample SQL Queries

```sql
-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  photo_url TEXT,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Create products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Create categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create carts table
CREATE TABLE carts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🐳 Docker Deployment

### Build Docker Image

```bash
# Build image
docker build -t koda-b6-backend-node:latest .

# Run container dengan environment
docker run -p 8888:8888 \
  --env-file .env \
  --name koda-backend \
  koda-b6-backend-node:latest
```

### Docker Run dengan Link ke Database

```bash
# Run dengan network
docker network create koda-network

# PostgreSQL container
docker run -d \
  --name postgres-koda \
  --network koda-network \
  -e POSTGRES_DB=koda_b6 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  postgres:18-alpine

# Redis container
docker run -d \
  --name redis-koda \
  --network koda-network \
  redis:8.6.1-trixie

# Backend container
docker run -d \
  --name backend-koda \
  --network koda-network \
  -p 8888:8888 \
  --env DB_HOST=postgres-koda \
  --env REDIS_HOST=redis-koda \
  --env-file .env \
  koda-b6-backend-node:latest
```

### Docker Compose (Recommended)

Buat file `docker-compose.yml` (jika belum ada):

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:18-alpine
    container_name: postgres-koda
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - koda-network

  redis:
    image: redis:8.6.1-trixie
    container_name: redis-koda
    ports:
      - "6379:6379"
    networks:
      - koda-network

  backend:
    build: .
    container_name: backend-koda
    ports:
      - "8888:8888"
    depends_on:
      - postgres
      - redis
    environment:
      DB_HOST: postgres
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_NAME: ${DB_NAME}
      REDIS_HOST: redis
      PORT: 8888
    env_file:
      - .env
    networks:
      - koda-network

volumes:
  postgres_data:

networks:
  koda-network:
    driver: bridge
```

Run dengan Docker Compose:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down

# Stop dan remove volumes
docker-compose down -v
```

---

## 📚 Dokumentasi API

### Swagger/API Documentation

Dokumentasi API tersedia di:

```
http://localhost:8888/docs
```

### Akses Swagger UI

Pastikan API dokumentasi sudah dikonfigurasi di `routes/docs.js`.

### Testing API dengan cURL

```bash
# Register user
curl -X POST http://localhost:8888/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"user@example.com",
    "password":"password123",
    "name":"John Doe"
  }'

# Login
curl -X POST http://localhost:8888/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"user@example.com",
    "password":"password123"
  }'

# Response akan berisi JWT token
# {
#   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
# }

# Get all products
curl -X GET http://localhost:8888/products

# Get user (requires token)
curl -X GET http://localhost:8888/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Upload user photo
curl -X POST http://localhost:8888/users/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "photo=@/path/to/photo.jpg"

# Create product (Admin only)
curl -X POST http://localhost:8888/products \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Product Name",
    "description":"Product Description",
    "price":99.99,
    "category_id":1,
    "stock":100
  }'

# Add to cart
curl -X POST http://localhost:8888/cart-items/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id":1,
    "quantity":2,
    "price":99.99
  }'
```

### Testing dengan Postman

1. Import Postman collection (jika tersedia)
2. Set environment variables:
   - `base_url`: http://localhost:8888
   - `token`: JWT token dari login response
3. Test endpoints dengan klik Send

---

## 🧪 Testing

### Unit Testing

```bash
# Install testing library (optional)
npm install --save-dev jest supertest

# Run tests
npm test

# Run tests dengan coverage
npm test -- --coverage
```

### Manual Testing

Gunakan Postman atau curl untuk manual testing sesuai API endpoints di atas.

---

## 🔐 Security Best Practices

1. **Environment Variables** - Jangan commit `.env`, gunakan `.env.example`
2. **JWT Secret** - Gunakan string random yang kuat minimal 32 karakter
3. **Password Hashing** - Semua password harus di-hash dengan Argon2
4. **HTTPS** - Gunakan HTTPS di production
5. **CORS** - Restrict origin hanya dari frontend yang authorized
6. **Rate Limiting** - Implementasikan rate limiting untuk login/register
7. **Input Validation** - Validate semua input dari user
8. **SQL Injection** - Gunakan parameterized queries (sudah built-in di pg library)
9. **XSS Protection** - Sanitize output data
10. **Error Handling** - Jangan expose sensitive info di error messages

### CORS Configuration

Edit `src/lib/cors.js`:

```javascript
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};
```

---

## 🛠️ Development Guide

### Adding New Endpoint

1. **Create Controller** (`src/controllers/newfeature.controller.js`)

```javascript
export const create = async (req, res) => {
  try {
    const { name, description } = req.body
    // Logic here
    res.status(201).json({ message: 'Created' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
```

2. **Create Model** (`src/models/newfeature.models.js`)

```javascript
import pool from '../lib/db.js'

export const createNewFeature = async (data) => {
  const query = 'INSERT INTO newfeatures (name, description) VALUES ($1, $2) RETURNING *'
  const result = await pool.query(query, [data.name, data.description])
  return result.rows[0]
}
```

3. **Create Route** (`src/routes/newfeature.router.js`)

```javascript
import { Router } from 'express'
import * as controller from '../controllers/newfeature.controller.js'
import auth from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/', auth, controller.create)
router.get('/', controller.getAll)

export default router
```

4. **Register Route** (di `src/main.js`)

```javascript
import newfeatureRouter from './routes/newfeature.router.js'

app.use('/newfeatures', newfeatureRouter)
```

---

## 📦 NPM Scripts

```bash
# Start production
npm start

# Development dengan auto-reload
npm run dev

# Run linter
npx eslint src/

# Fix linting issues
npx eslint src/ --fix
```

---

## 📝 File Upload

### Konfigurasi Multer

File `src/middlewares/upload.middleware.js`:

```javascript
import multer from 'multer'
import { nanoid } from 'nanoid'
import path from 'path'

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const uniqueName = nanoid() + path.extname(file.originalname)
    cb(null, uniqueName)
  }
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp']
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type'))
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
})

export default upload
```

### Menggunakan di Controller

```javascript
router.post('/upload', auth, upload.single('photo'), controller.uploadPhoto)

export const uploadPhoto = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' })
  }
  
  const fileUrl = `/uploads/${req.file.filename}`
  res.json({ url: fileUrl })
}
```

---

## 🚨 Troubleshooting

### Port Already in Use

```bash
# Linux/Mac
lsof -i :8888
kill -9 <PID>

# Windows
netstat -ano | findstr :8888
taskkill /PID <PID> /F
```

### Database Connection Error

**Error:** `error: getaddrinfo ENOTFOUND localhost`

**Solution:**
- Pastikan PostgreSQL service running
- Check credentials di `.env`
- Verify host dan port

```bash
# Test connection
psql -h localhost -U postgres -d postgres
```

### Redis Connection Error

**Error:** `connect ECONNREFUSED 127.0.0.1:6379`

**Solution:**
- Pastikan Redis service running
- Check host dan port di `.env`

```bash
# Test Redis
redis-cli ping
# Output: PONG
```

### Permission Denied on Upload

**Error:** `EACCES: permission denied, open './uploads/'`

**Solution:**
```bash
# Create uploads directory dengan permissions
mkdir -p uploads
chmod 755 uploads
```

### Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 Performance Optimization

### Enable Caching dengan Redis

```javascript
import { createClient } from 'redis'

const redisClient = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
})

// Cache middleware
export const cacheMiddleware = (req, res, next) => {
  const key = `cache:${req.originalUrl}`
  redisClient.get(key, (err, data) => {
    if (data) {
      return res.json(JSON.parse(data))
    }
    next()
  })
}
```

### Database Query Optimization

```javascript
// Create indexes
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_product_category ON products(category_id);
CREATE INDEX idx_cart_user ON carts(user_id);
```

---

## 📄 Project Information

- **Repository**: [GitHub - koda-b6-backend-node](https://github.com/adityabastyas/koda-b6-backend-node)
- **Author**: Aditya Bastyas
- **Language**: JavaScript (Node.js)
- **Framework**: Express
- **License**: MIT
- **Status**: Active Development

---

## 🤝 Kontribusi

Kami terbuka untuk kontribusi! Silakan:

1. Fork repository
2. Buat branch untuk feature Anda (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Coding Standards

- Follow JavaScript/Node.js best practices
- Use meaningful variable names
- Add JSDoc comments untuk complex functions
- Test endpoints dengan curl/Postman sebelum PR
- Update dokumentasi jika ada perubahan API

---

## 📞 Support & Contact

Untuk pertanyaan atau issues:

- **GitHub Issues**: [Create Issue](https://github.com/adityabastyas/koda-b6-backend-node/issues)
- **Email**: Hubungi maintainer via GitHub profile

---


---

## 🎯 Roadmap

- [ ] Implement advanced caching strategies
- [ ] Add payment gateway integration (Midtrans/Stripe)
- [ ] Implement email notifications system
- [ ] Add advanced search with Elasticsearch
- [ ] Real-time notifications dengan WebSocket
- [ ] Admin dashboard analytics
- [ ] Batch operations untuk admin
- [ ] Audit logging system
- [ ] API monitoring dan metrics
- [ ] GraphQL API alternative

---

## 📊 Project Stats

```
Language: JavaScript (ES Modules)
Runtime: Node.js 24 (Alpine)
Framework: Express 5.2.1
Database: PostgreSQL
Cache: Redis
Authentication: JWT
File Upload: Multer
API Style: RESTful
Documentation: Swagger/JSDoc
Container: Docker
Linter: ESLint
```

---

## ⚡ Quick Start Checklist

- [ ] Clone repository
- [ ] Install dependencies (`npm install`)
- [ ] Copy `.env.example` to `.env`
- [ ] Setup PostgreSQL database
- [ ] Setup Redis
- [ ] Run migrations (jika ada)
- [ ] Start development server (`npm run dev`)
- [ ] Access API at `http://localhost:8888`
- [ ] View Swagger docs at `http://localhost:8888/docs`
- [ ] Test endpoints dengan cURL/Postman

---

**Last Updated**: 2026
**Node.js Version**: 24 (Alpine)
**Express Version**: 5.2.1
**Status**: ✅ Production Ready

---

*Terima kasih telah menggunakan Koda B6 Backend Node.js! Untuk pertanyaan atau saran, silakan buat issue di repository kami.*