import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen.jsx';
import ShopScreen from './screens/ShopScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';
import CartScreen from './screens/cartScreen.jsx';
import ShippingAdressScreen from './screens/ShippingAddressScreen.jsx';
import SigninScreen from './screens/SigninScreen.jsx';
import SignupScreen from './screens/SignupScreen.jsx';
import { Navbar, Container, Nav, Badge, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './Store.jsx';
import PaymentMethodScreen from './screens/PaymentMethodScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';
import OrderScreen from './screens/OrderScreen.jsx';
import OrderHistoryScreen from './screens/OrderHistoryScreen.jsx';
import ChatScreen from './screens/ChatScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import './slider';
import WishListScreen from './screens/wishListScreen.jsx';
// CLC
// import ComLifeCycle from './screens/comLifeCycle';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header id="header">
          <Navbar expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>EMBER | FLIP FLOPS</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto w-100 justify-content-end">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <LinkContainer
                        className="dropdown-item"
                        to="/signin"
                        onClick={signoutHandler}
                      >
                        <NavDropdown.Item>Sign out</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign in
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
            <Route path="/shop" element={<ShopScreen />}></Route>
            <Route path="/product/:slug" element={<ProductScreen />}></Route>
            <Route path="/cart" element={<CartScreen />}></Route>
            <Route path="/wishlist" element={<WishListScreen />}></Route>
            <Route path="/signin" element={<SigninScreen />}></Route>
            <Route path="/signup" element={<SignupScreen />}></Route>
            <Route path="/profile" element={<ProfileScreen />}></Route>
            <Route path="/Shipping" element={<ShippingAdressScreen />}></Route>
            <Route path="/payment" element={<PaymentMethodScreen />}></Route>
            <Route path="/order/:id" element={<OrderScreen />}></Route>
            <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
            <Route path="/chat" element={<ChatScreen />}></Route>
            <Route
              path="/orderhistory"
              element={<OrderHistoryScreen />}
            ></Route>
          </Routes>
        </main>
        <footer>
          <div className="text-center">All rights reserved | EMBER</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
