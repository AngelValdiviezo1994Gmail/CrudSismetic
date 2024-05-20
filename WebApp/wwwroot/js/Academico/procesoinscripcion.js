$(document).ready(function (){
    let tieneDetalles = $("#tieneDetalles").val();
    if (tieneDetalles == '1' || tieneDetalles ==1)
        $("#ModalPreviewAspirantes").modal("show"); 

    $("#idobj").val('0');
});

function getDataGridInstance(idGridview) {
    let element = document.getElementById(idGridview);
    return DevExpress.ui.dxDataGrid.getInstance(element);
}


function CierraModal(idModal) {
    $("#" + idModal).modal("hide");
}

function getIdLoadParams() {
    return parseInt($("#idobj").val());
}

function fnmostrarAspirantes(itemId) {
    $("#idobj").val(itemId);
    getDataGridInstance("gridDetalleAspirantes").refresh();
    $("#ModalDetAspirantes").modal("show");
}

function ImportarAspirantes() {
    $("#ModalPreviewAspirantes").modal("hide");

    let OfeId = $("#cmbOfeId").val();

    $.ajax({
        type: "POST",
        data: {
            idoferta: parseInt(OfeId)
        },
        url: "/ProcesoInscripcion/ImportarAspirantes",
        success: function (respuesta)
        {

            if (respuesta != null && respuesta.succeeded === true) {
                MensajeGeneral("success",
                    "CARGA DE ASPIRANTES",
                    "Los aspirantes se cargaron exitosamente.",
                    "Aceptar", GetURL() + "ProcesoInscripcion/Index");

            } else {
                MensajeGeneral("error",
                    "ERROR CARGA DE ASPIRANTES",
                    respuesta,
                    "Aceptar", GetURL() + "ProcesoInscripcion/Index");
            }

           
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR CARGA DE ASPIRANTES",
                "Se presento un error al intentar cargar los aspirantes",
                "Aceptar");
        }
    });
}