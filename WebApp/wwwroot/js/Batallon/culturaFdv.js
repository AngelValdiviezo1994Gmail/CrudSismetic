function GetViewPruebasFisicasEstudiante(iGrupo) {
    $("#txtPerIdPFis").val(iGrupo);
    $.ajax({
        data:
        {
            iEstId: parseInt($("#hfEstudianteID").val()),
            iPeriodo: iGrupo
        },
        url: "/Batallon/GetViewPruebasFisicasEstudiante",
        success: function (respuesta) {
            $("#dvPruebasFisicas").html(respuesta);

            try {
                // Pickadate
                $('.pickadate').datepicker({
                    format: "dd/mm/yyyy",
                    todayBtn: false,
                    language: "es"
                });
            } catch (e) {

            }
            getInitFields();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar cargar el listado de pruebas fisicas",
                "Aceptar");
        }
    });
}

$(document).on('change', '.txtTallaPFis', function () {
    event.preventDefault();
    try {
        var index = $(this).attr('id').replace('txtTallaPFis', '');
        getPesoIdeal(index);
    } catch (e) {

    }
});

$(document).on('change', '.txtPesoPFis', function () {
    event.preventDefault();
    try {
        var index = $(this).attr('id').replace('txtPesoPFis', '');
        getImc(index);
    } catch (e) {

    }
});

$(document).on('change', '.txtBarrasPFis', function () {
    event.preventDefault();
    try {
        var index = $(this).attr('id').replace('txtBarrasPFis', '');
        getBarrasNota(index);
    } catch (e) {

    }
});

$(document).on('change', '.txtAbdominalesPFis', function () {
    event.preventDefault();
    try {
        var index = $(this).attr('id').replace('txtAbdominalesPFis', '');
        getAbdominalesNota(index);
    } catch (e) {

    }
});

$(document).on('change', '.txtFlexBrazoPFis', function () {
    event.preventDefault();
    try {
        var index = $(this).attr('id').replace('txtFlexBrazoPFis', '');
        getFlexBrazoNota(index);
    } catch (e) {

    }
});

$(document).on('change', '.txtInmStaticPFis', function () {
    event.preventDefault();
    try {
        var index = $(this).attr('id').replace('txtInmStaticPFis', '');
        getInmStaticNota(index);
    } catch (e) {

    }
});

$(document).on('change', '.txtInmDinamicaPFis', function () {
    event.preventDefault();
    try {
        var index = $(this).attr('id').replace('txtInmDinamicaPFis', '');
        getInmDinamicaNota(index);
    } catch (e) {

    }
});

$(document).on('change', '.txtNatacionPFis', function () {
    event.preventDefault();
    try {
        var index = $(this).attr('id').replace('txtNatacionPFis', '');
        getNatacionNota(index);
    } catch (e) {

    }
});

$(document).on('change', '.txtCarreraPFis', function () {
    event.preventDefault();
    try {
        var index = $(this).attr('id').replace('txtCarreraPFis', '');
        getCarreraNota(index);
    } catch (e) {

    }
});

$(document).on('change', '.txtMedallasPFis', function () {
    event.preventDefault();
    try {
        var index = $(this).attr('id').replace('txtMedallasPFis', '');
        getPromedioCulturaFisica(index);
    } catch (e) {

    }
});

