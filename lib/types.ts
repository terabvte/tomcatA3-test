// lib/types.ts

export interface AttributeValue {
  value: string;
}

export interface VariantAttribute {
  attribute_value_id: number;
  attribute_values: AttributeValue;
}

export interface VariantImage {
  image_url: string;
  is_primary: boolean;
}

export interface ProductVariant {
  variant_id: number;
  sku: string;
  price_modifier: string | null;
  stock_quantity: number;
  variant_attributes: VariantAttribute[];
  variant_images: VariantImage[];
}

export interface Product {
  product_id: number;
  name: string;
  slug: string;
  base_price: string;
  description?: string;
  product_variants: ProductVariant[];
}

export interface ProductImage {
  url: string;
  altText: string | null;
}
