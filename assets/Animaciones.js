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
    if(menu.style.display == "flex"){
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
}