$("#btnGuardarPruebasFisicas").click(function () {
    var frmPruebaFisica = $("#frmPruebaFisica");
    var oFolioVida = new FormData(frmPruebaFisica.get(0));
    oFolioVida.set("idEst", $("#hfEstudianteID").val());
    $.ajax({
        type: "POST",
        data: oFolioVida,
        url: "/Batallon/GuardarPruebasFisicas",
        processData: false,
        contentType: false,
        success: function (respuesta) {
            if (respuesta === true) {
                MensajeGeneral("success",
                    "FOLIO DE VIDA",
                    "La prueba fisica fue registrada correctamente",
                    "Aceptar");
            }
            else {
                MensajeGeneral("error",
                    "ERROR FOLIO DE VIDA",
                    "Se presento un error al intentar registrar la prueba fisica",
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

})



function cleanPFisFields() {
    $("#frmPuebaFisica :input").val("");
}



function getPesoIdeal(index) {
    var peri = parseInt($("#culFisPeriodo").val());
    var gender = $("#lblGeneroPFis").text();
    $.ajax({
        data:
        {
            talla: parseFloat($("#txtTallaPFis" + index).val()),
            gender: gender,
            iPeriodo: peri
        },
        url: "/Batallon/GetPesoIdeal",
        success: function (respuesta) {
            $("#txtIdealPFis" + index).val(parseFloat(respuesta));
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar obtener Factor de Aptitud Naval",
                "Aceptar");
        }
    });
}

function getImc(index) {
    var peri = parseInt($("#culFisPeriodo").val());
    var gender = $("#lblGeneroPFis").text();
    $.ajax({
        data:
        {
            talla: parseFloat($("#txtTallaPFis" + index).val()),
            peso: parseFloat($("#txtPesoPFis" + index).val()),
            iPeriodo: peri
        },
        url: "/Batallon/GetImc",
        success: function (respuesta) {
            $("#txtImcPFis" + index).val(parseFloat(respuesta));
            getCondicion(index, parseFloat(respuesta).toFixed(1))
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar obtener Factor de Aptitud Naval",
                "Aceptar");
        }
    });
}

function setStyleByCondicion(condicion, index) {
    switch (condicion) {
        case 'OBESIDAD':
            $("#txtCondicionPFis" + index).css("background-color", "#FCBA03");
            break;
        case 'SOBREPESO':
            $("#txtCondicionPFis" + index).css("background-color", "#FF6961");
            break;
        case 'NORMAL':
            $("#txtCondicionPFis" + index).css("background-color", "#03BAFC");
            break;
        case 'BAJO PESO':
            $("#txtCondicionPFis" + index).css("background-color", "#CCFF99");
            break;
        default:
    }
}

function setStyleByMedalla(medalla, index) {
    switch (medalla) {
        case 'ORO':
            $("#pfsMedallero" + index).css("background-color", "#FCBA03");
            break;
        case 'BRONCE':
            $("#pfsMedallero" + index).css("background-color", "#CD7F32");
            break;
        case 'PLATA':
            $("#pfsMedallero" + index).css("background-color", "#C0C0C0");
            break;
        case 'REMEDIAL':
            $("#pfsMedallero" + index).css("background-color", "#FF6961");
            break;
        case '¡NP-EXC':
            $("#pfsMedallero" + index).css("background-color", "#B2A596");
            break;
        default:
    }
}

function getCondicion(index, imcJs) {
    var peri = parseInt($("#culFisPeriodo").val());
    $("#txtCondicionPFis" + index).css("background-color", "#FFF");
    $.ajax({
        data:
        {
            imc: imcJs,
            iPeriodo: peri
        },
        url: "/Batallon/GetCondicion",
        success: function (respuesta) {
            $("#txtCondicionPFis" + index).val(respuesta);
            setStyleByCondicion(respuesta, index);
            getTallaPeso(index);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar obtener Factor de Aptitud Naval",
                "Aceptar");
        }
    });
}

function getSemaforo(index, imcJs) {
    var peri = parseInt($("#culFisPeriodo").val());
    $("#pfsMedallero" + index).css("background-color", "#FFF");
    $.ajax({
        data:
        {
            nota: imcJs,
            iPeriodo: peri
        },
        url: "/Batallon/GetSemaforo",
        success: function (respuesta) {
            $("#pfsMedallero" + index).val(respuesta);
            setStyleByMedalla(respuesta, index);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar obtener Factor de Aptitud Naval",
                "Aceptar");
        }
    });
}

function getTallaPeso(index) {
    var peri = parseInt($("#culFisPeriodo").val());
    var pIdeal = parseFloat($("#txtIdealPFis" + index).val());
    var peso = parseFloat($("#txtPesoPFis" + index).val());
    $.ajax({
        data:
        {
            pesoIdeal: pIdeal,
            pesoActual: peso,
            iPeriodo: peri
        },
        url: "/Batallon/GetRelacionTallaPeso",
        success: function (respuesta) {
            $("#txtEnContraPFis" + index).val(parseFloat(respuesta));
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar obtener Factor de Aptitud Naval",
                "Aceptar");
        }
    });
}

function getBarrasNota(index) {
    var peri = parseInt($("#culFisPeriodo").val());
    var gen = $("#lblGeneroPFis").text();
    var bar = parseInt($("#txtBarrasPFis" + index).val());
    $.ajax({
        data:
        {
            barras: bar,
            gender: gen,
            iPeriodo: peri
        },
        url: "/Batallon/GetNotaBarras",
        success: function (respuesta) {
            $("#notaBarrasPFis" + index).val(parseFloat(respuesta));
            getPromedioCulturaFisica(index)
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar obtener Factor de Aptitud Naval",
                "Aceptar");
        }
    });
}

