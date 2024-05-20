$(document).ready(function () {
    CargaProg2Inicial();

    $('#ProIdPrimario').on('change', function () {
        CargarPrograma2();
    });

    $('#ProIdSecundario').on('change', function () {
        CargaEstudiantes();
    });

});


function CargaProg2Inicial() {
    var vprogId = $("#ProIdPrimario").val();
    if (vprogId !== '') CargarPrograma2();
}

function CargarPrograma2() {
    //event.preventDefault();
    var vprogId = $("#ProIdPrimario").val();
    $.ajax({
        data: {
            ProId: vprogId
        },
        url: "/Programa/GetProgramasSecundarios",
        success: function (respuesta) {
            if (respuesta != null) {
                $("#ProIdSecundario").empty().append('<option value=""></option>');

                $(respuesta).each(function () {
                    $("#ProIdSecundario").append('<option " value="' + this.proId + '">' + this.proNombre + '</option>');
                });
                $("#ProIdSecundario").selectpicker('refresh');
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

function getDataGridInstance(idGridview) {
    let element = document.getElementById(idGridview);
    return DevExpress.ui.dxDataGrid.getInstance(element);
}

function getProIdPrimario() {
    return $("#ProIdPrimario").val();
}


$(document).ready(function () {
    $("#btnEnviar").on("click", function () {
        var formDataArray = $("#formularioInscripcion2").serializeArray();
        var formData = {};

        $(formDataArray).each(function (index, field) {
            formData[field.name] = field.value;
        });

        var SelectedAspirantes = obtenerSeleccionados();
        formData.SelectedinscripcionAspirantes = SelectedAspirantes;
        console.log(formData);
        $.ajax({
            url: "/InscripcionPrograma2/Create",
            method: "POST",
            data: formData,
            success: function (respuesta) {
               
                MensajeGeneral(respuesta.tipoMensaje, respuesta.titulo, respuesta.mensaje, respuesta.botonAceptar, GetURL() + "InscripcionPrograma2/Index");
            },
            error: function (error) {
                MensajeGeneral("error", "ERROR AL GUARDAR DATOS", "Se presento un error al momento de guardar las Inscripciones", "Aceptar");
            }
        });
    });

    function obtenerSeleccionados() {
        var dataGrid = getDataGridInstance("gridProcesoInscripcion2Estudiante");
        var filasSeleccionadas = dataGrid.getSelectedRowsData();
        var documentos = [];
        console.log(filasSeleccionadas);
        filasSeleccionadas.forEach(function (fila) {
            documentos.push(fila.matId);
        });

        return documentos;
    }
});






function CargaEstudiantes() {
    event.preventDefault();
    var vprogId = $("#ProIdPrimario").val();
    let body = $("#tbodyinscripcionAspirantes");
    body.html('');
    $.ajax({
        data: {
            ProId: vprogId
        },
        url: "/InscripcionPrograma2/GetEstudiantes",
        success: function (respuesta) {
            if (respuesta != null) {
                body.html(respuesta);
                getDataGridInstance("gridProcesoInscripcion2Estudiante").refresh();
            }
            else {
                MensajeGeneral("error",
                    "Aviso de sistema",
                    "No se encontraron estudiantes",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR CARGA DE ESTUDIANTES",
                "Se presento un error al intentar cargar los estudiantes",
                "Aceptar");
        }
    });
}

function getIdLoadParams() {
    return parseInt($("#idobjInscripcion2").val());
}



function CierraModalDetalle() {
    $("#ModalEstudiantes").modal("hide");
}

function mostrarEstudiantes(itemId, itemNombre) {
    console.log(itemId);
    $("#idobjInscripcion2").val(itemId);
    $("#ModalEstudiantes").modal("show");

    getDataGridInstance("gridEstudianteInscripcion2").refresh(); 
    
}

function checkAll(ele) {
    var table = $('#tbRegistros');
    $('tbody td input:checkbox', table).prop('checked', ele.checked);
}

