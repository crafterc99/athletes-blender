export async function createDraftOrder(cartPayload) {
  console.log("[STUB] createDraftOrder", cartPayload);
  return { checkoutUrl: "/checkout-stub" };
}

export async function getCustomerOrders(customerId) {
  console.log("[STUB] getCustomerOrders", customerId);
  return [];
}

export async function getProductVariants() {
  console.log("[STUB] getProductVariants");
  return [];
}
