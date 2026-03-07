import { BACKEND } from './config';

const stubs = () => import('./stubs/products.stub');

async function getImpl() {
  if (BACKEND === 'stub') return stubs();
  return stubs();
}

export const getMenu = async (...args) => (await getImpl()).getMenu(...args);
export const getVariants = async (...args) => (await getImpl()).getVariants(...args);
