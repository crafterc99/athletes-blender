export async function createSubscription(payload) {
  console.log("[STUB] createSubscription", payload);
  return { id: "sub_stub_001", status: "active" };
}

export async function getSubscription(customerId) {
  console.log("[STUB] getSubscription", customerId);
  return null;
}

export async function updateSubscription(subId, updates) {
  console.log("[STUB] updateSubscription", subId, updates);
  return { success: true };
}

export async function skipShipment(subId) {
  console.log("[STUB] skipShipment", subId);
  return { success: true };
}
