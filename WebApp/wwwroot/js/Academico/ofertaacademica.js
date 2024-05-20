$(document).ready(function () {
    $('#TipProgId').on('change', function () {
        CargarProgramas(this);
    });
});

//Carga de Combos en cascada
function CargarProgramas(p) {
    event.preventDefault();
    $.ajax({
        data: {
            ProTipo: parseInt($(p).val())
        },
        url: "/Programa/GetProgramasByTipo",
        success: function (respuesta) {
            if (respuesta != null) {
                $("#ProId").empty().append('<option value=""></option>');

                $(respuesta).each(function () {
                    $("#ProId").append('<option " value="' + this.proId + '">' + this.proNombre + '</option>');
                });
                $("#ProId").selectpicker('refresh');
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


