const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

const SUBS_KEY = 'ab_subscriptions';

function getSubs() {
  return JSON.parse(localStorage.getItem(SUBS_KEY) || '[]');
}

function saveSubs(subs) {
  localStorage.setItem(SUBS_KEY, JSON.stringify(subs));
}

export async function createSubscription(data) {
  await delay();
  const subs = getSubs();
  const sub = {
    id: 'SUB-' + Date.now().toString(36).toUpperCase(),
    ...data,
    status: 'active',
    createdAt: new Date().toISOString(),
    nextDelivery: new Date(Date.now() + 7 * 86400000).toISOString(),
  };
  subs.push(sub);
  saveSubs(subs);
  return sub;
}

export async function getSubscriptionByUser(userId) {
  await delay(300);
  const subs = getSubs();
  return subs.find((s) => s.userId === userId && s.status !== 'cancelled') || null;
}

export async function updateSubscription(subId, updates) {
  await delay();
  const subs = getSubs();
  const idx = subs.findIndex((s) => s.id === subId);
  if (idx === -1) throw new Error('Subscription not found');
  subs[idx] = { ...subs[idx], ...updates };
  saveSubs(subs);
  return subs[idx];
}

export async function skipDelivery(subId) {
  await delay();
  const subs = getSubs();
  const sub = subs.find((s) => s.id === subId);
  if (!sub) throw new Error('Subscription not found');
  // Push next delivery forward by one cycle
  const next = new Date(sub.nextDelivery);
  const days = sub.frequency === 'weekly' ? 7 : sub.frequency === 'biweekly' ? 14 : 30;
  sub.nextDelivery = new Date(next.getTime() + days * 86400000).toISOString();
  saveSubs(subs);
  return sub;
}

export async function pauseSubscription(subId) {
  await delay();
  return updateSubscription(subId, { status: 'paused' });
}

export async function resumeSubscription(subId) {
  await delay();
  return updateSubscription(subId, {
    status: 'active',
    nextDelivery: new Date(Date.now() + 7 * 86400000).toISOString(),
  });
}

export async function cancelSubscription(subId) {
  await delay();
  return updateSubscription(subId, {
    status: 'cancelled',
    cancelledAt: new Date().toISOString(),
  });
}
