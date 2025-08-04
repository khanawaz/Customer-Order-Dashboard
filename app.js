require('dotenv').config();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Helper to read CSV file and return all rows as array
const readCSV = (filename) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(path.join(__dirname, filename))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
};

// Load functions
const loadUsers = async () => {
  const rows = await readCSV('users.csv');
  for (const row of rows) {
    await prisma.user.create({
      data: {
        first_name: row.first_name,
        last_name: row.last_name,
        email: row.email,
        age: row.age ? parseInt(row.age) : null,
        gender: row.gender,
        state: row.state,
        street_address: row.street_address,
        postal_code: row.postal_code,
        city: row.city,
        country: row.country,
        latitude: parseFloat(row.latitude),
        longitude: parseFloat(row.longitude),
        traffic_source: row.traffic_source,
        created_at: row.created_at ? new Date(row.created_at) : undefined,
      }
    });
  }
  console.log('Users loaded successfully!');
};

const loadOrders = async () => {
  const rows = await readCSV('orders.csv');
  for (const row of rows) {
    await prisma.order.create({
      data: {
        user_id: parseInt(row.user_id),
        status: row.status,
        gender: row.gender,
        created_at: new Date(row.created_at),
        returned_at: row.returned_at ? new Date(row.returned_at) : null,
        shipped_at: row.shipped_at ? new Date(row.shipped_at) : null,
        delivered_at: row.delivered_at ? new Date(row.delivered_at) : null,
        num_of_item: parseInt(row.num_of_item),
      }
    });
  }
  console.log('Orders loaded successfully!');
};

const loadDistributionCenters = async () => {
  const rows = await readCSV('distribution_centers.csv');
  for (const row of rows) {
    await prisma.distributionCenter.create({
      data: {
        name: row.name,
        latitude: parseFloat(row.latitude),
        longitude: parseFloat(row.longitude),
      }
    });
  }
  console.log('Distribution centers loaded successfully!');
};

const loadProducts = async () => {
  const rows = await readCSV('products.csv');
  for (const row of rows) {
    await prisma.product.create({
      data: {
        name: row.name,
        cost: parseFloat(row.cost),
        category: row.category,
        brand: row.brand,
        retail_price: parseFloat(row.retail_price),
        department: row.department,
        sku: row.sku,
        distribution_center_id: row.distribution_center_id ? parseInt(row.distribution_center_id) : null,
      }
    });
  }
  console.log('Products loaded successfully!');
};

// Verify functions
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

async function main() {
  try {
    console.log('Loading data...');
    await loadDistributionCenters();
    await loadUsers();
    await loadProducts();
    await loadOrders();

    console.log('\nVerifying data...');
    await verifyDistributionCenters();
    await verifyUsers();
    await verifyProducts();
    await verifyOrders();

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
    console.log('Disconnected Prisma Client');
  }
}

main();
