
 async function VerificarUsuario() {
    const cookieHeader = document.cookie;
    const response = await fetch('http://localhost:3000/usuarios/rqCookieUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cookie: cookieHeader
        })
    });
    if (!response.ok) {
        window.location.href = "http://127.0.0.1:5502/index.html"
    }
}
async function VerificarGuest() {
    const cookieHeader = document.cookie;
    const response = await fetch('http://localhost:3000/usuarios/rqCookieGuest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cookie: cookieHeader
        })
    });
    if (response.ok) {
        window.location.href = "http://127.0.0.1:5502/paginas/perfil.html"
    }
}

// Funcion para registrar un usuario
function Registro(){
    var nombre = document.getElementById("Nombre").value;
    var apellido = document.getElementById("Apellido").value;
    var correo = document.getElementById("Correo").value;
    var contraseña = document.getElementById("Contraseña").value;
    var telefono = document.getElementById("Telefono").value;
    var fecha = document.getElementById("FechaNac").value;

    if(nombre == "" || apellido == "" || correo == "" || contraseña == "" || telefono == "" || fecha == ""){
        alert("Por favor llene todos los campos");
    }else{
        async function postData() {
            try {
            const response = await fetch('http://localhost:3000/usuarios/Registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "NombreUsuario": nombre,
                    "Contraseña": contraseña,
                    "ApellidoUsuario": apellido,
                    "CorreoUsuario": correo,
                    "Telefono": telefono,
                    "FECHA_NACIMIENTO": fecha
                })
            });

            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor: " +response.status);
            }
            const data = await response.text(); 
            alert("Registro completado con éxito");
            window.location.href = "iniciarSesion.html";
        } catch (error) {
            console.error('Error:', error);
            alert("Error al procesar la solicitud: " + error.message);
        }
    }
    postData();
}
}


//Funcion Para iniciar sesion
async function IniciarSesion(){
    var correo = document.getElementById("Correo").value;
    var contraseña = document.getElementById("Contraseña").value;

    if(correo == "" || contraseña == ""){
        alert("Por favor llene todos los campos");
    }else{
        async function postData() {
            try {
            const response = await fetch('http://localhost:3000/usuarios/IniciarSesion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "CorreoUsuario": correo,
                    "Contraseña": contraseña,
                }),
                credentials: 'include'
            });
        
            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor: " +response.status);
            }
            const data = await response.json(); 
            if(data.length == 0){
                alert("Correo o contraseña incorrectos");
            }else{
                alert("Inicio de sesión completado con éxito");
                const cookieValue = `jwt=${data.token}; path=${data.path}; expires=${new Date(Date.now() + data.expires)}`;
                document.cookie = cookieValue;
                window.location.href = "Linea-de-tiempo.html";
                }
        } catch (error) {
            console.error('Error:', error);
            alert("Error al procesar la solicitud: " +error.message);
        }
    }
    postData();
}
}	

//Funcion para mandar a llamar el headerMain
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('http://localhost:3000/headermain');
        const html = await response.text();
        document.getElementById('headerMain').innerHTML = html;
        const divs = document.querySelectorAll('div.navs a');
        let index = 0;
        divs.forEach((a) => {
            switch (index) {
                case 0:
                    a.href = "Linea-de-tiempo.html";
                    break;
                case 1:
                    a.href = "Servicios.html";
                    break;
                case 2:
                    a.href = "Tudinero.html";
                    break;
                case 3:
                    a.href = "AjustarIngresos.html";
                    break;
                case 4:
                    a.href = "ComprasIndividuales.html";
                    break;  
                case 5:
                    a.href = "perfil.html"    
                    break;
            }
            index++;
        });
    } catch (error) {
        console.error('Error al cargar la vista parcial:', error);
    }
});


    // //Funcion para pasar la pagina traducida
    // document.addEventListener('OnClick',  e()=> '{
    //     let nombre = fullPath.substring(fullPath.lastIndexOf('/') + 1);
    // 
//cerrar sesion
const logout = () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/;";
    window.location.href = "../index.html";
}

const logoutButton = document.querySelector("#logout");
logoutButton.addEventListener("click", logout);
