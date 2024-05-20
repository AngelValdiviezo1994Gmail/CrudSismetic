$(document).ready(function () {
    ActualizarSolicitud();
});

function  ActualizarSolicitud()
{
    let body = $("#divsolicitud");
    let modal = $("#TiposTramiteModal");
    let vtiposTramite = AgregarDetalle();
    //let tiposTramiteJSON = JSON.stringify(tiposTramite);
    body.html('');
    //event.preventDefault();
    $.ajax({
        url: "/Tramites/ActualizarSolicitud",
        type: "POST",
        data: {
            tiposTramite: vtiposTramite
        },
        success: function (respuesta) {
            if (respuesta != null) {
                body.html(respuesta);
                modal.modal("hide");
                try {

                } catch (e) {

                }
            }
            else {
                MensajeGeneral("error",
                    "ERROR CARGA DETALLE SOLICITUD",
                    "Se presento un error al intentar cargar el detalle de la solicitud",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR CARGA DETALLES SOLICITUD",
                "Se presento un error al intentar cargar el detalle de la solicitud",
                "Aceptar");
        }
    });


}



function CargaTiposTramite(idTramite) {
    //$("#divlista").hide();
    let modal = $("#TiposTramiteModal");
    let body = $("#divtipostramitebody");
    body.html('');

    event.preventDefault();
    $.ajax({
        data: {
            id: idTramite
        },
        url: "/Tramites/CargarTiposTramite",
        success: function (respuesta) {
            if (respuesta != null) {
                body.html(respuesta);
                modal.modal("show");
                try {

                } catch (e) {

                }
            }
            else {
                MensajeGeneral("error",
                    "ERROR CARGA DE TIPOS DE TRAMITE",
                    "Se presento un error al intentar cargar los tipos de tramite",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR CARGA DE TIPOS DE TRAMITE",
                "Se presento un error al intentar cargar tipos de tramite",
                "Aceptar");
        }
    });

}

function AumentaT(item) {
    let vitem = $("#"+item);
    let cant = parseInt(vitem.html())
    cant++;
    vitem.html(cant);
}

function DisminuyeT(item) {
    let vitem = $("#" + item);
    let cant = parseInt(vitem.html())
    if (cant == 0) return;

    cant--;
    vitem.html(cant);
}

function EliminaS(item) {
    let body = $("#divsolicitud");
    let vtiposTramite = AgregarDetalle();
    //let tiposTramiteJSON = JSON.stringify(tiposTramite);
    body.html('');
    //event.preventDefault();
    $.ajax({
        url: "/Tramites/EliminaDetalle",
        type: "POST",
        data: {
            id: item
        },
        success: function (respuesta) {
            if (respuesta != null) {
                body.html(respuesta);
                try {

                } catch (e) {

                }
            }
            else {
                MensajeGeneral("error",
                    "ERROR CARGA DETALLE SOLICITUD",
                    "Se presento un error al intentar cargar el detalle de la solicitud",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR CARGA DETALLES SOLICITUD",
                "Se presento un error al intentar cargar el detalle de la solicitud",
                "Aceptar");
        }
    });
}

function AgregarDetalle() {
    listdetalle = new Array();
    $("#detalletipobody > tr").each(function () {
        let tipotraid = $(this).attr("tipotraid");
        let tipotranombre = $(this).attr("tipotranombre");
        let tipotravalor = $(this).attr("tipotravalor");
        let vcant = $("#cant_" + tipotraid);
        let cant = parseInt(vcant.html())
        let detalleitem = {};
        detalleitem.TipoTraId = parseInt(tipotraid);
        detalleitem.TipoTraNombre = tipotranombre;
        detalleitem.Cantidad = cant;
        detalleitem.TipoTraValor = parseFloat(tipotravalor);
        listdetalle.push(detalleitem);
    });
    return listdetalle;
}

function GuardarSolicitud() {

}


function ModalTramites() {
    $.ajax({
        url: "/Tramites/TiposTramites",
        success: function (respuesta) {
            if (respuesta !== null) {
                $("#LstTramitesModal").modal("show");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL ENCONTRAR LOS TRAMITES", "Se presento un error al cargar la encuesta del docente.", "Aceptar");
        }
    });
}

function CerrarModalTramites() {
    $("#LstTramitesModal").modal("hide");
}

function ModalOtrosTramites() {
    $.ajax({
        url: "/Tramites/TiposTramites",
        success: function (respuesta) {
            if (respuesta !== null) {
                $("#LstOtrosTramitesModal").modal("show");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL ENCONTRAR LOS TRAMITES", "Se presento un error al cargar la encuesta del docente.", "Aceptar");
        }
    });
}

function ModalOtrosTramitesEdit(IdImp) {
    console.log(IdImp);

    $.ajax({
        url: "/Tramites/TiposTramitesEdit",
        data: {
            id: IdImp,
        },
        success: function (respuesta) {
            if (respuesta !== null) {
                $("#LstOtrosTramitesModalEdit").modal("show");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL ENCONTRAR LOS TRAMITES", "Se presento un error al cargar la encuesta del docente.", "Aceptar");
        }
    });
}

function CerrarModalOtrosTramites() {
    $("#LstOtrosTramitesModal").modal("hide");
}

function AumentaTramite(item) {

    let element = document.getElementById("gridTiposTramites");
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    var lstRows = instance.getVisibleRows(item);

    for (var i = 0; i < lstRows.length; i++) {
        var row = lstRows[i];
        if (row.data.tipoTraId == item) {
            row.data.cantidad += 1;
        }
    }

    instance.refresh(item);
}

function DisminuyeTramite(item) {

    let element = document.getElementById("gridTiposTramites");
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    var lstRows = instance.getVisibleRows(item);

    for (var i = 0; i < lstRows.length; i++) {
        var row = lstRows[i];
        if (row.data.tipoTraId == item && row.data.cantidad > 0) {
            row.data.cantidad -= 1;
        }
    }

    instance.refresh(item);
}

function GuardarTramites() {

    let LstTramites = [];

    let element = document.getElementById("gridTiposTramites");
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    var allGridItems = instance.getDataSource().items();

    for (var i = 0; i < allGridItems.length; i++) {
        var row = allGridItems[i];
        if (row.cantidad > 0) {
            var arreglo = row.tipoTraId + "," + row.cantidad + "," + row.tipoTraNombre + "," + row.tipoTraValor + ";";
            LstTramites.push(arreglo);
        }
    }

    $.ajax({
        type: "POST",
        data: {
            lista: LstTramites.toString()
        },
        url: "/Tramites/GuardaSesionTiposTramites",
        success: function (respuesta) {

        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL ENCONTRAR LOS TRAMITES", "Se presento un error al cargar la encuesta del docente.", "Aceptar");
        }
    });

    $('#LstTramitesModal').modal('hide');
    document.getElementById("div_nav_det").click();
}

function ConsultaAlumnos() {

    let NumDocId = $("#NumDocId").val();
    /*
    let NomEst = $("#NomEst").val();
    let IdProg = $("#IdProg").val();
    */

    if (NumDocId == "" || NumDocId == undefined || NumDocId == null) {
        MensajeGeneral("error", "ERROR AL BUSCAR LOS TRAMITES", "Ingrese numero de identifacion del alumno.", "Aceptar");
        return;
    }

    $.ajax({
        type: "POST",
        data: {
            NumDocIdent: NumDocId
        },
        url: "/Tramites/GuardaSesionFiltroConsultaEstXAdmin",
        success: location.reload(),
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL ENCONTRAR LOS TRAMITES", "Se presento un error al buscar los tramites del alumno.", "Aceptar");
        }
    });

}


//#Region Otros Trámites - Resolución Costos
function AumentaOtrosTramite(item) {

    let element = document.getElementById("gridOtrosTramites");
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    var lstRows = instance.getVisibleRows(item);

    for (var i = 0; i < lstRows.length; i++) {
        var row = lstRows[i];
        if (row.data.concepCostoId == item) {
            row.data.concCostoCantidad += 1;
        }
    }

    instance.refresh(item);
}

function DisminuyeOtroTramite(item) {

    let element = document.getElementById("gridOtrosTramites");
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    var lstRows = instance.getVisibleRows(item);

    for (var i = 0; i < lstRows.length; i++) {
        var row = lstRows[i];
        if (row.data.concepCostoId == item && row.data.concCostoCantidad > 0) {
            row.data.concCostoCantidad -= 1;
        }
    }

    instance.refresh(item);
}

function GuardarOtrosTramites() {

    let LstTramites = [];
    let LstTramitesCero = [];

    let element = document.getElementById("gridOtrosTramites");
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    var allGridItems = instance.getDataSource().items();

    for (var i = 0; i < allGridItems.length; i++) {
        var row = allGridItems[i];
        if (row.concCostoCantidad > 0) {
            var arreglo = row.concepCostoId + "," + row.concCostoCantidad + "," + row.concepCostoDescripcion + "," + row.concepCostoValor + ";";
            LstTramites.push(arreglo);
        } else {
            LstTramitesCero.push(row);
        }
    }

    if (LstTramitesCero.length == allGridItems.length) {
        MensajeGeneral("error", "ERROR AL REGISTRAR LOS TRAMITES", "Debe agregar valores al carrito.", "Aceptar");
        return;
    }

    $.ajax({
        type: "POST",
        data: {
            lista: LstTramites.toString()
        },
        url: "/Tramites/GuardaSesionOtrosTramites",
        success: function (respuesta) {

        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL ENCONTRAR LOS TRAMITES", "Se presentó un error al guardar tramites.", "Aceptar");
        }
    });

    CerrarModalOtrosTramites();
    document.getElementById("div_nav_det_otro_tram").click();
}

function GuardarOtrosTramitesAdmin() {

    let LstTramites = [];
    let LstTramitesCero = [];

    let element = document.getElementById("gridOtrosTramites");
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    var allGridItems = instance.getDataSource().items();

    for (var i = 0; i < allGridItems.length; i++) {
        var row = allGridItems[i];
        if (row.concCostoCantidad > 0) {
            var arreglo = row.concepCostoId + "," + row.concCostoCantidad + "," + row.concepCostoDescripcion + "," + row.concepCostoValor + ";";
            LstTramites.push(arreglo);
        } else {
            LstTramitesCero.push(row);
        }
    }

    if (LstTramitesCero.length == allGridItems.length) {
        MensajeGeneral("error", "ERROR AL REGISTRAR LOS TRAMITES", "Debe agregar valores al carrito.", "Aceptar");
        return;
    }

    $.ajax({
        type: "POST",
        data: {
            lista: LstTramites.toString()
        },
        url: "/Tramites/GuardaSesionOtrosTramites",
        success: function (respuesta) {

        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL ENCONTRAR LOS TRAMITES", "Se presentó un error al guardar tramites.", "Aceptar");
        }
    });

    CerrarModalOtrosTramites();
    document.getElementById("div_nav_det_otro_tram_admin").click();
}

function AumentaOtrosTramiteEdit(item) {

    let element = document.getElementById("gridOtrosTramitesEdit");
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    var lstRows = instance.getVisibleRows(item);

    for (var i = 0; i < lstRows.length; i++) {
        var row = lstRows[i];
        if (row.data.concepCostoId == item) {
            row.data.concCostoCantidad += 1;
        }
    }

    instance.refresh(item);
}

function DisminuyeOtroTramiteEdit(item) {

    let element = document.getElementById("gridOtrosTramitesEdit");
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    var lstRows = instance.getVisibleRows(item);

    for (var i = 0; i < lstRows.length; i++) {
        var row = lstRows[i];
        if (row.data.concepCostoId == item && row.data.concCostoCantidad > 0) {
            row.data.concCostoCantidad -= 1;
        }
    }

    instance.refresh(item);
}

function GuardarOtrosTramitesEdit() {

    let LstTramites = [];
    let LstTramitesCero = [];

    let element = document.getElementById("gridOtrosTramitesEdit");
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    var allGridItems = instance.getDataSource().items();

    for (var i = 0; i < allGridItems.length; i++) {
        var row = allGridItems[i];
        if (row.concCostoCantidad > 0) {
            var arreglo = row.concepCostoId + "," + row.concCostoCantidad + "," + row.concepCostoDescripcion + "," + row.concepCostoValor + ";";
            LstTramites.push(arreglo);
        } else {
            LstTramitesCero.push(row);
        }
    }

    if (LstTramitesCero.length == allGridItems.length) {
        MensajeGeneral("error", "ERROR AL REGISTRAR LOS TRAMITES", "Debe agregar valores al carrito.", "Aceptar");
        return;
    }

    $.ajax({
        type: "POST",
        data: {
            lista: LstTramites.toString()
        },
        url: "/Tramites/GuardaSesionOtrosTramites",
        success: function (respuesta) {

        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL ENCONTRAR LOS TRAMITES", "Se presentó un error al guardar tramites.", "Aceptar");
        }
    });

    CerrarModalOtrosTramitesEdit();
    document.getElementById("DetalleSolicitudOtroTramEdit").click();
}

function CerrarModalOtrosTramitesEdit() {
    $("#LstOtrosTramitesModalEdit").modal("hide");
}

function EditarTramites() {

    let LstTramites = [];
    let LstTramitesCero = [];

    let element = document.getElementById("gridOtrosTramitesEdit");
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    var allGridItems = instance.getDataSource().items();

    for (var i = 0; i < allGridItems.length; i++) {
        var row = allGridItems[i];
        if (row.concCostoCantidad > 0) {
            var arreglo = row.concepCostoId + "," + row.concCostoCantidad + "," + row.concepCostoDescripcion + "," + row.concepCostoValor + ";";
            LstTramites.push(arreglo);
        } else {
            LstTramitesCero.push(row);
        }
    }

    if (LstTramitesCero.length == allGridItems.length) {
        MensajeGeneral("error", "ERROR AL REGISTRAR LOS TRAMITES", "Debe agregar valores al carrito.", "Aceptar");
        return;
    }

    $.ajax({
        type: "POST",
        data: {
            lista: LstTramites.toString()
        },
        url: "/Tramites/GuardaSesionOtrosTramites",
        success: function (respuesta) {

        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL ENCONTRAR LOS TRÁMITES", "Se presento un error al guardar tramites.", "Aceptar");
        }
    });

    CerrarModalOtrosTramites();
    document.getElementById("div_nav_det_otro_tram_edit").click();
}

//#EndRegion Otros Trámites - Resolución Costos

//#Region Confirmación de pago de trámites

function MostrarConfirmarPago(ruta, id) {
    if (ruta != undefined && ruta != "" && ruta != null) {
        $.ajax({
            type: "POST",
            data: {
                Id: id.toString(),
                RutaAdjunto: ruta.toString()
            },
            url: "/Tramites/ModalConfirmaPagoTram",
            success: function (respuesta) {
                $("#ModalConfirmaPagoTramite").modal("show");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                MensajeGeneral("error", "ERROR CONFIRMACION DE TRAMITES", "Se presento un error en el consumo del metodo de pago de tramites", "Aceptar");
            }
        });
    } else {
        MensajeGeneral("error", "ERROR CONFIRMACION DE PAGO DE TRAMITES", "Estudiante no ha subido su comprobante de pago.", "Aceptar");
    }
}

function ConfirmaPago() {
    $.ajax({
        type: "POST",
        url: "/Tramites/ConfirmaPago",
        success: function (respuesta) {
            MensajeGeneral(respuesta.tipoMensaje, respuesta.titulo, respuesta.mensaje, respuesta.botonAceptar);//, GetURL() + "OrdenMatricula/Consultar");
            CerrarModalConfirmarPago();
            window.location.reload();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR ENVIO DE ORDENES", "Se presento un error en el consumo del metodo de anulacion de ordenes", "Aceptar");
        }
    });

}

function RechazoPago() {


    $.ajax({
        type: "POST",

        //data: oEstado,

        /*
        data: {
            Id: id.toString(),
            Estado: estado
        },
        */
        url: "/Tramites/RechazarPago",
        success: function (respuesta) {
            MensajeGeneral(respuesta.tipoMensaje, respuesta.titulo, respuesta.mensaje, respuesta.botonAceptar);//, GetURL() + "OrdenMatricula/Index");
            CerrarModalConfirmarPago();
            window.location.reload();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR ENVIO DE ORDENES", "Se presento un error en el consumo del metodo de anulacion de ordenes", "Aceptar");
        }
    });

}

function CerrarModalConfirmarPago() {
    $("#ModalConfirmaPagoTramite").modal("hide");
}
//#endregion Confirmación de pago
