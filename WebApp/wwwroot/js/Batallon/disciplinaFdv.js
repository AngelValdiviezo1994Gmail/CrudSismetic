function GetViewSancionesDisciplinarias(iPeriodo, iGrupoPeriodo) {
    $.ajax({
        data:
        {
            iEstId: parseInt($("#hfEstudianteID").val()),
            iGrupoId: parseInt(iGrupoPeriodo),
            iPeriodoId: parseInt(iPeriodo)
        },
        url: "/Batallon/GetViewSancionesDisciplinarias",
        success: function (respuesta) {
            $("#dvSancionesDisciplinarias").html(respuesta);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar cargar el listado de sanciones",
                "Aceptar");
        }
    });
}

function GetViewFactoresEvaluacion(iPeriodo) {
    $.ajax({
        data:
        {
            iEstId: parseInt($("#hfEstudianteID").val()),
            iPeriodoId: parseInt(iPeriodo)
        },
        url: "/Batallon/GetViewFactoresEvaluacion",
        success: function (respuesta) {
            $("#dvFactoresEvalaucion").html(respuesta);
            $("#dvNotasAptitudNaval").html('');
            GetNotaFinal(parseInt(iPeriodo));
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar cargar el listado de anotaciones y conceptos",
                "Aceptar");
        }
    });
}