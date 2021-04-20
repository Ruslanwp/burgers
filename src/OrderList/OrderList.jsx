import React, { useMemo, useState } from 'react';
import Modal from '../Modal/Modal';
// import loadBurgers from '../requests';

const OrderList = ({ userOrder, ingredients }) => {
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
          <React.Fragment key={product}>
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
          </React.Fragment>
        ))}
      </div>

      {selectedProduct !== null && (
        <Modal
          selectedProduct={selectedProduct}
          chooseProduct={chooseProduct}
          ingredients={ingredients}
        />
      )}
      <div>
        {`Общий счет ${averagePrice} грн`}
      </div>

      <button className="button is-success" type="button">Подтвердить</button>
    </>
  );
};

export default OrderList;
