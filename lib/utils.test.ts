import { getFinalPrice } from "./utils";
import { Product } from "./types";

// Mock the Product type for testing
const createMockProduct = (
  base_price: string,
  price_modifier?: string
): Product => ({
  product_id: 1,
  name: "Test T-Shirt",
  slug: "test-t-shirt",
  base_price: base_price,
  product_variants: price_modifier
    ? [
        {
          variant_id: 1,
          sku: "TEST-01",
          price_modifier: price_modifier,
          stock_quantity: 10,
          variant_attributes: [],
          variant_images: [],
        },
      ]
    : [],
});

describe("getFinalPrice", () => {
  it("should return the base price correctly formatted if no variants exist", () => {
    const product = createMockProduct("19.99");
    expect(getFinalPrice(product)).toBe("19.99");
  });

  it("should return the base price if variant has no price_modifier", () => {
    const product = createMockProduct("25.00");
    product.product_variants = [
      {
        variant_id: 1,
        sku: "TEST-01",
        price_modifier: null, // or undefined
        stock_quantity: 10,
        variant_attributes: [],
        variant_images: [],
      },
    ];
    expect(getFinalPrice(product)).toBe("25.00");
  });

  it("should add the price_modifier to the base price", () => {
    const product = createMockProduct("20.00", "5.50");
    expect(getFinalPrice(product)).toBe("25.50");
  });

  it("should handle zero base price", () => {
    const product = createMockProduct("0.00", "2.50");
    expect(getFinalPrice(product)).toBe("2.50");
  });

  it("should handle zero price_modifier", () => {
    const product = createMockProduct("30.00", "0.00");
    expect(getFinalPrice(product)).toBe("30.00");
  });

  it("should handle floating point inaccuracies", () => {
    const product = createMockProduct("0.1", "0.2");
    expect(getFinalPrice(product)).toBe("0.30");
  });

  it("should return 0.00 if base_price is invalid", () => {
    const product = createMockProduct("not-a-number", "5.00");
    expect(getFinalPrice(product)).toBe("0.00");
  });

  it("should return base_price if modifier is invalid", () => {
    const product = createMockProduct("20.00", "invalid-modifier");
    expect(getFinalPrice(product)).toBe("20.00");
  });
});
