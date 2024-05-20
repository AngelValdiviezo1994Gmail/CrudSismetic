$(document).ready(function () {
    CargaProgramasInicial();
    CargarDatosCalendarioInicial();
    $('#CalId').on('change', function () {
        CargarDatosCalendario();
        CargarProgramas(this);
    });

    $('#btnIngresar').on('click', function () {
        ValidaGrabadoHorarioSemana();
    });

    $('#ProId').on('change', function () {
        CargarCursos();        
    });
    
});


function GuardarHorarioSemana(_objData) {
   
    $.ajax({
        type: "POST",
        data: {
            horsemanavm: _objData,
        },
        url: "/Horario/GrabarHorarioSemana",
        success: function (respuesta) {
            if (respuesta.succeeded == true)
            {
                fnOcultarModal('horarioSemanaModal');
                MensajeGeneral("success",
                    "GRABAR HORARIO SEMANA",
                    respuesta.error,
                    "Aceptar",
                    GetURL() + "Horario/HorarioDetalle/" + respuesta.data.horSemId
                    );
            } else
            {
                MensajeGeneral("error",
                    "ERROR AL GRABAR HORARIO SEMANA",
                    respuesta.error,
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR AL GRABAR HORARIO SEMANA",
                "Se presento un error al intentar grabar la semana del Horario Academico",
                "Aceptar");
        },
    });
}

function ValidaGrabadoHorarioSemana() {
    _horariosemana = {};

    let txDescrip = $('#txDescrip').val();
    let IniSemDesdeInnen = $('#IniSemDesdeInnen').val();
    let FinSemHastaInnen = $('#FinSemHastaInnen').val();

    if (txDescrip === null || txDescrip === undefined || txDescrip === '' ||
        IniSemDesdeInnen === null || IniSemDesdeInnen === undefined || IniSemDesdeInnen === ''
        ||
        FinSemHastaInnen === null || FinSemHastaInnen === undefined || FinSemHastaInnen === ''
    ) {
        MensajeGeneral("warning",
            "CREAR HORARIO SEMANA",
            "Por favor ingrese todos los campos para el guardado de la información.",
            "Aceptar");
    } else {

        _horariosemana.HorarioId = $("#horarioid").val();
        _horariosemana.HorSemDescripcion = txDescrip;
        _horariosemana.HorSemFechaDesdeAux = IniSemDesdeInnen;
        _horariosemana.HorSemFechaHastaAux = FinSemHastaInnen;
        GuardarHorarioSemana(_horariosemana);
    }
}

function fnOcultarModal(idMoal) {
    $("#" + idMoal).modal("hide");
}

function CrearHorario() {

    event.preventDefault();
    var frmHorario = $('#frmHorario');
    var bFormValido = frmHorario.valid();
    if (!bFormValido) {
        return false
    }

    $("#frmHorario").submit();
}


function getDataGridInstance(idGridview) {
    let element = document.getElementById(idGridview);
    return DevExpress.ui.dxDataGrid.getInstance(element);
}

function selectedDesdeDate_changed(data) {
    $("#IniSemDesdeInnen").val(data.value);
}

function selectedHastaDate_changed(data) {
    $("#FinSemHastaInnen").val(data.value);
}

function MostrarHorarioSemanaModal() {
    $("#horarioSemanaModal").modal("show");
}

function CargarDatosCalendarioInicial() {
    var vCalId = $("#CalId").val();
    var vHorario = $("#HorarioAnio").val();
    var vHorarioPeriodo = $("#HorarioPeriodo").val();
    if (vCalId !== '' && vHorario == '' && vHorarioPeriodo == '') CargarDatosCalendario();
}

function CargarDatosCalendario() {

    $("#HorarioAnio").val('');
    $("#HorarioPeriodo").val('');
    var vCalId = $("#CalId").val();
    var result = lstCalendario.find(obj => {
        var intCalId = parseInt(vCalId);
        return obj.calId === intCalId
    });

    if (result != null) {
        $("#HorarioAnio").val(result.calAnio);
        $("#HorarioPeriodo").val(result.calPeriodo);
    }
}


/*
 *Manejo de los combos
 */
function CargaProgramasInicial() {
    var calId = $("#CalId");
    var id = $(calId).val();
    if (id !== '') CargarProgramas(calId);
}


function CargarProgramas(p) {
    //Capturo el valor del programa previo para ver si lo puedo reponer
    let proId = $("#ProId").val();
    //event.preventDefault();
    $.ajax({
        data: {
            CalId: parseInt($(p).val())
        },
        url: "/Programa/GetProgramasByCalendario",
        success: function (respuesta) {
            if (respuesta != null) {
                $("#ProId").empty().append('<option value=""></option>');

                $(respuesta).each(function () {
                    $("#ProId").append('<option " value="' + this.proId + '">' + this.proNombre + '</option>');
                });
                $("#ProId").selectpicker('refresh');
                $("#ProId").val(proId);
                $("#ProId").trigger('change');

            }
            else {
                MensajeGeneral("error",
                    "ERROR CARGA DE PROGRAMAS",
                    "Se presento un error al intentar cargar los programas",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR CARGA DE PROGRAMAS",
                "Se presento un error al intentar cargar los programas",
                "Aceptar");
        }
    });
}

function CargarCursos() {
    var curId = $("#CurAcadId").val();
    $("#CurAcadId").empty().append('<option value=""></option>');
    $("#CurAcadId").selectpicker('refresh');
    let calId = $("#CalId").val();
    let proId = $("#ProId").val();
    if (isNaN(proId) || proId == "") return;
    $.ajax({
        data: {
            CalId: parseInt(calId),
            ProId: parseInt(proId),
        },
        url: "/ProgramacionAcademica/GetCursosPorProgramaCalendario",
        success: function (respuesta) {
            if (respuesta != null) {
                $("#CurAcadId").empty().append('<option value=""></option>');

                $(respuesta).each(function () {
                    $("#CurAcadId").append('<option " value="' + this.curAcadId + '">' + this.curAcadNombre + '</option>');
                });
                $("#CurAcadId").selectpicker('refresh');
                $("#CurAcadId").val(curId);
                $("#CurAcadId").trigger('change');
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
