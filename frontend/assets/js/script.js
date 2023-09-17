function realizarLogin() {
    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;

    if (login == "admin" && senha == "admin") {
        alert("Login realizado com sucesso!");
        location.href = "./assets/html/home.html";
    } else {
        alert("Email e/ou senha inválidos!");
    }
}

const formulario = document.querySelector("#form");
const valorGasto = document.querySelector("#valor");
const dataGasto = document.querySelector("#data");
const categoriaGasto = document.querySelector("#categoria");
const descricaoGasto = document.querySelector("#descricao");

function registrar() {
    fetch("http://localhost:8080/gasto",
    {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                valor: valorGasto.value,
                data: dataGasto.value,
                categoria: categoriaGasto.value,
                descricao: descricaoGasto.value
            })
    })
}

formulario.addEventListener("submit", function(event){
    event.preventDefault();
    registrar();
});
