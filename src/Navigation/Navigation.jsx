import React from 'react';
import { Link } from 'react-router-dom';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navigation = () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="https://bulma.io" alt="rrr">
        <img src="https://c0.klipartz.com/pngpicture/739/1004/gratis-png-hamburguesa-hamburguesa-rey-comida-rapida-restaurante-kfc-logotipo-de-hamburguesa-rey.png" height="80px" width="80px" alt="3" />
      </a>

      <a href="/" role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
    <div id="navbarBasicExample" className="navbar-menu">

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link
              to="/"
              className="button is-rounded is-primary"
            >
              <strong>Главная страница</strong>
            </Link>
            <Link to="/addings" className="button is-primary is-rounded">
              <strong>Меню</strong>
            </Link>
            <Link to="/bucket" className="button is-rounded is-warning">
              <strong>Корзина</strong>
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

export default Navigation;
