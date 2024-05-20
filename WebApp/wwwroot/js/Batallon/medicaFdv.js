function GetViewSituacionesMedicas() {
    $.ajax({
        data:
        {
            iEstId: parseInt($("#hfEstudianteID").val())
        },
        url: "/Batallon/GetViewSituacionesMedicas",
        success: function (respuesta) {
            $("#dvListadoSituacionesMedicas").html(respuesta);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar cargar el listado de situaciones medicas",
                "Aceptar");
        }
    });
}

$("#btnAsignarSituacionMedica").click(function () {
    LimpiarCamposSituacionMedica();
    $("#mdlSituacionMedica").modal('show');
});


$("#frmSituacionMedica").submit(function () {
    event.preventDefault();
    var frmSituacionMedica = $('#frmSituacionMedica');
    var sMeId = parseInt($("#hfEstudianteSituacionMedicaSmeId").val());
    if (sMeId > 0) {
        if ($("#lsArchivoSoporte").val() !== '') {
            var input = $("#flArchivoSoporte");
            input.rules("remove", "required");
        }
    } else {
        var input = $("#flArchivoSoporte");
        input.rules("add", {
            required: true,
        });
    }
    var bFormValido = frmSituacionMedica.valid();
    if (bFormValido) {
        $("#mdlSituacionMedica").modal("hide");
        $("#mdlUserFirmaSituacionMedica").modal("show");
    }
    return false;
});

$("#frmFirmasSituacionMedica").submit(function () {
    event.preventDefault();
    var frmFirmasSituacionMedica = $('#frmFirmasSituacionMedica');
    var bFormValido = frmFirmasSituacionMedica.valid();

    if (bFormValido) {
        var oFirma = new FormData(frmFirmasSituacionMedica.get(0));
        $.ajax({
            type: "POST",
            data: oFirma,
            url: "/Batallon/FirmarUsuario",
            processData: false,
            contentType: false,
            success: function (respuesta) {
                if (respuesta.exito) {
                    var frmSituacionMedica = $('#frmSituacionMedica');
                    var oFolioVida = new FormData(frmSituacionMedica.get(0));
                    oFolioVida.set("idEst", $("#hfEstudianteID").val());
                    $.ajax({
                        type: "POST",
                        data: oFolioVida,
                        url: "/Batallon/GuardarSituacionMedica",
                        processData: false,
                        contentType: false,
                        success: function (respuesta) {
                            $("#mdlUserFirmaSituacionMedica").modal("hide");
                            var isFromTestIndex = $("#txtIndexPFis").val();



                            if (respuesta.succeeded === true) {
                                MensajeGeneral("success",
                                    "FOLIO DE VIDA",
                                    "La situación medica fue registrada correctamente",
                                    "Aceptar");
                                GetViewSituacionesMedicas();

                                if ($("#justificacionPruebaFis" + isFromTestIndex).val() === "1") {
                                    var frmPruebasFisicas = $('#frmPruebaFisica');
                                    var iPeriodo = $("#txtPerIdPFis").val();
                                    var oPrueba = new FormData(frmPruebasFisicas.get(0));
                                    $.ajax({
                                        type: "POST",
                                        data: oPrueba,
                                        processData: false,
                                        contentType: false,
                                        url: "/Batallon/GuardarPruebasFisicas",
                                        success: function (respuesta) {
                                            if (respuesta.succeeded === true) {
                                                MensajeGeneral("success",
                                                    "FOLIO DE VIDA",
                                                    "La evaluación fue guardada correctamente",
                                                    "Aceptar");
                                                $("#btnPeriodo" + iPeriodo + "_5").click();
                                                $("#btnPeriodo" + iPeriodo + "_9").click();
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
                            }
                            else {
                                MensajeGeneral("error",
                                    "ERROR FOLIO DE VIDA",
                                    respuesta.error,
                                    "Aceptar");
                            }

                            LimpiarCamposSituacionMedica();
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            MensajeGeneral("error",
                                "ERROR FOLIO DE VIDA",
                                "Se presento un error al intentar registrar la  situación medica",
                                "Aceptar");
                        }
                    });
                }
                else {
                    MensajeGeneral("info",
                        "ERROR CREDENCIALES",
                        respuesta.mensaje,
                        "Aceptar");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                MensajeGeneral("error",
                    "ERROR CREDENCIALES",
                    "Se presento un error al intentar obtener las credenciales del evaluador",
                    "Aceptar");
            }
        });
    }

    return false;
})

$(document).on('click', ".situacionBorrar", function () {
    event.preventDefault();
    Swal.fire({
        title: 'FOLIO DE VIDA',
        text: "¿Estás seguro que desea eliminar la situación medica?",
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
                    iSituacionMedicaID: parseInt($(this).attr('data-id'))
                },
                url: "/Batallon/BorrarSituacionMedica",
                success: function (respuesta) {
                    if (respuesta) {
                        MensajeGeneral("success",
                            "FOLIO DE VIDA",
                            "La situación medica fue eliminada correctamente",
                            "Aceptar");
                        GetViewSituacionesMedicas();
                    }
                    else {
                        MensajeGeneral("error",
                            "ERROR FOLIO DE VIDA",
                            "Se presento un error al intentar eliminar la situación medica",
                            "Aceptar");
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    MensajeGeneral("error",
                        "ERROR FOLIO DE VIDA",
                        "Se presento un error al intentar eliminar la situación medica",
                        "Aceptar");
                }
            });
        }
    })
})


$(document).on('click', ".situacionEditar", function () {
    event.preventDefault();

    $.ajax({
        data: {
            Id: parseInt($(this).attr('data-id'))
        },
        url: "/Batallon/GetSituacion",
        success: function (respuesta) {
            if (respuesta) {
                $("#mdlSituacionMedica").modal('show');
                $("#hfEstudianteSituacionMedicaSmeId").val(respuesta.data.smeId);
                $("#dtpSmeFechaInicio").val(moment(respuesta.data.smeFechaInicio).format('DD/MM/YYYY'));
                $("#dtpSmeFechaTermino").val(moment(respuesta.data.smeFechaTermimo).format('DD/MM/YYYY'));
                $("#txtSmeTipoExcusa").val(respuesta.data.smeTipoExcusa);
                $("#txtSmeDescripcion").val(respuesta.data.smeDescripcion);
                $("#txtSmeDias").val(respuesta.data.smeDias);
                $("#lsArchivoSoporte").val(respuesta.data.smeArchivoSoporte);
                $("#dvArchivoSoporteSme").show(500);
            }
            else {
                MensajeGeneral("error",
                    "ERROR FOLIO DE VIDA",
                    "Se presento un error al intentar editar la situación medica",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar editar la situación medica",
                "Aceptar");
        }
    });
})

function LimpiarCamposSituacionMedica() {
    $("#hfEstudianteSituacionMedicaSmeId").val('');
    $("#dtpSmeFechaInicio").val(moment().format('DD/MM/YYYY'));
    $("#dtpSmeFechaTermino").val(moment().format('DD/MM/YYYY'));
    $("#txtSmeTipoExcusa").val('');
    $("#txtSmeDescripcion").val('');
    $("#txtSmeDias").val('');
    $("#flArchivoSoporte").val('');
    $("#lsArchivoSoporte").val('');
    $("#dvArchivoSoporteSme").hide();
}