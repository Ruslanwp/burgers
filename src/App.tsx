/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, {
  useCallback,
  useMemo,
  useEffect,
  useState,
} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bulma/css/bulma.css';
import Navigation from './Navigation/Navigation';
import ProductList from './ProductList/ProductList';
import Bucket from './Bucket/Bucket';
import EmptyBucket from './EmptyBucket/EmptyBucket';
import OrderList from './OrderList/OrderList';
import { loadProducts, loadIngredients } from './requests';
import { Topping, Product, ToppingPair } from './types';

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [userOrder, setUserOrder] = useState<Product[]>([]);
  const [allIngredients, setIngredients] = useState<Topping[]>([]);
  const [filterType, setFilterType] = useState('all');

  const loadData = async () => {
    const [data, ingredientsFromServer] = await Promise.all([
      loadProducts('products'),
      loadIngredients('ingredients'),
    ]);

    setIngredients(ingredientsFromServer);

    const dataWithIngredients = data.map((product: Product) => ({
      ...product,
      quantity: 1,
      toppings: product.ingredients
        .reduce<ToppingPair[]>((acc, id) => {
          const currentToping = acc.find((toping) => toping.id === id);

          if (currentToping) {
            currentToping.quantity += 1;
          } else {
            acc.push({
              id,
              quantity: 1,
            });
          }

          return acc;
        }, [])
        .map((topping) => ({
          quantity: topping.quantity,
          ...ingredientsFromServer.find((dish: Product) => dish.id === topping.id),
        })),
    }));

    setProducts(dataWithIngredients);
  };

  const filteredProducts = useMemo(() => {
    if (filterType === 'all') {
      return products;
    }

    const recievedProducts = products.filter((burger: Product) => burger.type === filterType);

    return recievedProducts;
  }, [filterType, products]);

  const changeOrder = useCallback((product: Product) => {
    const changedProduct: Product[] = userOrder.map((dish) => {
      if (product.id !== dish.id) {
        return dish;
      }

      return ({
        ...product,
        ...product.toppings,
      });
    });

    setUserOrder(changedProduct);
  }, [userOrder]);

  useEffect(() => {
    loadData();
  }, []);

  const addItem = useCallback((item: Product) => {
    setUserOrder((prevState: Product[]) => {
      if (prevState.length === 0) {
        return [...prevState, {
          ...item,
          toppings: item.toppings.map((topping) => ({ ...topping })),
          quantity: 1,
        }];
      }

      const isProductExist: boolean = prevState.some((product) => product.id === item.id);

      if (!isProductExist) {
        return [...prevState, {
          ...item,
          toppings: item.toppings.map((topping) => ({ ...topping })),
          quantity: 1,
        }];
      }

      return prevState.map((dish) => {
        if (dish.id !== item.id) {
          return dish;
        }

        const newItem = {
          ...item,
          toppings: item.toppings.map((topping) => ({ ...topping })),
          quantity: dish.quantity + 1,
        };

        return newItem;
      });
    });
  }, [allIngredients]);

  const decreaseProductQuantity = useCallback((selectedProduct) => {
    setUserOrder(userOrder.map((product) => {
      if (selectedProduct.id === product.id) {
        return {
          ...product,
          ...product.toppings,
          quantity: product.quantity - 1,
        };
      }

      return product;
    }));
  }, [userOrder]);

  const increaseProductQuantity = useCallback((selectedProduct) => {
    setUserOrder(userOrder.map((product) => {
      if (selectedProduct.id === product.id) {
        return {
          ...product,
          ...product.toppings,
          quantity: product.quantity + 1,
        };
      }

      return product;
    }));
  }, [userOrder]);

  const deleteProduct = useCallback((selectedProduct: Product) => {
    setUserOrder((state) => state.filter((product) => product.id !== selectedProduct.id));
  }, []);

  return (
    <div className="container">
      <Navigation />
      <Switch>
        <Route path="/" exact>
          <ProductList
            filterType={filterType}
            filterHandler={setFilterType}
            products={filteredProducts}
            onProductAdd={addItem}
          />
        </Route>
        <Route path="/addings">
          {userOrder.length !== 0 && (
          <OrderList
            userOrder={userOrder}
            onOrderChange={changeOrder}
            onDelete={deleteProduct}
          />
          )}
        </Route>
        <Route path="/bucket">
          {userOrder.length === 0 ? (
            <EmptyBucket />
          ) : (
            <Bucket
              userOrder={userOrder}
              onDecreaseQuantity={decreaseProductQuantity}
              onIncreaseQuantity={increaseProductQuantity}
              onDelete={deleteProduct}
              onReset={setUserOrder}
            />
          )}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
