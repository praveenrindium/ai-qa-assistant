# Deployment Guide - AI Q&A Assistant

This guide provides step-by-step instructions for deploying your AI Q&A Assistant to various cloud platforms.

## Prerequisites

- Your OpenRouter API key: `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`
- Git installed on your computer
- GitHub account (for most deployment options)

## Quick Start - Choose Your Platform

| Platform | Difficulty | Cost | Setup Time |
|----------|-----------|------|------------|
| **Render** ⭐ | Easy | Free | 5-10 min |
| **Railway** | Easy | Free ($5 credit) | 5 min |
| **Heroku** | Medium | Paid | 10 min |
| **Docker** | Advanced | Variable | 15 min |

---

## Option 1: Deploy to Render (Recommended)

Render offers a generous free tier with automatic HTTPS and easy deployment.

### Step 1: Push Code to GitHub

```powershell
# Navigate to your project directory
cd c:\Users\PraveenR\Documents\game

# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - AI Q&A Assistant"

# Create a new repository on GitHub (via web interface)
# Then link and push:
git remote add origin https://github.com/YOUR_USERNAME/ai-qa-assistant.git
git branch -M main
git push -u origin main
```

### Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended)
3. Authorize Render to access your repositories

### Step 3: Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository `ai-qa-assistant`
3. Configure the service:
   - **Name**: `ai-qa-assistant` (or your preferred name)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: `Free`

### Step 4: Set Environment Variable

1. Scroll to **"Environment Variables"**
2. Click **"Add Environment Variable"**
3. Set:
   - **Key**: `OPENROUTER_API_KEY`
   - **Value**: `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`

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. Your app will be live at: `https://ai-qa-assistant-XXXX.onrender.com`

### Step 6: Test Your Deployment

1. Open the URL provided by Render
2. You should see your AI Q&A Assistant interface
3. Try asking a question!

> [!NOTE]
> Free tier apps spin down after 15 minutes of inactivity. First request after inactivity may take 30-60 seconds.

---

## Option 2: Deploy to Railway

Railway offers a modern deployment experience with $5 free credit per month.

### Step 1: Push to GitHub

Follow the same GitHub steps as in Option 1.

### Step 2: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Authorize Railway

### Step 3: Deploy from GitHub

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your `ai-qa-assistant` repository
4. Railway will auto-detect it's a Python app

### Step 4: Configure Environment Variable

1. Go to your project → **"Variables"** tab
2. Click **"New Variable"**
3. Add:
   - **Key**: `OPENROUTER_API_KEY`
   - **Value**: `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`

### Step 5: Configure Start Command

1. Go to **"Settings"** tab
2. Under **"Deploy"**, set:
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Step 6: Generate Domain

1. Go to **"Settings"** → **"Networking"**
2. Click **"Generate Domain"**
3. Your app will be live at: `https://ai-qa-assistant-production-XXXX.up.railway.app`

---

## Option 3: Deploy to Heroku

Heroku is a well-established platform but no longer offers a free tier.

### Step 1: Install Heroku CLI

```powershell
# Download and install from: https://devcenter.heroku.com/articles/heroku-cli
# Or use winget:
winget install Heroku.HerokuCLI
```

### Step 2: Login and Create App

```powershell
# Login to Heroku
heroku login

# Create new app
heroku create ai-qa-assistant-yourname

# Add Python buildpack
heroku buildpacks:set heroku/python
```

### Step 3: Set Environment Variable

```powershell
heroku config:set OPENROUTER_API_KEY=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
```

### Step 4: Deploy

```powershell
# Initialize git if not done
git init
git add .
git commit -m "Initial commit"

# Deploy to Heroku
git push heroku main
```

### Step 5: Open Your App

```powershell
heroku open
```

Your app will be at: `https://ai-qa-assistant-yourname.herokuapp.com`

---

## Option 4: Deploy with Docker (Self-Hosted)

For deployment on your own server or cloud VM.

### Step 1: Install Docker

