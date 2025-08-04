const prisma = require('../models/prisma');

exports.getOrderById = async (req, res) => {
  const orderId = parseInt(req.params.orderId);
  if (isNaN(orderId)) {
    return res.status(400).json({ success: false, message: 'Invalid order ID' });
  }

  try {
    const order = await prisma.order.findUnique({
      where: { order_id: orderId },
      include: { user: true },
    });

    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
