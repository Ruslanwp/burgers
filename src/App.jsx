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
import BurgersList from './BurgersList/BurgersList';
import Bucket from './Bucket/Bucket';
import EmptyBucket from './EmptyBucket/EmptyBucket';
import OrderList from './OrderList/OrderList';
import { loadBurgers, loadIngredients } from './requests';

const App = () => {
  const [burgers, setBurgers] = useState([]);
  const [userOrder, setUserOrder] = useState([]);
  const [allIngredients, setIngredients] = useState([]);
  const [filterType, setFilterType] = useState('all');

  const loadData = async () => {
    const data = await loadBurgers('products');
    const ingredientsFromServer = await loadIngredients('ingredients');

    setIngredients(ingredientsFromServer);

    const dataWithIngredients = data.map((product) => ({
      ...product,
      quantity: 1,
      toppings: product.ingredients
        .reduce((acc, id) => {
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
          ...ingredientsFromServer.find((dish) => dish.id === topping.id),
        })),
    }));

    setBurgers(dataWithIngredients);
  };

  const filteredProducts = useMemo(() => {
    if (filterType === 'all') {
      return burgers;
    }

    const products = burgers.filter((burger) => burger.type === filterType);

    return products;
  }, [filterType, burgers]);

  const changeOrder = (product) => {
    const changedProduct = userOrder.map((dish) => {
      if (product.id !== dish.id) {
        return dish;
      }

      return ({
        ...product,
        ...product.toppings,
      });
    });

    setUserOrder(changedProduct);
  };

  useEffect(() => {
    loadData();
  }, []);

  const addItem = useCallback((item) => {
    setUserOrder((prevState) => {
      if (prevState.length === 0) {
        return [...prevState, {
          ...item,
          toppings: item.toppings.map((topping) => ({ ...topping })),
          quantity: 1,
        }];
      }

      const isProductExist = prevState.some((product) => product.id === item.id);

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

  const deleteProduct = (selectedProduct) => {
    setUserOrder((state) => state.filter((product) => product.id !== selectedProduct.id));
  };

  return (
    <div className="container">
      <Navigation />
      <Switch>
        <Route path="/" exact>
          <BurgersList
            filterType={filterType}
            filterHandler={setFilterType}
            burgers={filteredProducts}
            onProductAdd={addItem}
          />
        </Route>
        <Route path="/addings">
          {userOrder.length !== 0 && (
          <OrderList
            userOrder={userOrder}
            ingredients={allIngredients}
            changeOrder={changeOrder}
            onOrderReset={setUserOrder}
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
