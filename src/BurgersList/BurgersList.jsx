import React from 'react';
import Burger from '../Burger/Burger';

const BurgersList = ({ burgers, onProductAdd }) => (
  <div className="cards">
    {burgers.length !== 0 && burgers.map((burger) => (
      <Burger
        onProductAdd={onProductAdd}
        burger={burger}
        key={burger.id}
      />
    ))}
  </div>
);

export default BurgersList;
