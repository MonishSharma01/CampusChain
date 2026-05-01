# 🚀 CampusChain

### Blockchain-Powered Campus Financial Ecosystem

---

## 🧠 Overview

**CampusChain** is a blockchain-based digital economy designed to transform how financial transactions happen inside a university campus.

It replaces:

* Cash payments
* Fragmented UPI / wallet systems
* Manual tracking

With a **secure, transparent, and fully automated token-based ecosystem**.

From canteen payments 🍔 to library borrowing 📚, event registrations 🎟️ to semester fees 🎓 — everything runs on a **single campus token powered by blockchain**.

---

## 🎯 Key Idea

* Every student gets **fixed tokens at semester start**
* Tokens **cannot be bought or converted to money**
* Students must **manage, spend, and earn tokens wisely**
* All transactions are **recorded on blockchain (immutable)**

---

## ⚙️ Core Features

### 💰 Token Economy

* Fixed semester allocation
* No top-up, no real money exchange
* Closed-loop system

### 📱 QR-Based Payments

* Admin generates dynamic QR codes
* Student scans → verifies → pays
* No manual entry, no errors

### 🏫 Multi-Role System

* **Super Admin** → Full control
* **Admins** → Category-based control
* **Students** → Payments, transfers, rewards

### 📚 Smart Library System

* Auto fine calculation
* Borrow + return tracking via blockchain
* No disputes, no manual tracking

### 🎟️ Event Management

* QR-based ticketing
* Live seat tracking
* Blockchain-based entry validation

### 🔁 Peer-to-Peer Transfers

* Students can send tokens to each other
* Daily limits + fraud detection

### 🏆 Reward System

* Tokens for:

  * Hackathons
  * Sports
  * Academics
* Merit-based incentives

### 🔐 Security Controls

* Wallet freeze/unfreeze
* Role-based access
* Smart contract enforcement

### 📊 Analytics Dashboard

* Student spending insights
* Vendor earnings
* System-wide economy stats

---

## 🔗 Tech Stack

### 📱 Mobile App (Student + Admin)

* React Native (Expo)
* React Navigation
* Expo Camera (QR Scanner)
* Axios
* AsyncStorage
* Ethers.js
* React Native Paper
* Lottie Animations
* Expo Notifications

---

### 🖥️ Web App (Super Admin)

* React.js (Vite)
* TailwindCSS
* React Router DOM
* Axios
* React Query
* Recharts
* React Table
* Ethers.js

---

### ⚙️ Backend

* Node.js
* Express.js

**Libraries:**

* Mongoose (MongoDB)
* JWT (Authentication)
* Bcrypt (Hashing)
* Socket.io (Real-time)
* Node-cron (Scheduler)
* Express Validator
* Morgan

---

### 🔗 Blockchain

* Ethereum (Sepolia Testnet)
* Solidity (v0.8.x)
* Hardhat

**Smart Contracts:**

* CampusToken.sol
* PaymentGateway.sol
* LibraryContract.sol
* RewardEngine.sol
* EscrowContract.sol (optional)

---

### 🗄️ Database

* MongoDB Atlas

---

### 🔐 Security

* JWT Authentication
* Role-Based Access Control
* Wallet Signature Verification
* Rate Limiting
* Helmet.js

---

### 📡 Real-Time

* Socket.io

  * Live transactions
  * Instant payment confirmation
  * Balance updates

---

## 🏗️ System Architecture

```
Student App ↔ Backend ↔ Blockchain
        ↘ MongoDB (off-chain data)

Admin App ↔ Backend ↔ Smart Contracts

Super Admin Web ↔ Backend ↔ Blockchain + Analytics
```

---

## 📁 Project Structure

```
campuschain/
│
├── blockchain/
│   ├── contracts/
│   ├── scripts/
│   ├── test/
│   └── hardhat.config.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend-web/
│   ├── src/
│   └── vite.config.js
│
├── mobile/
│   ├── screens/
│   ├── components/
│   ├── navigation/
│   └── App.js
│
└── README.md
```

---

## 🔄 How It Works

1. **Semester Start**

   * Tokens minted by Super Admin
   * Distributed to all students

2. **Daily Usage**

   * Students scan QR → pay tokens
   * Smart contracts handle transactions

3. **Earning**

   * Rewards from events & academics

4. **Monitoring**

   * Super Admin sees all transactions live

5. **Semester End**

   * Tokens burned
   * Vendors settled in real currency
   * System resets

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/your-username/campuschain.git
cd campuschain
```

---

### 2. Setup Blockchain

```bash
cd blockchain
npm install
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js --network sepolia
```

---

### 3. Setup Backend

```bash
cd backend
npm install
npm run dev
```

---

### 4. Setup Web App

```bash
cd frontend-web
npm install
npm run dev
```

---

### 5. Setup Mobile App

```bash
cd mobile
npm install
npx expo start
```

---

## 🧪 Testing

### Smart Contracts

```bash
npx hardhat test
```

### Backend

```bash
npm run test
```

### Frontend

```bash
npm run test
```

---

## 🚀 Deployment

| Component  | Platform         |
| ---------- | ---------------- |
| Backend    | Railway / Render |
| Web App    | Vercel           |
| Mobile     | Expo EAS         |
| Database   | MongoDB Atlas    |
| Blockchain | Ethereum         |

---

## 🔥 Why CampusChain?

* ✅ Eliminates cash dependency
* ✅ Ensures transparency
* ✅ Prevents fraud
* ✅ Encourages merit-based rewards
* ✅ Builds financial discipline
* ✅ Fully automated ecosystem

---

## 📌 Future Improvements

* AI-based spending insights
* NFC payments (tap instead of scan)
* Multi-campus interoperability
* DAO-based governance
* Offline transaction support

---

## 👨‍💻 Author

**Indresh Suresh**

* Full Stack Developer
* Blockchain Enthusiast
* Hackathon Builder 🚀

---

## ⭐ Support

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 🧠 Contribute ideas

---
