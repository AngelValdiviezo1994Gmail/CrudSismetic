$(document).ready(function () {
    let tieneDetalles = $("#TieneRegistros").val();
    if (tieneDetalles == '1') {
        $("#TieneRegistros").val('');
        $("#ModalConciliaciones").modal("show");
    }
});

function CierraModalConciliaciones() {
    $("#ModalConciliaciones").modal("hide");
}

function ImportarConciliaciones() {
    $("#ModalConciliaciones").modal("hide");
    $.ajax({
        type: "POST",
        url: "/ConciliacionReporte/ImportarConciliacion",
        success: function (respuesta) {
            if (respuesta != null) {
                if (!respuesta.includes("error")) {
                    MensajeGeneral("success",
                        "REGISTRO DE CONCILIACIONES",
                        "Los registros se guardaron satisfactoriamente",
                        "Aceptar", GetURL() + "ConciliacionReporte/Index");

                }
                else {
                    MensajeGeneral("error",
                        "ERROR GRABAR CONCILIACIÓN",
                        respuesta,
                        "Aceptar");
                }
            }
            else {
                MensajeGeneral("error",
                    "ERROR GRABAR CONCILIACIÓN",
                    "Se presento un error al intentar grabar la conciliación",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR CARGA DE CONCILIACIÓN",
                "Se presento un error al intentar cargar las conciliaciones",
                "Aceptar");
        }
    });
}