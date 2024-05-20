$(document).ready(function () {
    CargaCursosInicialPorHabilitacion();

    $('#CalId').on('change', function () {
        CargaCursosInicialPorHabilitacion();
    });
    
    $('#CurAcadIdOrigen').on('change', function () {
        let curso = $(this).val()
        CargarCursosSiguientesXHabilitacion();
        CargarEstudiantesXHabilitacion(curso);
    });

});

function getDataGridInstance(idGridview) {
    let element = document.getElementById(idGridview);
    return DevExpress.ui.dxDataGrid.getInstance(element);
}

function CargaCursosInicialPorHabilitacion() {
    let calIdHab = $("#CalIdHab").val();
    let curAcadId = $("#CurAcadIdOrigen").val();
    $.ajax({
        data: {
            CalId: calIdHab,
        },
        url: "/CierreAcademicoPorHabilitacion/GetCursosEnHabilitacionPorCalendario",
        success: function (respuesta) {
            if (respuesta != null) {
                $("#CurAcadIdOrigen").empty().append('<option value=""></option>');

                $(respuesta).each(function () {
                    $("#CurAcadIdOrigen").append('<option " value="' + this.curAcadId + '">' + this.curAcadNombre + '</option>');
                });
                $("#CurAcadIdOrigen").selectpicker('refresh');
                $("#CurAcadIdOrigen").val(curAcadId);
                $("#CurAcadIdOrigen").trigger('change');

            }
            else {
                MensajeGeneral("error",
                    "ERROR CARGA DE CURSOS DEL CALENDARIO",
                    "Se presento un error al intentar cargar los cursos del calendario",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR CARGA DE CURSOS DEL CALENDARIO",
                "Se presento un error al intentar cargar los cursos del calendario",
                "Aceptar");
        }
    });
}

function CargarCursosSiguientesXHabilitacion() {
    let curAcadIdAct = $("#CurAcadIdDest").val();
    let curAcadId = $("#CurAcadIdOrigen").val();
    //event.preventDefault();
    $.ajax({
        data: {
            CurAcadId: curAcadId,
        },
        url: "/CierreAcademicoPorHabilitacion/GetCursosSiguientesPorHabilitacion",
        success: function (respuesta) {
            if (respuesta != null) {
                $("#CurAcadIdDest").empty().append('<option value=""></option>');

                $(respuesta).each(function () {
                    $("#CurAcadIdDest").append('<option " value="' + this.curAcadId + '">' + this.curAcadNombre + '</option>');
                });
                $("#CurAcadIdDest").selectpicker('refresh');
                $("#CurAcadIdDest").val(curAcadIdAct);
                $("#CurAcadIdDest").trigger('change');

            }
            else {
                MensajeGeneral("error",
                    "ERROR CARGA DE CURSOS SIGUENTES",
                    "Se presento un error al intentar cargar los cursos siguientes",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR CARGA DE CURSOS SIGUENTES",
                "Se presento un error al intentar cargar los cursos siguientes",
                "Aceptar");
        }
    });
}
function getCurAcadId() {
    return $("#CurAcadIdOrigen").val();
}

function CargarEstudiantesXHabilitacion(itemId) {
    let body = $("#tbodyEstudiantes");
    body.html();
    if (itemId) {
        console.log(itemId)
        $.ajax({
            data:
            {
                CurAcadId: itemId,
            },
            url: "/CierreAcademicoPorHabilitacion/GetDetalleEstudiantes",
            success: function (respuesta) {
                if (respuesta !== null) {
                    console.log(respuesta)
                    //$('#tbodyEstudiantes').html(respuesta);
                    //$("#ModalEstudiantes").modal("show");
                    getDataGridInstance("gridDetalleEstudiante").refresh();
                }
                else {
                    MensajeGeneral('warning',
                        'Aviso de sistema',
                        'No se encontraron estudiantes',
                        'Aceptar');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                MensajeGeneral("error", "ERROR AL BUSCAR LOS ESTUDIANTES PREINSCRITOS", "Se presento un error en la busqueda de los estudiantes", "Aceptar");
            }
        });
    }
}
