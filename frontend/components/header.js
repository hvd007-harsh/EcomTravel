import { getUserInfo } from "../src/localstorage";

const Header = {
    
    render:async () => {
        const {name}  = getUserInfo();
        return `<h3 href="#">EcomTravel
            <div class="hamburger"> 
            ${
                name
                  ? `<a href="/#/profile">${name}</a>`
                  : `<a href="/#/signin" class="link">Sign-In</a>`
            } 
            <button class="light link" id="btn" aria-hidden="toggle dark mode"><i class="fa fa-moon-o"
            aria-hidden="true"></i>Dark</button>
            <a href="#" class="link">Admin</a>
            <a href="#" class="link">Home</a>
            <a href="/#/cart/" class="link">Cart</a>
         </div>
    </h3>`;
    },
    after_render:()=>{},

};
export default Header;
