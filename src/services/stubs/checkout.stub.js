import { createOrder } from './orders.stub';
import { createSubscription } from './subscriptions.stub';
import { validateBuilderReadyForCheckout } from '../../utils/validation';

const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

export async function validateCheckout(store) {
  await delay(200);
  const errors = validateBuilderReadyForCheckout(store);
  return { valid: errors.length === 0, errors };
}

export async function processCheckout({ userId, boxSize, recipes, purchaseType, frequency, blenderIncluded, total }) {
  await delay(800);

  const orderData = {
    userId,
    boxSize: { id: boxSize.id, label: boxSize.label, count: boxSize.count },
    recipes: recipes.map((r) => ({
      name: r.name,
      bases: r.bases,
      addIns: r.addIns,
      sorbet: r.sorbet,
      supplements: r.supplements,
      quantity: r.quantity,
    })),
    purchaseType,
    frequency: purchaseType === 'subscription' ? frequency : null,
    blenderIncluded,
    total,
  };

  const order = await createOrder(orderData);

  if (purchaseType === 'subscription') {
    await createSubscription({
      userId,
      orderId: order.id,
      boxSize: orderData.boxSize,
      recipes: orderData.recipes,
      frequency,
      blenderIncluded,
    });
  }

  return order;
}
