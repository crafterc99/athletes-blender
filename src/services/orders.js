import { BACKEND } from './config';

const stubs = () => import('./stubs/orders.stub');

async function getImpl() {
  if (BACKEND === 'stub') return stubs();
  return stubs();
}

export const createOrder = async (...args) => (await getImpl()).createOrder(...args);
export const getOrdersByUser = async (...args) => (await getImpl()).getOrdersByUser(...args);
export const getOrderById = async (...args) => (await getImpl()).getOrderById(...args);
