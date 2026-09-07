# FarmDirect — Integrated Working Version

This version connects the React/Vite frontend to the Express/MongoDB backend and removes the main static dashboard data paths.

## Requirements
- Node.js 18+
- MongoDB Atlas (or local MongoDB)

## Backend
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```
Set `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL` in `backend/.env`.

Health: `http://localhost:5000/api/health`

Optional demo seed:
```bash
npm run seed
```

## Frontend
From the project root:
```bash
npm install
npm run dev
```
Open `http://localhost:5173`.

## Main live flows
- Register/login as buyer or farmer
- Buyer marketplace reads products from MongoDB
- Product details and search
- Persistent browser cart
- Checkout creates a real order in MongoDB (COD/UPI/Card are currently order payment-method selections; gateway verification is not wired)
- Buyer order history
- Farmer inventory create/edit/delete
- Farmer incoming orders and status updates
- Farmer location and nearby farmer search
- Admin live dashboard and farmer verification

## Notes
- The Atlas DNS workaround is included in `backend/src/server.js` (`8.8.8.8` / `1.1.1.1`) because the original environment experienced SRV lookup failures.
- Do not commit `.env` or real secrets.
