import swal from 'sweetalert';

export function sucesso(texto) {
    swal("Sucesso", `${texto}`, "success");
}

export function erro(texto) {
    swal("Erro", `${texto}`, "error");
}

export function padrao(texto) {
    swal(`${texto}`);
}

export function remover(tipo) {
    return swal({
        title: `Tem certeza de que deseja remover ${tipo}?`,
        text: "Esta é uma operação irreversível!",
        icon: "warning",
        buttons: ["Não", "Sim"],
        dangerMode: true,
      });
}