function getAbdominalesNota(index) {
    var peri = parseInt($("#culFisPeriodo").val());
    var gen = $("#lblGeneroPFis").text();
    var abs = parseInt($("#txtAbdominalesPFis" + index).val());
    $.ajax({
        data:
        {
            abdominales: abs,
            gender: gen,
            iPeriodo: peri
        },
        url: "/Batallon/GetNotaAbdominales",
        success: function (respuesta) {
            $("#notaAbdominalesPFis" + index).val(parseFloat(respuesta));
            getPromedioCulturaFisica(index)
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar obtener Factor de Aptitud Naval",
                "Aceptar");
        }
    });
}

function getFlexBrazoNota(index) {
    var peri = parseInt($("#culFisPeriodo").val());
    var gen = $("#lblGeneroPFis").text();
    var fbr = parseInt($("#txtFlexBrazoPFis" + index).val());
    $.ajax({
        data:
        {
            flexiones: fbr,
            gender: gen,
            iPeriodo: peri
        },
        url: "/Batallon/GetNotaFlexBrazo",
        success: function (respuesta) {
            $("#notaFlexBrazoPFis" + index).val(parseFloat(respuesta));
            getPromedioCulturaFisica(index)
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar obtener Factor de Aptitud Naval",
                "Aceptar");
        }
    });
}

function getInmStaticNota(index) {
    var peri = parseInt($("#culFisPeriodo").val());
    var gen = $("#lblGeneroPFis").text();
    var min = parseFloat($("#txtInmStaticPFis" + index).val());
    $.ajax({
        data:
        {
            minutos: min,
            gender: gen,
            iPeriodo: peri
        },
        url: "/Batallon/GetNotaInnStatica",
        success: function (respuesta) {
            $("#notaInmStaticaPFis" + index).val(parseFloat(respuesta));
            getPromedioCulturaFisica(index)
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar obtener Factor de Aptitud Naval",
                "Aceptar");
        }
    });
}

function getInmDinamicaNota(index) {
    var peri = parseInt($("#culFisPeriodo").val());
    var gen = $("#lblGeneroPFis").text();
    var mts = parseFloat($("#txtInmDinamicaPFis" + index).val());
    $.ajax({
        data:
        {
            metros: mts,
            gender: gen,
            iPeriodo: peri
        },
        url: "/Batallon/GetNotaInmDinamica",
        success: function (respuesta) {
            $("#notaInmDinamicaPFis" + index).val(parseFloat(respuesta));
            getPromedioCulturaFisica(index)
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar obtener Factor de Aptitud Naval",
                "Aceptar");
        }
    });
}

function getNatacionNota(index) {
    var peri = parseInt($("#culFisPeriodo").val());
    var gen = $("#lblGeneroPFis").text();
    var min = parseFloat($("#txtNatacionPFis" + index).val());
    $.ajax({
        data:
        {
            minutos: min,
            gender: gen,
            iPeriodo: peri
        },
        url: "/Batallon/GetNotaNatacion",
        success: function (respuesta) {
            $("#notaNatacionPFis" + index).val(parseFloat(respuesta));
            getPromedioCulturaFisica(index)
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar obtener Factor de Aptitud Naval",
                "Aceptar");
        }
    });
}

function getCarreraNota(index) {
    var peri = parseInt($("#culFisPeriodo").val());
    var gen = $("#lblGeneroPFis").text();
    var min = parseFloat($("#txtCarreraPFis" + index).val());
    $.ajax({
        data:
        {
            minutos: min,
            gender: gen,
            iPeriodo: peri
        },
        url: "/Batallon/GetNotaCarrera",
        success: function (respuesta) {
            $("#notaCarreraPFis" + index).val(parseFloat(respuesta));
            getPromedioCulturaFisica(index)
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar obtener Factor de Aptitud Naval",
                "Aceptar");
        }
    });
}

function getPromedioCulturaFisica(index) {
    var peri = parseInt($("#culFisPeriodo").val());
    var bar = 0;
    var abs = 0;
    var fbr = 0;
    var ist = 0;
    var idi = 0;
    var nat = 0;
    var car = 0;
    if (parseFloat($("#notaBarrasPFis" + index).val()) > 0) {
        bar = parseFloat($("#notaBarrasPFis" + index).val());
    }
    if (parseFloat($("#notaAbdominalesPFis" + index).val()) > 0) {
        abs = parseFloat($("#notaAbdominalesPFis" + index).val());
    }
    if (parseFloat($("#notaFlexBrazoPFis" + index).val()) > 0) {
        fbr = parseFloat($("#notaFlexBrazoPFis" + index).val());
    }

    if (parseFloat($("#notaInmStaticPFis" + index).val()) > 0) {
        ist = parseFloat($("#notaInmStaticPFis" + index).val());
    }

    if (parseFloat($("#notaInmDinamicaPFis" + index).val()) > 0) {
        idi = parseFloat($("#notaInmDinamicaPFis" + index).val());
    }

    if (parseFloat($("#notaNatacionPFis" + index).val()) > 0) {
        nat = parseFloat($("#notaNatacionPFis" + index).val());
    }

    if (parseFloat($("#notaCarreraPFis" + index).val()) > 0) {
        car = parseFloat($("#notaCarreraPFis" + index).val());
    }

    switch (peri) {
        case 1:
        case 2:
        case 11:

            var prom = (bar + abs + fbr + car) / 4;

            $("#txtPFisicaPFis" + index).val(parseFloat(prom).toFixed(2))

            break;
        default:
            var prom = (bar + abs + fbr + ist + idi + nat + car) / 7;

            $("#txtPFisicaPFis" + index).val(parseFloat(prom).toFixed(2));
            break;
    }

    getCulturaFisica(index);
}

