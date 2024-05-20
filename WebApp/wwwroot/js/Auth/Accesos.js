$(document).ready(function () {
    InicializarPaneles();
    getSelectBoxInstance("cmbRoles").getDataSource().reload();
    getSelectBoxInstance("cmbSeccion").getDataSource().reload();
});

var changedBySelectBox;
var titleSelectBox;
var clearSelectionButton;

var arrayIdsOperaciones = [];

function InicializarPaneles() {
    $("#divOperaciones").hide();
    $("#divOpcionSinPermisos").hide();
    $("#divOpcionConPermisos").hide();
}

function cmbRolesValueChanged(data) {
    getSelectBoxInstance("cmbSeccion").option('value', null);
    //getSelectBoxInstance("cmbSeccion").getDataSource().reload();
    getSelectBoxInstance("cmbSubModulo").option('value', null);
    //getSelectBoxInstance("cmbSubModulo").getDataSource().reload();
    InicializarPaneles();
}

function cmbSeccionValueChanged(data) {
    getSelectBoxInstance("cmbSubModulo").option('value', null);
    getSelectBoxInstance("cmbSubModulo").getDataSource().reload();
    //getSelectBoxInstance("cmbSubModulo").option('value', $("#ModId").val());
    InicializarPaneles();
}

function cmbSubModulosValueChanged(data) {
    //$(".current-value > span").text(data.value);
   
    ListarOperaciones();
    ListarOpcionesSinPermisos();
    ListarOpcionesConPermisos();

}

function getIdRolLoadParams() {
    return getSelectBoxInstance("cmbRoles").option('value');
}

function getIdModLoadParams() {
    return getSelectBoxInstance("cmbSubModulo").option('value');
}

function getIdSecLoadParams() {
    return getSelectBoxInstance("cmbSeccion").option('value');
}


function ListarOperaciones() {

    $("#divOperaciones").show();
    //var dataGrid = getDataGridInstance("gridOperaciones");
    getDataGridInstance("gridOperaciones").refresh();
    getDataGridInstance("gridOperaciones").clearSelection();
   
}

function ListarOpcionesSinPermisos() {

    $("#divOpcionSinPermisos").show();
    getDataGridInstance("gridOpSinPermisos").refresh();
    //getDataGridInstance("gridOpSinPermisos").clearSelection();

}

function ListarOpcionesConPermisos() {
    $("#divOpcionConPermisos").show();
    getDataGridInstance("gridOpConPermisos").refresh();
    
}

