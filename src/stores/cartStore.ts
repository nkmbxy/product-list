import { makeAutoObservable } from "mobx";

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

class CartStore {
  cart: CartItem[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addToCart(item: { name: string; price: number }) {
    const existing = this.cart.find((i) => i.name === item.name);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({ ...item, quantity: 1 });
    }
  }

  decrease(name: string) {
    const item = this.cart.find((i) => i.name === name);
    if (item) {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        this.remove(name);
      }
    }
  }

  remove(name: string) {
    this.cart = this.cart.filter((i) => i.name !== name);
  }

  reset() {
    this.cart = [];
  }

  get totalQty() {
    return this.cart.reduce((sum, i) => sum + i.quantity, 0);
  }

  get totalPrice() {
    return this.cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }
}

export const cartStore = new CartStore();
