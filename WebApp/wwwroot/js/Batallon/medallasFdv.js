function GetViewMedallas() {
    $.ajax({
        data:
        {
            iEstId: parseInt($("#hfEstudianteID").val())
        },
        url: "/Batallon/GetViewMedallasEstudiante",
        success: function (respuesta) {
            $("#dvListadoMedallas").html(respuesta);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar cargar el listado de medallas",
                "Aceptar");
        }
    });
}

$("#btnAsignarMedalla").click(function () {
    LimpiarCamposMedalla();
    $("#txtMedFecha").val(moment().format('DD/MM/YYYY'));
    $("#ddlMedalla").find("option").prop("disabled", false);
    $("#ddlMedalla").selectpicker('refresh');
    $("#flArchivoSoporteEdit").hide();

    $("#mdlMedalla").modal('show');
});

$("#ddlMedalla").change(function () {
    var txtMedalla = $("#hfEstudianteMedallaMedNombre");
    var MedallaSel = $("#ddlMedalla").val();

    var txtSel = $("#ddlMedalla option[value='" + MedallaSel + "']").text();

    txtMedalla.val(txtSel);

    $.ajax({
        url: "/Batallon/GetMedallaCatByType",
        data:
        {
            Type: MedallaSel,
            idEst: parseInt($("#hfEstudianteID").val()),
            editingId: parseInt($("#hfEstudianteMedallaMedId").val())
        },
        success: function (respuesta) {
            if (respuesta != null) {
                if (parseInt($("#hfEstudianteMedallaMedId").val()) > 0) {
                    $("#ddlCategoriaMedalla").empty();
                    $(".selectMedalla").attr("disabled");
                } else {
                    $("#ddlCategoriaMedalla").empty().append('<option value="-1">Seleccione Categoría</option>');
                }

                $(respuesta).each(function () {
                    $("#ddlCategoriaMedalla").append('<option value="' + this.cmeId + '">' + this.cmeNombre + '</option>');
                });
            } else {
                MensajeGeneral("error",
                    "ERROR CARGA DE CATEGORÍAS DISTINTIVOS",
                    "Se presento un error al intentar cargar las categorías de Medallas",
                    "Aceptar");
            }
            $("#ddlCategoriaMedalla").selectpicker('refresh');
        }
    });
});

$("#frmMedalla").submit(function (event) {
    event.preventDefault();
    var frmMedalla = $('#frmMedalla');
    var oFolioVida = new FormData(frmMedalla.get(0));
    var mId = $("#hfEstudianteMedallaMedId").val();

    if (mId > 0) {
        const input = $("#flArchivoSoporteMedalla");
        input.rules("remove", "required");
        oFolioVida.set("flArchivoSoporteMedalla", $("#feditArchivoSoporteMedalla").val());
    } else {
        const input = $("#flArchivoSoporteMedalla");
        input.rules("add", {
            required: true,
        });
    }

    var bFormValido = frmMedalla.valid();
    if (bFormValido) {
        oFolioVida.set("idEst", $("#hfEstudianteID").val());
        $.ajax({
            type: "POST",
            data: oFolioVida,
            url: "/Batallon/GuardarMedalla",
            processData: false,
            contentType: false,
            success: function (respuesta) {
                $("#mdlMedalla").modal('hide');

                if (respuesta.succeeded === true) {
                    MensajeGeneral("success",
                        "FOLIO DE VIDA",
                        "La medalla, distintivo o reconocimiento fue registrado correctamente",
                        "Aceptar");
                    GetViewMedallas();
                }
                else {
                    MensajeGeneral("error",
                        "ERROR FOLIO DE VIDA",
                        respuesta.error,
                        "Aceptar");
                }

                LimpiarCamposMedalla();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                MensajeGeneral("error",
                    "ERROR FOLIO DE VIDA",
                    "Se presento un error al intentar registrar la medalla, distintivo o reconocimiento",
                    "Aceptar");
            }
        });
    }
    return false;

});

$(document).on('click', ".medallaEditar", function () {
    event.preventDefault();
    $.ajax({
        data: {
            Id: parseInt($(this).attr('data-id'))
        },
        url: "/Batallon/GetMedalla",
        success: function (respuesta) {
            if (respuesta) {
                LimpiarCamposMedalla();
                $("#mdlMedalla").modal('show');
                $("#hfEstudianteMedallaMedId").val(respuesta.data.medId);
                $("#txtMedNombre").val(respuesta.data.medNombre);
                $("#txtMedFecha").val(moment(respuesta.data.medFecha).format('DD/MM/YYYY'));
                $("#ddlMedalla").val(respuesta.data.medallaId).trigger("change");
                $("#ddlMedalla").find("option").prop("disabled", true);
                $("#ddlMedalla").find("[value='" + respuesta.data.medallaId + "']").prop("disabled", false);
                $("#ddlMedalla").selectpicker('refresh');
                let $fileInput = $("#feditArchivoSoporteMedalla");
                $fileInput.val(respuesta.data.medArchivoSoporte);

                $("#flArchivoSoporteEdit").show(500);
            }
            else {
                MensajeGeneral("error",
                    "ERROR FOLIO DE VIDA",
                    "Se presento un error al intentar editar.",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR FOLIO DE VIDA",
                "Se presento un error al intentar editar.",
                "Aceptar");
        }
    });
});

$(document).on('click', ".medallaBorrar", function () {
    event.preventDefault();
    Swal.fire({
        title: 'FOLIO DE VIDA',
        text: "¿Estás seguro de eliminar la medalla, distintivo o reconocimiento?",
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
                    iMedallaID: parseInt($(this).attr('data-id'))
                },
                url: "/Batallon/BorrarMedalla",
                success: function (respuesta) {
                    if (respuesta) {
                        MensajeGeneral("success",
                            "FOLIO DE VIDA",
                            "La medalla, distintivo o reconocimiento fue eliminada correctamente",
                            "Aceptar");
                        GetViewMedallas();
                    }
                    else {
                        MensajeGeneral("error",
                            "ERROR FOLIO DE VIDA",
                            "Se presento un error al intentar eliminar la medalla, distintivo o reconocimiento",
                            "Aceptar");
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    MensajeGeneral("error",
                        "ERROR FOLIO DE VIDA",
                        "Se presento un error al eliminar la medalla, distintivo o reconocimiento",
                        "Aceptar");
                }
            });
        }
    })
})

function LimpiarCamposMedalla() {
    $("#hfEstudianteMedallaMedId").val(0);
    $("#hfEstudianteMedallaMedNombre").val('');
    $("#ddlMedalla")[0].selectedIndex = 0;
    $("#ddlMedalla").selectpicker('refresh');
    $("#flArchivoSoporteMedalla").val('');
    var optCategorias = "<option value=-1>Seleccione Categoría</option>";
    $("#ddlCategoriaMedalla").empty().html(optCategorias);
    $("#ddlCategoriaMedalla").selectpicker('refresh');
    $("#ddlMedalla-error").remove();
    $("#flArchivoSoporteMedalla-error").remove();
}