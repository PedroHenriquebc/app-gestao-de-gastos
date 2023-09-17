window.onload = function () {
    listar();
}

let listar = async () => {
    const requisicao = await fetch("http://localhost:8080/gasto",
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        });


    const listaGastos = await requisicao.json();

    let conteudoTabela = "";
    for (let gasto of listaGastos) {
        let conteudoFila = `<tr>
    <td>${gasto.id}</td>
    <td>${gasto.valor}</td>
    <td>${gasto.data.substring(0, 10)}</td>
    <td>${gasto.categoria}</td>
    <td>${gasto.descricao}</td>
    <td>
        <i onclick="preencherFormulario(${gasto.id})"; class="material-icons botao-edit-del editar">edit</i>
        <i onclick="excluir(${gasto.id})" class="material-icons botao-edit-del deletar">delete</i>
    </td>`

        conteudoTabela += conteudoFila;
    }

    document.querySelector("#tabela tbody").outerHTML = conteudoTabela;
}

let excluir = async (id) => {
    await fetch("http://localhost:8080/gasto/" + id,
        {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        });

    alert("Registro de gasto excluído com sucesso!");
    location.reload();
}


function mostrarFormulario() {
    document.getElementById("form-modificacao").style.visibility = "visible";
}

let idEditar;

let preencherFormulario = async (id) => {
    mostrarFormulario();
    idEditar = id;
    const requisicao = await fetch("http://localhost:8080/gasto/" + id,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        });

    const gasto = await requisicao.json();
    document.getElementById("valor").value = gasto.valor;
    document.getElementById("data").value = gasto.data.substring(0, 10);
    document.getElementById("categoria").value = categoria;
    document.getElementById("descricao").value = gasto.descricao;

}

let btnModificar = document.getElementById("botao-modificar");
btnModificar.addEventListener("click", evento => {
    editar(idEditar);
    alert("Registro de gasto atualizado com sucesso!");
    location.reload();
});

let editar = async (id) => {
    const valorGasto = document.querySelector("#valor");
    const dataGasto = document.querySelector("#data");
    const categoriaGasto = document.querySelector("#categoria");
    const descricaoGasto = document.querySelector("#descricao");

    await fetch("http://localhost:8080/gasto/" + id,
        {
            method: "PUT",
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

