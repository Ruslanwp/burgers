import React, { useMemo } from 'react';
import './Modal.css';
import classNames from 'classnames';

const Modal = (
  {
    selectedProduct,
    chooseProduct,
    addToping,
    removeTopping,
    changeOrder,
  },
) => {
  const sum = useMemo(() => {
    const result = selectedProduct.toppings.reduce((acc, curVal) => (
      acc + (curVal.quantity * curVal.price)
    ), 0);

    console.log(result);

    return result;
  }, [selectedProduct]);

  console.log(sum);

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
          <img className="image is-128x128" src={selectedProduct.url} alt="" />

          <div>
            <div className="ingridients">
              {selectedProduct.toppings && selectedProduct.toppings
                .map((ingredient) => (
                  <div className="ingridient">
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
              <div>
                {selectedProduct.toppings.reduce((acc, curVal) => (
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
              changeOrder(selectedProduct);
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
};

export default Modal;
