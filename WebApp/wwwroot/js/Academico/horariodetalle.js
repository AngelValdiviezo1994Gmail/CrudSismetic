let listahoras = [];
let detalleEventos;
let calendar;
$(document).ready(function () {
    CargarAsignaturas();
    cargarElementosIni();
    $('#AsigId').on('change', function () {
        CargarColorAsignatura(this);
    });

    $("#btnAgregar").click(function () {
        $("#horariomodal").modal("toggle");
    });

    $("td").click(function () {
        var celda = $(this).attr('class');
        var valor = $(this).text();
        if (valor == null || valor == undefined || valor == "") return;
        if (celda == null || celda == undefined || celda == "") return;
        if (celda.includes("clase_") == false) return;
        ConfirmarEliminarHora(celda);
    });
});

function ValidaGrabadoAsignatura() {
    let cmbAsig = $('#AsigId').val(); 
    if (cmbAsig === null || cmbAsig === undefined || cmbAsig === '') {
        MensajeGeneral("warning",
            "ASIGNACIÓN - MATERIA",
            "Por favor seleccione una Asignatura.",
            "Aceptar");
    } else {
         agregarelemento();
        
    }
}



function fnOcultarModal(idMoal) {
    $("#" + idMoal).modal("hide");
}

function CargarAsignaturas() {
    $("#AsigId").empty().append('<option value=""></option>');
    $("#AsigId").selectpicker('refresh');
    let curAcadId = $("#CurAcadId").val();
    if (isNaN(curAcadId) || curAcadId == "") return;
    $.ajax({
        data: {
            CurAcadId: parseInt(curAcadId),
        },
        url: "/MateriaCurso/GetMateriasPorCurso",
        success: function (respuesta) {
            if (respuesta != null) {
                $("#AsigId").empty().append('<option value=""></option>');

                $(respuesta).each(function () {
                    $("#AsigId").append('<option color="' + this.asigColor + '" value="' + this.asigId + '">' + this.asigNombre + '</option>');
                });
                $("#AsigId").selectpicker('refresh');
                //$("#AsigId").val(calId);
                $("#AsigId").trigger('change');
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

function CargarColorAsignatura() {
    $("#AsigColor").val("");
    $("#AsigColor").asColorPicker('val', "");
    var element = $("#AsigId").find('option:selected');
    let vcolor = element.attr("color");
    $("#AsigColor").asColorPicker('val', vcolor);
    $("#AsigColor").asColorPicker('disable');
}


function agregarelemento() {
    elemento = {};
    let i = listahoras.length;
    elemento.dia = $("#DiaHorario").val();
    elemento.asigid = $("#AsigId").val();
    elemento.start = $("#HorarioIni option:selected").text();
    elemento.canthoras = $("#CantHoras").val();
    elemento.id = i;
    listahoras.push(elemento);
    grabarElementoEnBase(elemento);
    $("#horariomodal").modal("toggle");
}



function grabarElementoEnBase(elemento) {
    horariodetallevm = {};
    horariodetallevm.HorSemId = $("#HorSemId").val();
    horariodetallevm.HorarioDetDia = elemento.dia;
    horariodetallevm.AsigId = elemento.asigid;
    horariodetallevm.start = elemento.start;
    horariodetallevm.cantHoras = elemento.canthoras;
    $.ajax({
        type: "POST",
        data: {
            horariodetallevm: horariodetallevm,
        },
        url: "/Horario/GrabaHorarioDetalle",
        success: function (respuesta) {

            if (respuesta.ok == "ok") {
               
                CargarEventos(respuesta.horarioEventViewDetalle);

            } else if (respuesta.errorCode == "100" || respuesta.errorCode == "900" || respuesta.errorCode == "901" || respuesta.errorCode == "903") {
                MensajeGeneral("error",
                    "ERROR ASIGNAR MATERIA",
                    respuesta.error,
                    "Aceptar");
            } else if (respuesta.errorCode == "902") {
              
                ConfirmarAsigMateriaDocente(respuesta.error);
            }
            else
            {
                MensajeGeneral("error",
                    "ERROR ASIGNAR MATERIA",
                     "Se presento un error al intentar asignar la materia.",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR ASIGNAR MATERIA",
                "Se presento un error al intentar asignar la materia.",
                "Aceptar");
        },
    });
}

function CargarEventos(detalleEventos)
{
    //Primero se limpian todos los elementos de la tabla
    $("td:not('.celltitle')").text("").css('background', 'rgb(255,255,255)');
    $.each(detalleEventos, function (index, element) {
        var celda = element.start.replace(":", "");
        $("td." + celda).text(element.title).css('background', element.color).css('color', 'rgb(255,255,255)');

    });
}

function cargarElementosIni()
{
    vhorsemanaid = $("#HorSemId").val();
    $.ajax({
        data: {
            horsemanaid: vhorsemanaid,
        },
        url: "/Horario/GetHorarioDetalle",
        success: function (respuesta) {
            CargarEventos(respuesta.horarioEventViewDetalle);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR AL GRABAR EL DETALLE DEL HORARIO",
                "Se presento un error al intentar grabar el detalle del horario",
                "Aceptar");
        },

    });
     //.done(function () {
    //    //var opcion = $("#idOpcionSelected").val();
    //    //$("#TipoDistHorario").val(opcion)
    //    //$("#TipoDistHorario").selectpicker('refresh');
    //    //if (opcion == "3") generaHorarioAutomatico();
    //});

}


function ConfirmarEliminarHora(idItem) {
    var TipoMensaje = "question"
        , Titulo = "¿Quieres eliminar el item?"
        , Mensaje = "El item será eliminado de forma permanente y no podras recuperar su información"
        , TextBotonConfirmar = "Confirmar"
        , TextBotonCancelar = "Cancelar"
        , FuncionDestino = "DeleteHora('" + idItem + "')"

    MensajeConfirmacion(TipoMensaje, Titulo, Mensaje, TextBotonConfirmar, TextBotonCancelar, FuncionDestino);
}

function DeleteHora(id) {
    horariodetallevm = {};
    horariodetallevm.HorSemId = $("#HorSemId").val();
    horariodetallevm.start = id;
    $.ajax({
        type: "POST",
        data: {
            horariodetallevm: horariodetallevm,
        },
        url: GetURL() + "Horario/EliminarHorarioDetalle",

        success: function (respuesta) {
            MensajeGeneral(respuesta.tipoMensaje, respuesta.titulo, respuesta.mensaje, respuesta.botonAceptar, GetURL() + "Horario/HorarioDetalle/" + horariodetallevm.HorSemId);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR CONFIRMACIÓN ELIMINAR DETALLE HORARIO", "Se presento un error en el consumo del método de eliminación de Horario", "Aceptar");
        }
    });
}


function ConfirmarAsigMateriaDocente(msnRetorno) {
    var TipoMensaje = "question"
        , Titulo = "¿Deseas continuar con la asignación?"
        , Mensaje = msnRetorno
        , TextBotonConfirmar = "Confirmar"
        , TextBotonCancelar = "Cancelar"
        , FuncionDestino = "grabarElementoEnBaseReenvio()"

    MensajeConfirmacion(TipoMensaje, Titulo, Mensaje, TextBotonConfirmar, TextBotonCancelar, FuncionDestino);
}

function grabarElementoEnBaseReenvio() {
    horadetvm = {};
    horadetvm.HorSemId = $("#HorSemId").val();
    horadetvm.HorarioDetDia = $("#DiaHorario").val();
    horadetvm.AsigId = $("#AsigId").val();
    horadetvm.start = $("#HorarioIni option:selected").text();
    horadetvm.cantHoras = $("#CantHoras").val();
    horadetvm.forzadoAsignacion = true;

    $.ajax({
        type: "POST",
        data: {
            horariodetallevm: horadetvm,
        },
        url: "/Horario/GrabaHorarioDetalle",
        success: function (respuesta) {

            if (respuesta.ok == "ok") {
                CargarEventos(respuesta.horarioEventViewDetalle);

            } else if (respuesta.errorCode == "100" || respuesta.errorCode == "900" || respuesta.errorCode == "901" || respuesta.errorCode == "903") {
                MensajeGeneral("error",
                    "ERROR ASIGNAR MATERIA",
                    respuesta.error,
                    "Aceptar");
            } else if (respuesta.errorCode == "902") {
                ConfirmarAsigMateriaDocente(respuesta.error);
            }
            else {
                MensajeGeneral("error",
                    "ERROR ASIGNAR MATERIA",
                    "Se presento un error al intentar asignar la materia.",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR ASIGNAR MATERIA",
                "Se presento un error al intentar asignar la materia.",
                "Aceptar");
        },
    });
}