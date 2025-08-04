const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const verifyUsers = async () => {
  const users = await prisma.user.findMany();
  console.log('Users Data:', users);
};

const verifyOrders = async () => {
  const orders = await prisma.order.findMany();
  console.log('Orders Data:', orders);
};

const verifyDistributionCenters = async () => {
  const centers = await prisma.distributionCenter.findMany();
  console.log('Distribution Centers Data:', centers);
};

const verifyProducts = async () => {
  const products = await prisma.product.findMany();
  console.log('Products Data:', products);
};

const verifyData = async () => {
  try {
    await verifyDistributionCenters();
    await verifyUsers();
    await verifyProducts();
    await verifyOrders();
  } catch (error) {
    console.error('Error verifying data:', error);
  } finally {
    await prisma.$disconnect();
  }
};

verifyData();
