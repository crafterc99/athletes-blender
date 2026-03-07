import { MENU } from '../../data/menu';
import { PRICING } from '../../data/pricing';

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export async function getMenu() {
  await delay();
  return MENU;
}

export async function getVariants() {
  await delay();
  return PRICING.boxSizes;
}
