import axios from 'axios';
import Rating from '../../components/Rating';

const HomeScreen = {
  async render(){
    const response = await axios({
      url:'http://localhost:3535/api/products',
      Headers:{'Content-Type': 'application/json'},
  });
  if( !response || response.statusText !== 'OK'){
    return`<div class ='message'> the Error in we get in page </div>`;
  }
  // Taking promise from the JSON file 
  const products = await response.data;
  // const { products } = data;
    return`<ul class="products">
    ${products.map(
      product => 
      `
         <li>
           <div class="product">
            <a href="#/product/${product._id}">
            <img src="${product.images}">
            </a>
            <div class="Product-names">
             ${product.name}
            </div>
            <div class="Product-rating">
            ${Rating.render({value:product.ratings, text: product.reviews + 'reviews'})}
            </div>
            <div class="product-price">
             ${product.price}rs.
            </div>
            </div>
          </li>
      `
  ).join("\n")}
    `;
 },
};
export default HomeScreen;

