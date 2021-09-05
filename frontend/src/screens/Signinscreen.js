import { signin } from '../api';
import { getUserInfo, setUserInfo } from '../localstorage';
import { hideLoading, showLoading, showMessage } from '../utilis';
const SigninScreen={
after_render:async()=>{
 document.getElementById("signin-form").addEventListener("submit",async (e)=>{
    e.preventDefault();
    showLoading();
     const data = await signin({
       email: document.getElementById('email').value,
       password: document.getElementById('password').value,
      });
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
    <form id="signin-form">
    <ul class="from-items">
    <li>
    <h1>Sign-In</h1>
    <label for="email">Email</label><br>
    <input type="email" name="email" id="email"/>
    <label for="password">Password</label><br>
    <input type="password" name="password" id="password"/>
       <button type ="submit" class="link">Signin</button>
      <div>
        New User?
          <a href="/#/register">Create your account </a>
      </div>
      </li>
    </ul>
    </form>
    </div>
    `;
},
};
export default SigninScreen;