import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import { ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Store } from "./Store";
import { Link } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import NavDropdown from "react-bootstrap/NavDropdown";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="primary">
            {/* variant="dark" */}
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>DEAL</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
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

                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}

                {userInfo && userInfo.isAdmin && (
                  //user exits and isAdmin is true then execute this
                  <NavDropdown
                    title="Upload product here"
                    id="basic-nav-dropdown"
                  >
                    {/* <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer> */}
                    {/* <LinkContainer to="/admin/productlist"></LinkContainer> */}
                    <LinkContainer to="/products">
                      <NavDropdown.Item>Upload Products</NavDropdown.Item>
                    </LinkContainer>
                    {/* <LinkContainer to="/admin/orderlist"></LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer> */}
                  </NavDropdown>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              {<Route path="/placeorder" element={<PlaceOrderScreen />} />}

              <Route path="/cart" element={<CartScreen />} />
              {<Route path="/SignIn" element={<SigninScreen />} />}
              {<Route path="/signup" element={<SignupScreen />} />}
              {<Route path="/products" element={<ProductEditScreen />} />}
              {<Route path="/profile" element={<ProfileScreen />} />}
              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
              <Route path="/payment" element={<PaymentMethodScreen />}></Route>
              <Route path="/products" element={<uploadRoutes />}></Route>
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">Happy Shopping!</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
