import { update  } from '../api';
import { clearUser, getUserInfo, setUserInfo } from '../localstorage';
import { hideLoading, showLoading, showMessage } from '../utilis';
const ProfileScreen={
after_render:()=>{
  document.getElementById('signout-button').addEventListener('click',()=>{
    clearUser();
    document.location.hash = "/";
  })
 document.getElementById("profile-form").addEventListener("submit",async(e)=>{
    e.preventDefault();
    showLoading();
     const data = await update({
       name: document.getElementById('name').value,
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
  const {name,email} = getUserInfo();
  if(!name){
  document.location.hash = '/';
  }
    return`
    <div class="from-container">
    <form id="profile-form" class="reg">
    <ul class="from-items">
    <li>
    <h1>User Profile</h1>
    <label for="name">Name</label><br>
    <input type="name" name="name" id="name" value="${name}"/><br>
    <label for="email">Email</label><br>
    <input type="email" name="email" id="email" value="${email}"/><br>
    <label for="Password">Password</label>
    <input type="password" name="password" id="password"/>
       <button type ="submit" class="link">Update</button>
       <button type ="button" id="signout-button" class="link">signout</button>
       </li>
    </ul>
    </form>
    </div>
    `;
},
};
export default ProfileScreen