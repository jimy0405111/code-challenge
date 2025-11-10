# Express TypeScript CRUD API

A simple CRUD backend using ExpressJS, TypeScript, and SQLite with better-sqlite3.

## Features

- ✅ Create a resource
- ✅ List resources with basic filters (status, name, pagination)
- ✅ Get details of a resource
- ✅ Update resource details
- ✅ Delete a resource
- ✅ SQLite database for data persistence
- ✅ TypeScript for type safety
- ✅ Error handling and validation

## Requirements

- Node.js >= 18
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd "problem 4"
```

2. Install dependencies:
```bash
npm install
```

## Configuration

The application uses the following default configuration:

- **Port**: 3000 (can be overridden with `PORT` environment variable)
- **Database**: SQLite database stored in `data/resources.db`
- **Database Location**: `./data/resources.db`

## Running the Application

### Development Mode

Run the application in development mode with auto-reload:

```bash
npm run dev
```

### Production Mode

1. Build the TypeScript code:
```bash
npm run build
```

2. Start the server:
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in the `PORT` environment variable).

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 1. Create a Resource
**POST** `/api/resources`

Request body:
```json
{
  "name": "Resource Name",
  "description": "Resource description",
  "status": "active"
}
```

Response (201):
```json
{
  "id": 1,
  "name": "Resource Name",
  "description": "Resource description",
  "status": "active",
  "createdAt": "2024-01-01 12:00:00",
  "updatedAt": "2024-01-01 12:00:00"
}
```

#### 2. List Resources
**GET** `/api/resources`

Query parameters:
- `status` (optional): Filter by status (`active` or `inactive`)
- `name` (optional): Filter by name (partial match)
- `limit` (optional): Limit number of results
- `offset` (optional): Offset for pagination

Example: `/api/resources?status=active&name=test&limit=10&offset=0`

Response (200):
```json
{
  "data": [
    {
      "id": 1,
      "name": "Resource Name",
      "description": "Resource description",
      "status": "active",
      "createdAt": "2024-01-01 12:00:00",
      "updatedAt": "2024-01-01 12:00:00"
    }
  ],
  "total": 1,
  "limit": 10,
  "offset": 0
}
```

#### 3. Get Resource Details
**GET** `/api/resources/:id`

Response (200):
```json
{
  "id": 1,
  "name": "Resource Name",
  "description": "Resource description",
  "status": "active",
  "createdAt": "2024-01-01 12:00:00",
  "updatedAt": "2024-01-01 12:00:00"
}
```

#### 4. Update Resource
**PUT** `/api/resources/:id`

Request body (all fields optional):
```json
{
  "name": "Updated Name",
  "description": "Updated description",
  "status": "inactive"
}
```

Response (200):
```json
{
  "id": 1,
  "name": "Updated Name",
  "description": "Updated description",
  "status": "inactive",
  "createdAt": "2024-01-01 12:00:00",
  "updatedAt": "2024-01-01 12:30:00"
}
```

#### 5. Delete Resource
**DELETE** `/api/resources/:id`

Response (200):
```json
{
  "message": "Resource deleted successfully"
}
```

### Health Check
**GET** `/health`

Response (200):
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Missing required fields: name, description, status"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to create resource",
  "message": "Error details"
}
```

## Resource Model

### Fields
- `id` (number, auto-generated): Unique identifier
- `name` (string, required): Resource name
- `description` (string, required): Resource description
- `status` (string, required): Resource status (`active` or `inactive`)
- `createdAt` (string, auto-generated): Creation timestamp
- `updatedAt` (string, auto-generated): Last update timestamp

## Example Usage

### Create a Resource
```bash
curl -X POST http://localhost:3000/api/resources \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Resource",
    "description": "This is a test resource",
    "status": "active"
  }'
```

### List All Resources
```bash
curl http://localhost:3000/api/resources
```

### List Active Resources
```bash
curl "http://localhost:3000/api/resources?status=active"
```

### Get Resource by ID
```bash
curl http://localhost:3000/api/resources/1
```

### Update Resource
```bash
curl -X PUT http://localhost:3000/api/resources/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Resource",
    "status": "inactive"
  }'
```

### Delete Resource
```bash
curl -X DELETE http://localhost:3000/api/resources/1
```

## Project Structure

```
.
├── src/
│   ├── controllers/       # Request handlers
│   │   └── ResourceController.ts
│   ├── database/          # Database configuration
│   │   └── database.ts
│   ├── middleware/        # Express middleware
│   │   └── errorHandler.ts
│   ├── models/           # Data models
│   │   └── ResourceModel.ts
│   ├── routes/           # API routes
│   │   └── resourceRoutes.ts
│   ├── types/            # TypeScript types
│   │   └── resource.ts
│   └── server.ts         # Main server file
├── data/                 # Database files (auto-created)
├── dist/                 # Compiled JavaScript (after build)
├── package.json
├── tsconfig.json
└── README.md
```

## Database

The application uses SQLite for data persistence. The database file is automatically created in the `data/` directory when the server starts. The database schema includes:

- **resources** table with fields: id, name, description, status, createdAt, updatedAt

## Development

### Building the Project
```bash
npm run build
```

### Cleaning Build Files
```bash
npm run clean
```

## License

ISC
