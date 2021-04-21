import React from 'react';

const Burger = ({ burger, onProductAdd }) => (
  <div key={burger.id} className="card">
    <div className="card-image">
      <figure className="image is-4by3">
        <img src={burger.url} alt="Placeholder" />
      </figure>
    </div>

    <h3>{burger.name}</h3>
    <footer className="card-footer">
      <div>
        <p>Цена: от 59 грн</p>
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

export default Burger;
