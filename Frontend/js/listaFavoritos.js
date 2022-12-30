const userNombre = document.getElementById('userName');

let datos = JSON.parse(localStorage.getItem('user'));
console.log(datos);
fetch(`http://localhost:8000/api/users/${datos.id}`,{method:"GET"})
    .then(response => response.json())
    .then(data=>{console.log(data)})