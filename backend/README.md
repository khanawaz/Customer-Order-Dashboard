
# Customer Management Backend API

This backend API provides endpoints to manage customers and their orders with support for pagination and detailed customer data retrieval. It is built using **Node.js**, **Express.js** (assumed), and **Prisma ORM** with a connected database.


## Features

- Retrieve paginated list of customers with order counts
- Get detailed information about a specific customer, including their orders
- Fetch all orders for a specific customer
- Basic error handling and validation

---

## Technologies Used

- Node.js
- Express.js (assumed for routing)
- Prisma ORM
- PostgreSQL (or any supported relational DB)
- JavaScript (ES6+)

---

## Setup and Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
````

2. **Install dependencies**

  
   npm install


3. **Setup your database**

   * Configure your database connection in the `.env` file (use `.env.example` as reference).
   * Run Prisma migrations to create your database schema:

   ```bash
   npx prisma migrate dev --name init
   ```

4. **Start the server**

   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:4000` by default.

---

## API Endpoints

### 1. Get All Customers (Paginated)

```
GET /customers?page={page}&limit={limit}
```

* **Query Parameters:**

  * `page` (optional, default: 1) — The page number.
  * `limit` (optional, default: 10) — Number of customers per page.

* **Response:**

  ```json
  {
    "success": true,
    "page": 1,
    "limit": 10,
    "data": [
      {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com",
        "city": "New York",
        "country": "USA",
        "orderCount": 5
      },
      ...
    ]
  }
  ```

---

### 2. Get Customer by ID

```
GET /customers/:id
```

* **Path Parameters:**

  * `id` — Customer ID

* **Response:**

  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@example.com",
      "city": "New York",
      "country": "USA",
      "orderCount": 5,
      "orders": [
        {
          "id": 101,
          "order_date": "2023-01-01",
          "total": 123.45,
          ...
        }
      ]
    }
  }
  ```

---

### 3. Get Orders for a Specific Customer

```
GET /customers/:id/orders
```

* **Path Parameters:**

  * `id` — Customer ID

* **Response:**

  ```json
  {
    "success": true,
    "data": [
      {
        "id": 101,
        "order_date": "2023-01-01",
        "total": 123.45,
        ...
      },
      ...
    ]
  }
  ```

---

## Error Handling

* Invalid IDs or parameters respond with status `400` and an error message.
* Server errors respond with status `500` and a generic message.

---

## Folder Structure (Example)

```
/controllers
  customerController.js
/models
  prisma.js
/routes
  customerRoutes.js
/app.js
/server.js
```

---

## Environment Variables

Make sure to create a `.env` file in your project root with the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/yourdb?schema=public"
PORT=4000
```

---

## How to Contribute

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit and push (`git commit -am 'Add feature' && git push origin feature/your-feature`)
5. Open a pull request

---

## License

MIT License © \[Your Name]

---

## Contact

If you have any questions or feedback, feel free to reach out:

* Email: [your-email@example.com](mailto:your-email@example.com)
* GitHub: [your-username](https://github.com/your-username)

```

---

If you want, I can help you generate a README for the frontend or full-stack project as well!
```
Sure! Here's a professional and clear **README.md** file template for your backend API based on the code you shared (Prisma + Express-like controllers for customer and order management with pagination).

---

````markdown
# Customer Management Backend API

This backend API provides endpoints to manage customers and their orders with support for pagination and detailed customer data retrieval. It is built using **Node.js**, **Express.js** (assumed), and **Prisma ORM** with a connected database.

---

## Features

- Retrieve paginated list of customers with order counts
- Get detailed information about a specific customer, including their orders
- Fetch all orders for a specific customer
- Basic error handling and validation

---

## Technologies Used

- Node.js
- Express.js (assumed for routing)
- Prisma ORM
- PostgreSQL (or any supported relational DB)
- JavaScript (ES6+)

---

## Setup and Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup your database**

   * Configure your database connection in the `.env` file (use `.env.example` as reference).
   * Run Prisma migrations to create your database schema:

   ```bash
   npx prisma migrate dev --name init
   ```

4. **Start the server**

   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:4000` by default.

---

## API Endpoints

### 1. Get All Customers (Paginated)

```
GET /customers?page={page}&limit={limit}
```

* **Query Parameters:**

  * `page` (optional, default: 1) — The page number.
  * `limit` (optional, default: 10) — Number of customers per page.

* **Response:**

  ```json
  {
    "success": true,
    "page": 1,
    "limit": 10,
    "data": [
      {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com",
        "city": "New York",
        "country": "USA",
        "orderCount": 5
      },
      ...
    ]
  }
  ```

---

### 2. Get Customer by ID

```
GET /customers/:id
```

* **Path Parameters:**

  * `id` — Customer ID

* **Response:**

  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@example.com",
      "city": "New York",
      "country": "USA",
      "orderCount": 5,
      "orders": [
        {
          "id": 101,
          "order_date": "2023-01-01",
          "total": 123.45,
          ...
        }
      ]
    }
  }
  ```

---

### 3. Get Orders for a Specific Customer

```
GET /customers/:id/orders
```

* **Path Parameters:**

  * `id` — Customer ID

* **Response:**

  ```json
  {
    "success": true,
    "data": [
      {
        "id": 101,
        "order_date": "2023-01-01",
        "total": 123.45,
        ...
      },
      ...
    ]
  }
  ```

---

## Error Handling

* Invalid IDs or parameters respond with status `400` and an error message.
* Server errors respond with status `500` and a generic message.

---

## Folder Structure (Example)

```
/controllers
  customerController.js
/models
  prisma.js
/routes
  customerRoutes.js
/app.js
/server.js
```

---

## Environment Variables

Make sure to create a `.env` file in your project root with the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/yourdb?schema=public"
PORT=4000
```

---

## How to Contribute

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit and push (`git commit -am 'Add feature' && git push origin feature/your-feature`)
5. Open a pull request

---

## License

MIT License © \[Your Name]

---

## Contact

If you have any questions or feedback, feel free to reach out:

* Email: [your-email@example.com](mailto:your-email@example.com)
* GitHub: [your-username](https://github.com/your-username)

```

---

If you want, I can help you generate a README for the frontend or full-stack project as well!
```
