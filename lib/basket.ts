export interface BasketItem {
  productId: number;
  quantity: number;
  size: string;
  color: string;
}

export function addToBasket(item: BasketItem) {
  const basket = JSON.parse(localStorage.getItem("basket") || "[]");
  basket.push(item);
  localStorage.setItem("basket", JSON.stringify(basket));
}

export function getBasket(): BasketItem[] {
  return JSON.parse(localStorage.getItem("basket") || "[]");
}
