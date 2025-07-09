import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => {
          return (
            <CartItem
              key={item.id}
              id={item.id}
              title={item.name}
              quantity={item.quantity}
              price={item.price}
              total={item.totalPrice}
            />
          );
        })}
      </ul>
    </Card>
  );
};

export default Cart;
