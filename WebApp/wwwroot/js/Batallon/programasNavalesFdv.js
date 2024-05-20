function GetViewCompetenciasProgramasNavales(iPeriodo) {
    $.ajax({
        data:
        {
            iEstId: parseInt($("#hfEstudianteID").val()),
            iPeriodoId: parseInt(iPeriodo),
            iCursoId: parseInt($("#ddlProgramaNaval").val())
        },
        url: "/Batallon/GetViewCompetenciasProgramasNavales",
        success: function (respuesta) {
            $("#dvCompetenciasPracticasNavales").html(respuesta);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar cargar el listado de competencias del programa naval",
                "Aceptar");
        }
    });
}

function getNotaGeneralEpn(index) {
    var per = parseFloat($("#txtEpnPercent" + index).val());
    var not = parseInt($("#txtEpnNota" + index).val());
    $.ajax({
        data:
        {
            percent: per,
            nota: not
        },
        url: "/Batallon/GetNotaGeneral",
        success: function (respuesta) {
            $("#txtEpnNotaR" + index).val(parseFloat(respuesta).toFixed(2));
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar obtener Factor de Aptitud Naval",
                "Aceptar");
        }
    });
}

$(document).on('change', '.txtEpnNota', function () {
    event.preventDefault();
    try {
        var index = $(this).attr('id').replace('txtEpnNota', '');
        fnValidarNumero("txtEpnNota" + index, "txtEpnNota" + index, 100);
        getNotaGeneralEpn(index);

    } catch (e) {

    }
});

$("#btnGuardarProgramaNavales").click(function () {
    var frmProgramasNavales = $("#frmProgramasNavales");
    var oCompetencias = new FormData(frmProgramasNavales.get(0));
    oCompetencias.set("idEst", $("#hfEstudianteID").val());
    oCompetencias.set("idPeriodo", $("#hfPeriodoProgramaNaval").val());
    var iPeriodo = $("#hfPeriodoProgramaNaval").val();
    $.ajax({
        type: "POST",
        data: oCompetencias,
        url: "/Batallon/GuardarCompetenciasProgramaNaval",
        processData: false,
        contentType: false,
        success: function (respuesta) {

            if (respuesta.succeeded === true) {
                MensajeGeneral("success",
                    "FOLIO DE VIDA",
                    "Los datos fue registrados correctamente",
                    "Aceptar");
                $("#btnPeriodo" + iPeriodo + "_8").click();
            }
            else {
                MensajeGeneral("error",
                    "ERROR FOLIO DE VIDA",
                    respuesta.error,
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar registrar los datos",
                "Aceptar");
        }
    });
})