/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import ProductItem from '../ProductItem/ProductItem';
import { Product } from '../types';

type Select = React.ChangeEvent<HTMLSelectElement>

interface Props {
  products: Product[],
  onProductAdd: (item: Product) => void,
  filterType: string,
  filterHandler: (value: string) => void,
}

const ProductList: React.FC<Props> = React.memo(({
  products,
  onProductAdd,
  filterType,
  filterHandler,
}) => (
  <>
    <div className="select">
      <select
        id="select"
        value={filterType}
        onChange={(event: Select) => filterHandler(event.target.value)}
      >
        <option value="all">
          все
        </option>
        <option value="dessert">
          десерты
        </option>
        <option value="burger">
          бургеры
        </option>
        <option value="beverage">
          напитки
        </option>
        <option value="salad">
          салаты
        </option>
      </select>
    </div>
    <div className="main-cards">
      {products.length !== 0 && products.map((product) => (
        <ProductItem
          onProductAdd={onProductAdd}
          product={product}
          key={product.id}
        />
      ))}
    </div>
  </>
));

export default ProductList;
