

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

let bandera = true;
function DisplayMenu() {
    const menu = document.getElementById("Desplegable");
    const navs = document.querySelectorAll('header nav div');
    const lineas = document.querySelectorAll('.activadorHeaderMain');
    if(bandera){
        lineas.forEach(lineas => {
            lineas.children[0].style.transform = "rotate(0deg)";
            lineas.children[1].style.opacity = 1;
            lineas.children[2].style.transform = "rotate(0deg)";
    }); 
    }else {
        lineas.forEach(lineas => {
            lineas.children[0].style.transform = "rotate(45deg)";
            lineas.children[1].style.opacity = 0;
            lineas.children[2].style.transform = "rotate(-45deg)";
        });
    }
    bandera = !bandera;

    if(menu.style.opacity=='0'){
            menu.style.opacity = '1';
            menu.style.display = "flex";
            menu.style.justifyContent = "flex-start";
            menu.style.margin = "0 5% 0 0%";
            navs.forEach(navs => {
                navs.style.margin = "0 1% 0 1%";
        });

    } else {
        let margen = -15;
        menu.style.opacity = '0';
        menu.style.justifyContent = "left";
        navs.forEach(navs => {
            navs.style.margin = `0 0 0 ${margen}%`;
            margen = margen - 10;
        });
    
    }
}







