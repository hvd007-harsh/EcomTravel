import { register,update } from '../api';
import { getUserInfo, setUserInfo } from '../localstorage';
import { hideLoading, showLoading, showMessage } from '../utilis';
const RegisterScreen={
after_render:async()=>{
 document.getElementById("register-form").addEventListener("submit",async (e)=>{
    e.preventDefault();
    
    const data = await register({
      name: document.getElementById('name').value,
       email: document.getElementById('email').value,
       password: document.getElementById('password').value,
      });
      showLoading();
      hideLoading();
      if(data.error){
        showMessage(data.error);
      }else{
        setUserInfo(data);
        document.location.hash = '/';
      } 
  });
},
render:()=>{
  if(getUserInfo().name){
  document.location.hash = '/';
  }
    return`
    <div class="from-container">
    <form id="register-form" class="reg">
    <ul class="from-items">
    <li>
    <h1>Created-Account</h1>
    <label for="name">Name</label><br>
    <input type="name" name="name" id="name"/><br>
    <label for="email">Email</label><br>
    <input type="email" name="email" id="email"/><br>
    <label for="password">Password</label>
    <input type="password" name="password" id="password"/>
    <label for="password">Re-enter Password</label>
    <input type="password" name="password" id="current-password"/>
       <button type ="submit" class="link">Register</button>
       <div>
       Already have an account?
         <a href="/#/signin">Sign-in</a>
     </div>
       </li>
    </ul>
    </form>
    </div>
    `;
},
};
export default RegisterScreen;