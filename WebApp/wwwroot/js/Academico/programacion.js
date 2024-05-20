$(document).ready(function () {
    CargaCalendariosInicial();
    $('#ProId').on('change', function () {
        CargarCalendarios(this);
    });
});

function CargaCalendariosInicial() {
    var proId = $("#ProId");
    var id = $(proId).val();
    if (id !== '') CargarCalendarios(proId);
}

//Carga de Combos en cascada
function CargarCalendarios(p)
{
    //Capturo el valor del calendario previo para ver si lo puedo reponer
    let calId = $("#CalId").val();
    //event.preventDefault();
    $.ajax({
        data: {
            ProId: parseInt($(p).val())
        },
        url: "/Calendario/GetCalendariosByPrograma",
        success: function (respuesta) {
            if (respuesta != null) {
                $("#CalId").empty().append('<option value=""></option>');

                $(respuesta).each(function () {
                    $("#CalId").append('<option " value="' + this.calId + '">' + this.calNombre + '</option>');
                });
                $("#CalId").selectpicker('refresh');
                $("#CalId").val(calId);
                $("#CalId").trigger('change');
                
            }
            else {
                MensajeGeneral("error",
                    "ERROR CARGA DE CALENDARIOS",
                    "Se presento un error al intentar cargar los calendarios",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR CARGA DE CALENDARIOS",
                "Se presento un error al intentar cargar los calendarios",
                "Aceptar");
        }
    });
}


