/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
// eslint-disable-next-line import/extensions
import { Product, Topping } from '../types';

interface Props {
  userOrder: Product[],
  onOrderChange: (product: Product) => void,
  onDelete: (product: Product) => void,
}

const OrderList: React.FC<Props> = ({ userOrder, onOrderChange, onDelete }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const finalPrice = userOrder.map((product) => product.toppings.reduce((acc, curVal) => (
    acc + (curVal.price * curVal.quantity) * product.quantity
  ), 0)).reduce((acc, curVal) => acc + curVal, 0);

  const chooseProduct = (product: Product | null) => {
    if (product === null) {
      setSelectedProduct(null);
      return;
    }

    const foundedProduct: any = userOrder.find((order) => order.id === product.id);

    if (foundedProduct) {
      setSelectedProduct(foundedProduct);
    }
  };

  const addToping = (product: any, ingredient: Topping) => {
    const changedOrder = ({
      ...product,
      toppings: product.toppings.map((topping: Topping) => {
        if (topping.id === ingredient.id) {
          return ({
            ...topping,
            quantity: topping.quantity + 1,
          });
        }

        return topping;
      }),
    });

    setSelectedProduct(changedOrder);
  };

  const removeTopping = (product: any, ingredient: Topping) => {
    setSelectedProduct({
      ...product,
      toppings: product.toppings.map((topping: Topping) => {
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
                  ), 0)} грн`}
                </p>
              </div>
              <div>
                <p>{`количество: ${product.quantity}`}</p>
              </div>

              <button
                type="button"
                className="button is-rounded is-warning"
                onClick={() => chooseProduct(product)}
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
          onOrderChange={onOrderChange}
          onDelete={onDelete}
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
