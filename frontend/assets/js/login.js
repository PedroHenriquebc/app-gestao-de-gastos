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