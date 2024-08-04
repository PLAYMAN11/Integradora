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
        Swal.fire("Por favor llene todos los campos");
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
            if(document.location.pathname.endsWith('registrotr.html')){
                const data = await response.text();
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 10000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon: "success",
                    title: "Register in successfully"
                  });
                window.location.href = "iniciarSesiontr.html";
            } else {
                const data = await response.text(); 
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 10000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon: "success",
                    title: "Registro exitoso"
                  });
            window.location.href = "iniciarSesion.html";
            } 
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se pudo iniciar sesion, por favor intentelo de nuevo",
              });
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
        Swal.fire("Por favor llene todos los campos");
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
                Swal.fire("Contraseña o correo invalido");
            }
            if(document.location.pathname.endsWith('iniciarSesiontr.html')){
                Swal.fire({
                    title: "Login susccessful",
                    text: "Welcome to your account¡",
                    icon: "success",
                  });
                const cookieValue = `jwt=${data.token}; path=${data.path}; expires=${new Date(Date.now() + data.expires)}`;
                document.cookie = cookieValue;
                window.location.href = "/paginaingles/Linea-de-tiempotr.html";
            }else {
                Swal.fire({
                    title: "inicio de sesion exitoso",
                    text: "!Bienvenido a tu cuenta¡",
                    icon: "success",
                  });
            
                const cookieValue = `jwt=${data.token}; path=${data.path}; expires=${new Date(Date.now() + data.expires)}`;
                document.cookie = cookieValue;
                window.location.href = "Linea-de-tiempo.html";
                }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se pudo iniciar sesion, por favor intentelo de nuevo",
              });
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
        // Asignar enlace a la imagen con id 'logo'
    // Asignar enlace a la imagen con id 'logo'
const logoImg = document.getElementById('logo');
    logoImg.src = '../Iconos-Imagenes/service.png'; 
    } catch (error) {
        console.error('Error al cargar la vista parcial:', error);
    }
});


// traduccion del header
async function traducirheader(){
    try {
        const response = await fetch('http://localhost:3000/headermaintr');
        const html = await response.text();
        document.getElementById('headerMaintr').innerHTML = html;
        const divs = document.querySelectorAll('div.navs a');
        let index = 0;
        divs.forEach((a) => { 
            switch (index) {
                case 0:
                    a.href = "Linea-de-tiempotr.html";
                    break;
                case 1:
                    a.href = "Serviciostr.html";
                    break;
                case 2:
                    a.href = "Tudinerotr.html";
                    break;
                case 3:
                    a.href = "AjustarIngresostr.html";
                    break;
                case 4:
                    a.href = "ComprasIndividualestr.html";
                    break;  
                case 5:
                    a.href = "perfiltr.html"    
                    break;
            }
            index++;
        });
    } catch (error) {
        console.error('Error al cargar la vista parcial:', error);
    }
}

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
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "error al cargar los datos",
          });
    }
}};

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
        Swal.fire("Por favor llene todos los campos");
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
            Swal.fire("Servicio ingresado con éxito");
            window.location.href = "Servicios.html";
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "error al cargar los datos",
              });
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
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "error al cargar los datos",
              });
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
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "error al cargar los datos",
      });
}
}

async function IngresarDatosUsuario(){
    const cookieHeader = document.cookie;
    var nombre = document.getElementById("NombresPerfil").value;
    var apellido = document.getElementById("ApellidosPerfil").value;
    var correo = document.getElementById("CorreoElectronicoPerfil").value;
    var sobreMi = document.getElementById("SobreMi").value;
    if(nombre == "" && apellido == "" && correo && "" && sobreMi == ""){
        Swal.fire("No puedes tener campos vacios");
    }else{
        async function postData() {
            try {
            const response = await fetch('http://localhost:3000/usuarios/ActualizarDatos', {
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
            Swal.fire("Datos ingresados con éxito");
            window.location.href = "perfil.html";
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "error al cargar los datos",
              });
        }
    }
    postData();
}}

async function agregarCompra(){
    const cookieHeader = document.cookie;
    var nombre = document.getElementById("NombreCompra").value;
    var precio = document.getElementById("PrecioCompra").value;
    var cantidad = document.getElementById("CantidadCompra").value;

    if(nombre == "" || precio == "" || cantidad == ""){
        Swal.fire("No puedes tener campos vacios");
    }else{
        var preciototal = precio * cantidad;
        async function postData() {
            try {
            const response = await fetch('http://localhost:3000/usuarios/IngresarCompra', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cookie: cookieHeader,
                    "NombreGasto": nombre,
                    "PrecioGasto": preciototal,
                    "CantidadGasto": cantidad,
                })
            });
        
            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor: " +response.status);
            }
            const data = await response.text(); 
            Swal.fire("Datos ingresados con éxito");
            window.location.href = "ComprasIndividuales.html";
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "error al cargar los datos",
              });
        }
    }
    postData();
}}

