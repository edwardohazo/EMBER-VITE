import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import Rating from './Rating.jsx';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store.jsx';

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  // const {
  //   wishList: { wishListItems },
  // } = state;
  const addToCartHandler = async (item) => {
    console.log('add to cart list handler');
    const existItem = cartItems.find((x) => x._id === product._id);
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
  // Wishlist
  const addToWishListHandler = async (item) => {
    ctxDispatch({
      type: 'WISHLIST_ADD_ITEM',
      payload: { ...item },
    });
  };
  // Animation backwards after hover out to hidde buttons
  const mouseIn = (e) => {
    const card = e.currentTarget;
    card.classList.remove('wasHovered');
  };
  const mouseOut = (e) => {
    const card = e.currentTarget;
    card.classList.add('wasHovered');
  };
  return (
    <Card
      className="card wasHovered"
      onMouseEnter={(e) => {
        mouseIn(e);
      }}
      onMouseLeave={(e) => {
        mouseOut(e);
      }}
    >
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <div className="addToWishlist">
        <div className="addToWishlist__icon">
          <Link className="addToWishlist__icon-link">
            <i className="fa-solid fa-magnifying-glass"></i>
          </Link>
        </div>
        <div
          className="addToWishlist__icon"
          onClick={() => {
            addToWishListHandler(product);
          }}
        >
          <Link to={'/wishlist'} className="addToWishlist__icon-link">
            <i className="fa-regular fa-heart"></i>
          </Link>
        </div>
      </div>
      <div className="wd-add-btn wd-add-btn-replace woodmart-add-btn">
        <div
          className="button wp-element-button product_type_simple add_to_cart_button ajax_add_to_cart add-to-cart-loop"
          alt=""
          onClick={() => {
            addToCartHandler(product);
          }}
        >
          <span>Add to Cart</span>
        </div>
      </div>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.reviews}></Rating>
        <Card.Text>${product.price}</Card.Text>
        <Card.Text className="cathegory-text-hidden">
          {product.cathegory}
        </Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => {
              addToCartHandler(product);
            }}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
