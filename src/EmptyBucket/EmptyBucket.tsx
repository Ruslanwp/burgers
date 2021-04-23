import React from 'react';

const EmptyBucket: React.FC = () => (
  <article className="message is-dark mt-5">
    <div className="message-header">
      <p>Корзина</p>
    </div>
    <div className="message-body">
      Корзина пуста,
      {' '}
      <strong>Добавьте продукт!</strong>
    </div>
  </article>
);

export default EmptyBucket;
