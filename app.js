require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// List all customers with optional pagination
app.get('/customers', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const customers = await prisma.user.findMany({
      skip: parseInt(skip),
      take: parseInt(limit),
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        city: true,
        country: true,
      },
    });

    res.json({
      success: true,
      page: parseInt(page),
      limit: parseInt(limit),
      data: customers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get specific customer details including order count
app.get('/customers/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: 'Invalid customer ID' });
  }

  try {
    const customer = await prisma.user.findUnique({
      where: { id },
      include: {
        orders: true,
      },
    });

    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    // Calculate order count
    const orderCount = customer.orders.length;

    res.json({
      success: true,
      data: {
        ...customer,
        orderCount,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
