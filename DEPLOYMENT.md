# PhysioPMR Deployment Guide: Taking Your Website Live

This guide explains how to deploy the **PhysioPMR Full-Stack Application** to the public internet with a live URL, SSL certificate (HTTPS), and your own custom domain.

---

## ⚡ Option 1: Deploy on Render.com (Recommended — Fast & Free)

Render is one of the easiest ways to host full-stack Node.js + React applications with free automatic SSL.

### Steps:
1. Push your project to a GitHub or GitLab repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for PhysioPMR"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/physiopmr.git
   git push -u origin main
   ```
2. Log in to [Render.com](https://render.com) and click **New +** → **Web Service**.
3. Select your `physiopmr` GitHub repository.
4. Configure the service settings:
   - **Name**: `physiopmr-care`
   - **Region**: Choose the closest region (e.g., Singapore, Frankfurt, Oregon)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
5. Click **Create Web Service**.
6. Render will automatically build the React frontend, package the Express server, and give you a live HTTPS URL (e.g. `https://physiopmr-care.onrender.com`).

---

## ⚡ Option 2: Deploy on Railway.app (Zero-Config)

1. Sign up at [Railway.app](https://railway.app).
2. Click **New Project** → **Deploy from GitHub repo**.
3. Select the repository.
4. Railway will automatically detect the `package.json`, run `npm run build`, and execute `npm start`.
5. Under service settings, click **Generate Domain** to get a public URL (e.g. `https://physiopmr.up.railway.app`).

---

## 🐳 Option 3: Deploy with Docker

A production-ready multi-stage `Dockerfile` and `docker-compose.yml` are already included in the root directory.

### To run locally or on any cloud VPS (DigitalOcean, AWS, Linode):
```bash
# Build and run container
docker compose up -d --build

# View container logs
docker compose logs -f
```
The website will be live at `http://YOUR_SERVER_IP:3000`.

---

## 🖥️ Option 4: Deploy on an Ubuntu Cloud VPS (DigitalOcean Droplet, AWS EC2, Linode)

For maximum performance, complete data sovereignty, and custom domains:

### Step 1: Install Node.js & PM2
```bash
# Update server packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git nginx

# Install PM2 process manager
sudo npm install -g pm2
```

### Step 2: Clone and Build
```bash
cd /var/www
git clone https://github.com/YOUR_USERNAME/physiopmr.git
cd physiopmr
npm install
npm run build
```

### Step 3: Start with PM2
```bash
pm2 start server/server.js --name "physiopmr"
pm2 startup
pm2 save
```

### Step 4: Configure Nginx as Reverse Proxy
Create `/etc/nginx/sites-available/physiopmr`:
```nginx
server {
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/physiopmr /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: Setup Free HTTPS SSL (Certbot)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 🌐 Custom Domain Setup

1. In your domain registrar (GoDaddy, Namecheap, Cloudflare, Google Domains):
   - Add an **A Record**: Host `@` pointing to your server's public IP.
   - Add a **CNAME Record**: Host `www` pointing to your domain or Render/Railway URL.
2. Under your host provider's dashboard (e.g. Render/Railway), enter your domain name under **Custom Domains**.
3. SSL will automatically generate within 5–10 minutes.