function ObtenerPermisosTransaccion(idopcion) {

    $.ajax({
        type: "POST",
        data:
        {
            idOp: parseInt(idopcion),
            idRol: getIdRolLoadParams()
        },
        url: "/Accesos/ObtenerPermisosTransaccion",
        success: function (respuesta) {
            if (respuesta.succeeded === true) {
              
                var dataGrid = getDataGridInstance("gridOperaciones");
                var operacionesToSelect = respuesta.data
                    .filter((operacionListViewModel) => operacionListViewModel.tipoOper.tipOperActivo === true)
                    .map((operacionListViewModel) => operacionListViewModel.operId);
                dataGrid.selectRows(operacionesToSelect);

            }
            else {
                MensajeGeneral("error",
                    "VISUALIZAR PERMISOS",
                    respuesta.error,
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "VISUALIZAR PERMISOS",
                "Se presento un error al intentar consultar los permisos para la opción.",
                "Aceptar");
        }
    });
}

function DevolverPermisosOpciones(idopcion)
{
    $.ajax({
        type: "POST",
        data:
        {
            idOp: parseInt(idopcion),
            idRol: getIdRolLoadParams()
        },
        url: "/Accesos/DevolverPermisosOpciones",
        success: function (respuesta) {
            if (respuesta.succeeded === true) {
                MensajeGeneral("success",
                    "DEVOLVER PERMISOS",
                    "Permisos devueltos exitosamente.",
                    "Aceptar");
                getDataGridInstance("gridOpConPermisos").refresh();
                getDataGridInstance("gridOpSinPermisos").refresh();
                getDataGridInstance("gridOperaciones").clearSelection();
            }
            else {
                MensajeGeneral("error",
                    "DEVOLVER PERMISOS",
                    respuesta.error,
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "DEVOLVER PERMISOS",
                "Se presento un error al intentar devolver la asignación de permisos para la opción.",
                "Aceptar");
        }
    });
}

function AsigarPermisosOpciones(idopcion)
{
    let lstoperaciones = document.getElementById("selectedItemsContainer").innerHTML;
    if (lstoperaciones.length > 0)
    {
        $.ajax({
            type: "POST",
            data:
            {
                lstIdsOper: lstoperaciones,
                idOp: parseInt(idopcion), 
                idRol: getIdRolLoadParams(),
                idMod: getIdModLoadParams()
            },
            url: "/Accesos/AsignarPermisosOpciones",
            success: function (respuesta)
            {
                if (respuesta.succeeded === true) {
                    MensajeGeneral("success",
                        "ASIGNAR PERMISOS",
                        "Asignación de permisos registrada exitosamente.",
                        "Aceptar");
                    getDataGridInstance("gridOpConPermisos").refresh();
                    getDataGridInstance("gridOpSinPermisos").refresh();
                    //getDataGridInstance("gridOperaciones").clearSelection();
                }
                else {
                    
                    MensajeGeneral("error",
                        "ASIGNAR PERMISOS",
                        respuesta.error,
                        "Aceptar");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                MensajeGeneral("error",
                    "ASIGNAR PERMISOS",
                    "Se presento un error al intentar registrar la asignación de permisos para la opción.",
                    "Aceptar");
            }
        });

    } else
    {
        MensajeGeneral("warning",
                "ASIGNAR PERMISOS",
                "Por favor seleccione una o más operaciones para la opción","Aceptar");
    }
}

function ActualizarPermisosOpciones(idopcion) {
    let lstoperaciones = document.getElementById("selectedItemsContainer").innerHTML;
    if (lstoperaciones.length > 0)
    {
        $.ajax({
            type: "POST",
            data:
            {
                lstIdsOper: lstoperaciones,
                idOp: parseInt(idopcion),
                idRol: getIdRolLoadParams(),
                idMod: getIdModLoadParams()
            },
            url: "/Accesos/AsignarPermisosOpciones",
            success: function (respuesta) {
                if (respuesta.succeeded === true) {
                    MensajeGeneral("success",
                        "ACTUALIZAR PERMISOS",
                        "Actualizar asignación de permisos exitosamente.",
                        "Aceptar");
                    getDataGridInstance("gridOpConPermisos").refresh();
                    getDataGridInstance("gridOpSinPermisos").refresh();
                }
                else {

                    MensajeGeneral("error",
                        "ACTUALIZAR PERMISOS",
                        respuesta.error,
                        "Aceptar");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                MensajeGeneral("error",
                    "ACTUALIZAR PERMISOS",
                    "Se presento un error al intentar actualizar la asignación de permisos para la opción.",
                    "Aceptar");
            }
        });

    } else {
        MensajeGeneral("warning",
            "ACTUALIZAR PERMISOS",
            "Por favor seleccione una o más operaciones para la opción", "Aceptar");
    }
}

function getDataGridInstance(idGridview) {
    let element = document.getElementById(idGridview);
    return DevExpress.ui.dxDataGrid.getInstance(element);
}

function getSelectBoxInstance(idSelectBox) {
    let element = document.getElementById(idSelectBox); 
    return DevExpress.ui.dxSelectBox.getInstance(element);
}

function selection_changed(selectedItems) {
    var data = selectedItems.selectedRowsData;

    if (data.length > 0)
    {
        $("#selectedItemsContainer").text(data.map((value) => value.operId).join(","));
        //$("#selectedItemsContainer").text(data.map((value) => value.operId + " " + value.operNombre).join(","));
        // data.map((value) => "${value.operId} ${value.operNombre}").join(", ")
    } else
    {
        //limpiar vaciar array
        $("#selectedItemsContainer").text("");
    }

    if (!changedBySelectBox) {
        titleSelectBox.option('value', null);
    }

    changedBySelectBox = false;
    clearSelectionButton.option('disabled', !data.length);
}

function selectBox_valueChanged(data) {
    if (!data.value)
        return;

    var dataGrid = getDataGridInstance("gridOperaciones");

    changedBySelectBox = true;
    if (data.value == "Todos") {
        dataGrid.selectAll();
    } else {
       
        var operacionesToSelect = dataGrid.getDataSource().items()
            .filter((operacionListViewModel) => operacionListViewModel.tipoOper.tipOperNombre === data.value)
            .map((operacionListViewModel) => operacionListViewModel.operId);
        dataGrid.selectRows(operacionesToSelect);
    }
}

function selectBox_onInitialized(e) {
    titleSelectBox = e.component;
}

function button_onInitialized(e) {
    clearSelectionButton = e.component;
}

function button_click() {
    getDataGridInstance("gridOperaciones").clearSelection();
}


