import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Cart from '../screens/Cart';
import Modal from '../Modal';
import { useCart } from './ContextReducer'; // Import useCart hook

export default function Navbar() {
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
  const data = useCart(); // Initialize data using useCart hook

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  // Calculate total quantity in the cart as the sum of all quantities
  const totalQuantity = data.reduce((total, item) => total + item.qty, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">
          FlavorFleet
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {(localStorage.getItem('authToken')) && (
              <li className="nav-item">
                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/myOrder">
                  My Orders
                </Link>
              </li>
            )}
          </ul>
          {!localStorage.getItem('authToken') ? (
            <form className="d-flex">
              <Link className="btn bg-white text-black mx-1" to="/login">
                Login
              </Link>
              <Link className="btn bg-white text-black mx-1" to="/creatuser">
                Signup
              </Link>
            </form>
          ) : (
            <div>
              <div className="btn bg-white text-success mx-2" onClick={() => setCartView(true)}>
                <Badge color={data.length > 0 ? 'error' : 'secondary'} variant={data.length > 0 ? 'dot' : 'standard'}>
                  <ShoppingCartIcon />
                </Badge>
                Cart{"  "}
                {data.length > 0 ? (
                  <span className="visually-hidden">items in cart</span>
                ) : null}
              </div>
              {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}

              <button onClick={handleLogout} className="btn bg-white text-danger">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
