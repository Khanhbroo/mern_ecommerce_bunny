# 🐰 EcommerceBunny
**“Shop smart, hop fast!”**

A modern, full-stack e-commerce application built for speed and simplicity. Designed to provide a seamless shopping experience with secure payments, admin management, and a responsive UI. Built with the **MERN Stack** and **TypeScript** for robust performance.

---

## 🚀 Live Demo & Deployment Status

### 🔗 Live Demo
[Insert Your Render Frontend URL Here]

> ⚠️ **Note:** Render free-tier services may “cold start,” causing slow loading or temporary downtime on the first request.
> If the page does not load immediately:
> 1. Wait 30–60 seconds for the backend to wake up.
> 2. Refresh the page.

---

## 🧰 Tech Stack

| Language / Technology | Description |
|----------------------|-------------|
| **TypeScript**       | Strong-typed logic for both backend and frontend reliability. |
| **React (Vite)**     | Blazing fast frontend with modern hooks and component architecture. |
| **Redux Toolkit**    | Efficient state management for cart, user, and product data. |
| **Tailwind CSS**     | Utility-first CSS for rapid, responsive UI design. |
| **Node.js & Express**| Scalable backend REST API. |
| **MongoDB (Mongoose)**| Flexible NoSQL database for products, users, and orders. |
| **PayPal API**       | Secure payment integration. |
| **Cloudinary**       | Optimized image storage and delivery. |

---

## 🗂️ Project Structure

```
EcommerceBunny/
├── backend/               # Backend API
│   ├── models/            # Database schemas (Product, User, Order)
│   ├── routes/            # API endpoints
│   ├── config/            # DB connection & env setup
│   ├── server.js          # Entry point
│   └── package.json       # Backend dependencies
├── frontend/              # Frontend UI
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route pages (Home, Product, Cart)
│   │   ├── redux/         # Global state slices
│   │   └── type/          # TypeScript definitions
│   ├── public/            # Static assets
│   ├── vite.config.ts     # Vite configuration
│   └── package.json       # Frontend dependencies
├── package.json           # Root configuration (if applicable)
└── README.md              # Project documentation
```

---

## ✨ Features

### 🛍️ User Features
- **Browse Products**: Filter by category, collection, or search.
- **Shopping Cart**: Add/remove items, adjust quantities.
- **Secure Checkout**: Integrated PayPal payments and guest checkout support.
- **User Accounts**: Register, login, and view order history.
- **Responsive Design**: Optimized for mobile and desktop.

### 🛡️ Admin Dashboard
- **Product Management**: Create, edit, and delete products.
- **Order Management**: View and update order status (Processing, Shipped, Delivered).
- **User Management**: Manage registered users.

---

## 📥 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Khanhbroo/EcommerceBunny.git
cd EcommerceBunny
```

### 2. Install dependencies

**Backend**
```bash
cd backend
npm install
```

**Frontend**
```bash
cd frontend
npm install
```

### 3. Environment Configuration
Create a `.env` file in both `backend/` and `frontend/` directories (or root as required).

**Backend `.env`**:
```env
PORT=9000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
VITE_PAYPAL_SECRET_KEY=...
```

**Frontend `.env`**:
```env
VITE_BACKEND_URL=http://localhost:9000
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

### 4. Run the application locally

**Backend**
```bash
cd backend
npm start
```

**Frontend**
```bash
cd frontend
npm run dev
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo.
2. Create a feature branch: `git checkout -b feature/cool-new-feature`.
3. Commit your changes: `git commit -m "Add cool new feature"`.
4. Push to GitHub: `git push origin feature/cool-new-feature`.
5. Open a Pull Request.

---

## 👨‍💻 Author

### ✨ **EcommerceBunny — Developed by Khanh Doan**
Built with ❤️ using the **MERN Stack**.
- 🚀 Passionate full-stack developer.
- 💡 Focused on building scalable, real-world applications.

---

## ⭐ Support
If you find this project useful, please give it a **⭐ star on GitHub**!
