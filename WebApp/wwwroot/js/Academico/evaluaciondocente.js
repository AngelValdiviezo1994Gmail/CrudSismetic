
function MostrarEvaluacionDocente(IdGrid) {
    $.ajax({
        data:
        {
            idGrid: IdGrid,
        },
        url: "/HojaVidaEstudiante/EvaluacionDocente",
        success: function (respuesta) {
            if (respuesta !== null) {
                $("#lblNomProf").text(respuesta.nombreProfesor);
                $("#lblNomAsig").text(respuesta.nombreAsignatura);
                $("#PregEvaluacionDocente").modal("show");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL ENCONTRAR LA EVALUACIÓN", "Se presentó un error al cargar la encuesta del docente.", "Aceptar");
        }
    });
}

function CerrarModalEvaluacionDocente() {    
    $('#PregEvaluacionDocente').modal('hide');
}

function GuardarEvaluacionDocente(totalPreguntas) {

    var resume_table = document.getElementById("tbEncuesta");

    let LstDet = [];
    let LstDetTmp = [];

    for (var i = 0, row; row = resume_table.rows[i]; i++) {

        for (var j = 1; j <= 5; j++) {

            var idPregunta = row.id;
            var respuestaPreg = j;

            var nombreCheck = "#Calificado" + idPregunta.toString() + "_" + respuestaPreg.toString();

            if ($(nombreCheck).is(":checked")) {
                let ObjDet = {};

                ObjDet.EvDocPregId = idPregunta;
                ObjDet.Puntaje = respuestaPreg;

                LstDetTmp.push(ObjDet);

            }

        }
    }

    if (LstDetTmp.length < totalPreguntas) {
        MensajeGeneral("error", "ERROR, SE DEBE RESPONDER TODAS LAS PREGUNTAS DE LA ENCUESTA", "Responda todas las preguntas de la encuesta.", "Aceptar");
        return;
    }

    for (var i = 0, row; row = resume_table.rows[i]; i++) {
        
        for (var j = 1; j <= 5; j++) {
        
            var idPregunta = row.id;
            var respuestaPreg = j;

            var nombreCheck = "#Calificado" + idPregunta.toString() + "_" + respuestaPreg.toString();

            if ($(nombreCheck).is(":checked")) {
                let ObjDet = {};

                ObjDet.EvDocPregId = idPregunta;
                ObjDet.Puntaje = respuestaPreg;

                LstDet.push(ObjDet);

                $(nombreCheck).prop('checked', false);

            }
            
        }
    }

    MensajeGeneral("exito", "Registrando encuesta, por favor espere", "", "Aceptar");

    $.ajax({
        type: "POST",
        data:
        {
            evDocDet: LstDet,
        },
        url: "/HojaVidaEstudiante/GrabaEncuesta",
        success: function (respuesta) {
            if (respuesta !== null) {
                $('#PregEvaluacionDocente').modal('hide');
                MensajeGeneral("exito", "SE REGISTRA EXITOSAMENTE LA EVALUACIÓN DEL MAESTRO", "", "Aceptar");
                location.reload();
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL ACCEDER AL MÉTODO", "Se presento un error al acceder al método de grabar encuesta", "Aceptar");
        }
    });

}


