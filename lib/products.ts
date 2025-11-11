// lib/products.ts
import { supabase } from "./supabaseClient";
import { Product } from "./types";

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      product_id,
      name,
      slug,
      base_price,
      description,
      product_variants (
        variant_id,
        sku,
        price_modifier,
        stock_quantity,
        variant_attributes (
          attribute_value_id,
          attribute_values (value)
        ),
        variant_images (image_url, is_primary)
      )
    `
    )
    .order("name");

  if (error) throw error;
  return data as unknown as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      product_id,
      name,
      slug,
      base_price,
      description,
      product_variants (
        variant_id,
        sku,
        price_modifier,
        stock_quantity,
        variant_attributes (
          attribute_value_id,
          attribute_values (value)
        ),
        variant_images (image_url, is_primary)
      )
    `
    )
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data as unknown as Product;
}
