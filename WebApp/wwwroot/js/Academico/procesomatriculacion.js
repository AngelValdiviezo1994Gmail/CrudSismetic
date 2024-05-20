$(document).ready(function () {
    CargaProgramaInicial();
    $("#OfeId").change(function () {
        CargarDatosOferta();
        CargarPrograma();
        CargaPreInscritos();
    });
    $("#idobj").val('0');
});

function CargaProgramaInicial() {
    let iOfeId = $("#OfeId").val();
    if (iOfeId !== '') {
        CargarDatosOferta();
        CargarPrograma();
        //CargaPreInscritos(iOfeId);
    }
}


function getOfeId() {
    return $("#OfeId").val();
}



function CargarDatosOferta() {

    $("#ProcMatAnio").val('');
    $("#ProcMatPeriodo").val('');
    var vofeId = $("#OfeId").val();
    var result = lstOfertas.find(obj => {
        var intOfeId = parseInt(vofeId);
        return obj.ofeId == intOfeId
    });

    if (result != null) {
        $("#ProcMatAnio").val(result.ofeAnio);
        $("#ProcMatPeriodo").val(result.perId);
    }
}

function CargarPrograma() {

    $("#ProId").val('');
    var vofeId = $("#OfeId").val();
    var result = lstOfertas.find(obj => {
        var intOfeId = parseInt(vofeId);
        return obj.ofeId === intOfeId
    });

    if (result != null) {
        $("#ProId").val(result.proId);
        $("#ProId").selectpicker('refresh');
        $("#ProId2").val(result.proId);
        //$("#ProId").trigger("change");
    }
}

//function CargaPreInscritos() {
//    var itemId = $("#OfeId").val()
//    let body = $("#tbodyAspirantes");
//    body.html();
//    $.ajax({
//        data:
//        {
//            id: itemId,
//        },
//        url: "/ProcesoMatricula/GetDetalleAspirantes",
//        success: function (respuesta) {
//            if (respuesta !== null) {
//                body.html(respuesta);
//            }
//            else {
//                MensajeGeneral('warning',
//                    'Aviso de sistema',
//                    'No se encontraron aspirantes',
//                    'Aceptar');
//            }
//        },
//        error: function (xhr, ajaxOptions, thrownError) {
//            MensajeGeneral("error", "ERROR AL BUSCAR LOS ASPIRANTES INSCRITOS", "Se presento un error en la busqueda de los aspirantes", "Aceptar");
//        }
//    });
//}




$(document).ready(function () {
    $("#btnEnviar").on("click", function () {
        var formDataArray = $("#miFormulario").serializeArray();
        var formData = {};

        $(formDataArray).each(function (index, field) {
            formData[field.name] = field.value;
        });

        var SelectedAspirantes = obtenerSeleccionados();
        formData.SelectedAspirantes = SelectedAspirantes; 
        //console.log(formData);
       $.ajax({
            url: "/ProcesoMatricula/Create", 
            method: "POST",
            data: formData,
           success: function (respuesta) {
               console.log(respuesta);
                MensajeGeneral(respuesta.tipoMensaje, respuesta.titulo, respuesta.mensaje, respuesta.botonAceptar, GetURL() + "ProcesoMatricula/Index");
            },
            error: function (error) {
                // Manejar los errores si es necesario
            }
        });
    });

    function obtenerSeleccionados() {
        var dataGrid = getDataGridInstance("gridProcesoDetalleEstudiante");
        var filasSeleccionadas = dataGrid.getSelectedRowsData();
        var documentos = [];
        console.log(filasSeleccionadas);
        filasSeleccionadas.forEach(function (fila) {
            documentos.push(fila.inscId);
        });

        return documentos;
    }
});

function checkAll(ele) {
    var table = $('#tbRegistros');
    $('tbody td input:checkbox', table).prop('checked', ele.checked);
}

function getDataGridInstance(idGridview) {
    let element = document.getElementById(idGridview);
    return DevExpress.ui.dxDataGrid.getInstance(element);
}


function CierraModalDetalle() {
    $("#ModalEstudiantes").modal("hide");
}

function getIdLoadParams() {
    return parseInt($("#idobj").val());
}

function fnmostrarEstudiantes(itemId) {
    $("#idobj").val(itemId);
    getDataGridInstance("gridDetalleMatricula").refresh();
    $("#ModalEstudiantes").modal("show");
}

function Detalles(itemId) {
    $("#idobj").val(itemId);
    $.ajax({
        
        url: `/ProcesoMatricula/Details/${itemId}`,
        success: function (respuesta) {
            if (respuesta !== null) {
                window.location.href = `/ProcesoMatricula/Details/${itemId}`;
            }
            else {
                MensajeGeneral('warning',
                    'Aviso de sistema',
                    'No se encontraron aspirantes',
                    'Aceptar');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL BUSCAR LOS ASPIRANTES INSCRITOS", "Se presento un error en la busqueda de los aspirantes", "Aceptar");
        }
    });
}