/* 
    POST
*/
const formulario = document.querySelector("#form");
const valorGasto = document.querySelector("#valor");
const dataGasto = document.querySelector("#data");
const categoriaGasto = document.querySelector("#categoria");
const descricaoGasto = document.querySelector("#descricao");

let registrar = async() => {
    await fetch("http://localhost:8080/gasto",
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
    });
}

let btnModificar = document.getElementById("botao-registrar");
btnModificar.addEventListener("click", evento => {
    registrar();
    alert("Gasto registrado com sucesso!");
    location.reload();
});
