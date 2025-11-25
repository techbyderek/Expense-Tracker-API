# Expense Tracker API

RESTful API for managing personal expenses with user authentication, CRUD operations, category filtering, and soft delete functionality.

## Technologies

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## Features

- User authentication (register/login)
- JWT-based authorization
- CRUD operations for expenses
- Filter expenses by category
- Soft delete (expenses marked as deleted, not removed)
- Input validation with Mongoose
- Password hashing with bcrypt
- Secure HTTP headers with Helmet
- Each user sees only their own expenses

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Steps

1. Clone the repository
```bash
git clone <repository-url>
cd expenseapi
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file in root directory
```env
MONGODB_URI=mongodb://localhost:27017/expense-tracker
PORT=3000
JWT_SECRET=your-super-secret-jwt-key
```

4. Start the server
```bash
node server.js
```

Server runs on `http://localhost:3000`

## API Endpoints

### Authentication

#### Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "123456"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Get Current User
```http
GET /api/v1/auth/me
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Expenses (All require authentication)

**Note:** All expense endpoints require the `Authorization` header with Bearer token.

#### Create Expense
```http
POST /api/v1/expenses
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 50,
  "description": "Lunch at restaurant",
  "category": "Food",
  "paymentMethod": "Credit Card"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "userId": "...",
    "amount": 50,
    "description": "Lunch at restaurant",
    "category": "Food",
    "paymentMethod": "Credit Card",
    "date": "2024-11-24T...",
    "isDeleted": false,
    "createdAt": "2024-11-24T...",
    "updatedAt": "2024-11-24T..."
  }
}
```

#### Get All Expenses
```http
GET /api/v1/expenses
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "...",
      "userId": "...",
      "amount": 50,
      "category": "Food",
      ...
    }
  ]
}
```

#### Filter Expenses by Category
```http
GET /api/v1/expenses?category=Food
Authorization: Bearer <token>
```

**Response (200):** Returns only expenses with category "Food"

#### Update Expense
```http
PATCH /api/v1/expenses/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 75,
  "description": "Updated description"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "amount": 75,
    "description": "Updated description",
    ...
  }
}
```

#### Delete Expense (Soft Delete)
```http
DELETE /api/v1/expenses/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {}
}
```

**Note:** Expense is not permanently deleted. It's marked as `isDeleted: true` and won't appear in GET requests.

## Data Models

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Expense Schema
```javascript
{
  userId: ObjectId (required, ref: User),
  amount: Number (required, min: 0),
  description: String (optional),
  category: String (required, enum: ['Food', 'Transportation', 'Entertainment', 'Bills', 'Other']),
  date: Date (required, default: now),
  paymentMethod: String (optional, enum: ['Cash', 'Credit Card', 'Debit Card']),
  isDeleted: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The API uses standard HTTP status codes:

- `200` - OK (successful GET, PATCH, DELETE)
- `201` - Created (successful POST)
- `400` - Bad Request (invalid data)
- `401` - Unauthorized (missing/invalid token)
- `404` - Not Found (resource doesn't exist)
- `500` - Server Error

Example error response:
```json
{
  "success": false,
  "error": "Error message here"
}
```

## Security

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens expire after 7 days
- Protected routes require valid JWT token
- Users can only access their own expenses
- Helmet.js for secure HTTP headers
- CORS enabled for cross-origin requests

## Project Structure
```
expenseapi/
├── controllers/
│   ├── authController.js
│   └── expenseController.js
├── middleware/
│   └── auth.js
├── models/
│   ├── User.js
│   └── Expense.js
├── routes/
│   ├── authRoutes.js
│   └── expensesRoutes.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Testing with Postman

1. **Register** a new user → Get token
2. **Login** with credentials → Get token
3. Copy the token from response
4. For all expense endpoints:
   - Add header: `Authorization: Bearer <your-token>`
   - Make requests

## Author

Derek Rolon - Uplift Code Camp Batch 27

## License

This project is for educational purposes.
