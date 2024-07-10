const { get } = require("http");

function Animacion() {
    document.addEventListener('DOMContentLoaded', () => {
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            const value = bar.style.getPropertyValue('--bar-value');
            setTimeout(() => {
                bar.style.width = value;
            
            },);
        });
    });
}
function DisplayMenu() {
    const menu = document.getElementById("Desplegable");
    const navs = document.querySelectorAll('header nav div');
    if(menu.style.opacity == "1"){
        menu.style.opacity = "0";
        menu.style.justifyContent = "left";
        navs.forEach(navs => {
            navs.style.margin = "0 0 0 0";
        });

    } else {
        menu.style.opacity = "1";
        menu.style.display = "flex";
        menu.style.justifyContent = "flex-start";
        menu.style.margin = "0 5% 0 0%";
        navs.forEach(navs => {
            navs.style.margin = "0 1% 0 1%";
        });
    
    }
}





