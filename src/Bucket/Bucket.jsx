import React from 'react';
import { Link } from 'react-router-dom';
import './Bucket.css';

const Bucket = ({
  userOrder,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onDelete,
  onReset,
}) => (
  <>
    <ul>
      {userOrder.map((product) => (
        <li className="columns products has-background-light">
          <div className="column product is-size-4">{product.name}</div>
          <div className="column product is-size-5">{`Количество ${product.quantity}`}</div>
          <div className="column product is-size-5">
            {`цена ${product.toppings.reduce((acc, curVal) => (acc + (curVal.quantity * curVal.price) * product.quantity), 0)} грн`}
          </div>
          <button
            className="button is-rounded"
            type="button"
            onClick={() => {
              if (product.quantity === 0) {
                onDelete(product);
                return;
              }

              onDecreaseQuantity(product);
            }}
          >
            -
          </button>
          <figure className="image is-128x128 m-5">
            <img className="is-rounded" src={product.url} alt="/" />
          </figure>
          <button
            className="button is-rounded"
            type="button"
            onClick={() => onIncreaseQuantity(product)}
          >
            +
          </button>
        </li>
      ))}
    </ul>
    <Link
      to="/"
      className="button is-success is-rounded mt-5"
      type="button"
      onClick={() => onReset([])}
    >
      Завершить
    </Link>
  </>
);

export default Bucket;
