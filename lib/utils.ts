import { Product, ProductImage } from "./types";

/**
 * Finds the primary image for a product.
 * Falls back to the first image of the first variant.
 */
export const getPrimaryImage = (product: Product): ProductImage | null => {
  for (const variant of product.product_variants) {
    const primary = variant.variant_images.find((img) => img.is_primary);
    if (primary) return { url: primary.image_url, altText: null };
    if (variant.variant_images.length > 0)
      return { url: variant.variant_images[0].image_url, altText: null };
  }
  return null;
};

/**
 * Calculates the final price of a product.
 * Uses the base price and adds the first variant's modifier if it exists.
 */
export const getFinalPrice = (product: Product): string => {
  const basePrice = parseFloat(product.base_price);

  // Handle case where product might not be valid or have variants
  if (isNaN(basePrice)) {
    return "0.00";
  }

  const firstVariant = product.product_variants?.[0];

  if (firstVariant?.price_modifier) {
    const modifier = parseFloat(firstVariant.price_modifier);
    if (!isNaN(modifier)) {
      return (basePrice + modifier).toFixed(2);
    }
  }

  return basePrice.toFixed(2);
};
