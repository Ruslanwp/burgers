import React from 'react';
import { Link } from 'react-router-dom';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navigation: React.FC = () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="https://bulma.io">
        <img src="https://e7.pngegg.com/pngimages/380/965/png-clipart-mcdonald-s-golden-arches-logo-mcdonalds-thumbnail.png" height="80px" width="80px" alt="3" />
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
