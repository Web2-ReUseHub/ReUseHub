# ReUseHub
# ReUseHub ♻️

ReUseHub is a full-stack marketplace platform that connects people who want to give away or sell used items with people looking to reuse them. Sellers list items, buyers send contact requests, and once a request is accepted the two parties are connected directly to arrange the exchange.

## Features

- **User authentication** — secure signup/login with JWT-based sessions and bcrypt password hashing
- **User profiles** — profile view/update, avatar upload, and per-user stats
- **Used item listings** — create, update, delete, and browse listings, each with multiple images
- **Categories** — items are organized under product categories
- **Favorites** — users can save/unsave items to a favorites list
- **Likes** — users can like/unlike listings
- **Trending items** — surfaces trending or highly-rated products
- **AI Post Generator** — sellers provide basic product details and an AI model (Groq/OpenAI) generates a polished, ready-to-publish listing description
- **Contact request system** — buyers send a request to a seller for a specific item; the seller can accept or reject it
- **In-app messaging** — once a request is accepted, a message containing the seller's contact info is sent to the buyer
- **Role-aware access control** — only the item's owner can accept or reject requests on it
- **Admin dashboard stats** — aggregate stats endpoint for platform activity
- **Error handling** — duplicate requests, unauthorized actions, and missing authentication are handled with clear responses

### In Progress
- **AI Smart Search** — natural-language product search using embeddings; the semantic search groundwork exists in the codebase but the live search endpoint currently uses keyword matching, not the embeddings yet
- **Duplicate Image Detection** — prevents sellers from re-publishing a product image that's already listed and unsold
- **Seller Rating System** — lets buyers rate sellers after a completed transaction

## Tech Stack

**Backend**
- Node.js / Express 5
- MySQL with Sequelize ORM
- JWT (`jsonwebtoken`) for authentication, `bcrypt` for password hashing
- `multer` for image uploads
- Groq SDK & OpenAI SDK for AI-generated descriptions and embeddings
- `dotenv` for environment configuration

**Frontend**
- React 18
- `react-router-dom` for client-side routing
- Bootstrap 5 + Font Awesome for UI

## Project Structure
ReUseHub/
├── backend/
│ ├── config/ # Sequelize config (reads from .env)
│ ├── controllers/ # Request handlers (business logic)
│ ├── middleware/ # Auth middleware (JWT verification)
│ ├── migrations/ # Sequelize migrations
│ ├── models/ # Sequelize models (User, UsedItem, Request, Message, Category, Favorite, ...)
│ ├── routes/ # API route definitions
│ ├── services/ # AI/embeddings helper services
│ ├── uploads/ # Uploaded images (served statically)
│ ├── .env.example
│ └── server.js # App entry point
├── frontend/
│ └── src/
│ ├── components/ # Reusable UI components
│ └── pages/ # Page-level components
├── package.json
└── README.md



## API Overview

| Method | Endpoint | Description | Auth Required |
|--------|----------|--------------|----------------|
| POST | `/user/register` | Register a new user | ❌ |
| POST | `/user/login` | Log in and receive a JWT | ❌ |
| GET | `/user/profile/me` | Get my profile | ✅ |
| PUT | `/user/profile/update` | Update my profile | ✅ |
| POST | `/user/upload-avatar` | Upload profile avatar | ✅ |
| GET | `/user/:id` | Get a user by id | ✅ |
| GET | `/user/stats/:id` | Get a user's stats | ✅ |
| GET | `/used-items` | List all used items | ❌ |
| POST | `/used-items` | Create a listing (up to 5 images) | ✅ |
| GET | `/used-items/trending` | Get trending items | ❌ |
| PUT | `/used-items/:id` | Update a listing | ✅ |
| DELETE | `/used-items/:id` | Delete a listing | ✅ |
| POST | `/used-items/:id/like` | Like/unlike a listing | ✅ |
| GET | `/Category` | List all categories | ❌ |
| POST | `/Category` | Create a category | ❌ |
| POST | `/favorites` | Add a favorite | ❌ |
| GET | `/favorites/:userId` | Get a user's favorites | ❌ |
| DELETE | `/favorites/:id` | Remove a favorite | ❌ |
| POST | `/requests` | Send a contact request for an item | ✅ |
| GET | `/requests/my` | Get requests I've sent (buyer) | ✅ |
| GET | `/requests/received` | Get requests received on my items (seller) | ✅ |
| PUT | `/requests/:req_id/accept` | Accept a request | ✅ |
| PUT | `/requests/:req_id/reject` | Reject a request | ✅ |
| DELETE | `/requests/:id` | Delete a request | ✅ |
| POST | `/ai/generate-post` | Generate an AI listing description | ❌ |
| POST | `/api/search` | Keyword-based product search (AI semantic search in progress) | ❌ |
| GET | `/admin/stats` | Platform-wide dashboard stats | ❌ |

## Getting Started

### Prerequisites
- Node.js
- MySQL Server

### Installation

```bash
# Clone the repository
git clone https://github.com/Web2-ReUseHub/ReUseHub.git
cd ReUseHub

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables

Copy `backend/.env.example` to `backend/.env` and fill in your own values:
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=reuse_hub

JWT_SECRET=replace_with_a_long_random_string

GROQ_API_KEY=your_groq_api_key
OPENAI_API_KEY=your_openai_api_key


Never commit your real `.env` file — only `.env.example` should be tracked in git.

### Running the Project

```bash
# Start the backend (runs on port 5004)
cd backend
node server.js

# Start the frontend (in a separate terminal)
cd frontend
npm start
```

## Team

- Mayar Nazeeh — Team Lead

## License

This project is licensed under the MIT License.