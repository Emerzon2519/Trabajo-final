const button = document.getElementById("boton");
button.addEventListener("click",myfuncion)


function myfuncion(event) {
    event.preventDefault()
    const nombre = document.getElementById("usuario").value;
    const password = document.getElementById("contraseña").value;
    fetch("http://localhost:8000/api/users",{method:"GET"})
    .then(response => response.json())
    .then(data => {console.log(data)
        let mensaje = "Datos Incorrectos"
        if(nombre == "" ||password==""){
            alert("Ingresar Datos")
        } else {
            for(let i=0; i<data.length; i++){
                if(nombre === data[i].usuario && password === data[i].contraseña) {
                    console.log(data[i].usuario);
                    console.log(data[i].name);
                    console.log(data[i].email);
                    console.log(data[i]._id);
                    console.log(data[i]);
                    let object = {
                        id:data[i]._id,
                        usuario:data[i].usuario,
                        name:data[i].name,
                        email:data[i].email,
                        contraseña:data[i].contraseña,
                        pokemones:data[i].pokemones
                    }
                    localStorage.setItem("user",JSON.stringify(object));
                    location.href="favorites.html"
                    mensaje = "datos ingresados correctamente";
                    break;
                }
            }
            alert(mensaje);
        }
        })
}




