/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React from 'react';
// eslint-disable-next-line import/extensions
import { Product } from '../types';

interface Props {
  product: Product,
  onProductAdd: (item: Product) => void,
}

const ProductItem: React.FC<Props> = ({ product, onProductAdd }) => {
  const initialPrice = product.toppings
    .reduce((acc, curVal) => acc + (curVal.price * curVal.quantity), 0);

  return (
    <div key={product.id} className="card is-align-content-center has-background-success-light">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={product.url} alt="Placeholder" />
        </figure>
      </div>
      <footer className="card-footer">
        <div>
          <h3><strong>{product.name}</strong></h3>
          <p className="py-3">
            {`Цена: ${initialPrice} грн`}
          </p>
          <button
            type="button"
            className="button is-rounded is-warning"
            onClick={() => onProductAdd(product)}
          >
            добавить
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ProductItem;
