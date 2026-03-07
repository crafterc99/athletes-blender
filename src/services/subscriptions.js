import { BACKEND } from './config';

const stubs = () => import('./stubs/subscriptions.stub');

async function getImpl() {
  if (BACKEND === 'stub') return stubs();
  return stubs();
}

export const createSubscription = async (...args) => (await getImpl()).createSubscription(...args);
export const getSubscriptionByUser = async (...args) => (await getImpl()).getSubscriptionByUser(...args);
export const updateSubscription = async (...args) => (await getImpl()).updateSubscription(...args);
export const skipDelivery = async (...args) => (await getImpl()).skipDelivery(...args);
export const pauseSubscription = async (...args) => (await getImpl()).pauseSubscription(...args);
export const resumeSubscription = async (...args) => (await getImpl()).resumeSubscription(...args);
export const cancelSubscription = async (...args) => (await getImpl()).cancelSubscription(...args);
