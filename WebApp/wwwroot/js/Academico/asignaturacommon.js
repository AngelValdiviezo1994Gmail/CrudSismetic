$(document).ready(function () {

    iniciapaneles();
 
    calculaTotalHoras();
    calculaTotalPorcentajes();
    $('#CarAsigId1').click(function () {
        tooglepanels(true);
        calculaTotalPorcentajes();
    });

    $('#CarAsigId2').click(function () {
        tooglepanels(false);
        $("#AsigTotPorcentaje").val('');
    });

    $('#AsigIntegradaSi').click(function () {
        toogleAsigpanel(true);
    });

    $('#AsigIntegradaNo').click(function () {
        toogleAsigpanel(false);
    });

});

function iniciapaneles() {
    if ($('#CarAsigId1').is(':checked')) {
        tooglepanels(true);
    }
    else {
        tooglepanels(false);
    }

    if ($('#AsigIntegradaSi').is(':checked')) {
        toogleAsigpanel(true);
    }
    else {
        toogleAsigpanel(false);
    }
}

function tooglepanels(show) {
    if (show === "true" || show == true) {
        $("#divcheckbox").show();
        $("#divparciales").show();

    }
    else {
        $("#divcheckbox").hide();
        $("#divparciales").hide();
    }
}

function toogleAsigpanel(show) {
    if (show === "true" || show == true) {
        $("#divAsignaturas").show();
    }
    else {
        $("#divAsignaturas").hide();
    }
}

function calculaTotalHoras() {
    let horasTeorico = $("#AsigHorTrabTeor").val();
    let horasPractico = $("#AsigHorTrabPrac").val();
    let horasInvestigacion = $("#AsigHorTrabInvest").val();

    let hTeorico = horasTeorico === null || horasTeorico === undefined || horasTeorico === '' ? 0 : parseInt(horasTeorico);
    let hPractico = horasPractico === null || horasPractico === undefined || horasPractico === '' ? 0 : parseInt(horasPractico);
    let hInvestigacion = horasInvestigacion === null || horasInvestigacion === undefined || horasInvestigacion === '' ? 0 : parseInt(horasInvestigacion);

    let hTotal = hTeorico + hPractico + hInvestigacion;
    $("#AsigTotHorAsignatura").val(hTotal);
}

function calculaTotalPorcentajes() {
    let AsigPrimerParcial = $("#AsigPrimerParcial").val();
    let AsigSegundoParcial = $("#AsigSegundoParcial").val();
    let AsigTercerParcial = $("#AsigTercerParcial").val();
    let AsigCuartoParcial = $("#AsigCuartoParcial").val();


    let vAsigPrimerParcial = AsigPrimerParcial === null || AsigPrimerParcial === undefined || AsigPrimerParcial === '' ? 0 : parseInt(AsigPrimerParcial);
    let vAsigSegundoParcial = AsigSegundoParcial === null || AsigSegundoParcial === undefined || AsigSegundoParcial === '' ? 0 : parseInt(AsigSegundoParcial);
    let vAsigTercerParcial = AsigTercerParcial === null || AsigTercerParcial === undefined || AsigTercerParcial === '' ? 0 : parseInt(AsigTercerParcial);
    let vAsigCuartoParcial = AsigCuartoParcial === null || AsigCuartoParcial === undefined || AsigCuartoParcial === '' ? 0 : parseInt(AsigCuartoParcial);

    let hTotal = vAsigPrimerParcial + vAsigSegundoParcial + vAsigTercerParcial + vAsigCuartoParcial;
    $("#AsigTotPorcentaje").val(hTotal);
}


function iniciapanelesEdit() {
    $('#radioButtonContainerId input:radio').click(function () {
        if ($(this).val() === '1') {
            tooglepanels(true);
        } else if ($(this).val() === '2') {
            tooglepanels(false);
        }
    });
}