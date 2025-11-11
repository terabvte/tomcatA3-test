"use client";

import Link from "next/link";
import { Product, ProductImage } from "../../lib/types";

interface ProductCardProps {
  product: Product;
  getPrimaryImage: (product: Product) => ProductImage | null;
  getFinalPrice: (product: Product) => string;
}

export default function ProductCard({
  product,
  getPrimaryImage,
  getFinalPrice,
}: ProductCardProps) {
  const primaryImage = getPrimaryImage(product);
  const finalPrice = getFinalPrice(product);

  return (
    <Link
      key={product.product_id}
      href={`/product/${product.slug}`}
      className="group"
    >
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
        <div className="mb-4 aspect-square overflow-hidden rounded-lg bg-gray-200">
          {primaryImage ? (
            <img
              src={primaryImage.url}
              alt={primaryImage.altText || product.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        <h3 className="mb-2 font-semibold text-gray-900">{product.name}</h3>

        <p className="mb-3 line-clamp-2 text-sm text-gray-600">
          {product.description || "No description available"}
        </p>

        <div className="mb-3">
          <span className="text-lg font-bold text-gray-900">${finalPrice}</span>
        </div>

        {/* Available Colors */}
        {product.product_variants && product.product_variants.length > 0 && (
          <>
            {(() => {
              // Extract color attributes (assuming colors are common color names)
              const colorNames = [
                "red",
                "blue",
                "green",
                "yellow",
                "black",
                "white",
                "gray",
                "navy",
                "pink",
                "purple",
                "orange",
                "brown",
              ];

              const allAttributes = product.product_variants
                .flatMap(
                  (v) =>
                    v.variant_attributes?.map(
                      (a) => a.attribute_values?.value
                    ) || []
                )
                .filter((value): value is string => Boolean(value));

              const colors = [...new Set(allAttributes)].filter((attr) =>
                colorNames.some((color) =>
                  attr.toLowerCase().includes(color.toLowerCase())
                )
              );

              const nonColors = [...new Set(allAttributes)].filter(
                (attr) =>
                  !colorNames.some((color) =>
                    attr.toLowerCase().includes(color.toLowerCase())
                  )
              );

              return (
                <div className="space-y-2">
                  {/* Colors as colored circles */}
                  {colors.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Colors:</span>
                      <div className="flex gap-1">
                        {colors
                          .slice(0, 5)
                          .map((color: string, index: number) => {
                            // Map color names to CSS colors
                            const colorMap: Record<string, string> = {
                              red: "#ef4444",
                              blue: "#3b82f6",
                              green: "#22c55e",
                              yellow: "#eab308",
                              black: "#000000",
                              white: "#ffffff",
                              gray: "#6b7280",
                              navy: "#1e3a8a",
                              pink: "#ec4899",
                              purple: "#a855f7",
                              orange: "#f97316",
                              brown: "#a3673a",
                            };

                            const colorValue = Object.keys(colorMap).find((c) =>
                              color.toLowerCase().includes(c)
                            );

                            return (
                              <div
                                key={`${color}-${index}`}
                                className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                                style={{
                                  backgroundColor: colorValue
                                    ? colorMap[colorValue]
                                    : "#6b7280",
                                }}
                                title={color}
                              />
                            );
                          })}
                        {colors.length > 5 && (
                          <span className="text-xs text-gray-500">
                            +{colors.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Other attributes as tags */}
                  {nonColors.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {nonColors
                        .slice(0, 4)
                        .map((attr: string, index: number) => (
                          <span
                            key={`${attr}-${index}`}
                            className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700"
                          >
                            {attr}
                          </span>
                        ))}
                      {nonColors.length > 4 && (
                        <span className="text-xs text-gray-500">
                          +{nonColors.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}
          </>
        )}
      </div>
    </Link>
  );
}
