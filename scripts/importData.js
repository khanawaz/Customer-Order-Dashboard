const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Function to load users from CSV
const loadUsers = async () => {
  const users = [];
  fs.createReadStream(path.join(__dirname, 'users.csv'))
    .pipe(csv())
    .on('data', (row) => {
      users.push({
        first_name: row.first_name,
        last_name: row.last_name,
        email: row.email,
        age: parseInt(row.age),
        gender: row.gender,
        state: row.state,
        street_address: row.street_address,
        postal_code: row.postal_code,
        city: row.city,
        country: row.country,
        latitude: parseFloat(row.latitude),
        longitude: parseFloat(row.longitude),
        traffic_source: row.traffic_source,
      });
    })
    .on('end', async () => {
      console.log('CSV file for users processed successfully.');
      for (const user of users) {
        await prisma.user.create({ data: user });
      }
      console.log('Users loaded successfully!');
    });
};

// Function to load orders from CSV
const loadOrders = async () => {
  const orders = [];
  fs.createReadStream(path.join(__dirname, 'orders.csv'))
    .pipe(csv())
    .on('data', (row) => {
      orders.push({
        user_id: parseInt(row.user_id),
        status: row.status,
        gender: row.gender,
        created_at: new Date(row.created_at),
        returned_at: row.returned_at ? new Date(row.returned_at) : null,
        shipped_at: row.shipped_at ? new Date(row.shipped_at) : null,
        delivered_at: row.delivered_at ? new Date(row.delivered_at) : null,
        num_of_item: parseInt(row.num_of_item),
      });
    })
    .on('end', async () => {
      console.log('CSV file for orders processed successfully.');
      for (const order of orders) {
        await prisma.order.create({ data: order });
      }
      console.log('Orders loaded successfully!');
    });
};

// Function to load distribution centers from CSV
const loadDistributionCenters = async () => {
  const centers = [];
  fs.createReadStream(path.join(__dirname, 'distribution_centers.csv'))
    .pipe(csv())
    .on('data', (row) => {
      centers.push({
        name: row.name,
        latitude: parseFloat(row.latitude),
        longitude: parseFloat(row.longitude),
      });
    })
    .on('end', async () => {
      console.log('CSV file for distribution centers processed successfully.');
      for (const center of centers) {
        await prisma.distributionCenter.create({ data: center });
      }
      console.log('Distribution centers loaded successfully!');
    });
};

// Function to load products from CSV
const loadProducts = async () => {
  const products = [];
  fs.createReadStream(path.join(__dirname, 'products.csv'))
    .pipe(csv())
    .on('data', (row) => {
      products.push({
        name: row.name,
        cost: parseFloat(row.cost),
        category: row.category,
        brand: row.brand,
        retail_price: parseFloat(row.retail_price),
        department: row.department,
        sku: row.sku,
        distribution_center_id: parseInt(row.distribution_center_id),
      });
    })
    .on('end', async () => {
      console.log('CSV file for products processed successfully.');
      for (const product of products) {
        await prisma.product.create({ data: product });
      }
      console.log('Products loaded successfully!');
    });
};

// Run the functions to load data
const loadData = async () => {
  await loadUsers();
  await loadOrders();
  await loadDistributionCenters();
  await loadProducts();
};

// Start the data loading process
loadData();