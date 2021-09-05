import HomeScreen from "./screens/Homescreen.js";
import ProductScreen from "./screens/Productscreen.js";
import { hideLoading, ParserequestUrl, showLoading } from "./utilis.js";
import Error404 from "./screens/Error404.js";
import Cartscreen from "./screens/Cartscreen"
import Signinscreen from "./screens/Signinscreen.js";
import Header from "../components/header.js";
import RegisterScreen from "./screens/Registerscreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
const routes ={
    '/': HomeScreen,
    '/product/:id': ProductScreen, 
    '/cart/:id': Cartscreen,
    '/cart' : Cartscreen,
    '/signin':Signinscreen,
    '/register':RegisterScreen,
    '/profile':ProfileScreen,
}
const router = async () => { 
showLoading();
const request = ParserequestUrl();
const parseUrl = (request.resource ? `/${request.resource}`:'/')+
(request.id ? '/:id': '')+
(request.verb ? `/${request.verb}`: '');
const Screen = routes[parseUrl] ? routes[parseUrl] : Error404;
const header = document.getElementById('header-container');
header.innerHTML = await Header.render();
await Header.after_render();
const main = document.getElementById('main-container');
main.innerHTML = await Screen.render();
hideLoading();
if(Screen.after_render()) await Screen.after_render();
};
window.addEventListener('load',router);
window.addEventListener('hashchange',router);