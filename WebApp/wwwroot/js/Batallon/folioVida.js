
$(function () {
    //FDV
    var iUsuId = parseInt($("#hfUsuarioID").val());
    var iEstId = parseInt($("#hfEstudianteID").val());
    $('#mslIdiomas').select2();
    
    if (iUsuId > 0) {
        ObtenerUsuario(false);
    }

    if (iEstId > 0) {
        //GetViewComisiones();
        GetViewComplementos();
        GetViewMedallas();
        GetViewAnotacionesConceptosEstudiante();
        GetViewSituacionesMedicas();

        $("#dvPeridosAptitudNaval")
            .load('/Batallon/GetViewTabsPeriodo?iTab=3', function () {
                $("#btnPeriodo1_3").click();
                
            });
        $("#dvPeridosDisciplina")
            .load('/Batallon/GetViewTabsPeriodo?iTab=4', function () {
                $("#btnPeriodo1_4").click();
            });
        $("#dvPeridosPruebaFisica")
            .load('/Batallon/GetViewTabsPeriodo?iTab=5', function () {
                $("#btnPeriodo1_5").click();
            });

        $("#dvPeridosPracticasNavales")
            .load('/Batallon/GetViewTabsPeriodo?iTab=6', function () {
                try {
                    var pfecha = $("#pnvFecha").val();
                    $("#pnvFecha").val(moment(pfecha).format('DD/MM/YYYY'));
                } catch (e) {

                }
                
                $("#btnPeriodo1_6").click();
            });

        $("#dvPeridosOrdenCerrado")
            .load('/Batallon/GetViewTabsPeriodo?iTab=7', function () {
                $("#btnPeriodo1_7").click();
            });

        $("#dvPeridosProgramasNavales")
            .load('/Batallon/GetViewTabsPeriodo?iTab=8', function () {
            });
        $("#dvPeridosResumen")
            .load('/Batallon/GetViewTabsPeriodo?iTab=9', function () {
                $("#btnPeriodo1_9").click();
            });
    }

    fnMostrarCampos();
});

var lastTabClick = '';

$(document).on('click', '.nav-link', function () {
    var id = $(this).attr('id');
    if (lastTabClick !== id) {
        if ($('#' + id + '[id*="_B"]').length) {
            id = id.replace('_B', '_T');
        }else if ($('#' + id + '[id*="_T"]').length) {
            id = id.replace('_T', '_B');
        }
        lastTabClick = id;
        $("#" + id).click();
    } else {
        lastTabClick = '';
    }    
})


$("#ddlTipoDocumento").change(function () {
    ObtenerUsuario(true);
});

$("#rnmNumDocIdentidad").change(function () {
    ObtenerUsuario(true);
});

