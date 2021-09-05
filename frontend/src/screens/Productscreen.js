import { hideLoading, ParserequestUrl, showLoading } from "../utilis";
import { getProduct } from '../api';
import Rating from '../../components/Rating'
const Productscreen = {
  after_render: () =>{
    const request = ParserequestUrl();
    showLoading();
  const addButton=document.getElementById("addbutton")
  if(addButton){
  addButton.addEventListener('click', 
  () => {
    document.location.hash=`/cart/${request.id}`;
  });
}
else{
  console.log("The addButton is not working");
}
  hideLoading();
  },
 render: async()=>{
   const request = ParserequestUrl();
   const product = await getProduct(request.id);//_ changed
   if(product.error){
     return `<div>${product.error}</div>`;
   }
   return `

   <div>
   <ul class ='products'>
   <li>
   <h1 class ='detailname'>${product.name}</h1>
   <div class= 'Product-rating'>
   ${Rating.render({value:product.ratings, text: product.reviews + 'reviews'})}
   </div>
   <div class='detailprice'>${product.price}rs.</div>
   <div class='category'>Category:${product.category}</div>
   <img class='detailimage' src=${product.images} alt='img'>
   <br>
   <a class='back' href ='/#/'>Back to result</a>
   </li>
   <div class='Cartbox'> 
   <div class='price'>Price:${product.price}rs.</div>
   <br>
   <div class='Stock'>Stock:${product.stock> 0
  ? `<span class='success'>Instock</span>` 
  : `<span class='error'>Unavailable</span>`} 
  </div>
   <li>
   <button id='addbutton' class='link cart-button'>Add to cart </button>
   </li>
   </div>
   </ul>
   </div>
  
   `;
 },
}
export default Productscreen;