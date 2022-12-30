const nombre = document.getElementById("nombre");
const usuario = document.getElementById("usuario");
const email = document.getElementById("email");
const nombreUsuario = document.getElementById("nameUser");
//buttons
const btnEditar = document.getElementById("btn-editar");
const btnGuardar = document.getElementById("btn-guardar");
const btnEliminar = document.getElementById("btn-eliminar");
const nameUser = document.getElementById("usuario");
//datos locales
let datos = JSON.parse(localStorage.getItem("user"));

console.log(datos);
fetch("http://localhost:8000/api/users/", { method: "GET" })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    for (let i in data) {
      // let object = data[i]

      //editar
      btnEditar.addEventListener("click", () => {
        nombre.disabled = false;
        usuario.disabled = false;
        email.disabled = false;
        btnGuardar.disabled = false;
        //nombre perfil usuario
        nombreUsuario.innerText = datos.usuario;
        nombre.value = datos.name;
        usuario.value = datos.usuario;
        email.value = datos.email;
      });
    }
  });

//guardar
btnGuardar.onclick = function () {
  let datos = JSON.parse(localStorage.getItem("user"));
  console.log(datos);
  let alerta = confirm("estas seguro que quieres guardar?");
  if (alerta === true) {
    let body = {
      name: nombre.value,
      email: email.value,
      usuario: usuario.value,
      contraseña: datos.contraseña,
      pokemones: datos.pokemones,
    };

    fetch(`http://localhost:8000/api/users/${datos.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem(
            "user",
            JSON.stringify({
                name: nombre.value,
                email: email.value,
                usuario: usuario.value,
                contraseña: datos.contraseña,
                pokemones: datos.pokemones,
              })
          );
          setTimeout(() => {
            window.location.href = "profile.html";
          }, 1000);
      });
  }
};

//eliminar cuenta

btnEliminar.addEventListener("click", function () {
  let alerta = confirm("estas seguro que quieres eliminar?");
  if (alerta == true) {
    fetch(`http://localhost:8000/api/users/${datos.id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    location.href = "login.html";
  }
});
