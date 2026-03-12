# Role-Based Access Control System

A full-stack web application demonstrating authentication and role-based access control using Node.js, Express, and React.

## 🚀 Live Demo

**Frontend:** [Your deployed frontend URL]  
**Backend:** [Your deployed backend URL]

## 👥 Demo Credentials

| Role   | Email              | Password  |
|--------|-------------------|-----------|
| Admin  | admin@test.com    | password  |
| Editor | editor@test.com   | password  |
| Viewer | viewer@test.com   | password  |

## 📋 Features

- JWT-based authentication with secure token management
- Role-based access control (Admin, Editor, Viewer)
- Article management with permission-based actions
- Clean REST API design with proper error handling
- Responsive React frontend with Tailwind CSS
- Protected routes and API endpoints
- Password hashing with bcrypt
- In-memory data storage

## 🛡️ Role-Based Permissions

| Action         | Admin | Editor | Viewer |
|----------------|-------|--------|--------|
| View Articles  | ✅    | ✅     | ✅     |
| Create Article | ✅    | ✅     | ❌     |
| Delete Article | ✅    | ❌     | ❌     |

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Quick Start

**1. Install Backend Dependencies**
```bash
cd backend
npm install
```

**2. Install Frontend Dependencies**
```bash
cd frontend
npm install
```

**3. Start Backend Server**
```bash
cd backend
npm start
```
Backend runs on `http://localhost:5000`

**4. Start Frontend Server** (in a new terminal)
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

**5. Open Application**
Navigate to `http://localhost:5173` in your browser

## 🧪 Testing the System

### Test Admin Role (Full Access)
1. Login with `admin@test.com` / `password`
2. Create new articles using the "Create Article" button
3. Delete any article using the "Delete" button
4. ✅ All features accessible

### Test Editor Role (Create Only)
1. Login with `editor@test.com` / `password`
2. Create new articles
3. ❌ Delete button is hidden (403 if attempted via API)

### Test Viewer Role (Read Only)
1. Login with `viewer@test.com` / `password`
2. View all articles
3. ❌ No create or delete buttons (403 if attempted via API)

## 📡 API Endpoints

### POST /api/login
Authenticate user and receive JWT token.

**Request:**
```json
{
  "email": "admin@test.com",
  "password": "password"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "name": "Admin User",
    "email": "admin@test.com",
    "role": "admin"
  }
}
```

### GET /api/articles
Get all articles (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "1",
    "title": "Article Title",
    "content": "Article content",
    "createdBy": "1"
  }
]
```

### POST /api/articles
Create new article (Admin, Editor only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "title": "New Article",
  "content": "Article content here"
}
```

### DELETE /api/articles/:id
Delete article (Admin only).

**Headers:**
```
Authorization: Bearer <token>
```

## � Project Structure

```
rbac-system/
├── backend/
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   └── roleCheck.js         # Role-based authorization
│   ├── routes/
│   │   ├── auth.js              # Login endpoint
│   │   └── articles.js          # Article CRUD
│   ├── data/
│   │   └── storage.js           # In-memory storage
│   ├── server.js                # Express app
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx        # Login page
│   │   │   ├── Dashboard.jsx   # Main dashboard
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Auth state
│   │   ├── services/
│   │   │   └── api.js           # API calls
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── .env
├── README.md
└── DEPLOYMENT.md
```

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🏗️ Architecture & Implementation

### Authentication Flow
1. User submits credentials to `/api/login`
2. Backend validates credentials and generates JWT token
3. Token contains user ID and role (expires in 24h)
4. Frontend stores token in localStorage
5. All protected requests include token in Authorization header
6. Backend middleware verifies token and checks permissions

### Backend Architecture
- **Express Server**: RESTful API with middleware-based architecture
- **Authentication**: JWT tokens with bcrypt password hashing
- **Authorization**: Role-based middleware checks permissions
- **Data Storage**: In-memory arrays (easily replaceable with database)
- **Security**: CORS, input validation, error handling

### Frontend Architecture
- **React 18**: Component-based UI with hooks
- **Context API**: Global authentication state management
- **React Router**: Protected routes with role-based access
- **Axios**: HTTP client with interceptors for token injection
- **Tailwind CSS**: Utility-first styling

## 🔒 Security Features

- Passwords hashed using bcrypt (10 salt rounds)
- JWT tokens with 24-hour expiration
- CORS configured for frontend origin
- Protected API endpoints with middleware
- Role verification before sensitive operations
- Input validation on all endpoints
- 403 Forbidden responses for unauthorized actions

## 🎯 Walkthrough Guide: How to Test Each Role

### Testing Admin Role (Full Access)

**Step 1: Login**
- Open `http://localhost:5173`
- Click "Admin" quick login button OR enter:
  - Email: `admin@test.com`
  - Password: `password`
- Click "Login"

**Step 2: Verify Dashboard**
- ✅ You should see "ADMIN" badge in purple
- ✅ "Create Article" button is visible
- ✅ All articles are displayed
- ✅ Each article has a "Delete" button

