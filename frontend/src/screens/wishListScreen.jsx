import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../Store.jsx';
import { Helmet } from 'react-helmet-async';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ListGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import MessageBox from '../components/MessageBox.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function WishListScreen() {
  // const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const {
    wishList: { wishListItems },
  } = state;
  // cart
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  // Wshlist
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'WISHLIST_REMOVE_ITEM', payload: item });
  };
  return (
    <div>
      <div className="m4">
        <Helmet>
          <title>Wishlist</title>
        </Helmet>
        <h1>Wish List</h1>
        <Row>
          <Col md={8}>
            {wishListItems.length === 0 ? (
              <MessageBox>
                Wish list is empty.{' '}
                <Link to="/">Go to pick your flip flops!</Link>
              </MessageBox>
            ) : (
              <ListGroup>
                {wishListItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={4}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                      <Col md={2}>
                        <Button
                          onClick={() => removeItemHandler(item)}
                          variant="light"
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                      <Col md={3}>
                        <div
                          className="button btn-primary btn"
                          alt=""
                          onClick={() => {
                            addToCartHandler(item);
                          }}
                        >
                          <span>Add to Cart</span>
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}></Col>
        </Row>
      </div>
    </div>
  );
}
