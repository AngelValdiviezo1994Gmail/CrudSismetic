$("#btnAgregarAusencia").click(function () {
    IniciarCamposAusencia();
    //fnMostrarCampos();
    $("#mdlAusencia").modal('show');
});

function IniciarCamposAusencia() {
    $("#AusMotivo").val('');
    $("#hfEmpleadoId").val($("#EmpId").val());
    $("#dtpFechaInicio").val(moment().format('DD/MM/YYYY'));
    $("#dtpFechaFin").val(moment().format('DD/MM/YYYY'));
}

$("#frmAusencia").submit(function (event) {
    event.preventDefault();
    var frmAusencia = $('#frmAusencia');
    var oAusencia = new FormData(frmAusencia.get(0));
    //var empId = $("#hfEmpleadoId").val();


    var bFormValido = frmAusencia.valid();
    if (bFormValido) {
        var oAusencia = new FormData(frmAusencia.get(0));
        //oAusencia.set("empId", empId);

        $.ajax({
            type: "POST",
            data: oAusencia,
            url: "/HojaVidaDocente/GuardarAusencia",
            processData: false,
            contentType: false,
            success: function (respuesta) {
                $("#mdlAusencia").modal('hide');
                IniciarCamposAusencia();
                if (respuesta.succeeded === true) {
                    MensajeGeneral("success",
                        "AUSENCIAS",
                        "La ausencia fue registrada correctamente",
                        "Aceptar");
                    GetViewAusenciasDocente();

                }
                else {
                    MensajeGeneral("error",
                        "ERROR AUSENCIAS",
                        respuesta.error,
                        "Aceptar");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                MensajeGeneral("error",
                    "ERROR AUSENCIAS",
                    "Se presento un error al intentar registrar la ausencia",
                    "Aceptar");
            }
        });
    }
    return false;

});

function GetViewAusenciasDocente() {
    $.ajax({
        data:
        {
            EmpId: parseInt($("#EmpId").val()),
        },
        url: "/HojaVidaDocente/GetViewAusenciasDocente",
        success: function (respuesta) {
            $("#bodyAusencias").html(respuesta);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR AUSENCIAS",
                "Se presento un error al intentar cargar el listado de ausencias docente",
                "Aceptar");
        }
    });
}
