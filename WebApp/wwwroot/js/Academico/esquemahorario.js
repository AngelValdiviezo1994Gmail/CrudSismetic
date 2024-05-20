$(document).ready(function () {
    $("#horaInicio").datetimepicker({
        format: 'HH:mm',
        ignoreReadonly: true,
    });

    //$("#horaFin").datetimepicker({
    //    format: 'HH:mm',
    //    ignoreReadonly: true,
    //});
;

    $("#horaInicio").on('dp.change', function (e) {
        agregaminutos();
    })

    $("#btnAgregaHora").click(function () {
        AgregaHoraEsquema();
    });
});

function MostrarModalHoras() {
    LimpiarDatos();
    $("#horamodal").modal("show");
}

function LimpiarDatos() {
    $("#horaInicio").val();
    $("#horaFin").val();
}

function agregaminutos() {
    let horaIni = $("#horaInicio").val();
    let minutos = $("#EsquemaMinutosXhora").val();
    let horaFin = moment.utc(horaIni, "HH:mm").add(minutos, "minutes").format("HH:mm");
    $("#horaFin").val(horaFin);

}

function AgregaHoraEsquema() {
    let HoraInicio = $("#horaInicio").val()
    let HoraFin = $("#horaFin").val()
    if (HoraInicio == "" || HoraInicio == undefined) {
        MensajeGeneral("error",
            "REGISTRO DE HORAS",
            "Debe ingresar una hora de inicio",
            "Aceptar");
    }
    else if (HoraFin == "" || HoraFin == undefined) {
        MensajeGeneral("error",
            "REGISTRO DE HORAS",
            "Debe ingresar una hora final",
            "Aceptar");
    }
    else {
        GuardaHoraEsquema();
    }
}

function getDataGridInstance(idGridview) {
    let element = document.getElementById(idGridview);
    return DevExpress.ui.dxDataGrid.getInstance(element);
}

function GuardaHoraEsquema() {
    var frmTime = $('#frmTime');
    var bFormValido = frmTime.valid();
    if (!bFormValido) {
        return false
    }

    let HoraInicio = $("#horaInicio").val();
    let HoraFin = $("#horaFin").val();
    let idEsquema = parseInt($("#EsquemaId").val());
    event.preventDefault();
    $.ajax({
        type: "POST",
        data: {
            esquemaid: idEsquema,
            horainicio: HoraInicio,
            horafin: HoraFin,
        },
        url: "/EsquemaHorario/AgregarHora",
        success: function (respuesta) {
            if (respuesta != null) {
                if (!respuesta.includes("error")) {
                    //$("#tbRegistros tbody").append(respuesta);
                    getDataGridInstance("gridEsquemaHoras").refresh();
                    semestre = 0;
                }
                else {
                    MensajeGeneral("error",
                        "ERROR GRABAR HORAS DE ESQUEMA",
                        respuesta,
                        "Aceptar");
                }
            }
            else {
                MensajeGeneral("error",
                    "ERROR GRABAR HORAS DE ESQUEMA",
                    "Se presento un error al intentar grabar las horas del esquema",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR CARGA DE HORAS DE ESQUEMA",
                "Se presento un error al intentar cargar las horas del esquema",
                "Aceptar");
        }
    });

    $("#horamodal").modal("hide");
}


function ConfirmarEliminarItem(idItem) {
    var TipoMensaje = "question"
        , Titulo = "¿Quieres eliminar la hora?"
        , Mensaje = "La hora será eliminada de del esquema"
        , TextBotonConfirmar = "Confirmar"
        , TextBotonCancelar = "Cancelar"
        , FuncionDestino = "QuitarHora(" + idItem + ")"

    MensajeConfirmacion(TipoMensaje, Titulo, Mensaje, TextBotonConfirmar, TextBotonCancelar, FuncionDestino);
}

function QuitarHora(horaid) {
    event.preventDefault();
    $.ajax({
        type: "POST",
        data: {
            horaesquemaid: horaid,
        },
        url: "/EsquemaHorario/EliminarHora",
        success: function (respuesta) {
            MensajeGeneral(respuesta.tipoMensaje, respuesta.titulo, respuesta.mensaje, respuesta.botonAceptar);
            getDataGridInstance("gridEsquemaHoras").refresh();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR ELIMINAR DE HORAS DEL ESQUEMA",
                "Se presento un error al intentar suprimir la hora",
                "Aceptar");
        }
    });

    semestre = 0;
    $("#horamodal").modal("hide");
}




