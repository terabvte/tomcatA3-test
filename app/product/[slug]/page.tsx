// app/product/[slug]/page.tsx
import { getProductBySlug } from "../../../lib/products";
import Header from "../../components/Header";
import Image from "next/image";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {product.product_variants &&
              product.product_variants.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.product_variants.map((variant) => (
                    <div
                      key={variant.variant_id}
                      className="border rounded-lg p-4"
                    >
                      {variant.variant_images &&
                        variant.variant_images.length > 0 && (
                          <div className="relative w-full h-64 mb-4">
                            <Image
                              src={
                                variant.variant_images.find(
                                  (img) => img.is_primary
                                )?.image_url ||
                                variant.variant_images[0]?.image_url ||
                                "/placeholder.jpg"
                              }
                              alt={product.name}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                        )}
                      <div className="space-y-2">
                        <p className="font-semibold text-sm">{variant.sku}</p>
                        <p className="text-sm text-gray-600">
                          Stock: {variant.stock_quantity}
                        </p>
                        {variant.price_modifier && (
                          <p className="text-sm text-green-600">
                            Price modifier: +$
                            {parseFloat(variant.price_modifier).toFixed(2)}
                          </p>
                        )}
                        {variant.variant_attributes &&
                          variant.variant_attributes.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {variant.variant_attributes.map((attr, index) => (
                                <span
                                  key={index}
                                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                >
                                  {attr.attribute_values?.value}
                                </span>
                              ))}
                            </div>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-green-600 mt-2">
                ${parseFloat(product.base_price).toFixed(2)}
              </p>
            </div>

            {product.description && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {product.product_variants &&
              product.product_variants.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    Available Options
                  </h2>
                  <div className="space-y-3">
                    {(() => {
                      // Get all unique attribute values
                      const allAttributes = product.product_variants
                        .flatMap(
                          (v) =>
                            v.variant_attributes?.map(
                              (a) => a.attribute_values?.value
                            ) || []
                        )
                        .filter((value): value is string => Boolean(value));

                      const uniqueAttributes = [...new Set(allAttributes)];

                      return (
                        uniqueAttributes.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {uniqueAttributes.map(
                              (attr: string, index: number) => (
                                <span
                                  key={`${attr}-${index}`}
                                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                                >
                                  {attr}
                                </span>
                              )
                            )}
                          </div>
                        )
                      );
                    })()}
                  </div>
                </div>
              )}

            <div className="border-t pt-6">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
