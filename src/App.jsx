import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bulma/css/bulma.css';
import Navigation from './Navigation/Navigation';
import BurgersList from './BurgersList/BurgersList';
import OrderList from './OrderList/OrderList';
import { loadBurgers, loadIngredients } from './requests';

const App = () => {
  const [burgers, setBurgers] = useState([]);
  const [userOrder, setUserOrder] = useState([]);
  const [allIngredients, setIngredients] = useState([]);

  const loadData = async () => {
    const data = await loadBurgers('products');
    const ingredientsFromServer = await loadIngredients('ingredients');

    setIngredients(ingredientsFromServer);
    setBurgers(data);
  };

  const changeOrder = (product) => {
    const changedProduct = userOrder.map((dish) => {
      if (product.id !== dish.id) {
        return dish;
      }

      console.log(product);

      return ({
        ...product,
        ...product.toppings,
      });
    });

    console.log(changedProduct);

    setUserOrder(changedProduct);
  };

  console.log(burgers);

  useEffect(() => {
    loadData();
  }, []);

  const addItem = useCallback((item) => {
    setUserOrder((prevState) => {
      if (allIngredients.length === 0) {
        console.log(true, 'ingredients not exist');
      }

      if (prevState.length === 0) {
        return [...prevState, {
          ...item,
          quantity: 1,
          toppings: item.ingredients.map((ingId) => allIngredients
            .find((product) => product.id === ingId))
            .map((product) => ({ ...product, quantity: 1 })),
        }];
      }

      const isProductExist = prevState.some((product) => product.id === item.id);

      if (!isProductExist) {
        return [...prevState, {
          ...item,
          quantity: 1,
          toppings: item.ingredients.map((ingId) => allIngredients
            .find((product) => product.id === ingId))
            .map((product) => ({ ...product, quantity: 1 })),
        }];
      }

      return prevState.map((dish) => {
        if (dish.id !== item.id) {
          return dish;
        }

        const newItem = {
          ...item,
          quantity: dish.quantity + 1,
          toppings: item.ingredients.map((ingId) => allIngredients
            .find((product) => product.id === ingId))
            .map((product) => ({ ...product, quantity: 1 })),
        };

        return newItem;
      });
    });
  }, [allIngredients]);

  return (
    <div className="container">
      <Navigation />
      <Switch>
        <Route path="/" exact>
          <BurgersList
            burgers={burgers}
            onProductAdd={addItem}
          />
        </Route>
        <Route path="/addings">
          {userOrder.length !== 0 && (
          <OrderList
            userOrder={userOrder}
            ingredients={allIngredients}
            changeOrder={changeOrder}
          />
          )}
        </Route>
        <Route path="/bucket">
          <div>hello</div>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
