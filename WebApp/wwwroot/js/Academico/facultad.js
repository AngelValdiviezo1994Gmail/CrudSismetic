$(document).ready(function () {
    CargaEscuelaInicial();

    $('#EscId').on('change', function () {
        CargarEscuela();
    });

});


function CargaEscuelaInicial() {
    var vescId = $("#EscId").val();
    if (vescId !== '') CargarEscuela();
}

function CargarEscuela() {

    $("#EscDireccion").val('');
    $("#EscTelefono").val('');
    var vescId = $("#EscId").val();
    var result = lstEscuela.find(obj => {
        var intEscId = parseInt(vescId);
        return obj.escId === intEscId
    });

    if (result != null) {
        $("#EscDireccion").val(result.escDireccion);
        $("#EscTelefono").val(result.escTelefono);
    }
}
