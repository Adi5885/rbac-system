# 🚀 Quick Start Guide

Get the RBAC system running in 5 minutes!

## Step 1: Install Dependencies

Open two terminals in the `rbac-system` folder.

**Terminal 1 (Backend):**
```bash
cd backend
npm install
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm install
```

## Step 2: Start Servers

**Terminal 1 (Backend):**
```bash
npm start
```
✅ Backend running on `http://localhost:5000`

**Terminal 2 (Frontend):**
```bash
npm run dev
```
✅ Frontend running on `http://localhost:5173`

## Step 3: Test the Application

Open browser: `http://localhost:5173`

### Quick Test Sequence:

1. **Test Admin** (Full Access)
   - Click "Admin" button
   - Create an article
   - Delete an article
   - ✅ Both work!

2. **Test Editor** (Create Only)
   - Logout → Click "Editor" button
   - Create an article ✅
   - No delete button ❌

3. **Test Viewer** (Read Only)
   - Logout → Click "Viewer" button
   - View articles ✅
   - No create/delete buttons ❌

## Demo Credentials

| Role   | Email              | Password  |
|--------|-------------------|-----------|
| Admin  | admin@test.com    | password  |
| Editor | editor@test.com   | password  |
| Viewer | viewer@test.com   | password  |

## API Endpoints

```
POST   http://localhost:5000/api/login
GET    http://localhost:5000/api/articles
POST   http://localhost:5000/api/articles
DELETE http://localhost:5000/api/articles/:id
```

## Troubleshooting

**Port already in use?**
- Backend: Edit `backend/.env` → Change `PORT=5000`
- Frontend: Edit `frontend/vite.config.js` → Change port

**Can't connect?**
- Make sure both servers are running
- Check `frontend/.env` has correct API URL

## Next Steps

- Read `README.md` for complete documentation
- Read `VERIFICATION_REPORT.md` to see all features
- Read `DEPLOYMENT.md` to deploy online
