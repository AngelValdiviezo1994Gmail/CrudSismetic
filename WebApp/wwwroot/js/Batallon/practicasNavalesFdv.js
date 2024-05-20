function GetViewConceptosPracticasNavales(iPeriodo) {
    $("#pnvIdPer").val(iPeriodo);
    $.ajax({
        data:
        {
            iEstId: parseInt($("#hfEstudianteID").val()),
            iPeriodoId: parseInt(iPeriodo)
        },
        url: "/Batallon/GetViewConceptosPracticasNavales",
        success: function (respuesta) {
            $("#dvEvaluacionPracticasNavales").html(respuesta);
            try {
                // Pickadate
                $('.pickadate').datepicker({
                    format: "dd/mm/yyyy",
                    todayBtn: false,
                    language: "es"
                });
            } catch (e) {

            }
            subcribeToClickPnv();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar cargar el listado de pruebas fisicas",
                "Aceptar");
        }
    });
}

$(document).on('change', '.cPvCalifmount', function () {
    event.preventDefault();
    try {
        var limit = 100;
        var index = $(this).attr('id').replace('cPvCalif', '');

        fnValidarNumero("cPvCalif" + index, "cPvCalif" + index, limit);

        var sum = parseInt($("#cPvCalif" + index).val());

        $(".cPvCalifmount").each(function () {
            var ide = $(this).attr('id');
            if (ide !== "cPvCalif" + index) {
                var califa = parseInt($(this).val());
                sum += califa;
            }
        });
        getNotaFinalPnv(sum)



    } catch (e) {

    }
})

function subcribeToClickPnv() {
    var frmPracticasNavales = $("#frmPracticasNavales");
    var frmId = parseInt($("#pkPnvId").val());
    frmPracticasNavales.validate({
        errorClass: 'text-danger',
        rules: {
            PnvUnidad: {
                required: true
            },
            PnvPuntosObtenidos: {
                required: true
            },
            flArchivoSoporte: {
                required: true
            }
        },
        messages: {
            PnvUnidad: {
                required: "Ingrese el nombre de la unidad."
            },
            PnvPuntosObtenidos: {
                required: "No hay ningun concepto con calificación"
            },
            flArchivoSoporte: {
                required: "El Archivo PDF de soporte es necesario"
            }
        },
        errorElement: 'span'
    });

    if (frmId > 0) {
        const input = $("#txtInputFilePnv");
        input.rules("remove", "required");
    }

    $("#btnGuardarPracticasNavales").click(function () {

        var bFormValido = frmPracticasNavales.valid();
        if (bFormValido) {
            var oFolioVida = new FormData(frmPracticasNavales.get(0));
            var iPeriodo = $("#pnvIdPer").val();
            //var concepts = new FormData($("#frmConceptosPnv").get(0));
            oFolioVida.set("idEst", $("#hfEstudianteID").val());
            oFolioVida.set("idPer", iPeriodo);

            $.ajax({
                type: "POST",
                data: oFolioVida,
                url: "/Batallon/GuardarPracticasNavales",
                processData: false,
                contentType: false,
                success: function (respuesta) {

                    if (respuesta.succeeded === true) {
                        MensajeGeneral("success",
                            "FOLIO DE VIDA",
                            "Los datos de evaluación fueron registrados correctamente",
                            "Aceptar");

                        $("#btnPeriodo" + iPeriodo + "_6").click();
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
        }
    })
}

function getNotaFinalPnv(prom) {
    var peri = parseInt($("#pnvIdPer").val());

    $.ajax({
        data:
        {
            prom: prom,
            iPeriodo: peri,
            iEstId: parseInt($("#hfEstudianteID").val()),
        },
        url: "/Batallon/GetPnvNotaFinal",
        success: function (respuesta) {
            $("#pnvPuntosObt").val(parseInt(respuesta));
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar obtener Factor de Aptitud Naval",
                "Aceptar");
        }
    });
}

function limpiarPracticasCal() {
    $("#pnvPeriodo").val('');
    $("#txtUnidadPnv").val('');
    $("#pnvFecha").val(moment().format('DD/MM/YYYY'));
    $("#pnvPuntosObt").val('');
    $("#pnvPromedio").val('');
    $("#txtInputFilePnv").val('');
    $("#txtObservcionesPnv").val('');
}