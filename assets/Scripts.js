
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
                throw new Error("Error en la respuesta del servidor: " + response.status);
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

function IniciarSesion(){
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
                    "Contraseña": contraseña
                })
            });

            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor: " + response.status);
            }
            const data = await response.json(); 
            if(data.length == 0){
                alert("Correo o contraseña incorrectos");
            }else{
                alert("Inicio de sesión completado con éxito");
                window.location.href = "index.html";
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Error al procesar la solicitud: " + error.message);
        }
    }
    postData();
}
}	