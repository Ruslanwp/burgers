export interface Topping {
  id: number,
  name: string,
  image: string,
  price: number,
  quantity: number,
}

export interface Product {
  id: number,
  name: string,
  url: string,
  type: string,
  ingredients: number[],
  toppings: Topping[],
  quantity: number,
}

export interface ToppingPair {
  id: number,
  quantity: number,
}
