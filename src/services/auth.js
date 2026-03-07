import { BACKEND } from './config';

const stubs = () => import('./stubs/auth.stub');

async function getImpl() {
  if (BACKEND === 'stub') return stubs();
  // Future: return import('./shopify/auth.shopify');
  return stubs();
}

export const login = async (...args) => (await getImpl()).login(...args);
export const register = async (...args) => (await getImpl()).register(...args);
export const logout = async (...args) => (await getImpl()).logout(...args);
export const getCurrentUser = async (...args) => (await getImpl()).getCurrentUser(...args);
export const resetPassword = async (...args) => (await getImpl()).resetPassword(...args);
export const updateProfile = async (...args) => (await getImpl()).updateProfile(...args);
export const changePassword = async (...args) => (await getImpl()).changePassword(...args);
