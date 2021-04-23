/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React from 'react';
import './Modal.css';
import classNames from 'classnames';
// eslint-disable-next-line import/extensions
import { Product, Topping } from '../types';

interface Props {
  selectedProduct: any,
  chooseProduct: (product: any) => void,
  addToping: (product: Product, ingredient: Topping) => void,
  removeTopping: (product: Product, ingredient: Topping) => void,
  onOrderChange: (product: Product) => void,
  onDelete: (product: Product) => void,
}

const Modal: React.FC<Props> = (
  {
    selectedProduct,
    chooseProduct,
    addToping,
    removeTopping,
    onOrderChange,
    onDelete,
  },
) => (
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
        <img className="image is-128x128" src={selectedProduct.url} alt="" />

        <div>
          <div className="ingridients">
            {selectedProduct.toppings && selectedProduct.toppings
              .map((ingredient: any) => (
                <div key={ingredient.id} className="ingridient">
                  <span className="ingridient__text">{ingredient.name}</span>
                  <span>
                    {ingredient.quantity === 0 ? 'не выбрано' : `количество ${ingredient.quantity}`}
                  </span>
                  <span>
                    {`${ingredient.price * ingredient.quantity} грн`}
                  </span>
                  <div className="ingridient__control">
                    <button
                      className="button is-rounded"
                      type="button"
                      onClick={() => removeTopping(selectedProduct, ingredient)}
                    >
                      -
                    </button>
                    <img className="image is-96x96" src={ingredient.image} alt="" />
                    <button
                      className="button is-rounded"
                      type="button"
                      onClick={() => addToping(selectedProduct, ingredient)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            <div className="is-size-3">
              {selectedProduct.toppings.reduce((acc: number, curVal: Topping) => (
                acc + (curVal.quantity * curVal.price)
              ), 0)}
              {' грн'}
            </div>
          </div>
        </div>
      </section>
      <footer className="modal-card-foot">
        <button
          type="button"
          className="button is-success"
          onClick={() => {
            if (selectedProduct.toppings.every((topping: Topping) => topping.quantity === 0)) {
              onDelete(selectedProduct);
              chooseProduct(null);
              return;
            }

            onOrderChange(selectedProduct);
            chooseProduct(null);
          }}
        >
          Применить
        </button>
        <button
          type="button"
          className="button"
          onClick={() => chooseProduct(null)}
        >
          Отменить
        </button>
      </footer>
    </div>
  </div>
);

export default Modal;
