import { Coffee, BlendRecipe, Order } from '../types';
const WEIGHT_LOSS_FACTOR = 0.15;
const BUFFER_FACTOR = 0.08;
const HUNDRED_GRAMS_TO_POUNDS = 0.22;
export function calculateTotalPoundsNeeded(
  coffee: Coffee,
  orders: Order[],
  blends: BlendRecipe[]
): number {
  const coffeeOrders = orders.filter((order) => order.coffeeId === coffee.id);
  let totalPounds = 0;

  // Calculate direct coffee orders
  for (const order of coffeeOrders) {
    totalPounds += (order.retailQuantity * coffee.retailSize) / 453.6; // Convert g to lbs
    totalPounds += order.fivePoundQuantity * 5;
    totalPounds += order.twoPoundQuantity * 2;
    totalPounds += order.hundredGramQuantity * HUNDRED_GRAMS_TO_POUNDS;
  }

  // Calculate blend component requirements
  for (const blend of blends) {
    const component = blend.components.find((c) => c.coffeeId === coffee.id);
    if (component) {
      const blendOrders = orders.filter((order) => order.coffeeId === blend.id);
      let blendPounds = 0;

      for (const order of blendOrders) {
        blendPounds += (order.retailQuantity * blend.retailSize) / 453.6;
        blendPounds += order.fivePoundQuantity * 5;
        blendPounds += order.twoPoundQuantity * 2;
        blendPounds += order.hundredGramQuantity * HUNDRED_GRAMS_TO_POUNDS;
      }

      totalPounds += (blendPounds * component.percentage) / 100;
    }
  }

  // Account for weight loss and safety buffer
  totalPounds = totalPounds * (1 + WEIGHT_LOSS_FACTOR + BUFFER_FACTOR);

  // Subtract existing roasted inventory
  totalPounds = Math.max(0, totalPounds - coffee.roastedInventory);

  return totalPounds;
}

export function calculateBatchesNeeded(
  coffee: Coffee,
  totalPounds: number
): number {
  return Math.ceil(totalPounds / coffee.batchSize);
}