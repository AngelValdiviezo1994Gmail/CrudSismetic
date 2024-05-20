function GetNotaFinal(iPeri) {
    $.ajax({
        data:
        {
            cPeriodo: iPeri,
            iEstId: parseInt($("#hfEstudianteID").val())
        },
        url: "/Batallon/GetNotaFinal",
        success: function (respuesta) {
            $("#dvNotasAptitudNaval").html(respuesta);
            $("#btnGuardarAptitudNaval").click(function () {
                event.preventDefault();
                Swal.fire({
                    title: 'FOLIO DE VIDA',
                    text: "Es importante considerar que ante cualquier cambio de notas, esta evaluación debera volverse a guardar.",
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
                            data: {
                                iEstId: parseInt($("#hfEstudianteID").val()),
                                iPeriodoId: parseInt($("#apnPeriodo").val())
                            },
                            url: "/Batallon/GuardarEvaluacionAptitudNaval",
                            success: function (respuesta) {
                                if (respuesta.succeeded) {
                                    MensajeGeneral("success",
                                        "FOLIO DE VIDA",
                                        "La Evaluación fue guardada correctamente",
                                        "Aceptar");
                                    $("#btnPeriodo" + iPeri + "_9").click();
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
                                    "Se presento un error al eliminar la anotación",
                                    "Aceptar");
                            }
                        });
                    }
                })
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar obtener la Nota de Aptitud Naval",
                "Aceptar");
        }
    });
}