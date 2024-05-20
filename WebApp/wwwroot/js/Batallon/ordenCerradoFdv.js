function GetViewOrdenPeriodo(iPeriodo) {
    $.ajax({
        data:
        {
            iEstId: parseInt($("#hfEstudianteID").val()),
            iPeriodo: parseInt(iPeriodo)
        },
        url: "/Batallon/GetViewOrdenCerradoEstudiante",
        success: function (respuesta) {
            $("#dvMesesOrdenCerrado").html(respuesta);
            try {
                // Pickadate
                $('.pickadate').datepicker({
                    format: "dd/mm/yyyy",
                    todayBtn: false,
                    language: "es"
                });
            } catch (e) {

            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar cargar el listado de competencias del programa naval",
                "Aceptar");
        }
    });
}

$(document).on('change', '.iOcPointsEval', function () {
    event.preventDefault();
    try {
        var index_con = $(this).attr('id').replace('iOcPointsEval', '');
        var index = index_con.split("_")[0];
        var con = index_con.split("_")[1];
        ordenCerradoInstruccion(index, con);
    } catch (e) {

    }
});

$(document).on('change', '.cOcCeremonias', function () {
    event.preventDefault();
    try {
        var index_con = $(this).attr('id').replace('cOcCeremonias', '');
        var index = index_con.split("_")[0];
        var con = index_con.split("_")[1];

        ordenCerradoCeremonias(index, con);
    } catch (e) {

    }
});

$(document).on('change', '.cOcFelicitasPercent', function () {
    event.preventDefault();
    try {
        var index = $(this).attr('id').replace('cOcFelicitasPercent', '');

        ordenCerradoFelicitas(index);
    } catch (e) {

    }
});

function ordenCerradoInstruccion(index, con) {
    try {
        fnValidarNumeroMinMax("iOcPointsEval" + index + "_" + con, "iOcPointsEval" + index + "_" + con, 10, -10);

        var puntos = parseInt($("#iOcPointsEval" + index + "_" + con).val());

        var dinamic = parseInt($("#cOcInstruccionPoints" + index + "_" + con).val());
        var percentByRule = parseFloat($("#cOcInstruccionPercent" + index + "_" + con).val() - dinamic);

        var ptoConcepto = (puntos * percentByRule) / 100;
        $("#iOcPercentEval" + index + "_" + con).val(parseInt(ptoConcepto * 10));

    } catch (e) {

    }
}

function ordenCerradoCeremonias(index, con) {
    try {
        var programadas = parseInt($("#cOcCeremoniasP" + index).val());
        var asistidas = parseInt($("#cOcCeremonias" + index).val());
        if (asistidas > programadas) {
            $("#cOcCeremonias" + index).val('');
            $("#cOcPuntosPCeremonias" + index).val(0);
            asistidas = 0;
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "La cantidad de Ceremonias Asistidas no puede ser mayor a las programadas",
                "Aceptar");
        }
    } catch (e) {
        MensajeGeneral("error",
            "ERROR FOLIO DE VIDA",
            "La cantidad de Ceremonias Programadas esta vacia, se requiere para evaluar",
            "Aceptar");
    }
}

function ordenCerradoFelicitas(index) {
    try {
        var asistidas = parseInt($("#cOcCeremoniasA" + index).val());
        if (asistidas == 0) {
            $("#cOcFelicitasPercent" + index).val('');
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Las Felicitaciones solo se pueden otorgar si existen ceremonias asistidas",
                "Aceptar");
        } else {
            var asistidas = parseInt($("#cOcCeremoniasA" + index).val());
            var felicitas = parseInt($("#cOcFelicitasPercent" + index).val());

            if (felicitas > asistidas) {
                MensajeGeneral("error",
                    "ERROR FOLIO DE VIDA",
                    "Las Felicitaciones no deben superar el numero de ceremonias asistidas",
                    "Aceptar");
            } 
        }

    } catch (e) {

    }
}

$(document).on('click', ".btnGuardarOrdenCerrado", function () {
    event.preventDefault();
    var index = $(this).attr('id').replace('btnGuardarOrdenCerrado', '');
    var frmOrdenCerrado = $('#frmOrdenCerrado' + index);

    $("#txtEvalIdPFis").val($("#hfEstudianteID").val());

    var oPrueba = new FormData(frmOrdenCerrado.get(0));
    var iPeriodo = $("#txtPerIdPFis").val();

    Swal.fire({
        title: 'FOLIO DE VIDA - Orden Cerrado',
        text: "¿Desea guardar la evaluación del mes?, verifique no existan datos erroneos, una vez guardada no sera posible cambiar la evaluación",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "POST",
                data: oPrueba,
                processData: false,
                contentType: false,
                url: "/Batallon/GuardarOrdenCerrado",
                success: function (respuesta) {
                    if (respuesta.succeeded === true) {
                        MensajeGeneral("success",
                            "FOLIO DE VIDA",
                            "La evaluación fue guardada correctamente",
                            "Aceptar");
                        $("#btnPeriodo" + iPeriodo + "_7").click();
                        GetNotaFinal(iPeriodo);
                    }
                    else {
                        MensajeGeneral("error",
                            "ERROR FOLIO DE VIDA",
                            "Se presento un error al intentar guardar la evaluacion",
                            "Aceptar");
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    MensajeGeneral("error",
                        "ERROR FOLIO DE VIDA",
                        "Se presento un error al guardar la evaluación " + thrownError,
                        "Aceptar");
                }
            });
        }
    })

})