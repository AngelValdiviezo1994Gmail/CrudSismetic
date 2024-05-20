$("#btnAsignarAnotacion").click(function () {
    LimpiarCamposAnotaciones();
    fnMostrarCampos();
    $("#mdlAnotacion").modal('show');
});

$("#ddlTipoAnotacion").change(function () {
    fnMostrarCampos();
});

$("#ddlFactorEvaluacion").change(function () {
    fnObtenerConceptos();
});

$("#ddlPeriodoAnotaciones").change(function () {

    fnMostrarCampos();
    fnObtenerConceptos();
    GetViewAnotacionesConceptosEstudiante();
});

$("#txtEfaPuntosPositivos").change(function () {
    var tipo = $("#hfAnotacionPuntosMax").val();
    fnValidarNumero("txtEfaPuntosPositivos", "txtEfaPuntosNegativos", tipo);
});

$("#txtEfaPuntosNegativos").change(function () {
    var tipo = $("#hfAnotacionPuntosMax").val();
    fnValidarNumero("txtEfaPuntosNegativos", "txtEfaPuntosPositivos", tipo);
});


function fnObtenerFactorEval(idSel = 0, idSec = 0) {
    $.ajax({
        url: "/Batallon/ObtenerFactorEvaluacionPorTipo",
        data:
        {
            iTipoConceptoAnotacion: parseInt($("#ddlTipoAnotacion").val())
        },
        cache: false,
        type: "POST",
        success: function (data) {
            var optFactores = "<option value =-1>Seleccione Factor</option>";
            for (var x = 0; x < data.length; x++) {
                optFactores += "<option value=" + data[x].tcoaId + ">" + data[x].tcoaNombre + "</option>";
            }
            $("#ddlFactorEvaluacion").empty().html(optFactores);
            if (idSel > 0) {
                $("#ddlFactorEvaluacion").val(idSel);
                fnObtenerConceptos(idSec, idSel);
            }
            $("#ddlFactorEvaluacion").selectpicker('refresh');
            if (idSel === 0) {
                var optIndicador = "<option value =-1>Seleccione Indicador</option>";
                $("#ddlAnotaciones").html(optIndicador);
                $("#ddlAnotaciones").selectpicker('refresh');
            }
        },
        error: function (reponse) {
            alert("error : " + reponse);
        }
    });
}

function fnObtenerConceptos(idSel = 0, idFac = 0) {
    var Fac = parseInt($("#ddlFactorEvaluacion").val());
    if (isNaN(Fac)) {
        Fac = idFac;
    }
    $.ajax({
        url: "/Batallon/ObtenerConceptosPorTipo",
        data:
        {
            iTipoConceptoAnotacion: Fac,
            iPeriodo: parseInt($("#ddlPeriodoAnotaciones").val())
        },
        cache: false,
        type: "POST",
        success: function (data) {
            var optAnotaciones = "<option value =-1>Seleccione Indicador</option>";
            for (var x = 0; x < data.length; x++) {
                optAnotaciones += "<option value=" + data[x].ctaId + ">" + data[x].ctaInciso + '  ' + data[x].ctaNombre + "</option>";
            }
            $("#ddlAnotaciones").html(optAnotaciones);
            if (idSel > 0) {
                $("#ddlAnotaciones").val(idSel);
            }
            $("#ddlAnotaciones").selectpicker('refresh');
        },
        error: function (reponse) {
            alert("error : " + reponse);
        }
    });
}

function GetViewAnotacionesConceptosEstudiante() {
    $.ajax({
        data:
        {
            iEstId: parseInt($("#hfEstudianteID").val()),
            iPeriodo: parseInt($("#ddlPeriodoAnotaciones").val())
        },
        url: "/Batallon/GetViewAnotacionesConceptosEstudiante",
        success: function (respuesta) {
            $("#dvListadoAnotaciones").html(respuesta);
            GetNotaFinal(parseInt($("#ddlPeriodoAnotaciones").val()));
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar cargar el listado de anotaciones y conceptos",
                "Aceptar");
        }
    });
}


