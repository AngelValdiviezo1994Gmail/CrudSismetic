function GetViewFirmaUsuario(iUsuarioID, bEvaluador) {
    $.ajax({
        data:
        {
            iUsuId: iUsuarioID,
            bEvaluador: bEvaluador
        },
        url: "/Batallon/GetViewFirmaUsuario",
        success: function (respuesta) {
            $("#dvfirma").html(respuesta);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar cargar los datos de la firma de usuario",
                "Aceptar");
        }
    });
}

$("#frmFirmas").submit(function (event) {
    event.preventDefault();
    var frmFirmas = $('#frmFirmas');
    var bFormValido = frmFirmas.valid();
    if (bFormValido) {
        var oFirma = new FormData(frmFirmas.get(0));
        oFirma.set("idEst", $("#hfEstudianteID").val());
        $.ajax({
            type: "POST",
            data: oFirma,
            url: "/Batallon/FirmarUsuario",
            processData: false,
            contentType: false,
            success: function (respuesta) {
                $("#mdlUserFirma").modal('hide');

                if (respuesta.exito) {
                    MensajeGeneral("success",
                        "FOLIO DE VIDA",
                        "La firma fue registrada correctamente",
                        "Aceptar");

                }
                else {
                    MensajeGeneral("error",
                        "ERROR FOLIO DE VIDA",
                        respuesta.mensaje,
                        "Aceptar");
                    $("#txtPasswordFirma").val('');

                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                MensajeGeneral("error",
                    "ERROR FOLIO DE VIDA",
                    "Se presento un error al intentar eliminar la comision",
                    "Aceptar");
            }
        });
    }
})

$("#btnFirmaEvaluador").click(function () {
    $("#mdlUserFirma").modal("show");
    GetViewFirmaUsuario(parseInt($("#hfUsuarioCreacionID").val()), true);
});

$("#btnFirmaEvaluado").click(function () {
    $("#mdlUserFirma").modal("show");
    GetViewFirmaUsuario(parseInt($("#hfUsuarioID").val()), false);
});

$("#btnFirmaEvaluador").click(function () {
    event.preventDefault();
    // GetViewFirmaUsuario(parseInt($("#hfUsuarioID").val()), false);
});