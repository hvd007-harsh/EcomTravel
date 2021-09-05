import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localstorage.js";
import { hideLoading, ParserequestUrl, rerender, showLoading } from "../utilis";
const addtoCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find((x) => x.product === item.product);
    if (existItem) {
      if(forceUpdate){
        cartItems = cartItems.map((x) => x.product === existItem.product ? item : x);
      }
    } else {
        cartItems = [...cartItems, item];
    }
    setCartItems(cartItems);
    if (forceUpdate){
      rerender(Cartscreen);
    }
  };
const removeFromCart = (id) => {
  setCartItems(getCartItems().filter((x) => x.product !== id));
  if(id === ParserequestUrl().id){
    document.location.hash = '/cart';
  }else{
    rerender(Cartscreen);
  }
};
const Cartscreen = {
    after_render: () => {
    const qtyselects = document.getElementsByClassName('qty-select'); 
    showLoading();
       Array.from(qtyselects).forEach((qtyselect) => {
      qtyselect.addEventListener("change", (e) => {
        const item = getCartItems().find((x) => x.product === qtyselects.id);
        addtoCart({...item,qty:Number(e.target.value)},true);
      });
    });
    const deleteButtons = document.getElementsByClassName("deletebutton");
    Array.from(deleteButtons).forEach((deleteButtons)=>{
      deleteButtons.addEventListener('click',()=>{
        removeFromCart(deleteButtons._id);
      });
    });
    document.getElementById('checkout-button').addEventListener('click',()=>{
      document.location.hash = '/signin';
    });
    hideLoading();
    },
    render: async () => {
        const request = ParserequestUrl();
        if (request.id) {
            const product = await getProduct(request.id);
            addtoCart({
                id: product._id,
                name: product.name,
                image: product.images,
                price: product.price,
                stock: product.stock,
                qty: 1,
            });
        }
        const cartItems = getCartItems();
        return `
        <div class="content cart">
        <div class="cart-list">
          <ul class="cart-list-container">
            <li>
              <h3>Shopping Cart</h3>
              <div class='cart-price'>Price</div>
            </li>
            ${
              cartItems.length === 0? 
              '<div>Cart is empty. <a href="/#/">Go Shopping</a>'
                : cartItems
                    .map(
                      (item) => `
              <li>
                <div class="cart-image">
                  <img src="${item.image}" alt="${item.name}" />
                </div>
                <div class="cart-name">
                  <div>
                    <a href="/#/product/${item.product}">
                      ${item.name}
                    </a>
                  </div>
                  <div>
                    Qty: 
                    <select class="qty-select" id="${item.product}">
                    ${[...Array(item.stock).keys()].map((x) =>
                      item.qty === x + 1
                        ? `<option selected value="${x + 1}">${x + 1}</option>`
                        : `<option  value="${x + 1}">${x + 1}</option>`
                    )}  
                    </select>
                    <button type="button" class="deletebutton" id="${
                      item.product
                    }">
                      Delete
                    </button>
                  </div>
                </div>
                <div class="cart-price">
                  ${item.price} rs.
                </div>
              </li>
              `
                    )
                    .join('\n')
            } 
          </ul>
        </div>
            <div class='action'>
               <h3>
            Subtotal (${cartItems.reduce((a,c)=>a+c.qty,0)} items)
            :
            ${cartItems.reduce((a,c)=>a+ c.price * c.qty ,0)}rs.
               </h3>
               <button id="checkout-button" class='link'>
               Proceed to checkout
               </button>
            </div>
       </div>   `;
    },
};
export default Cartscreen;