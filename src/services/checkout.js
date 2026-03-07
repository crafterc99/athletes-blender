import { BACKEND } from './config';

const stubs = () => import('./stubs/checkout.stub');

async function getImpl() {
  if (BACKEND === 'stub') return stubs();
  return stubs();
}

export const validateCheckout = async (...args) => (await getImpl()).validateCheckout(...args);
export const processCheckout = async (...args) => (await getImpl()).processCheckout(...args);
