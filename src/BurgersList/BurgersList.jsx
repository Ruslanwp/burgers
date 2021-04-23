import React from 'react';
import Burger from '../Burger/Burger';

const BurgersList = ({
  burgers,
  onProductAdd,
  filterType,
  filterHandler,
}) => (
  <>
    <div className="select">
      <select
        id="select"
        value={filterType}
        onChange={(e) => filterHandler(e.target.value)}
      >
        <option value="all">
          все
        </option>
        <option value="dessert">
          десерты
        </option>
        <option value="burger">
          бургеры
        </option>
        <option value="beverage">
          напитки
        </option>
        <option value="salad">
          салаты
        </option>
      </select>
    </div>
    <div className="main-cards">
      {burgers.length !== 0 && burgers.map((burger) => (
        <Burger
          onProductAdd={onProductAdd}
          burger={burger}
          key={burger.id}
        />
      ))}
    </div>
  </>
);

export default BurgersList;
