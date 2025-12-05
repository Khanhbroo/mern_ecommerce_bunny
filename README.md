# 🐰 EcommerceBunny
**“Shop smart, hop fast!”**

A modern, full-stack e-commerce application built for speed and simplicity. Designed to provide a seamless shopping experience with secure payments, admin management, and a responsive UI. Built with the **MERN Stack** and **TypeScript** for robust performance.

---

## 🚀 Live Demo & Deployment Status

### 🔗 Live Demo
https://mern-ecommerce-bunny-frontend.onrender.com

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
- 🛒 **Browse Products**: Filter by category, collection, or search.  
- ➕ **Shopping Cart**: Add/remove items, adjust quantities.  
- 💳 **Secure Checkout**: Integrated PayPal payments and guest checkout support.  
- 👤 **User Accounts**: Register, login, and view order history.  
- 📱 **Responsive Design**: Optimized for mobile and desktop.

##

### 🛡️ Admin Dashboard
- 📦 **Product Management**: Create, edit, and delete products.  
- 📊 **Order Management**: View and update order status (Processing, Shipped, Delivered).  
- 🧑‍💼 **User Management**: Manage registered users.


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

## 📘 Usage

Once both backend and frontend are running, you can start interacting with the EcommerceBunny platform.

### 🛍️ For Users
- 🏠 **Homepage** — Browse featured products and categories  
- 🔍 **Search & Filter** — Find products by keyword or collection  
- 📄 **Product Page** — View details, sizes, available colors  
- 🛒 **Cart Page** — Add items, update quantity, or remove products  
- 💳 **Checkout** — Pay using PayPal or as a guest  
- 👤 **Account System**  
  - Register a new user  
  - Login & stay authenticated  
  - View past orders  
  - Track order statuses  

### 🛡️ For Admins
- 🔐 Login with admin credentials  
- 📦 **Manage Products**  
  - Add new product  
  - Edit existing product  
  - Update inventory  
  - Delete product  
- 📊 **Manage Orders**  
  - View all orders  
  - Update order status (Processing → Shipped → Delivered)  
- 👥 **Manage Users**  
  - List all registered users  
  - Delete or ban suspicious accounts  

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo.
2. Create a feature branch: `git checkout -b feature/cool-new-feature`.
3. Commit your changes: `git commit -m "Add cool new feature"`.
4. Push to GitHub: `git push origin feature/cool-new-feature`.
5. Open a Pull Request.

---

## 📸 Screenshot
<img width="1823" height="944" alt="image" src="https://github.com/user-attachments/assets/a909218d-c595-4258-ad10-8e7b34831fbb" />
<img width="1847" height="894" alt="image" src="https://github.com/user-attachments/assets/d56dbfc3-5f7b-44e3-ab48-8c6228b957e5" />
<img width="1699" height="907" alt="image" src="https://github.com/user-attachments/assets/1e9b7d69-b136-4894-b423-3d4e1aaa3945" />
<img width="1745" height="958" alt="image" src="https://github.com/user-attachments/assets/2fd5aba6-9d83-42d8-8fca-eb602a6f033c" />
<img width="1862" height="948" alt="image" src="https://github.com/user-attachments/assets/171a27d5-a4f4-4405-ab86-885506ee6b37" />

---

## 🔮 Future Improvements

Planned enhancements to make EcommerceBunny even more powerful:

### 🌟 User Experience
- 🌙 **Dark Mode** toggle  
- ❤️ **Wishlist / Favorites** feature  
- 📝 **Product Reviews & Ratings**  
- 🛎️ **Email Notifications** for order updates  
- 📱 **Mobile App** (React Native in the future)

### 🚀 Performance & Scaling
- ⚡ **Server-Side Rendering (SSR)** for faster SEO  
- 📦 **Lazy loading & code splitting** for faster page loads  
- 🌐 **CDN delivery** for static assets (Cloudflare / Vercel)

### 🛒 E-Commerce Features
- 🧾 **Discount codes / promo coupons**  
- 💰 **Multiple payment providers** (Stripe, VNPay, Momo)  
- 📦 **Inventory tracking** with auto-sync  
- 🧮 **Advanced analytics dashboard** for admins  

### 🔐 Security & Reliability
- 🔑 **2FA Authentication**  
- 🛡️ **Rate limiting improvements**  
- 🔒 **Advanced role-based access** (Super Admin, Editor)

### 🤖 Automation & AI
- 🤖 **AI-powered product recommendations**  
- 🗂️ **Auto-categorization of products**  
- 📝 **Chatbot for customer support**

---

## 👨‍💻 Author

### ✨ **EcommerceBunny — Developed by Khanh Doan**
Built with ❤️ using the **MERN Stack (MongoDB, Express, React, Node.js)**.  
- 🧑‍🚀 Passionate full-stack developer  
- 💡 Loves building clean and efficient applications  
- 🚀 Open to contributions, ideas, and collaborations  

---

## ⭐ Support  
**Feel free to fork, contribute, or use this project as a foundation for your own apps.**  
Your support means a lot! ⭐
If you like this project, please give it a **⭐ star on GitHub** — it helps a lot!
