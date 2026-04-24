# Deployment Guide — Student Management System
## CSC-251 Assignment 4 | Spring 2026

---

## Prerequisites
- Node.js v18+ installed
- Git installed
- GitHub account
- Render/Railway/Vercel account (free tier works)

---

## Step 1 — Run Locally

```bash
# 1. Clone or unzip the project
git clone https://github.com/yourusername/student-mgmt.git
cd student-mgmt

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your values if needed

# 4. Start development server
npm run dev        # with nodemon (auto-restart)
# OR
npm start          # production start

# 5. Open browser
# http://localhost:3000
```

---

## Step 2 — Push to GitHub

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit: Student Management System"

# Create repo on GitHub, then:
git remote add origin https://github.com/yourusername/student-mgmt.git
git branch -M main
git push -u origin main
```

---

## Step 3A — Deploy to Render (Recommended)

1. Go to [render.com](https://render.com) and sign up/log in
2. Click **"New"** → **"Web Service"**
3. Connect your GitHub repo
4. Configure the service:
   - **Name:** `student-management-system`
   - **Region:** Singapore (closest to Pakistan)
   - **Branch:** `main`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Under **Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `PORT` = `3000`
6. Click **"Create Web Service"**
7. Wait ~2 minutes for deployment
8. Your live URL: `https://student-management-system.onrender.com`

---

## Step 3B — Deploy to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize and deploy
railway init
railway up

# Get live URL
railway open
```

Or use the Railway dashboard at [railway.app](https://railway.app):
1. New Project → Deploy from GitHub repo
2. Add environment variables
3. Deploy automatically on every push

---

## Step 3C — Deploy to Vercel

> Note: Vercel works best for serverless. For a full Express app, use this adapter:

```bash
# Install Vercel CLI
npm install -g vercel

# Add vercel.json to project root:
# {
#   "version": 2,
#   "builds": [{ "src": "server.js", "use": "@vercel/node" }],
#   "routes": [{ "src": "/(.*)", "dest": "server.js" }]
# }

vercel login
vercel --prod
```

---

## Environment Variables Summary

| Variable         | Value                | Required |
|------------------|----------------------|----------|
| `PORT`           | `3000`               | Yes      |
| `NODE_ENV`       | `production`         | Yes      |
| `ALLOWED_ORIGINS`| Your live URL        | Optional |

---

## Verify Deployment

After deploying, test these endpoints:

```
GET  https://your-app.onrender.com/
GET  https://your-app.onrender.com/api/students
GET  https://your-app.onrender.com/api/courses
GET  https://your-app.onrender.com/api/dashboard/stats
POST https://your-app.onrender.com/api/students
```

Use [Postman](https://postman.com) or `curl` to test the API:

```bash
# Test health
curl https://your-app.onrender.com/api/dashboard/stats

# Add a student
curl -X POST https://your-app.onrender.com/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","rollNo":"CS-9999","email":"test@uni.edu","department":"CS","semester":2}'
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | Change `PORT` in `.env` |
| Module not found | Run `npm install` again |
| 404 on all routes | Check `server.js` static file path |
| Render app sleeping | Free tier sleeps after 15 min — first load is slow |
