# Dream House

A full-stack real estate web application where users can browse property listings, view detailed property pages with photo galleries, and contact agents. Includes a protected admin panel for full content management.

## Features

**Public**
- Property catalog with search and filtering (location, price, bedrooms)
- Individual property pages with image gallery, amenities, and mortgage estimate
- Agent contact form on each property page
- About Us, Services, and Contact pages

**Admin Panel** (`/admin`)
- JWT-protected login
- Dashboard with stats (total properties, active listings, agents)
- Full CRUD for properties and agents

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router v7, CSS Modules |
| Backend | Node.js, Express v5 |
| Database | MongoDB, Mongoose |
| Auth | JWT (jsonwebtoken), bcrypt |
| Security | Helmet, express-rate-limit, CORS |
| Deployment | Vercel (client + server separately), MongoDB Atlas |

## Project Structure

```
Dream-House/
├── client/          # React app
│   ├── public/
│   └── src/
│       ├── pages/
│       │   ├── home/
│       │   ├── properties/
│       │   ├── property/
│       │   ├── services/
│       │   ├── about/
│       │   ├── contact/
│       │   └── admin/
│       └── App.js
└── server/          # Express API
    ├── models/
    │   ├── Property.js
    │   └── Agent.js
    ├── middleware/
    │   └── auth.js
    ├── propertyController.js
    ├── adminController.js
    └── index.js
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Setup

**1. Clone the repo**
```bash
git clone https://github.com/your-username/Dream-House.git
cd Dream-House
```

**2. Server**
```bash
cd server
npm install
```

Create a `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/dream-house
FRONTEND=http://localhost:3000
ADMIN_USER=admin
ADMIN_PASS=your_password
JWT_SECRET=your_jwt_secret
PORT=3030
```

```bash
npm start
```

**3. Client**
```bash
cd client
npm install
npm start
```

The app runs at `http://localhost:3000`, with the API proxied to `http://localhost:3030`.

## API Routes

### Public
| Method | Route | Description |
|---|---|---|
| GET | `/property/getAll` | Get all properties |
| GET | `/property/get/:id` | Get single property |

### Admin (requires Bearer token)
| Method | Route | Description |
|---|---|---|
| POST | `/api/admin/login` | Login |
| GET | `/api/admin/properties` | List all properties |
| POST | `/api/admin/properties` | Create property |
| PUT | `/api/admin/properties/:id` | Update property |
| DELETE | `/api/admin/properties/:id` | Delete property |
| GET | `/api/admin/agents` | List all agents |
| POST | `/api/admin/agents` | Create agent |
| PUT | `/api/admin/agents/:id` | Update agent |
| DELETE | `/api/admin/agents/:id` | Delete agent |

## Deployment (Vercel)

Both client and server are deployed as separate Vercel projects.

**Server:** deploy the `server/` folder — `vercel.json` configures it as a serverless Node.js function.

**Client:** deploy the `client/` folder — update `client/vercel.json` to point `/property/*` and `/api/*` rewrites to your deployed server URL:

```json
{
  "rewrites": [
    { "source": "/property/:path*", "destination": "https://your-server.vercel.app/property/:path*" },
    { "source": "/api/:path*",      "destination": "https://your-server.vercel.app/api/:path*" },
    { "source": "/(.*)",            "destination": "/index.html" }
  ]
}
```

Set `MONGO_URI`, `ADMIN_USER`, `ADMIN_PASS`, `JWT_SECRET`, and `FRONTEND` as environment variables in the Vercel server project dashboard.