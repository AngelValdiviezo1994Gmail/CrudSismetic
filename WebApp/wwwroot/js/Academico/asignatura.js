$(document).ready(function () {

    var editMode = $('#EditMode');
    if (editMode.val() != 1) asignaCodigo();
    //asignaCodigo();

    $('#FacId').on('change', function () {
        var editMode = $('#EditMode');
        if (editMode.val()!= 1) asignaCodigo();
    });

});

function asignaCodigo() {
    //$("#FacId option:selected").text();
    //$Ajax para Tomar la siguiente secuencia
    /*
    let vprimerasLetras = TomarPrimeraLetra($("#FacId option:selected").text(), 2);
    let asigCode = $('#AsigCod').val();
    if (vprimerasLetras.lenght == 0) return;
    let newCode = vprimerasLetras + asigCode.slice(2);
    $('#AsigCod').val(newCode);
    */
    var idFac = $("#FacId option:selected").val();

    obtenCodigo(idFac);
}

function obtenCodigo(id_Fac) {
    $.ajax({
        type: "POST",
        data: { idFac: id_Fac },
        url: GetURL() + "Asignatura/TraerUltimoCodigo",
        success: function (respuesta) {
            $('#AsigCod').val(respuesta.data.asigCod);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR TRAER ULTIMO NUMERO ASIGNATURA", "Se presento un error en el consumo del método de obtención numero Asignatura", "Aceptar");
        }
    });
}