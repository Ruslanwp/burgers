import React, { useEffect, useState } from 'react';
import './Modal.css';
import classNames from 'classnames';

const Modal = ({ selectedProduct, chooseProduct, ingredients }) => {
  const [currentIngrediens, setCurrentIngrediens] = useState([]);

  const setProductIngredients = () => {
    const productIds = selectedProduct.ingredients;

    const res = ingredients.filter((ingredient) => productIds.includes(ingredient.id));

    setCurrentIngrediens(res);
  };

  useEffect(() => {
    setProductIngredients();
  }, []);

  return (
    <div className={classNames('modal', {
      'is-active': selectedProduct.id,
    })}
    >
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{selectedProduct.name}</p>
          <button
            onClick={() => chooseProduct(null)}
            className="delete"
            type="button"
            aria-label="close"
          />
        </header>
        <section className="modal-card-body">
          <img src={selectedProduct.url} alt="" />

          <div>
            <div className="ingridients">
              {currentIngrediens.length !== 0 && currentIngrediens.map((ingredient) => (
                <div className="ingridient">
                  <p className="ingridient__text">{ingredient.name}</p>
                  <p>количество 1</p>
                  <div className="ingridient__control">
                    <button className="button is-rounded" type="button">-</button>
                    <img className="image is-96x96" src={ingredient.image} alt="" />
                    <button className="button is-rounded" type="button">+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button type="button" className="button is-success">Save changes</button>
          <button
            type="button"
            className="button"
            onClick={() => chooseProduct(null)}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
