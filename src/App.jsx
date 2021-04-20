import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bulma/css/bulma.css';
import Navigation from './Navigation/Navigation';
import BurgersList from './BurgersList/BurgersList';
import OrderList from './OrderList/OrderList';
import { loadBurgers, loadIngredients } from './requests';

// console.log(loadBurgers('ingredients/2'));

const App = () => {
  const [burgers, setBurgers] = useState([]);
  const [userOrder, setUserOrder] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const loadIngrediens = async (url) => {
    const ingredientsFromServer = await loadIngredients(url);

    setIngredients(ingredientsFromServer);
  };

  useEffect(() => {
    loadIngrediens('ingredients');
  }, []);

  console.log(userOrder);

  const addItem = useCallback((item) => {
    setUserOrder((prevState) => {
      if (prevState.length === 0) {
        return [...prevState, {
          ...item,
          quantity: 1,
        }];
      }

      const isProductExist = prevState.some((product) => product.id === item.id);

      if (!isProductExist) {
        return [...prevState, {
          ...item,
          quantity: 1,
        }];
      }

      return prevState.map((product) => {
        if (product.id !== item.id) {
          return product;
        }

        const newItem = {
          ...item,
          quantity: product.quantity + 1,
        };

        return newItem;
      });
    });
  }, []);

  const loadData = async () => {
    const data = await loadBurgers('products');

    setBurgers(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <Navigation />
      <Switch>
        <Route path="/" exact>
          <BurgersList burgers={burgers} onProductAdd={addItem} />
        </Route>
        <Route path="/addings">
          {userOrder.length !== 0 && (
          <OrderList
            userOrder={userOrder}
            ingredients={ingredients}
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
