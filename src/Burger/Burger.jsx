import React from 'react';

const Burger = ({ burger, onProductAdd }) => {
  const initialPrice = burger.toppings
    .reduce((acc, curVal) => acc + (curVal.price * curVal.quantity), 0);

  return (
    <div key={burger.id} className="card is-align-content-center has-background-success-light">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={burger.url} alt="Placeholder" />
        </figure>
      </div>

      <h3>{burger.name}</h3>
      <footer className="card-footer">
        <div>
          <p>
            {`Цена: ${initialPrice} грн`}
          </p>
          <button
            type="button"
            className="button is-rounded is-warning"
            onClick={() => onProductAdd(burger)}
          >
            добавить
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Burger;
