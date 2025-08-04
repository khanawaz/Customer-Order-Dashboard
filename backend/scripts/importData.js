// importData.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const readCSV = (filename) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(path.join(__dirname, '../data', filename))
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
};

const loadDistributionCenters = async () => {
  const rows = await readCSV('distribution_centers.csv');
  for (const row of rows) {
    await prisma.distributionCenter.create({
      data: {
        name: row.name,
        latitude: parseFloat(row.latitude),
        longitude: parseFloat(row.longitude),
      },
    });
  }
  console.log('Distribution centers loaded!');
};

const loadUsers = async () => {
  const rows = await readCSV('users.csv');
  for (const row of rows) {
    try {
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
        },
      });
    } catch (e) {
      if (e.code === 'P2002') console.warn(`Duplicate email: ${row.email}`);
    }
  }
  console.log('Users loaded!');
};

const loadProducts = async () => {
  const rows = await readCSV('products.csv');
  for (const row of rows) {
    await prisma.product.create({
      data: {
        id: parseInt(row.id),
        cost: parseFloat(row.cost),
        category: row.category,
        name: row.name,
        brand: row.brand,
        retail_price: parseFloat(row.retail_price),
        department: row.department,
        sku: row.sku,
        distribution_center_id: parseInt(row.distribution_center_id),
      },
    });
  }
  console.log('Products loaded!');
};

const loadInventoryItems = async () => {
  const rows = await readCSV('inventory_items.csv');
  for (const row of rows) {
    await prisma.inventoryItem.create({
      data: {
        id: parseInt(row.id),
        product_id: parseInt(row.product_id),
        created_at: new Date(row.created_at),
        sold_at: row.sold_at ? new Date(row.sold_at) : null,
        cost: parseFloat(row.cost),
        product_category: row.product_category,
        product_name: row.product_name,
        product_brand: row.product_brand,
        product_retail_price: parseFloat(row.product_retail_price),
        product_department: row.product_department,
        product_sku: row.product_sku,
        product_distribution_center_id: parseInt(row.product_distribution_center_id),
      },
    });
  }
  console.log('Inventory items loaded!');
};

const loadOrders = async () => {
  const rows = await readCSV('orders.csv');
  for (const row of rows) {
    await prisma.order.create({
      data: {
        order_id: parseInt(row.order_id),
        user_id: parseInt(row.user_id),
        status: row.status,
        gender: row.gender,
        created_at: new Date(row.created_at),
        returned_at: row.returned_at ? new Date(row.returned_at) : null,
        shipped_at: row.shipped_at ? new Date(row.shipped_at) : null,
        delivered_at: row.delivered_at ? new Date(row.delivered_at) : null,
        num_of_item: parseInt(row.num_of_item),
      },
    });
  }
  console.log('Orders loaded!');
};

const loadOrderItems = async () => {
  const rows = await readCSV('order_items.csv');
  for (const row of rows) {
    await prisma.orderItem.create({
      data: {
        id: parseInt(row.id),
        order_id: parseInt(row.order_id),
        user_id: parseInt(row.user_id),
        product_id: parseInt(row.product_id),
        inventory_item_id: parseInt(row.inventory_item_id),
        status: row.status,
        created_at: new Date(row.created_at),
        shipped_at: row.shipped_at ? new Date(row.shipped_at) : null,
        delivered_at: row.delivered_at ? new Date(row.delivered_at) : null,
        returned_at: row.returned_at ? new Date(row.returned_at) : null,
        sale_price: parseFloat(row.sale_price),
      },
    });
  }
  console.log('Order items loaded!');
};

const loadData = async () => {
  try {
    await loadDistributionCenters();
    await loadUsers();
    await loadProducts();
    await loadInventoryItems();
    await loadOrders();
    await loadOrderItems();
  } catch (err) {
    console.error('Error loading data:', err);
  } finally {
    await prisma.$disconnect();
  }
};

loadData();
