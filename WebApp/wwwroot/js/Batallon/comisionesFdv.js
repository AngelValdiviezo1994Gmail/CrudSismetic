function GetViewComisiones() {
    $.ajax({
        data:
        {
            iEstId: parseInt($("#hfEstudianteID").val())
        },
        url: "/Batallon/GetViewComisionesEstudiante",
        success: function (respuesta) {
            $("#dvListadoComisiones").html(respuesta);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar cargar el listado de medallas",
                "Aceptar");
        }
    });
}
function calculateCellValue(rowData) {
    return rowData.etcEnCurso === false;
}

function refreshGridComisiones() {
    let element = document.getElementById("dvListadoComisiones");
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    instance.refresh();
}

function getEstId() {
    return parseInt($("#hfEstudianteID").val());
}

$("#btnAsignarComision").click(function () {
    LimpiarCamposComisiones();
    $("#mdlComision").modal('show');
});

$("#frmComision").submit(function (event) {
    event.preventDefault();
    var frmComision = $('#frmComision');
    var bFormValido = frmComision.valid();
    if (bFormValido) {
        var oFolioVida = new FormData(frmComision.get(0));
        oFolioVida.set("idEst", $("#hfEstudianteID").val());
        $.ajax({
            type: "POST",
            data: oFolioVida,
            url: "/Batallon/GuardarComision",
            processData: false,
            contentType: false,
            success: function (respuesta) {
                $("#mdlComision").modal('hide');

                if (respuesta === true) {
                    MensajeGeneral("success",
                        "FOLIO DE VIDA",
                        "La comision fue registrada correctamente",
                        "Aceptar");
                   refreshGridComisiones()
                }
                else {
                    MensajeGeneral("error",
                        "ERROR FOLIO DE VIDA",
                        "Se presento un error al intentar registrar la comision",
                        "Aceptar");
                }

                LimpiarCamposComisiones();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                MensajeGeneral("error",
                    "ERROR FOLIO DE VIDA",
                    "Se presento un error al intentar registrar la comision",
                    "Aceptar");
            }
        });
    }
    return false;

});

$(document).on('click', ".comisionEditar", function () {
    event.preventDefault();
    $.ajax({
        data: {
            Id: parseInt($(this).attr('data-id'))
        },
        url: "/Batallon/GetComision",
        success: function (respuesta) {
            if (respuesta) {
                LimpiarCamposComisiones();
                $("#mdlComision").modal('show');
                $("#txtEtcTipo").val(respuesta.data.etcTipo);
                $("#hfEstudianteComisionesEtcId").val(respuesta.data.etcId);
                $("#txtLugarComision").val(respuesta.data.etcLugar);
                $("#dtpFechaComision").val(moment(respuesta.data.etcFecha).format('DD/MM/YYYY'));
            }
            else {
                MensajeGeneral("error",
                    "ERROR FOLIO DE VIDA",
                    "Se presento un error al intentar editar la comision",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar editar la comision",
                "Aceptar");
        }
    });
});

$(document).on('click', ".comisionBorrar", function () {
    event.preventDefault();
    Swal.fire({
        title: 'FOLIO DE VIDA',
        text: "¿Estás seguro que desea eliminar la comision?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "POST",
                data: {
                    iComisionID: parseInt($(this).attr('data-id'))
                },
                url: "/Batallon/BorrarComision",
                success: function (respuesta) {
                    if (respuesta) {
                        MensajeGeneral("success",
                            "FOLIO DE VIDA",
                            "La comision fue eliminada correctamente",
                            "Aceptar");
                        refreshGridComisiones();
                    }
                    else {
                        MensajeGeneral("error",
                            "ERROR FOLIO DE VIDA",
                            "Se presento un error al intentar eliminar la comision",
                            "Aceptar");
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    MensajeGeneral("error",
                        "ERROR FOLIO DE VIDA",
                        "Se presento un error al intentar eliminar la comision",
                        "Aceptar");
                }
            });
        }
    })
});

$(document).on('click', ".close-comision-modal", function () {
    $("#mdlComision").modal('hide');
});

function LimpiarCamposComisiones() {
    $("#hfEstudianteComisionesEtcId").val('');
    $("#txtLugarComision").val('');
    $("#txtEtcTipo").val('');
    $("#dtpFechaComision").val(moment().format('DD/MM/YYYY'));
    $("#dtpFinComision").val(moment().format('DD/MM/YYYY'));
    $("#txtLugarComision-error").remove();
    $("#txtEtcTipo-error").remove();
}