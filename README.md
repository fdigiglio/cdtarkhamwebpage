# 🦇 ARKHAM ASYLUM — WANTED
## Quick Start Guide

⚠️ **This is a TWO-SERVER setup with real MySQL database**

---

## 🚀 Quick Deployment

### **Server 1: Database (10.10.1.2)**
```bash
# Install MySQL
sudo apt install mysql-server -y

# Configure MySQL to accept connections from 10.10.1.1
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
# Set: bind-address = 10.10.1.2

# Restart MySQL
sudo systemctl restart mysql

# Import database
mysql -u root -p < database_setup.sql

# Allow firewall
sudo ufw allow from 10.10.1.1 to any port 3306
```

### **Server 2: Web Server (10.10.1.1)**
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Deploy files
cd /path/to/arkham-asylum
npm install

# Start server
sudo node server.js
```

### **Access**
Open browser: **http://10.10.1.1**

---

## 📁 What's Included

```
arkham-asylum/
├── server.js              # Backend API (vulnerable SQL queries)
├── package.json           # Node.js dependencies
├── database_setup.sql     # MySQL schema and data
├── index.html             # Frontend page
├── styles.css             # Batman theme CSS
├── script.js              # Frontend JavaScript
├── images/                # 7 villain SVG portraits
├── DEPLOYMENT.md          # Full deployment guide
└── README.md              # This file
```

---

## 🎯 How It Works

1. **Frontend** (index.html) → User enters search query
2. **API Call** (script.js) → Sends query to backend at 10.10.1.1
3. **Backend** (server.js) → **VULNERABLE:** Concatenates user input into SQL
4. **MySQL** (10.10.1.2) → Executes query and returns results
5. **Response** → Shows SQL query, results, and flag if injection successful

---

## 💉 SQL Injection Examples

### **Normal Search:**
```
joker
```
Returns: 1 villain named Joker

### **SQL Injection:**
```
' OR '1'='1
```
Returns: **ALL 7 villains + FLAG**

### **Advanced (UNION):**
```
' UNION SELECT * FROM admin_secrets--
```
Returns: Hidden admin data

---

## 🚩 CTF Flags

- **Primary Flag:** `FLAG{B4TM4N_SQL_1NJ3CT10N_M4ST3R_2024}`
- **Location:** Appears on successful SQL injection
- **Hidden Flag:** In `admin_secrets` table (requires UNION injection)

---

## 🔧 Configuration

### **Change Database Password:**
1. Edit `database_setup.sql` line 10:
   ```sql
   CREATE USER IF NOT EXISTS 'arkham_user'@'10.10.1.1' IDENTIFIED BY 'your_new_password';
   ```

2. Edit `server.js` line 17:
   ```javascript
   password: 'your_new_password',
   ```

### **Change Flag:**
Edit `script.js` line 14 and `database_setup.sql` line 120.

### **Change IPs:**
If using different IPs:
1. Update `server.js` (MySQL host)
2. Update `script.js` (API_BASE_URL)
3. Update database user permissions
4. Update firewall rules

---

## 📊 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/` | GET | Serve frontend HTML |
| `/api/villains` | GET | Get all villains |
| `/api/search` | POST | **VULNERABLE** search endpoint |
| `/api/health` | GET | Check server/DB status |
| `/api/db-info` | GET | Expose database structure (easter egg) |

---

## ⚠️ Security Warnings

**THIS APPLICATION IS INTENTIONALLY VULNERABLE!**

❌ **DO NOT:**
- Deploy on public internet
- Use in production
- Store real sensitive data
- Use real passwords

✅ **DO:**
- Use on isolated lab network
- Shut down after CTF
- Learn from the vulnerabilities
- Practice responsible disclosure

---

## 🐛 Troubleshooting

### **"Cannot connect to server"**
- Check backend is running: `sudo node server.js`
- Verify IP is 10.10.1.1
- Check firewall allows port 80

### **"Error connecting to MySQL database"**
- Verify MySQL is running on 10.10.1.2
- Test connection: `mysql -u arkham_user -p -h 10.10.1.2`
- Check firewall allows port 3306 from 10.10.1.1
- Verify bind-address in MySQL config

### **"No villains displayed"**
- Check database has data: `SELECT COUNT(*) FROM villains;`
- Check browser console for errors (F12)
- Verify API health: `curl http://10.10.1.1/api/health`

---

## 📚 Full Documentation

See **DEPLOYMENT.md** for:
- Complete installation instructions
- Firewall configuration
- System service setup
- Advanced troubleshooting
- Security notes

---

## 🎓 Learning Objectives

After completing this challenge, you will understand:
- How SQL injection vulnerabilities occur
- Impact of direct SQL string concatenation
- UNION-based SQL injection techniques
- Difference between vulnerable and secure queries
- Importance of parameterized queries

---

## 📞 Quick Commands

```bash
# Check if backend is running
curl http://10.10.1.1/api/health

# Test database connection
mysql -u arkham_user -pgotham2024 -h 10.10.1.2 arkham_db

# View backend logs (if using systemd)
sudo journalctl -u arkham-asylum -f

# Restart backend
sudo systemctl restart arkham-asylum

# Test SQL injection from command line
curl -X POST http://10.10.1.1/api/search \
  -H "Content-Type: application/json" \
  -d '{"query":"'\'' OR '\''1'\''='\''1"}'
```

---

**Created for educational cybersecurity competitions**  
**Version:** 2.0 (Two-Server Architecture)  
**Last Updated:** November 2025

🦇 **Stay safe. Stay ethical. Happy hacking!** 🛡️
