$(document).ready(function () {
    iniciapaneles();
    $("#asignaturasPartialDiv > input").attr("readonly", true);
    $("#asignaturasPartialDiv > input").attr("disabled", true);
    $("#asignaturasPartialDiv > select").attr("readonly", true);
    $("#asignaturasPartialDiv > select").attr("disabled", true);
    CargaPeriodicidadInicial();

    $('#PeriodicidadId').on('change', function () {
        CargarPeriodicidad();
    });

    $('#ProSecundarioSi').click(function () {
        toogleProgpanel(true);
    });

    $('#ProSecundarioNo').click(function () {
        toogleProgpanel(false);
    });

});

function iniciapaneles() {
    if ($('#ProSecundarioSi').is(':checked')) {
        toogleProgpanel(true);
    }
    else {
        toogleProgpanel(false);
    }
}

function toogleProgpanel(show) {
    if (show === "true" || show == true) {
        $("#divProgramas").show();
    }
    else {
        $("#divProgramas").hide();
    }
}


function CargaPeriodicidadInicial() {
    var vPerId = $("#PeriodicidadId").val();
    if (vPerId !== '') CargarPeriodicidad();
}


function CargarPeriodicidad() {

    var duracionActual = $("#ProDuracion").val();
    $("#ProDuracion").val('');
    var vPerId = $("#PeriodicidadId").val();
    var result = lstPeriodicidad.find(obj => {
        var intPeriodicidadId = parseInt(vPerId);
        return obj.periodicidadId === intPeriodicidadId
    });

    if (result != null) {
        let ciclos = result.periodicidadMaxCiclos
        $("#ProDuracion").empty();
        for (var i = 1; i <= ciclos; i++) {
            $("#ProDuracion").append('<option " value="' + i + '">' + i + '</option>');
        }

        $("#ProDuracion").val(duracionActual);

        $("#ProDuracion").selectpicker('refresh');
    }
}
