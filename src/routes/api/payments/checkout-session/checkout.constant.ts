import {
  BESTIES_FOREVER_DISCOUNT_API_PRICE
  // BESTIES_FOREVER_API_PRICE
} from '$env/static/private';
import { APP_PRODUCT } from '$lib/shared/shared.type';

/**
 * Use product "API_ID", not product id
 *
 * Currently using test ids
 */
export const PRODUCT_PRICE_ID_MAPPINGS = {
  [APP_PRODUCT.BESTIES_FOREVER]: BESTIES_FOREVER_DISCOUNT_API_PRICE
  // [APP_PRODUCT.BESTIES_FOREVER]: BESTIES_FOREVER_API_PRICE
};
