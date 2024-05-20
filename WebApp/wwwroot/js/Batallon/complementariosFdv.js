
function GetViewComplementos() {
    $.ajax({
        data:
        {
            iEstId: parseInt($("#hfEstudianteID").val())
        },
        url: "/Batallon/GetViewComplementosEstudiante",
        success: function (respuesta) {
            $("#dvListadoComplementos").html(respuesta);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar cargar el listado de comisiones",
                "Aceptar");
        }
    });
}

$("#btnAsignarComplementario").click(function () {
    LimpiarCamposComplemento();
    $("#mdlComplementario").modal('show');
});

$(document).on('click', ".complementoEditar", function () {
    event.preventDefault();
    $.ajax({
        data: {
            Id: parseInt($(this).attr('data-id'))
        },
        url: "/Batallon/GetComplemento",
        success: function (respuesta) {
            if (respuesta) {
                LimpiarCamposComplemento();
                $("#mdlComplementario").modal('show');
                $("#txtEstudioCursoCivil").val(respuesta.data.ecoEstudioCursoCivil);
                $("#hfEstudianteComplementarioEcoId").val(respuesta.data.ecoId);
                $("#txtEcoLugar").val(respuesta.data.ecoLugar);
                $("#dtpEcoFecha").val(moment(respuesta.data.ecoFecha).format('DD/MM/YYYY'));
            }
            else {
                MensajeGeneral("error",
                    "ERROR FOLIO DE VIDA",
                    "Se presento un error al intentar editar el estudio",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar editar el estudio",
                "Aceptar");
        }
    });
});

$(document).on('click', ".complementoBorrar", function () {
    event.preventDefault();
    Swal.fire({
        title: 'FOLIO DE VIDA',
        text: "¿Estás seguro de eliminar el estudio?",
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
                    iComplementoID: parseInt($(this).attr('data-id'))
                },
                url: "/Batallon/BorrarComplemento",
                success: function (respuesta) {
                    if (respuesta) {
                        MensajeGeneral("success",
                            "FOLIO DE VIDA",
                            "El estudio fue eliminado correctamente",
                            "Aceptar");
                        GetViewComplementos();
                    }
                    else {
                        MensajeGeneral("error",
                            "ERROR FOLIO DE VIDA",
                            "Se presento un error al intentar eliminar el estudio",
                            "Aceptar");
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    MensajeGeneral("error",
                        "ERROR FOLIO DE VIDA",
                        "Se presento un error al eliminar el estudio",
                        "Aceptar");
                }
            });
        }
    })
});

$("#frmComplemetario").submit(function (event) {
    event.preventDefault();
    var frmComplemetario = $('#frmComplemetario');
    var bFormValido = frmComplemetario.valid();
    if (bFormValido) {
        var oFolioVida = new FormData(frmComplemetario.get(0));
        oFolioVida.set("idEst", $("#hfEstudianteID").val());
        $.ajax({
            type: "POST",
            data: oFolioVida,
            url: "/Batallon/GuardarComplemento",
            processData: false,
            contentType: false,
            success: function (respuesta) {
                $("#mdlComplementario").modal('hide');

                if (respuesta === true) {
                    MensajeGeneral("success",
                        "FOLIO DE VIDA",
                        "El estudio fue registrado correctamente",
                        "Aceptar");
                    GetViewComplementos();
                }
                else {
                    MensajeGeneral("error",
                        "ERROR FOLIO DE VIDA",
                        "Se presento un error al intentar registrar el estudio",
                        "Aceptar");
                }
                LimpiarCamposComplemento();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                MensajeGeneral("error",
                    "ERROR FOLIO DE VIDA",
                    "Se presento un error al intentar registrar el estudio",
                    "Aceptar");
            }
        });
    }
    return false;

});

function LimpiarCamposComplemento() {
    $("#txtEstudioCursoCivil").val('');
    $("#hfEstudianteComplementarioEcoId").val('');
    $("#txtEcoLugar").val('');
    $("#dtpEcoFecha").val(moment().format('DD/MM/YYYY'));
    $("#txtEcoLugar-error").remove();
    $("#txtEstudioCursoCivil-error").remove();
}