**Step 3: Test Create Permission**
- Click "Create Article" button
- Enter title: "Admin Test Article"
- Enter content: "This was created by admin"
- Click "Submit Article"
- ✅ Success message appears
- ✅ New article appears in the list

**Step 4: Test Delete Permission**
- Click "Delete" button on any article
- Confirm deletion
- ✅ Success message appears
- ✅ Article is removed from the list

**Step 5: Verify Permissions Section**
- Scroll to "Your Permissions" section
- ✅ All three permissions should have green checkmarks:
  - ✓ View articles
  - ✓ Create articles
  - ✓ Delete articles

---

### Testing Editor Role (Create Only)

**Step 1: Logout and Login**
- Click "Logout" button (top right)
- Click "Editor" quick login button OR enter:
  - Email: `editor@test.com`
  - Password: `password`
- Click "Login"

**Step 2: Verify Dashboard**
- ✅ You should see "EDITOR" badge in green
- ✅ "Create Article" button is visible
- ✅ All articles are displayed
- ❌ NO "Delete" buttons on articles

**Step 3: Test Create Permission**
- Click "Create Article" button
- Enter title: "Editor Test Article"
- Enter content: "This was created by editor"
- Click "Submit Article"
- ✅ Success message appears
- ✅ New article appears in the list

**Step 4: Verify Delete is Blocked**
- ❌ No delete buttons should be visible in UI
- If you try via API (using curl/Postman):
  ```bash
  curl -X DELETE http://localhost:5000/api/articles/1 \
    -H "Authorization: Bearer <editor-token>"
  ```
- ✅ Should receive: `403 Forbidden`

**Step 5: Verify Permissions Section**
- Scroll to "Your Permissions" section
- ✅ Two permissions with green checkmarks:
  - ✓ View articles
  - ✓ Create articles
- ❌ One permission with red X:
  - ✗ Delete articles (requires Admin role)

---

### Testing Viewer Role (Read Only)

**Step 1: Logout and Login**
- Click "Logout" button (top right)
- Click "Viewer" quick login button OR enter:
  - Email: `viewer@test.com`
  - Password: `password`
- Click "Login"

**Step 2: Verify Dashboard**
- ✅ You should see "VIEWER" badge in blue
- ❌ NO "Create Article" button
- ✅ All articles are displayed
- ❌ NO "Delete" buttons on articles

**Step 3: Verify Create is Blocked**
- ❌ No "Create Article" button should be visible
- If you try via API (using curl/Postman):
  ```bash
  curl -X POST http://localhost:5000/api/articles \
    -H "Authorization: Bearer <viewer-token>" \
    -H "Content-Type: application/json" \
    -d '{"title":"Test","content":"Test"}'
  ```
- ✅ Should receive: `403 Forbidden`

**Step 4: Verify Delete is Blocked**
- ❌ No delete buttons should be visible
- If you try via API, should receive: `403 Forbidden`

**Step 5: Verify Permissions Section**
- Scroll to "Your Permissions" section
- ✅ One permission with green checkmark:
  - ✓ View articles
- ❌ Two permissions with red X:
  - ✗ Create articles (requires Editor or Admin role)
  - ✗ Delete articles (requires Admin role)

---

## 🔍 How Authentication Works

1. **User Login**: User submits email and password to `/api/login`
2. **Credential Validation**: Backend verifies credentials against stored users
3. **Token Generation**: Backend creates JWT token containing:
   - User ID
   - User role (admin/editor/viewer)
   - Expiration time (24 hours)
4. **Token Storage**: Frontend stores token in localStorage
5. **Authenticated Requests**: All API requests include token in header:
   ```
   Authorization: Bearer <token>
   ```
6. **Token Verification**: Backend middleware (`auth.js`) verifies token on each request
7. **User Extraction**: Middleware extracts user info from token and attaches to request

## 🛡️ How Role-Based Permissions Work

1. **Role Assignment**: Each user has a role (admin/editor/viewer) stored in database
2. **Middleware Chain**: Protected routes use two middleware:
   - `authenticate`: Verifies JWT token
   - `requireRole(...roles)`: Checks if user's role is in allowed roles
3. **Permission Check**: 
   ```javascript
   // Example: Only admin and editor can create
   router.post('/', authenticate, requireRole('admin', 'editor'), handler)
   ```
4. **Access Decision**:
   - If role matches → Request proceeds
   - If role doesn't match → Return `403 Forbidden`
5. **Frontend UI**: Uses `hasRole()` function to show/hide buttons based on permissions

## 📝 Assumptions

1. In-memory storage is acceptable (no database required per assignment)
2. Pre-seeded demo users (no registration flow needed)
3. Articles support create/delete only (no edit functionality)
4. Single JWT secret for demo (production would use key rotation)
5. 24-hour token expiration is sufficient

## 📄 License

MIT
