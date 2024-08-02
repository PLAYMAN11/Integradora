//verificar si el usuario esta iniciado sesion
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

//Verificar si el usuario es guest
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

//Funcion para mostrar los datos monetarios del usuario
async function mostrardinero(){
    const cookieHeader = document.cookie;
    const response = await fetch('http://localhost:3000/usuarios/MostrarDinero', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cookie: cookieHeader
        })
    });
    if (response.ok) {
        const data = await response.json();
        const ingresos = data.Ingresos;
        const egresos = data.Egresos;
        const dineroActual = data.DineroActual;
        document.getElementById("Ingresos").innerHTML = ingresos;
        document.getElementById("Egresos").innerHTML = egresos;
        document.getElementById("dineroTotal").innerHTML = dineroActual;

    }
}

// Funcion para registrar un usuario
function Registro(){
    var nombre = document.getElementById("Nombre").value;
    var apellido = document.getElementById("Apellido").value;
    var correo = document.getElementById("Correo").value;
    var contraseña = document.getElementById("Contraseña").value;
    var fecha = document.getElementById("FechaNac").value;

    if(nombre == "" || apellido == "" || correo == "" || contraseña == "" || fecha == ""){
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
                    "FECHA_NACIMIENTO": fecha
                }),
                credentials: 'include'
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
//cerrar sesion
const logout = () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 2000 00:00:00 UTC; path=/;";
    window.location.href = "/";
}

//funcion para agregar usuario al perfil
function mostrarUsuarioPerfil(){
    const cookieHeader = document.cookie;
    async function postData() {
        try {
        const response = await fetch('http://localhost:3000/usuarios/nombreUsuarioPerfil', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (!response.ok) {
            throw new Error("Error en la respuesta del servidor: " +response.status);
        }
        const data = await response.json(); 
        document.getElementById("Nombre").value = data[0].NombreUsuario;
        output.textContent = data;
    } catch (error) {
        console.error('Error:', error);
        alert("Error al procesar la solicitud: " +error.message);
    }
}};

//cambiar la foto de perfil
// document.getElementById('file-input').addEventListener('OnClick', function(event) {
//     const file = event.target.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             document.getElementById('profile-img').src = e.target.result;
//         }
//         reader.readAsDataURL(file);
//     }
// });

//funcion para insertar la foto de perfil
async function insertarFotoPerfil(){
    const imgElement = document.getElementById("profile-img");
    const foto = imgElement.src;

    if (foto === "") {
        alert("Por favor seleccione una imagen");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/usuarios/insFotoPerfil', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "FotoPerfil": foto
            })
        });

        if (!response.ok) {
            throw new Error("Error en la respuesta del servidor: " + response.status);
        }

        alert("Foto de perfil insertada con éxito");
        window.location.href = "perfil.html";
    } catch (error) {
        console.error('Error:', error);
        alert("Error al procesar la solicitud: " + error.message);
    }
}


//funcion para cambiar la foto de perfil

async function cambiarFotoPerfil(){
    const imgElement = document.getElementById("profile-img");
    const foto = imgElement.src;

    if (foto == "") {
        alert("Por favor seleccione una imagen");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/usuarios/obtFotoPerfil', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "Foto": foto
            })
        });

        if (!response.ok) {
            throw new Error("Error en la respuesta del servidor: " + response.status);
        }

        alert("Foto de perfil cambiada con éxito");
        window.location.href = "perfil.html";
    } catch (error) {
        console.error('Error:', error);
        alert("Error al procesar la solicitud: " + error.message);
    }
}

async function SacarGastos() {
    const cookieHeader = document.cookie;
    const response = await fetch('http://localhost:3000/usuarios/MostrarServicios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cookie: cookieHeader
        })
    });
    if (response.ok) {
        const data = await response.json();
        let total = 0;
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            document.getElementById("MostrarDatos").innerHTML += `${element.nombre}, Precio: ${element.precio} <br>`;
            total += element.precio;
        }

        document.getElementById("MostrarTotal").innerHTML += `Total gastado Mensualmente: ${total}`;

    }
}

//Funcion para agregar servicios
async function AgregarServicio(){
    const cookieHeader = document.cookie;
    var nombre = document.getElementById("NombreServicio").value;
    var precio = document.getElementById("CostoServicio").value;
    if(nombre == "" || precio == ""){
        alert("Por favor llene todos los campos");
    }else{
        async function postData() {
            try {
            const response = await fetch('http://localhost:3000/usuarios/AgregarServicio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cookie: cookieHeader,
                    "Nombre": `${nombre}`,
                    "Precio": `${precio}`
                })
            });
        
            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor: " +response.status);
            }
            const data = await response.text(); 
            alert("Servicio agregado con éxito");
            window.location.href = "Servicios.html";
        } catch (error) {
            console.error('Error:', error);
            alert("Error al procesar la solicitud: " +error.message);
        }
    }
    postData();
}}

async function MostrarUlt12meses(){
    const cookieHeader = document.cookie;
            try {
            const response = await fetch('http://localhost:3000/usuarios/MostrarGastos12Ultimosmeses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cookie: cookieHeader,
                })
            });
        
            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor: " +response.status);
            }
            const data = await response.json();
            const formattedData = data.map(item => ({
                value: item.value,
                time: item.time
            }));
            console.log(formattedData);
            return formattedData;

        } catch (error) {
            console.error('Error:', error);
            alert("Error al procesar la solicitud: " +error.message);
        }
    postData();
};

async function MostrarDatosUsuario(){
    const cookieHeader = document.cookie;
    try {
    const response = await fetch('http://localhost:3000/usuarios/MostrarDatosUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cookie: cookieHeader,
        })
    });

    if (!response.ok) {
        throw new Error("Error en la respuesta del servidor: " +response.status);
    }
    const datauser = await response.json();
    const data = datauser[0];
    document.getElementById("usuarioPerfil").placeholder = data.idusuario;
    document.getElementById("NombresPerfil").placeholder = data.NombreUsuario;
    document.getElementById("ApellidosPerfil").placeholder = data.ApellidoUsuario;
    document.getElementById("CorreoElectronicoPerfil").placeholder = data.CorreoUsuario;
    if (data.SOBREMI != null) {
        document.getElementById("SobreMi").placeholder = data.SOBREMI;
    }


} catch (error) {
    console.error('Error:', error);
    alert("Error al procesar la solicitud: " +error.message);
}
}

async function IngresarDatosUsuario(){
    const cookieHeader = document.cookie;
    var nombre = document.getElementById("NombresPerfil").value;
    var apellido = document.getElementById("ApellidosPerfil").value;
    var correo = document.getElementById("CorreoElectronicoPerfil").value;
    var sobreMi = document.getElementById("SobreMi").value;
    if(nombre == "" || apellido == "" || correo == ""){
        alert("No puedes tener campos vacios ;)"); 
    }else{
        async function postData() {
            try {
            const response = await fetch('http://localhost:3000/usuarios/IngresarDatosUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cookie: cookieHeader,
                    "NombreUsuario": nombre,
                    "ApellidoUsuario": apellido,
                    "CorreoUsuario": correo,
                    "SobreMi": sobreMi
                })
            });
        
            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor: " +response.status);
            }
            const data = await response.text(); 
            alert("Datos ingresados con éxito");
            window.location.href = "perfil.html";
        } catch (error) {
            console.error('Error:', error);
            alert("Error al procesar la solicitud: " +error.message);
        }
    }
    postData();
}}
