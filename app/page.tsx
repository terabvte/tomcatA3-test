"use client";

import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import ProductFilter from "./components/ProductFilter";
import ProductCard from "./components/ProductCard";
import { getProducts } from "../lib/products";
import { Product, ProductImage } from "../lib/types";
import { getFinalPrice, getPrimaryImage } from "@/lib/utils";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getProducts();

      // Filter locally (optional: could push filters to Supabase later)
      const filtered = data.filter((p: Product) => {
        const matchesSearch = searchTerm
          ? p.name.toLowerCase().includes(searchTerm.toLowerCase())
          : true;

        const matchesColor = selectedColor
          ? p.product_variants?.some((v) =>
              v.variant_attributes?.some(
                (a) => a.attribute_values?.value === selectedColor
              )
            )
          : true;

        const matchesSize = selectedSize
          ? p.product_variants?.some((v) =>
              v.variant_attributes?.some(
                (a) => a.attribute_values?.value === selectedSize
              )
            )
          : true;

        return matchesSearch && matchesColor && matchesSize;
      });

      setProducts(filtered);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedColor, selectedSize]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const allColors = [
    ...new Set(
      products.flatMap((p) =>
        p.product_variants.flatMap((v) =>
          v.variant_attributes.map((a) => a.attribute_values.value)
        )
      )
    ),
  ];

  const allSizes = [
    ...new Set(
      products.flatMap((p) =>
        p.product_variants.flatMap((v) =>
          v.variant_attributes.map((a) => a.attribute_values.value)
        )
      )
    ),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-3xl font-bold text-gray-900">
          T-Shirt Collection
        </h2>

        <ProductFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          allColors={allColors}
          allSizes={allSizes}
        />

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">
              No t-shirts found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.product_id}
                product={product}
                getPrimaryImage={getPrimaryImage}
                getFinalPrice={getFinalPrice}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
