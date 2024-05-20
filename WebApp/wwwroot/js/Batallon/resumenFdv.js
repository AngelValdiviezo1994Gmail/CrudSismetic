function GetViewResumen(iPeriodo, iGrupo) {
    $.ajax({
        data:
        {
            iEstId: parseInt($("#hfEstudianteID").val()),
            iPeriodoId: parseInt(iPeriodo),
            iGrupoId: iGrupo
        },
        url: "/Batallon/GetViewForResumen",
        success: function (respuesta) {
            $("#dvResumenEvaluaciones").html(respuesta);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar cargar el listado de anotaciones y conceptos",
                "Aceptar");
        }
    });
}