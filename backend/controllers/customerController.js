// controllers/customerController.js
const prisma = require('../models/prisma');

// Get all customers with pagination and order count
exports.getAllCustomers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const customers = await prisma.user.findMany({
      skip,
      take: limit,
      include: {
        _count: {
          select: { orders: true },
        },
      },
    });

    const formattedCustomers = customers.map((c) => ({
      id: c.id,
      first_name: c.first_name,
      last_name: c.last_name,
      email: c.email,
      city: c.city,
      country: c.country,
      orderCount: c._count.orders,
    }));

    res.json({
      success: true,
      page,
      limit,
      data: formattedCustomers,
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get a specific customer with order count and orders
exports.getCustomerById = async (req, res) => {
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

    res.json({
      success: true,
      data: {
        ...customer,
        orderCount: customer.orders.length,
      },
    });
  } catch (error) {
    console.error('Error fetching customer by ID:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get all orders for a specific customer
exports.getOrdersForCustomer = async (req, res) => {
  const customerId = parseInt(req.params.id);

  if (isNaN(customerId)) {
    return res.status(400).json({ success: false, message: 'Invalid customer ID' });
  }

  try {
    const orders = await prisma.order.findMany({
      where: { user_id: customerId },
    });

    res.json({ success: true, data: orders });
  } catch (error) {
    console.error('Error fetching orders for customer:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