function ObtenerUsuario(bMostrarMensaje) {
    var iUsuId = parseInt($("#hfUsuarioID").val());
    $(".lblNombreApellidos").html('');
    $("#lblFechaNacimiento").html('');
    $("#hfUsuarioID").val('');
    if ($("#rnmNumDocIdentidad").val() == '' || $("#rnmNumDocIdentidad").val() == undefined) {
        return;
    }
    $.ajax({
        data:
        {
            iTipoDoc: $("#ddlTipoDocumento").val(),
            sNumDoc: $("#rnmNumDocIdentidad").val(),
            isEdit: iUsuId > 0
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
                $("#evaluadorEntity").val(0);
                $(".lblNombreApellidos").html(respuesta.data.usuNombreCompleto);
                $("#lblFechaNacimiento").html(moment(respuesta.data.usuFechaNacimiento).format('DD/MM/YYYY'));


                $("#lblCodigo").val(respuesta.data.usuNumeroDocumento);
                
                
                $("#dpFechaIngreso").val(moment(respuesta.data.matricula.matFechaCreacion).format('DD/MM/YYYY'));
                $("#hfUsuarioID").val(respuesta.data.usuId);
                var initPe = moment(respuesta.data.curso.curAcadFechaInicio).format('DD/MM/YYYY');
                var endPe = moment(respuesta.data.curso.curAcadFechaFin).format('DD/MM/YYYY');
                $("#dtpPeriodo").val(initPe + ' - ' + endPe);
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

                if (respuesta.data.idEval !== null) {
                    $("#evaluadorEntity").val(respuesta.data.idEval.evalId);
                }
                
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

$(document).on('change', '.select-motivoRetiro', function () {
    if ($(this).attr('id')) {
        var id = $(this).attr('id').replace('ddlFamMotivoRetiro', '');
        var txtFamMotivo = $("#txtFamMotivo" + id);

        $("#dvFamMotivo" + id).hide(500);
        txtFamMotivo.val('');
        if ($(this).val() === "2") {
            $("#dvFamMotivo" + id).show(500);
        }
    }
});

$(document).on('change', '.rbtFamViveSi', function () {
    event.preventDefault();
    try {
        var index = $(this).attr('id').replace('rbtFamViveSi', '');
        RefreshCamposVive(index, true);
    } catch (e) {

    }
})

$(document).on('change', '.rbtFamViveNo', function () {
    event.preventDefault();
    try {
        var field = $(this)
            .attr('id')
            .replace('rbtFamViveNo', '');

        RefreshCamposVive(field, false);
    } catch (e) {
        console.log(e);
    }

})

$(document).on('change', ".rbtMilitarSi", function () {
    RefreshCampoMilitar($(this)
        .attr('id')
        .replace('rbtMilitarSi', ''), true);
})

$(document).on('change', ".rbtMilitarNo", function () {
    RefreshCampoMilitar($(this)
        .attr('id')
        .replace('rbtMilitarNo', ''), false);
})

$(document).on('change', ".rbtActivoMilitarSi", function () {
    event.preventDefault();
    try {
        var index = $(this).attr('id').replace('OptFamActivoSi', '');
        RefreshCamposMilitarActivo(index, true);
    } catch (e) {

    }
})

$(document).on('change', ".rbtActivoMilitarNo", function () {
    event.preventDefault();
    try {
        var index = $(this).attr('id').replace('OptFamActivoNo', '');
        RefreshCamposMilitarActivo(index, false);
    } catch (e) {

    }
})

$(document).on('change', ".rbtSelectFuerza", function () {
    event.preventDefault();
    try {
        var index = $(this).attr('id').replace('OptFamSelFuerza', '');
        RefreshGrados(index);
    } catch ($e) {

    }
})

function RefreshGrados(sID) {
    var FuerzaId = parseInt($("#OptFamSelFuerza" + sID).val());
    $.ajax({
        url: "/Batallon/GetGradosByFuerza",
        data:
        {
            iFuerza: FuerzaId
        },
        success: function (respuesta) {
            if (respuesta != null) {
                $("#OptSelGrado" + sID).empty().append('<option value="-1">Seleccione un Grado</option>');

                $(respuesta).each(function () {
                    $("#OptSelGrado" + sID).append('<option value="' + this.graId + '">' + this.graNombre + '</option>');
                });
            } else {
                MensajeGeneral("error",
                    "ERROR CARGA DE GRADOS",
                    "Se presento un error al intentar cargar los grados militares",
                    "Aceptar");
            }
            $("#OptSelGrado" + sID).selectpicker('refresh');
        }
    });
}

function RefreshCamposVive(sID, Activo) {
    if (Activo) {
        $("#dvCampoMilitar" + sID).show(500);
        $("#dvDireccion" + sID).show(500);
        $("#dvCiudad" + sID).show(500);
        $("#dvTelCelular" + sID).show(500);
        $("#dvTelFijo" + sID).show(500);
        $("#dvFamEmail" + sID).show(500);
        $("#dvOcupacion" + sID).show(500);

        $("#rbtFamViveSi" + sID).prop('checked', true);
    } else {
        $("#dvCampoMilitar" + sID).hide(500);
        $("#dvDireccion" + sID).hide(500);
        $("#dvCiudad" + sID).hide(500);
        $("#dvTelCelular" + sID).hide(500);
        $("#dvTelFijo" + sID).hide(500);
        $("#dvFamEmail" + sID).hide(500);
        $("#dvOcupacion" + sID).hide(500);
    }
    $("#rbtMilitarNo" + sID).prop('checked', true);
    RefreshCampoMilitar(sID, false);

    $("#OptFamActivoNo" + sID).prop('checked', true);
    RefreshCamposMilitarActivo(sID, false);
}

function RefreshCampoMilitar(sID, Activo) {
    if (Activo) {
        $("#dvFamActivo" + sID).show(500);
        $("#dvGradoMilitar" + sID).show(500);
        $("#dvFamFuerza" + sID).show(500);
        $("#dvOcupacion" + sID).hide(500);

        $("#rbtMilitarSi" + sID).prop('checked', true);
    } else {
        if ($("#rbtFamViveSi" + sID).prop('checked')) {
            $("#dvOcupacion" + sID).show(500);
        }
        $("#dvFamActivo" + sID).hide(500);
        $("#dvGradoMilitar" + sID).hide(500);
        $("#dvFamFuerza" + sID).hide(500);
    }
    $("#OptFamActivoNo" + sID).prop('checked', true);
    RefreshCamposMilitarActivo(sID, false);
}

function RefreshCamposMilitarActivo(sID, Activo) {
    if (Activo) {
        $("#dvFamFechaRetiro" + sID).hide(500);
        $("#dvFamMotivo" + sID).hide(500);
        $("#dvFamMotivoRetiro" + sID).hide(500);


        $("#OptFamActivoSi" + sID).prop('checked', true);
    } else {

        var isVivo = $("#rbtFamViveSi" + sID).prop('checked');
        var isMilitar = $("#rbtMilitarSi" + sID).prop('checked');
        var isActivo = $("#OptFamActivoSi" + sID).prop('checked');

        if (!isVivo) {
            $("#dvFamFechaRetiro" + sID).hide(500);
            $("#dvFamMotivo" + sID).hide(500);
            $("#dvFamMotivoRetiro" + sID).hide(500);
        } else if (!isMilitar) {
            $("#dvFamFechaRetiro" + sID).hide(500);
            $("#dvFamMotivo" + sID).hide(500);
            $("#dvFamMotivoRetiro" + sID).hide(500);
        } else {
            if (isVivo && isMilitar && isActivo) {
                $("#dvFamFechaRetiro" + sID).hide(500);
                $("#dvFamMotivo" + sID).hide(500);
                $("#dvFamMotivoRetiro" + sID).hide(500);
            } else {
                $("#dvFamFechaRetiro" + sID).show(500);
                $("#dvFamMotivo" + sID).show(500);
                $("#dvFamMotivoRetiro" + sID).show(500);
            }
        }
    }
    $("#dvFamMotivo" + sID).hide(500);
}
//

function fnValidarNumero(txtSender, txtDest, maxI) {
    var bEsNumero = $.isNumeric($("#" + txtSender).val());
    if (bEsNumero) {
        var valor = parseInt($("#" + txtSender).val());
        $("#" + txtDest).val('');
        if (valor < 0) {
            $("#" + txtSender).val(0);
        } else if (valor <= maxI) {
            $("#" + txtSender).val(valor);
        } else {
            $("#" + txtSender).val(maxI);
        }
    }
}

$("#btnGuardar").click(function () {
    var frmFolioVida = $("#frmFolioVida");
    var bFormValido = frmFolioVida.valid();
   
    if (bFormValido) {
        var oFolioVida = new FormData(frmFolioVida.get(0));
        oFolioVida.set("sFusilGALIL", $("#txtFusilGALIL").val());
        oFolioVida.set("sFusilFAMAGE", $("#txtFusilFAMAGE").val());

        $.ajax({
            type: "POST",
            data: oFolioVida,
            url: "/Batallon/GuardarFolioVida",
            processData: false,
            contentType: false,
            success: function (respuesta) {

                if (respuesta.succeeded === true) {
                    MensajeGeneral("success",
                        "FOLIO DE VIDA",
                        "El folio de vida fue registrado correctamente",
                        "Aceptar");

                    setTimeout(function () {
                        window.location.href = "/Batallon/Index";
                    }, 550)
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
                    "Se presento un error al intentar registrar el folio de vida",
                    "Aceptar");
            }
        });
    }
});

function fnValidarNumeroMinMax(txtSender, txtDest, maxI, minI) {
    var bEsNumero = $.isNumeric($("#" + txtSender).val());
    if (bEsNumero) {
        var valor = parseFloat($("#" + txtSender).val());
        $("#" + txtDest).val('');
        if (valor < minI) {
            $("#" + txtSender).val(minI);
        } else if (valor > maxI) {
            $("#" + txtSender).val(maxI);
        } else {
            $("#" + txtSender).val(valor);
        }
    }
}

