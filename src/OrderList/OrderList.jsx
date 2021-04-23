import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import Modal from '../Modal/Modal';

const OrderList = ({ userOrder, ingredients, changeOrder }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const finalPrice = userOrder.map((product) => product.toppings.reduce((acc, curVal) => (
    acc + (curVal.price * curVal.quantity) * product.quantity
  ), 0)).reduce((acc, curVal) => acc + curVal, 0);

  const chooseProduct = (id) => {
    if (id === null) {
      setSelectedProduct(null);
      return;
    }

    const foundedProduct = userOrder.find((order) => order.id === id);

    setSelectedProduct(foundedProduct);
  };

  const addToping = (product, ingredient) => {
    setSelectedProduct({
      ...product,
      toppings: product.toppings.map((topping) => {
        if (topping.id === ingredient.id) {
          return ({
            ...topping,
            quantity: topping.quantity + 1,
          });
        }

        return topping;
      }),
    });
  };

  const removeTopping = (product, ingredient) => {
    setSelectedProduct({
      ...product,
      toppings: product.toppings.map((topping) => {
        if (topping.id === ingredient.id && topping.quantity !== 0) {
          return ({
            ...topping,
            quantity: topping.quantity - 1,
          });
        }

        return topping;
      }),
    });
  };

  return (
    <>
      <div className="container order-cards">
        {userOrder.map((product) => (
          <React.Fragment key={product.id}>
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
                <p>
                  {`цена  ${product.toppings.reduce((acc, curVal) => (
                    acc + (curVal.price * curVal.quantity) * product.quantity
                  ), 0)}`}
                </p>
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
          addToping={addToping}
          removeTopping={removeTopping}
          changeOrder={changeOrder}
          ingredients={ingredients}
        />
      )}
      <div className="py-5">
        {`Общий счет ${finalPrice} грн`}
      </div>
      <Link
        to="/bucket"
        className="button is-success"
        type="button"
      >
        Подтвердить
      </Link>
    </>
  );
};

export default OrderList;