$(document).on('click', ".anotacionEditar", function () {
    event.preventDefault();

    $.ajax({
        data: {
            Id: parseInt($(this).attr('data-id'))
        },
        url: "/Batallon/GetAnotacion",
        success: function (respuesta) {
            if (respuesta) {
                LimpiarCamposAnotaciones();


                $("#mdlAnotacion").modal('show');
                $("#hfEstudianteFactoresEvaluacionEfaId").val(respuesta.data.efaId);
                $("#hfAnotacionPeridoId").val(respuesta.data.periodo.perId);
                $("#dtpEfaFechaFirmaEvaluador").val(moment(respuesta.data.efaFechaFirmaEvaluador).format('DD/MM/YYYY'));
                $("#ddlTipoAnotacion").val(respuesta.data.catTipoAnotacion.tcoaId);
                $("#ddlTipoAnotacion").selectpicker('refresh');
                fnMostrarCampos(true);
                fnObtenerFactorEval(respuesta.data.catFactorEvaluacion.tcoaId, respuesta.data.catIndicadorConcepto.ctaId);

                $("#txtEfaAnotacion").val(respuesta.data.efaAnotacion);
                $("#txtEfaPuntosPositivos").val(respuesta.data.efaPuntosPositivos);
                $("#txtEfaPuntosNegativos").val(respuesta.data.efaPuntosNegativos);
                $("#txtEfaFecha").val(moment(respuesta.data.efaFechaFirmaEvaluador).format('DD/MM/YYYY'));
                $("#txtEfaDemerito").val(respuesta.data.efaDemerito);
                $("#feditArchivoSoporteAnotacion").val(respuesta.data.efaArchivoSoporte);
                $("#txtEfaConceptoEvaluador").val(respuesta.data.efaConceptoEvaluador);
                GetNotaFinal()
            }
            else {
                MensajeGeneral("error",
                    "ERROR FOLIO DE VIDA",
                    "Se presento un error al intentar editar la anotación y concepto",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar editar la anotación y concepto",
                "Aceptar");
        }
    });
});

$(document).on('click', ".anotacionBorrar", function () {
    event.preventDefault();
    Swal.fire({
        title: 'FOLIO DE VIDA',
        text: "¿Estás seguro que desea eliminar la anotación?",
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
                    iAnotacionID: parseInt($(this).attr('data-id'))
                },
                url: "/Batallon/BorrarAnotacion",
                success: function (respuesta) {
                    if (respuesta) {
                        MensajeGeneral("success",
                            "FOLIO DE VIDA",
                            "La anotación fue eliminada correctamente",
                            "Aceptar");
                        GetViewAnotacionesConceptosEstudiante();
                        $("#btnPeriodo" + $("#ddlPeriodoAnotaciones").val() + "_3").click();
                        $("#btnPeriodo" + $("#ddlPeriodoAnotaciones").val() + "_4").click();
                        GetNotaFinal(parseInt($("#ddlPeriodoAnotaciones").val()));
                    }
                    else {
                        MensajeGeneral("error",
                            "ERROR FOLIO DE VIDA",
                            "Se presento un error al intentar eliminar la anotación",
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

$("#btnGuardarAnotaciones").click(function () {
    $("#btnGuardar").click();
});

function LimpiarCamposAnotaciones() {
    $("#dtpEfaFechaFirmaEvaluador").val(moment().format('DD/MM/YYYY'));
    $("#ddlTipoAnotacion").val('');
    $("#ddlAnotaciones").val('');
    $("#txtEfaPuntosPositivos").val('');
    $("#txtEfaPuntosNegativos").val('');
    $("#flArchivoSoporte").val('');
    $("#txtEfaDemerito").val('');
    $("#txtEfaDescripcionFalta").val('');
    $("#ddlTipoAnotacion")[0].selectedIndex = 0;
    $("#ddlFactorEvaluacion").html('');
    $("#ddlAnotaciones").html('');
    $("#ddlAnotaciones").selectpicker('refresh');
    $("#ddlTipoAnotacion").selectpicker('refresh');
    $("#ddlFactorEvaluacion").selectpicker('refresh');
    $("#hfEstudianteFactoresEvaluacionEfaId").val("");
    $("#flArchivoSoporteAnotaciones").val('');
    $("#txtEfaFecha").val('');
    $("#txtEfaDemerito").val('');
    $("#txtEfaDescripcionFalta").val('');
    $("#hfEstudianteArchivoSoporteAnotacion").val('');
    $("#txtEfaConceptoEvaluador").val('');
    $("#txtEfaAnotacion").val('');
    $("#usrEvalAnotacion").val('');
    $("#ddlFactorEvaluacion-error").remove();
    $("#rnmNumDocIdentidadAnotacion-error").remove();
    $("#rnmNumDocIdentidadAnotacion").val('');
    $("#txtEfaConceptoEvaluador-error").remove();
    $("#ddlTipoAnotacion-error").remove();
    $("#ddlAnotaciones-error").remove();
    $("#flArchivoSoporteAnotaciones-error").remove();
}

function fnMostrarCampos(isEdit = false) {
    var idTipoAnotacion = $("#ddlTipoAnotacion").val();

    $("#dvPuntosPositivos").hide();
    $("#dvEfaDemerito").hide();
    $("#dvPuntosNegativos").hide();
    $("#dvEfaDescripcionFalta").hide();
    $("#dvEfaFecha").hide();
    $("#dvConceptoEvaluador").hide();
    $("#flArchivoSoporteAnotacionEdit").hide(500);
    $("#dvArchivoSoporteAnotaciones").hide();
    $("#dvFactorEvaluacion").hide();
    $("#dvIndicador").hide();
    $("#dvAnotacion").hide();
    $("#dvCevalTDoc").hide();
    $("#dvCevalDocIdent").hide();
    $("#dvCevalUser").hide();
    $("#hfAnotacionPuntosMax").val(0);

    $("#ddlAnotaciones").empty();
    $("#ddlAnotaciones").selectpicker('refresh');

    $("#ddlFactorEvaluacion").empty();
    $("#ddlFactorEvaluacion").selectpicker('refresh');
    $("#fConceptEval").text("Concepto del evaluador");

    if (idTipoAnotacion === "11" || idTipoAnotacion === "12" || idTipoAnotacion === "18") {
        $("#dvAnotacion").show(500);
        $("#dvFactorEvaluacion").hide();
    } else if (idTipoAnotacion === "14") {
        $("#dvCevalTDoc").show(500);
        $("#dvCevalDocIdent").show(500);
        $("#dvCevalUser").show(500);
        if (!isEdit) fnObtenerFactorEval();

    } else if (idTipoAnotacion === "13" || idTipoAnotacion === "15" || idTipoAnotacion === "16" || idTipoAnotacion === "17") {
        $("#dvAnotacion").hide();
        $("#dvFactorEvaluacion").show(500);
        $("#dvIndicador").show(500);

        $("#dvConceptoEvaluador").show(500);

        if (idTipoAnotacion !== "17") {
            $("#dvPuntosPositivos").show(500);
            $("#dvPuntosNegativos").show(500);

            if (idTipoAnotacion === "16") {
                $("#txtEfaPuntosPositivos").attr({
                    "max": 7
                });
                $("#txtEfaPuntosNegativos").attr({
                    "max": 7
                });
                $("#hfAnotacionPuntosMax").val(7);
                if (isEdit) {
                    $("#flArchivoSoporteAnotacionEdit").show(500);
                }


                $("#dvArchivoSoporteAnotaciones").show(500);
            } else {
                $("#txtEfaPuntosPositivos").attr({
                    "max": 2
                });
                $("#txtEfaPuntosNegativos").attr({
                    "max": 2
                });
                $("#hfAnotacionPuntosMax").val(2);

            }

        } else {
            $("#dvEfaDemerito").show(500);
            $("#fConceptEval").text("Sanción");
            if (isEdit) {
                $("#flArchivoSoporteAnotacionEdit").show(500);
            }


            $("#dvArchivoSoporteAnotaciones").show(500);
        }
        if (!isEdit) fnObtenerFactorEval();
    }
}

$("#frmFactorEvaluacion").submit(function (event) {
    event.preventDefault();
    var frmFactorEvaluacion = $('#frmFactorEvaluacion');
    var oFolioVida = new FormData(frmFactorEvaluacion.get(0));
    var aId = $("#hfEstudianteFactoresEvaluacionEfaId").val();

    const input = $("#flArchivoSoporteAnotaciones");
    if (aId > 0) {
        input.rules("remove", "required");
        $("#hfEstudianteArchivoSoporteAnotacion").val($("#feditArchivoSoporteAnotacion").val());
    } else {
        input.rules("add", {
            required: true,
        });
    }

    var sn = $("#fConceptEval").text();
    const inputCE = $("#txtEfaConceptoEvaluador");
    if (sn === "Sancion") {
        inputCE.rules("remove", "required");
    } else {
        inputCE.rules("add", {
            required: true,
        });
    }

    var bFormValido = frmFactorEvaluacion.valid();
    if (bFormValido) {
        var oFolioVida = new FormData(frmFactorEvaluacion.get(0));
        oFolioVida.set("idEst", $("#hfEstudianteID").val());
        const perID = parseInt($("#ddlPeriodoAnotaciones").val());
        oFolioVida.set("idPer", perID);

        $.ajax({
            type: "POST",
            data: oFolioVida,
            url: "/Batallon/GuardarEstudianteAnotacion",
            processData: false,
            contentType: false,
            success: function (respuesta) {
                $("#mdlAnotacion").modal('hide');
                LimpiarCamposAnotaciones();
                if (respuesta.succeeded === true) {
                    MensajeGeneral("success",
                        "FOLIO DE VIDA",
                        "La anotación fue registrada correctamente",
                        "Aceptar");
                    GetViewAnotacionesConceptosEstudiante();
                    $("#btnPeriodo" + $("#ddlPeriodoAnotaciones").val() + "_3").click();
                    $("#btnPeriodo" + $("#ddlPeriodoAnotaciones").val() + "_4").click();
                    LimpiarCamposAnotaciones();
                    GetNotaFinal(perID);
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
                    "Se presento un error al intentar registrar la anotación",
                    "Aceptar");
            }
        });
    }
    return false;

});


$("#rnmNumDocIdentidadAnotacion").change(function () {
    ObtenerUsuarioFromAnotacion(false);
});

function ObtenerUsuarioFromAnotacion(bMostrarMensaje) {

    if ($("#rnmNumDocIdentidadAnotacion").val() == '' || $("#rnmNumDocIdentidadAnotacion").val() == undefined) {
        return;
    }
    $.ajax({
        data:
        {
            iTipoDoc: $("#ddlATipoDocumento").val(),
            sNumDoc: $("#rnmNumDocIdentidadAnotacion").val(),
            isEdit: true
        },
        url: "/Batallon/BuscarUsuario",
        success: function (respuesta) {
            if (respuesta.data !== null) {

                if (bMostrarMensaje === true) {
                    MensajeGeneral('success',
                        'Aviso de sistema',
                        'Usuario encontrado',
                        'Aceptar');
                }

                var isEvaluador = false;
                //var actualEvaluadorID = 
                const input = $("#rnmNumDocIdentidadAnotacion");
                input.rules("add", {
                    required: true,
                });
                for (var x = 0; x < respuesta.data.roles.length; x++) {
                    if (respuesta.data.roles[x].nombre === 'EVALUADOR') {
                        isEvaluador = true;
                        input.rules("remove", "required");
                    }
                }

                if (!isEvaluador) {
                    $("rnmNumDocIdentidadAnotacion-error").val('El Usuario no es Evaludador');
                }

                $(".lblNombreApellidos").html(respuesta.data.usuNombreCompleto);
                $("#lblFechaNacimiento").html(moment(respuesta.data.usuFechaNacimiento).format('DD/MM/YYYY'));


                $("#lblCodigo").val(respuesta.data.usuNumeroDocumento);


                $("#dpFechaIngreso").val(moment(respuesta.data.estudiante.matFechaCreacion).format('DD/MM/YYYY'));
                $("#hfUsuarioID").val(respuesta.data.usuId);
                if (respuesta.data.curso != null) {
                    $("#idCurso").val(respuesta.data.curso.curAcadId);
                    $("#lblCursoNombre").val(respuesta.data.curso.curAcadNombre);
                }

                var famVP = $("#rbtFamViveSi0").prop('checked');
                var famMP = $("#rbtMilitarSi0").prop('checked');
                var famAMP = $("#OptFamActivoSi0").prop('checked');
                if (famVP) {
                    RefreshCamposVive(0, true);
                    if (famMP) {
                        RefreshCampoMilitar(0, true);
                        RefreshGrados(0);
                        if (famAMP) {
                            RefreshCamposMilitarActivo(0, true);
                        }
                    }
                }


                var famVM = $("#rbtFamViveSi1").prop('checked');
                var famMM = $("#rbtMilitarSi1").prop('checked');
                var famAMM = $("#OptFamActivoSi1").prop('checked');
                if (famVM) {
                    RefreshCamposVive(1, true);
                    if (famMM) {
                        RefreshCampoMilitar(1, true);
                        RefreshGrados(1);
                        if (famAMM) {
                            RefreshCamposMilitarActivo(1, true);
                        }
                    }
                }
                $("#txtMedFecha").val(moment().format('DD/MM/YYYY'));
            }
            else {
                MensajeGeneral('error',
                    'Aviso de sistema',
                    respuesta.error,
                    'Aceptar');

                $("#rnmNumDocIdentidad").val('');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL ENCONTRAR EL USUARIO", "Se presento un error en la busqueda de la identidad de la persona", "Aceptar");
        }
    });
}