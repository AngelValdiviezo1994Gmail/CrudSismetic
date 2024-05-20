var semestre = 0;
$(document).ready(function () {
    $('#ProId').change(function () {
        CargarPeriodos(this);
    });

    $("#cboMaterias").change(function () {
        ConsultarDatosAsignatura(this);
    });

    $('.editselect').change(function () {
        ActivarEditAsignatura(this);
    });

    $("#btnAgregaAsignatura").click(function () {
        AgregaAsignaturaPeriodo();
    });
});
//Carga de Combos en cascada
function CargarPeriodos(p) {
    //event.preventDefault();
    $.ajax({
        data: {
            ProId: parseInt($(p).val())
        },
        url: "/Programa/GetProgramaById",
        success: function (respuesta) {
            if (respuesta != null) {
                $("#ProPeriodos").val(respuesta.proDuracion);
                ConfigurarPeriodos()
            }
            else {
                MensajeGeneral("error",
                    "ERROR CARGA DE ASIGNATURAS",
                    "Se presento un error al intentar cargar as asignaturas de los períodos",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR CARGA DE ASIGNATURAS",
                "Se presento un error al intentar cargar as asignaturas de los períodos",
                "Aceptar");
        }

    });
}

function ConfigurarPeriodos() {
    let divperiodos = $("#asignaturasPartialDiv");
    divperiodos.html("");
    let periodos = $("#ProPeriodos").val();
    let vplanId = $("#PlanId").val();
    let planId = (vplanId === "" || vplanId === undefined) ? "0" : vplanId;
    if (periodos === "") return;
    event.preventDefault();
    $.ajax({
        data: {
            periodos: parseInt(periodos),
            planid: parseInt(planId),

        },
        url: "/PlanDeEstudios/CargarPeriodosPrograma",
        success: function (respuesta) {
            if (respuesta != null) {
                divperiodos.html(respuesta);
            }
            else {
                MensajeGeneral("error",
                    "ERROR CARGA DE PERIODOS",
                    "Se presento un error al intentar cargar la información de los períodos",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR CARGA DE PERIODOS",
                "Se presento un error al intentar cargar la información de los períodos",
                "Aceptar");
        }
    });
}

function ActivarEditAsignatura(p) {
    let asigId = $(p).val();
    let slink = '';
    let disabled = 'return false;';
    if (asigId != '0') {
        slink = '/Asignatura/Edit/' + asigId;
        disabled = '';
    }
    let olink = $(p).parent().parent().next();

    $(olink).attr('href', slink);
    $(olink).attr('target', '_blank');
    $(olink).attr('onclick', disabled);

}

function MostrarAsignaturas(e) {
    semestre = e;
    $("#opModalAsigSemestrePlan").val('add');
    LimpiarControlesModalAsignaturas();//agregado csq
    CargaAsignaturasSinPlan();
    $("#materiamodal").modal("show");
}

function CargaAsignaturasSinPlan() {
    event.preventDefault();
    $.ajax({
        data: {
            planid: parseInt($("#PlanId").val())
        },
        url: "/PlanDeEstudios/ConsultarAsignaturasSinPlan",
        success: function (respuesta) {
            if (respuesta != null) {
                $("#cboMaterias").empty().append('<option value=""></option>');
                $(respuesta.data).each(function () {
                    $("#cboMaterias").append('<option " value="' + this.asigId + '">' + this.asigCod + ' ' + this.asigNombre + '</option>');
                });
                $("#cboMaterias").selectpicker('refresh');
            }
            else {
                MensajeGeneral("error",
                    "ERROR CARGA DE ASIGNATURAS",
                    "Se presento un error al intentar cargar las asignaturas",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR CARGA DE ASIGNATURAS",
                "Se presento un error al intentar cargar las asignaturas",
                "Aceptar");
        }
    });
}

function ConsultarDatosAsignatura(p) {
    //event.preventDefault();
    $.ajax({
        data: {
            AsigId: parseInt($(p).val())
        },
        url: "/Asignatura/GetAsignaturaById",
        success: function (respuesta) {
            if (respuesta != null) {
                //$("#ProPeriodos").val(respuesta.proDuracion);
                MostrarDatosAsignatura(respuesta);
            }
            else {
                MensajeGeneral("error",
                    "ERROR CARGA DE ASIGNATURAS",
                    "Se presento un error al intentar cargar los datos de la asignatura",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR CARGA DE ASIGNATURAS",
                "Se presento un error al intentar cargar los datos de la asignatura",
                "Aceptar");
        }

    });
}

function MostrarDatosAsignatura(asignatura) {

    //asignatura.AsigId = $("#cboMaterias").val();
    //asignatura.SemestreId = objPeriodo;

    //$("#PlanId").val(asignatura.PlanId);
    //$("#ProId").val(asignatura.ProId);
    $("#AsigCreditos").val(asignatura.asigCreditos);
    $("#AsigNumSemanas").val(asignatura.asigNumSemanas);
    $("#AsigHorTrabTeor").val(asignatura.asigHorTrabTeor);
    $("#AsigHorTrabPrac").val(asignatura.asigHorTrabPrac);
    $("#AsigHorTrabInvest").val(asignatura.asigHorTrabInvest);
    $("#AsigTotHorAsignatura").val(asignatura.asigTotHorAsignatura);
    //$("#CarAsigId").val(asignatura.carAsigId);
    $("#AsigHabilitable").prop("checked", asignatura.asigHabilitable);
    $("#AsigNivelable").prop("checked", asignatura.asigNivelable);
    $("#AsigRotacion").prop("checked", asignatura.asigRotacion);

    $("#CarAsigId1").prop("checked", asignatura.carAsigId == 1);
    $("#CarAsigId2").prop("checked", asignatura.carAsigId != 1);

  
    //asignatura.AsigSemPlanHabilitable = AsigHabilitable === null || AsigHabilitable === undefined || AsigHabilitable === '' ? false : AsigHabilitable;
    //asignatura.AsigSemPlanNivelable = AsigNivelable === null || AsigNivelable === undefined || AsigNivelable === '' ? false : AsigNivelable;
    //asignatura.AsigSemPlanRotacion = AsigRotacion === null || AsigRotacion === undefined || AsigRotacion === '' ? false : AsigRotacion;

    $("#AsigPrimerParcial").val(asignatura.asigPrimerParcial);
    $("#AsigSegundoParcial").val(asignatura.asigSegundoParcial);
    $("#AsigTercerParcial").val(asignatura.asigTercerParcial);
    $("#AsigCuartoParcial").val(asignatura.asigCuartoParcial);
    //$("#AsigTotPorcentaje").val(asignatura.asigTotPorcentaje);
    if (asignatura.carAsigId == 1) {
        tooglepanels(true);
        calculaTotalPorcentajes();
    }
}

function MostrarAsignatSemestrePlan(itemId, semestre) {

    let body = $("#bodycontentmat");
    body.html('');
    $.ajax({
        data:
        {
            planid: parseInt($("#PlanId").val()),
            asigid: parseInt(itemId),
            semestreid: parseInt(semestre)
        },
        url: "/PlanDeEstudios/ObtenerAsignatSemestrePlan",
        dataType: 'html',
        success: function (respuesta) {
            if (respuesta !== null) {
                body.html(respuesta);
                $("#materiamodal").modal("show");
                EventosEditModalAsignaturasSemestrePlan();

            }
            else {
                MensajeGeneral('warning', 'Aviso de sistema', 'No se encontro informacion para visualizar', 'Aceptar');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "EDITAR ASIGNATURA", "Se presento un error en la visualizacion de la informacion de la asignatura.", "Aceptar");
        }
    });

}

function AgregaAsignaturaPeriodo() {
    let idAsignatura = $("#cboMaterias").val()
    if (idAsignatura == "" || idAsignatura == undefined) {
        MensajeGeneral("error",
            "SELECCION DE ASIGNATURA",
            "Debe seleccionar una asignatura",
            "Aceptar");
    } else {
        let opcionModal = $("#opModalAsigSemestrePlan").val();
        if (opcionModal === "edit") {
            EditaAsignaturaPeriodo(parseInt($("#hddperiodo").val()));
        } else {
            GuardaAsignaturaPeriodo(semestre);
        }
    }
}

function EditaAsignaturaPeriodo(objPeriodo) {
    event.preventDefault();
    var frmMateria = $('#frmMateria');
    var bFormValido = frmMateria.valid();
    if (!bFormValido) {
        return false
    }

    let vasignatura = CargarDatosAsignatura(objPeriodo)
    event.preventDefault();
    $.ajax({
        type: "POST",
        data: {
            asignatura: vasignatura,
        },
        url: "/PlanDeEstudios/EditarMateriaSemestre",
        success: function (respuesta) {

            if (respuesta != null && respuesta.succeeded === true) {
                MensajeGeneral("success",
                    "EDITAR ASIGNATURA SEMESTRE PLAN",
                    "Actualización exitosa de la asignatura semestre plan.",
                    "Aceptar");

            } else {
                MensajeGeneral("error",
                    "ERROR EDITAR ASIGNATURA SEMESTRE PLAN",
                    respuesta.error,
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR EDITAR ASIGNATURA SEMESTRE PLAN",
                "Se presento un error al intentar editar la asignatura semestre plan",
                "Aceptar");
        }
    });

    $("#materiamodal").modal("hide");
}

function GuardaAsignaturaPeriodo(objPeriodo) {
    event.preventDefault();
    var frmMateria = $('#frmMateria');
    var bFormValido = frmMateria.valid();
    if (!bFormValido) {
        return false
    }

    //let idAsignatura = $("#cboMaterias").val();
    //let idPlan = parseInt($("#PlanId").val());
    //let idPro = parseInt($("#ProId").val());
    let vasignatura = CargarDatosAsignatura(objPeriodo)
    event.preventDefault();
    $.ajax({
        type: "POST",
        data: {
            //planid: idPlan,
            //asigid : idAsignatura,
            //semestreid: semestre,
            //proid: idPro,
            asignatura: vasignatura,
        },
        url: "/PlanDeEstudios/AgregarMateriaSemestre",
        success: function (respuesta) {
            if (respuesta != null) {
                if (!respuesta.includes("error")) {
                    $("#tablePeriodo" + semestre + " tbody").append(respuesta);
                    semestre = 0;
                }
                else {
                    MensajeGeneral("error",
                        "ERROR GRABAR ASIGNATURAS",
                        respuesta,
                        "Aceptar");
                }
            }
            else {
                MensajeGeneral("error",
                    "ERROR GRABAR ASIGNATURAS",
                    "Se presento un error al intentar grabar la asignatura",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR CARGA DE ASIGNATURAS",
                "Se presento un error al intentar cargar las asignaturas",
                "Aceptar");
        }
    });

    $("#materiamodal").modal("hide");
}

function ConfirmarEliminarItem(idItem) {
    var TipoMensaje = "question"
        , Titulo = "¿Quieres eliminar la asignatura?"
        , Mensaje = "La Asignatura será eliminada de del plan de Estudios"
        , TextBotonConfirmar = "Confirmar"
        , TextBotonCancelar = "Cancelar"
        , FuncionDestino = "QuitarMateria(" + idItem + ")"

    MensajeConfirmacion(TipoMensaje, Titulo, Mensaje, TextBotonConfirmar, TextBotonCancelar, FuncionDestino);
}

function QuitarMateria(asigid) {
    let idAsignatura = asigid;
    let idPlan = parseInt($("#PlanId").val());
    event.preventDefault();
    $.ajax({
        type: "POST",
        data: {
            planid: parseInt($("#PlanId").val()),
            asigid: idAsignatura,
            semestreid: semestre
        },
        url: "/PlanDeEstudios/EliminarMateriaSemestre",
        success: function (respuesta) {
            if (respuesta == 'ok') {
                document.getElementById("Asignatura_" + idAsignatura).remove();
                // $("#tablePeriodo" + semestre + " tbody").append(respuesta);
                //eliminar la fila
            }
            else {
                MensajeGeneral("error",
                    "ERROR ELIMINAR ASIGNATURAS DE PLAN DE ESTUDIO",
                    "Se presento un error al intentar suprimir la asignatura",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR ELIMINAR DE ASIGNATURAS DE PLAN DE ESTUDIO",
                "Se presento un error al intentar suprimir la asignatura",
                "Aceptar");
        }
    });

    semestre = 0;
    $("#materiamodal").modal("hide");
}

function CargarDatosAsignatura(objPeriodo) {
    let asignatura = {};

    asignatura.AsigId = $("#cboMaterias").val();
    asignatura.SemestreId = objPeriodo;
    asignatura.PlanId = parseInt($("#PlanId").val());
    asignatura.ProId = parseInt($("#ProId").val());

    asignatura.AsigSemPlanCreditos = $("#AsigCreditos").val();
    asignatura.AsigSemPlanNumSemanas = $("#AsigNumSemanas").val();
    asignatura.AsigSemPlanHorTrabTeor = $("#AsigHorTrabTeor").val();
    asignatura.AsigSemPlanHorTrabPrac = $("#AsigHorTrabPrac").val();
    asignatura.AsigSemPlanHorTrabInvest = $("#AsigHorTrabInvest").val();
    asignatura.AsigSemPlanTotHorAsignatura = $("#AsigTotHorAsignatura").val();

    asignatura.CarAsigId = $("#CarAsigId").val();

    let AsigHabilitable = $('input:checkbox[name=AsigHabilitable]:checked').val();
    let AsigNivelable = $('input:checkbox[name=AsigNivelable]:checked').val();
    let AsigRotacion = $('input:checkbox[name=AsigRotacion]:checked').val();

    asignatura.AsigSemPlanHabilitable = AsigHabilitable === null || AsigHabilitable === undefined || AsigHabilitable === '' ? false : AsigHabilitable;
    asignatura.AsigSemPlanNivelable = AsigNivelable === null || AsigNivelable === undefined || AsigNivelable === '' ? false : AsigNivelable;
    asignatura.AsigSemPlanRotacion = AsigRotacion === null || AsigRotacion === undefined || AsigRotacion === '' ? false : AsigRotacion;

    asignatura.AsigSemPlanPrimerParcial = $("#AsigPrimerParcial").val();
    asignatura.AsigSemPlanSegundoParcial = $("#AsigSegundoParcial").val();
    asignatura.AsigSemPlanTercerParcial = $("#AsigTercerParcial").val();
    asignatura.AsigSemPlanCuartoParcial = $("#AsigCuartoParcial").val();
    asignatura.AsigTotPorcentaje = $("#AsigTotPorcentaje").val();

    return asignatura;
}

function LimpiarControlesModalAsignaturas() {
    $("#cboMaterias").val('-1');
    $("#AsigCreditos").val('');
    $("#AsigNumSemanas").val('');
    $("#AsigHorTrabTeor").val('');
    $("#AsigHorTrabPrac").val('');
    $("#AsigHorTrabInvest").val('');
    $("#AsigTotHorAsignatura").val('');

    $("#CarAsigId1").prop("checked", false);
    $("#CarAsigId2").prop("checked", true);
    //$("#CarAsigId1").attr('checked', false);
    //$("#CarAsigId2").attr('checked', true);

    $('input[name="AsigHabilitable"]').prop('checked', false);
    $('input[name="AsigNivelable"]').prop('checked', false);
    $('input[name="AsigRotacion"]').prop('checked', false);
    tooglepanels(false);

    $("#AsigPrimerParcial").val('');
    $("#AsigSegundoParcial").val('');
    $("#AsigTercerParcial").val('');
    $("#AsigCuartoParcial").val('');
    $("#AsigTotPorcentaje").val('');

}

function EventosEditModalAsignaturasSemestrePlan() {

    let AsigPrimerParcial = $("#AsigPrimerParcial").val();
    let vAsigPrimerParcial = AsigPrimerParcial === null || AsigPrimerParcial === undefined || AsigPrimerParcial === '' ? 0 : parseInt(AsigPrimerParcial);

    if (vAsigPrimerParcial > 0) {
        $("#CarAsigId1").attr('checked', true);
    } else {
        $("#CarAsigId2").attr('checked', true);
    }
    $("#cboMaterias").change(function () {
        ConsultarDatosAsignatura(this);
    });
    iniciapanelesEdit();
    calculaTotalPorcentajes();
}

function fnOcultarModalAsigSemestrePlan() {
    $("#materiamodal").modal("hide");
}
