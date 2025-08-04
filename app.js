require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
  {origin:'*'}
));
app.use(express.json());

// List all customers with optional pagination
app.get('/customers', async (req, res) => {
  try {
    // Default pagination values
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const customers = await prisma.user.findMany({
      skip,
      take: limit,
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
      page,
      limit,
      data: customers,
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
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
        orders: true, // includes orders array
      },
    });

    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    const orderCount = customer.orders.length;

    res.json({
      success: true,
      data: {
        ...customer,
        orderCount,
      },
    });
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get all orders for a specific customer
app.get('/customers/:id/orders', async (req, res) => {
  const customerId = parseInt(req.params.id);
  if (isNaN(customerId)) {
    return res.status(400).json({ success: false, message: 'Invalid customer ID' });
  }

  try {
    const customer = await prisma.user.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    const orders = await prisma.order.findMany({
      where: { user_id: customerId },
      orderBy: { created_at: 'desc' },
    });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error('Error fetching orders for customer:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get specific order details by order ID
app.get('/orders/:orderId', async (req, res) => {
  const orderId = parseInt(req.params.orderId);
  if (isNaN(orderId)) {
    return res.status(400).json({ success: false, message: 'Invalid order ID' });
  }

  try {
    const order = await prisma.order.findUnique({
      where: { order_id: orderId },
      include: {
        user: true, // Include customer info
      },
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
