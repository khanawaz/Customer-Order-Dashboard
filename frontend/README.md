

 🧾 Customer Dashboard Frontend

This is a simple frontend application built with **Next.js**, **React**, and **Tailwind CSS** that connects to a backend REST API and displays a list of customers.

## 🚀 Features

- ✅ View all customers in a clean table layout
- 🔍 Search customers by name or email (client-side)
- 📦 Display customer name, email, city, country, and order count
- 📡 Integrated with REST API (`/customers`)
- 🎨 Styled using Tailwind CSS
- 🔁 Handles loading and error states gracefully

---

## 📁 Project Structure

```

app/
└── page.js          # Main UI code (Customer List page)

public/
└── ...              # Static assets (if any)

styles/
└── globals.css      # Tailwind CSS imports

README.md

````

---

## ⚙️ Prerequisites

- Node.js (v16 or above recommended)
- Backend API running locally on `http://localhost:4000`
  - Make sure your `/customers` endpoint returns data with `orderCount`

---

## 🛠️ Installation

```bash
git clone https://github.com/your-username/customer-dashboard-frontend.git
cd customer-dashboard-frontend
npm install
````

---

## 🧪 Running the App (Development)

```bash
npm run dev
```

This will start the app on [http://localhost:3000](http://localhost:3000)

---

## 🔗 API Endpoint Used

This frontend expects the following backend API running on:

```
GET http://localhost:4000/customers
```

Example expected response:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@example.com",
      "city": "New York",
      "country": "USA",
      "orderCount": 5
    }
  ]
}
```

---

## 🧼 Styling

Tailwind CSS is used throughout the project. You can modify styles inside `app/page.js` or extend Tailwind in `tailwind.config.js`.

---

## 🙋‍♂️ Author

Made with ❤️ by Nawaz Khan
Frontend: **Next.js + Tailwind CSS**
Backend: [Express.js + Prisma](https://github.com/your-backend-repo)

---

