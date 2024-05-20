$(document).ready(function () {
    CargaCursosInicial();
 
    $('#CalId').on('change', function () {
        CargarCursos();
    });
    
    $('#CurAcadIdOrigen').on('change', function () {
        let curso = $(this).val()
        CargarCursosSiguientes();
        CargarEstudiantes(curso);
    });

});

function CargaCursosInicial() {
    var vescId = $("#CalId").val();
    if (vescId !== '') CargarCursos();
}

//Carga de Combos en cascada
function CargarCursos() {
    let calId = $("#CalId").val();
    //Capturo el valor del calendario previo para ver si lo puedo reponer
    let curAcadId = $("#CurAcadIdOrigen").val();
    //event.preventDefault();
    $.ajax({
        data: {
            CalId: calId,
        },
        url: "/CierreAcademico/GetCursosPorCalendario",
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

function CargarCursosSiguientes() {
    let curAcadIdAct = $("#CurAcadIdDest").val();
    //Capturo el valor del calendario previo para ver si lo puedo reponer
    let curAcadId = $("#CurAcadIdOrigen").val();
    //event.preventDefault();
    $.ajax({
        data: {
            CurAcadId: curAcadId,
        },
        url: "/CierreAcademico/GetCursosSiguientes",
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

function getDataGridInstance(idGridview) {
    let element = document.getElementById(idGridview);
    return DevExpress.ui.dxDataGrid.getInstance(element);
}

function CargarEstudiantes(itemId) {
    let body = $("#tbodyEstudiantes");
    body.html();
    $.ajax({
        data:
        {
            CurAcadId: itemId,
        },
        url: "/CierreAcademico/GetDetalleEstudiantes",
        success: function (respuesta) {
            if (respuesta !== null) {
                //body.html(respuesta);
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
