
const button = document.getElementById("boton");

button.addEventListener("click",myfuncion)

function myfuncion(event) {
    event.preventDefault()
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("contraseña").value;

    fetch("http://localhost:8000/api/users",{method:"POST",headers:{
        'Content-Type': 'application/json'
        }, body:JSON.stringify({name:nombre,email:correo,usuario:usuario,contraseña:password})})
    .then(response => response.json())
    .then(data => {console.log(data)
        let mensaje = "Registrado Exitosamente"

        if(nombre == "" ||correo=="" || usuario ==""||password==""){
            alert("Ingresar Datos")
        } else {
            data.name = nombre
            data.email = correo
            data.usuario = usuario
            data.contraseña = password
            console.log(data)
            alert(mensaje);
            location.href="listPokemons.html"
        }
    })
}