- **Windows**: [Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Linux**: `curl -fsSL https://get.docker.com | sh`

### Step 2: Build Docker Image

```powershell
# Navigate to project directory
cd c:\Users\PraveenR\Documents\game

# Build the image
docker build -t ai-qa-assistant .
```

### Step 3: Run Container

```powershell
# Run with environment variable
docker run -d \
  -p 8000:8000 \
  -e OPENROUTER_API_KEY=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 \
  --name ai-qa-assistant \
  ai-qa-assistant
```

### Step 4: Access Your App

Open browser to: `http://localhost:8000` or `http://YOUR_SERVER_IP:8000`

### Using Docker Compose (Alternative)

```powershell
# Set environment variable
$env:OPENROUTER_API_KEY="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"

# Start with docker-compose
docker-compose up -d
```

---

## Post-Deployment Checklist

After deploying to any platform, verify:

- [ ] Health check works: `https://your-app-url/health`
- [ ] Homepage loads with styling and animations
- [ ] Example questions are visible
- [ ] Can ask a question and receive a response
- [ ] Model selector dropdown works
- [ ] Mobile responsive design works

## Troubleshooting

### Issue: "API key not configured" error

**Solution**: Verify the environment variable is set correctly on your platform:
- Render: Check "Environment" tab
- Railway: Check "Variables" tab
- Heroku: Run `heroku config` to verify
- Docker: Check your run command includes `-e OPENROUTER_API_KEY=...`

### Issue: 429 Rate Limit Error

**Solution**: The free model is rate-limited. Options:
1. Wait a few minutes and try again
2. Switch to a different model in the dropdown
3. Add your own API key to OpenRouter for higher limits

### Issue: App is slow to respond

**Solution**: 
- **Render free tier**: First request after inactivity takes 30-60s (cold start)
- **Railway**: Check your credit hasn't run out
- **General**: OpenRouter API can take 5-15 seconds for responses

### Issue: Static files not loading (no styling)

**Solution**: Verify the `static` folder is included in your deployment:
- Check `.gitignore` doesn't exclude `static/`
- Ensure `static/` folder is committed to git
- For Docker: Check `COPY . .` is in Dockerfile

### Issue: Port binding error

**Solution**: Ensure your start command uses the platform's PORT variable:
- Render/Railway/Heroku: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Docker: Use `-p 8000:8000` mapping

## Updating Your Deployment

### For Render/Railway (GitHub-connected):

```powershell
# Make your changes
git add .
git commit -m "Update: description of changes"
git push origin main

# Deployment happens automatically!
```

### For Heroku:

```powershell
git add .
git commit -m "Update: description of changes"
git push heroku main
```

### For Docker:

```powershell
# Rebuild image
docker build -t ai-qa-assistant .

# Stop old container
docker stop ai-qa-assistant
docker rm ai-qa-assistant

# Start new container
docker run -d -p 8000:8000 \
  -e OPENROUTER_API_KEY=your-key \
  --name ai-qa-assistant \
  ai-qa-assistant
```

## Custom Domain (Optional)

### Render
1. Go to "Settings" → "Custom Domain"
2. Add your domain
3. Update DNS records as instructed

### Railway
1. Go to "Settings" → "Networking"
2. Add custom domain
3. Update DNS CNAME record

### Heroku
```powershell
heroku domains:add www.yourdomain.com
```

## Security Best Practices

1. **Never commit API keys** to git
2. **Use environment variables** for all secrets
3. **Enable HTTPS** (automatic on Render/Railway/Heroku)
4. **Monitor usage** on OpenRouter dashboard
5. **Set rate limits** if exposing to many users

## Cost Considerations

| Platform | Free Tier | Paid Plans Start At |
|----------|-----------|---------------------|
| Render | 750 hours/month | $7/month |
| Railway | $5 credit/month | $5/month (pay as you go) |
| Heroku | None | $5/month (Eco dyno) |
| Docker (DigitalOcean) | None | $4/month (droplet) |

## Need Help?

- **Render Docs**: https://render.com/docs
- **Railway Docs**: https://docs.railway.app
- **Heroku Docs**: https://devcenter.heroku.com
- **OpenRouter Docs**: https://openrouter.ai/docs

---

**Congratulations!** 🎉 Your AI Q&A Assistant is now deployed and accessible to everyone!
