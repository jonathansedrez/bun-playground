# 🚀 5-Day Study & Deployment Routine (AWS EC2 + Domain)

### ✅ **Day 1 – Monday: AWS Setup**

- [x] Create an **AWS account** (if you don’t already have one).
- [ ] Go to **EC2 dashboard** → Launch a new **Ubuntu EC2 instance** (t2.micro).
- [ ] Configure **Security Group**: open ports 22 (SSH), 80 (HTTP), 443 (HTTPS).
- [ ] Download your `.pem` key → test SSH connection:
  ```bash
  ssh -i my-key.pem ubuntu@<EC2_PUBLIC_IP>
  ```
- [ ] Make sure you can connect. Nothing else today.

---

### ✅ **Day 2 – Tuesday: Server Setup**

- [ ] SSH into your EC2 instance.
- [ ] Update packages:
  ```bash
  sudo apt update && sudo apt upgrade -y
  ```
- [ ] Install **Git** & **Bun**:
  ```bash
  sudo apt install git -y
  curl -fsSL https://bun.sh/install | bash
  ```
- [ ] Clone your repo:
  ```bash
  git clone https://github.com/jonathansedrez/bun-playground.git
  cd bun-playground/todos-api
  bun install
  ```
- [ ] Test run:
  ```bash
  bun run dev
  ```
- [ ] Verify app runs at `http://<EC2_PUBLIC_IP>:3000`.

---

### ✅ **Day 3 – Wednesday: Process Manager & Nginx**

- [ ] Install **PM2** to keep app alive:
  ```bash
  bun add -g pm2
  pm2 start index.ts --interpreter=bun
  pm2 startup
  pm2 save
  ```
- [ ] Install **Nginx**:
  ```bash
  sudo apt install nginx -y
  ```
- [ ] Configure Nginx reverse proxy (`/etc/nginx/sites-available/todos`):

  ```nginx
  server {
      listen 80;
      server_name _;

      location / {
          proxy_pass http://127.0.0.1:3000;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
      }
  }
  ```

- [ ] Enable site:
  ```bash
  sudo ln -s /etc/nginx/sites-available/todos /etc/nginx/sites-enabled/
  sudo systemctl restart nginx
  ```
- [ ] Check if app loads at `http://<EC2_PUBLIC_IP>`.

---

### ✅ **Day 4 – Thursday: Domain Setup**

- [ ] Buy a domain (or use one you already have).
- [ ] In your **domain provider (Route53, Cloudflare, etc.)** set an **A record** pointing to EC2’s public IP.
- [ ] Wait for DNS propagation (sometimes instant, sometimes a few hours).
- [ ] Test: `ping yourdomain.com` → should resolve to EC2 IP.
- [ ] Confirm app loads at `http://yourdomain.com`.

---

### ✅ **Day 5 – Friday: HTTPS & Final Checks**

- [ ] Install **Certbot**:
  ```bash
  sudo apt install certbot python3-certbot-nginx -y
  ```
- [ ] Run setup:
  ```bash
  sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
  ```
- [ ] Test HTTPS: `https://yourdomain.com` → should show your **todos-api**.
- [ ] Final checks:
  - [ ] App running under PM2.
  - [ ] Accessible via domain & HTTPS.
  - [ ] Security groups allow only necessary ports (22, 80, 443).

🎉 By Friday, your **Bun todos-api** is live with a domain + SSL.
