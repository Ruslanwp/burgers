import React, { useMemo, useState } from 'react';
import classNames from 'classnames';

const OrderList = ({ userOrder }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const averagePrice = useMemo(() => {
    const sum = userOrder.reduce((acc, curValue) => acc + curValue.price * curValue.quantity, 0);

    return sum;
  }, [userOrder]);

  const chooseProduct = (id) => {
    if (id === null) {
      setSelectedProduct(null);
      return;
    }

    const foundedProduct = userOrder.find((order) => order.id === id);

    setSelectedProduct(foundedProduct);
  };

  return (
    <>
      <div className="container order-cards">
        {userOrder.map((product) => (
          <>
            <div className="card-order-cell">
              <div className="card-image">
                <img
                  src={product.url}
                  alt="Placeholder"
                  width="180px"
                />
                <div>
                  <strong>{product.name}</strong>
                </div>
              </div>
              <div>
                <p>{`цена  ${product.price * product.quantity}`}</p>
              </div>
              <div>
                <p>{`количество: ${product.quantity}`}</p>
              </div>

              <button
                type="button"
                className="button is-rounded is-warning"
                onClick={() => chooseProduct(product.id)}
              >
                Изменить
              </button>
            </div>
          </>
        ))}
      </div>

      {selectedProduct !== null && (
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
              <ul>
                <li>Cheese</li>
                <li>Sauce</li>
                <li>Tomato</li>
                <li>Onion</li>
                <li>cucumber</li>
              </ul>
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
      )}

      <div>
        {`Общий счет ${averagePrice} грн`}
      </div>

      <button className="button is-success" type="button">Подтвердить</button>
    </>
  );
};

export default OrderList;
