const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

const ORDERS_KEY = 'ab_orders';

function getOrders() {
  return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export async function createOrder(orderData) {
  await delay();
  const orders = getOrders();
  const order = {
    id: 'ORD-' + Date.now().toString(36).toUpperCase(),
    ...orderData,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 5 * 86400000).toISOString(),
  };
  orders.unshift(order);
  saveOrders(orders);
  return order;
}

export async function getOrdersByUser(userId) {
  await delay(300);
  const orders = getOrders();
  return orders.filter((o) => o.userId === userId);
}

export async function getOrderById(orderId) {
  await delay(300);
  const orders = getOrders();
  const order = orders.find((o) => o.id === orderId);
  if (!order) throw new Error('Order not found');
  return order;
}
