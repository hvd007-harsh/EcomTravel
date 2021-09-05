
let darkMode = localStorage.getItem("dark");
const darkToggle = document.querySelector("#btn");

const enable = () => {
      document.body.classList.add("dark");
   localStorage.setItem("dark","darker");
}
const disable = () => {
   document.body.classList.remove("dark");
   localStorage.setItem("dark",null);
}

if(darkMode=="darker"){
    enable();
}
darkToggle.addEventListener("click", ()=>{
darkMode = localStorage.getItem("dark");
if(darkMode!=="darker"){
   enable();
}
else{
   disable();
}
});