function getCulturaFisica(index) {
    var pFis = parseFloat($("#txtPFisicaPFis" + index).val()) || 0.00;
    var pMin = parseFloat($("#txtEnContraPFis" + index).val()) || 0.00;
    var pMas = parseFloat($("#txtMedallasPFis" + index).val()) || 0.00;

    var pCFis = parseFloat(pFis + pMin + pMas);

    $("#txtCulturaFisPFis" + index).val(pCFis.toFixed(2));

    getSemaforo(index, pCFis);
}

function fnShowValidateField(txtSender, visible) {
    if (visible) {
        $(txtSender + "-error").show();
        $(txtSender + "-error").css("position", "absolute");
    } else {
        $(txtSender + "-error").remove();
    }
}

function fnValidatePruebaFisica(index) {
    var valid = 0;
    var valid2 = 0;
    var estat = $("#txtTallaPFis" + index).val();
    var peso = $("#txtPesoPFis" + index).val();

    if (estat === undefined || estat === 0 || estat === "") {
        fnShowValidateField("#txtTallaPFis" + index, true);
        valid = 0;
    } else {
        fnShowValidateField("#txtTallaPFis" + index, false);
        valid = 1;
    }

    if (peso === undefined || peso === 0 || peso === "") {
        fnShowValidateField("#txtPesoPFis" + index, true);
        valid2 = 0;
    } else {
        fnShowValidateField("#txtPesoPFis" + index, false);
        valid2 = 1;
    }

    return valid + valid2 === 2;
}

$(document).on('click', ".btnJustificarPruebaFisica", function () {
    LimpiarCamposSituacionMedica();
    var index = $(this).attr('id').replace('btnJustificarPruebaFisica', '');
    $("#justificacionPruebaFis" + index).val(1);
    $("#txtIndexPFis").val(index);
    $("#btnGuardarPruebaFisica" + index).click();
})

$(document).on('click', ".btnGuardarPruebaFisica", function () {
    event.preventDefault();
    var index = $(this).attr('id').replace('btnGuardarPruebaFisica', '');
    var frmPruebasFisicas = $('#frmPruebaFisica');

    $("#txtEvalIdPFis").val($("#hfEstudianteID").val());

    var oPrueba = new FormData(frmPruebasFisicas.get(0));
    var iPeriodo = $("#txtPerIdPFis").val();

    var isJusti = $("#justificacionPruebaFis" + index).val();
    var bFormValido = false;
    if (isJusti) {
        bFormValido = true;
    } else {
        bFormValido = fnValidatePruebaFisica(index);
    }

    if (bFormValido) {

        Swal.fire({
            title: 'FOLIO DE VIDA - CulturaFisica',
            text: "¿Desea Guardar la evaluación?, verifique no existan datos erroneos, una vez guardada no sera posible cambiar la evaluación",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                if (isJusti) {
                    $("#mdlSituacionMedica").modal('show');
                } else {
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

            } else {
                $("#justificacionPruebaFis" + index).val();
            }
        })
    }
})

function getInitFields() {

    var con0 = $("#txtCondicionPFis0").val();
    var con1 = $("#txtCondicionPFis1").val();
    var con2 = $("#txtCondicionPFis2").val();

    if (con0 !== '') {
        setStyleByCondicion(con0, 0);
    }
    if (con1 !== '') {
        setStyleByCondicion(con1, 1);
    }
    if (con2 !== '') {
        setStyleByCondicion(con2, 2);
    }

    var not0 = $("#pfsMedallero0").val();
    var not1 = $("#pfsMedallero1").val();
    var not2 = $("#pfsMedallero2").val();

    if (not0 !== '') {
        setStyleByMedalla(not0, 0);
    }
    if (not1 !== '') {
        setStyleByMedalla(not1, 1);
    }
    if (not2 !== '') {
        setStyleByMedalla(not2, 2);
    }
}