async function MostrarComprasIndividuales() {
    const cookie = document.cookie;
    try {
        const response = await fetch('http://localhost:3000/usuarios/MostrarComprasIndividuales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cookie: cookie,
            })
        });

        if (!response.ok) {
            throw new Error("Error en la respuesta del servidor: " + response.status);
        }
        const data = await response.json();
        let total = 0;
        console.log(data);
        if (data.length == 0) {
            document.getElementById("TotalCompra").innerHTML = "No hay compras registradas";
        } else {
            for (let index = 1; index < data.length; index++) { // Start from index 0
                const element = data[index];
                const cantidadIndividual = element.PrecioGasto / element.CantidadGasto;
                document.getElementById("TotalCompra").innerHTML += `${element.NombreGasto}, Cantidad: ${element.CantidadGasto}, Precio: ${cantidadIndividual} <br><br>`;
                total += element.PrecioGasto; // Add to total
            }
            document.getElementById("MostrarTotalind").innerHTML = `Total gastado: ${total}`;
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "error al cargar los datos",
          });
    }
}

async function agregarCompra(){
    const cookieHeader = document.cookie;
    var nombre = document.getElementById("NombreCompra").value;
    var precio = document.getElementById("PrecioCompra").value;
    var cantidad = document.getElementById("CantidadCompra").value;

    if(nombre == "" || precio == "" || cantidad == ""){
         Swal.fire("No puedes tener campos vacios");
    }else{
        var preciototal = precio * cantidad;
        async function postData() {
            try {
            const response = await fetch('http://localhost:3000/usuarios/IngresarCompra', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cookie: cookieHeader,
                    "NombreGasto": nombre,
                    "PrecioGasto": preciototal,
                    "CantidadGasto": cantidad,
                })
            });
        
            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor: " +response.status);
            }
            const data = await response.text(); 
             Swal.fire("Datos ingresados con éxito");
            window.location.href = "ComprasIndividuales.html";
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "error al cargar los datos",
              });
        }
    }
    postData();
}}

async function AjustarIngresos() {
   const cookieHeader = document.cookie
    var ingresosMen = document.getElementById("Ingreso").value;
    if(ingresosMen == ""){
         Swal.fire("No puedes tener campos vacios");
    } else {
        async function postData() {
            try {
                const response = await fetch('http://localhost:3000/usuarios/ActualizarIngresoMensual', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cookie: cookieHeader,
                        "Ingreso": ingresosMen
                    })
                });

                if (!response.ok) {
                    throw new Error("Error en la respuesta del servidor: " + response.status);
                }

                 Swal.fire("Datos ingresados con éxito");
                const response2 = await fetch('http://localhost:3000/usuarios/MostrarDinero', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cookie: cookieHeader
                })
            });

            if (response2.ok) {
                const data = await response2.json();
                const ingresos = data.Ingresos;
                document.getElementById("INGMEN").innerHTML = `Sus ingresos Mensuales: ${ingresos}`;
            }
                
            } catch (error) {
                console.error('Error:', error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "error al cargar los datos",
                  });
            }
        }
        postData();
    }
}

async function IngresarIngresoIndividual(){
    const cookieHeader = document.cookie;
    var NombreIng = document.getElementById("NombreIndividual").value;
    var MontoIngreso = document.getElementById("IngresoIndividual").value;
    if(NombreIng == "" || MontoIngreso == ""){
         Swal.fire("No puedes tener campos vacios");
    } else {
        async function postData() {
            try {
                const response = await fetch('http://localhost:3000/usuarios/IngresarIngresoIndividual', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cookie: cookieHeader,
                        "Nombre": NombreIng,
                        "Monto": MontoIngreso
                    })
                });

                if (!response.ok) {
                    throw new Error("Error en la respuesta del servidor: " + response.status);
                }

                 Swal.fire("Datos ingresado con éxito");
                window.location.href = "AjustarIngresos.html";
            } catch (error) {
                console.error('Error:', error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "error al cargar los datos",
                  });
            }
        }
        postData();
    }
}