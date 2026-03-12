# Deployment Guide

## Backend Deployment

### Option 1: Render
1. Push code to GitHub
2. Create new Web Service on [render.com](https://render.com)
3. Connect your repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `JWT_SECRET`: (generate secure random string)
     - `NODE_ENV`: `production`

### Option 2: Railway
1. Push code to GitHub
2. Create new project on [railway.app](https://railway.app)
3. Connect repository
4. Set environment variables:
   - `JWT_SECRET`: (generate secure random string)
   - `NODE_ENV`: `production`
5. Railway auto-detects and deploys

### Option 3: Heroku
```bash
cd backend
heroku create your-app-name
heroku config:set JWT_SECRET=your-secure-secret-key
heroku config:set NODE_ENV=production
git push heroku main
```

## Frontend Deployment

### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Import repository on [vercel.com](https://vercel.com)
3. Configure:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variable**:
     - `VITE_API_URL`: `https://your-backend-url.com/api`

### Option 2: Netlify
1. Push code to GitHub
2. Create new site on [netlify.com](https://netlify.com)
3. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
   - **Environment Variable**:
     - `VITE_API_URL`: `https://your-backend-url.com/api`

## Post-Deployment Verification

✅ Test these after deployment:
- Backend health endpoint: `https://your-backend.com/health`
- Login with all three roles (admin, editor, viewer)
- Create article (admin/editor)
- Delete article (admin only)
- Verify 403 errors for unauthorized actions
- Check CORS is working

## Production Security Checklist

- [ ] Use strong JWT_SECRET (min 32 characters)
- [ ] Enable HTTPS on both services
- [ ] Configure CORS for your frontend domain only
- [ ] Update backend CORS in `server.js` if needed
- [ ] Test all API endpoints
- [ ] Verify environment variables are set correctly
