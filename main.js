var aUsuarios = [];
var aContrasenas = [];



function signup(){
    var usuario = document.getElementById ("nombre").value;
    var contrasena = document.getElementById("usuario").value;

    aUsuarios.push(usuario);
    aContrasenas.push(contrasena);

    console.log(aUsuarios);
    console.log(aContrasenas);

    alert('Usted se registro con exito!');

    localStorage.setItem("aUsuarios", JSON.stringify(aUsuarios));
    localStorage.setItem("aContrasenas", JSON.stringify(aContrasenas));

}

function login(){

    aUsuarios = JSON.parse(localStorage.getItem("aUsuarios"));
    aContrasenas = JSON.parse(localStorage.getItem("aContrasenas"));

    var usuario = document.getElementById ("nombre").value;
    var contrasena = document.getElementById("usuario").value;

    for (var i = 0; i < aUsuarios.length; i++) {
        if (usuario == aUsuarios[i] && contrasena == aContrasenas[i]) {
          alert('Ingreso Correctamente!');
          cambiodepag();
          break;

        } else {
          alert('Usuario no existente, cree una cuenta!');
        }
}
}

function cambiodepag(){
  window.replace="Login.html";
  window.location="Personajes.html";
}