
function MostrarHistorialAsignaturasPopUp() {

    $.ajax({
        url: "/HojaVidaEstudiante/HistorialAsignaturaCursadosXCursar",
        success: function (respuesta) {
            if (respuesta !== null) {
                //aevg malla pintada
                $('#chkCursados').prop('checked', true);
                $('#chkXCursar').prop('checked', false);
                $("#lblProgramaAcademico").text("PENSUM " + respuesta.nombrePrograma);
                $("#HistorialAsignaturaCursados_XCursar").modal("show");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL ENCONTRAR LA EVALUACIÓN", "Se presentó un error al cargar la encuesta del docente.", "Aceptar");
        }
    });
}

function CerrarHistorialAsignaturasPopUp() {    
    $('#HistorialAsignaturaCursados_XCursar').modal('hide');
}


