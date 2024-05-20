function periodoIsInValid(periodo, iPeriodoId) {
    var ruleInvalid = [0];
    var iPer = parseInt(iPeriodoId);

    if (periodo === 0) {
        ruleInvalid = [2, 3, 4, 5, 6, 7, 8, 10];
    } else if ((periodo + 1) === 9 || (periodo + 1) === 10) {
        ruleInvalid = [1, 2, 3, 4, 5, 6, 7, 8, 11];
    } else if ((periodo + 1) === 11) {
        ruleInvalid = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    } else {
        if ((periodo + 1) < iPer) {
            ruleInvalid = [iPer];
        }
    }

    var isMalo = ruleInvalid.includes(iPer);

    return isMalo;
}



$(document).on('click', ".btnPeriodo", function () {
    event.preventDefault();
    var iPeriodoId = $(this).attr('data-id');
    var iGrupoPeriodoId = $(this).attr('data-grupo');
    var iTabId = $(this).attr('data-tab-id');
    var sSingladura = $(this).attr('data-tab-singladura');

    $("#lblSingladura").html("Singladura: <b>" + sSingladura + "</b>");
    $(".btnPeriodo").removeClass("active");


    switch (iTabId) {
        //Aptitud naval
        case "3":
            $("#apnPeriodo").val(iPeriodoId);
            GetViewFactoresEvaluacion(iPeriodoId);
            break;
        //Disciplina
        case "4":
            GetViewSancionesDisciplinarias(iPeriodoId, iGrupoPeriodoId);
            break;
        case "5":
            var lastP = parseInt($("#txtLastPerIdPFis").val());
            var iPerMalo = periodoIsInValid(lastP, iPeriodoId);

            if (iPerMalo) {
                if ((lastP + 1) === 10 || (lastP + 1) === 11) {
                    MensajeGeneral("error",
                        "FOLIO DE VIDA",
                        "No es necesario evaluar otros periodos",
                        "Aceptar");
                } else {
                    MensajeGeneral("error",
                        "FOLIO DE VIDA",
                        "Existen periodos previos que no han sido evaluados o completados.",
                        "Aceptar");
                }

            } else {
                $("#culFisPeriodo").val(iPeriodoId);
                GetViewPruebasFisicasEstudiante(iPeriodoId);
                $("#btnPeriodo" + iPeriodoId + "_5").addClass("active");
            }
            break;
        //Practicas navales
        case "6":
            var lastP = parseInt($("#pnvLastPer").val());
            var iPerMalo = periodoIsInValid(lastP, iPeriodoId);

            if (iPerMalo) {
                if ((lastP + 1) === 10 || (lastP + 1) === 11) {
                    MensajeGeneral("error",
                        "FOLIO DE VIDA",
                        "Aun no es necesario evaluar otros periodos",
                        "Aceptar");
                } else {
                    MensajeGeneral("error",
                        "FOLIO DE VIDA",
                        "Existen periodos previos que no han sido evaluados o completados.",
                        "Aceptar");
                }

            } else {
                limpiarPracticasCal();
                GetViewConceptosPracticasNavales(iPeriodoId);
                $("#btnPeriodo" + iPeriodoId + "_6").addClass("active");
            }
            break;
        //Orden Cerrado
        case "7":
            GetViewOrdenPeriodo(iPeriodoId);
            $("#btnPeriodo" + iPeriodoId + "_7").addClass("active");
            break;
        //Programas navales
        case "8":
            $("#hfPeriodoProgramaNaval").val(iPeriodoId);
            GetViewCompetenciasProgramasNavales(iPeriodoId);
            break;
        case "9":
            GetViewResumen(iPeriodoId, iGrupoPeriodoId);
            break;
    }
})







$("#ddlProgramaNaval").change(function () {
    if ($("#hfPeriodoProgramaNaval").val() === '' || $("#hfPeriodoProgramaNaval").val() === undefined)
        return;

    GetViewCompetenciasProgramasNavales($("#hfPeriodoProgramaNaval").val());
})