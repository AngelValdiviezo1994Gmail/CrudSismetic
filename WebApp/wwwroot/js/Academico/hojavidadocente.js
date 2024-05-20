
$(document).ready(function () {
    ToglePanelSisbenEPS();

    CargaUsuarioInicial();

    $("#TipoDocId").change(function () {
        CargarUsuario();
    });

    $("#NumDocumento").change(function () {
        CargarUsuario();
    });

    $("#DatAdicSisben").change(function () {
        ToglePanelSisbenEPS();
    });

    $("#docenteControlHoras_TpClsId").change(function () {
        ToglePanelClasificacion();
    });

    $('#tabs-creacion-hv a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var targetTab = $(e.target).attr("href");

        if (targetTab == "#controlhoras") {
            $("#BtnsPrincipales").hide();
        } else {
            $("#BtnsPrincipales").show();
        }
    });
});

function ToglePanelClasificacion() {
    let IdTipoClasificacion = $('#docenteControlHoras_TpClsId option:selected').text();

    if (IdTipoClasificacion == 'Militar') {
        $("#ZonaClasificacionMilitar").show();
    } else {
        $("#ZonaClasificacionMilitar").hide();
    }
}

function ToglePanelSisbenEPS() {
    let show = false;
    if ($('#DatAdicSisben').is(':checked')) {
        show = true;
    }

    if (show === "true" || show == true) {
        $("#divSisben").show();
        $("#divEPS").hide();

    }
    else {
        $("#divSisben").hide();
        $("#divEPS").show();
    }
}

function CargaUsuarioInicial() {
    let iTipoDoc= $("#TipoDocId").val();
    let sNumDoc= $("#NumDocumento").val();
    if (iTipoDoc !== '' && sNumDoc !== '') CargarUsuario();
}

function CargarPrograma() {

    $("#numdoc").val('');
    $("#sexo").val('');
    $("#email").val('');

    var vestId = $("#UsuId").val();
    var result = lstUsuario.find(obj => {
        var intEstId = parseInt(vestId);
        return obj.usuId === intEstId
    });

    if (result != null) {
        $("#numdoc").val(result.usuIdentificacion);
        $("#sexo").val(result.usuGenero);
        $("#email").val(result.usuCorreo);
    }
}

function MostrarDetalleClasificacionCtrlHoras(id) {
    

    $.ajax({
        type: "POST",
        data: { id: id },
        url: GetURL() + "HojaVidaDocente/GetDetalleCtrlHrs",
        success: function (result) {
            var NombramientoVal = result.nombramiento == 'True' ? 'Sí' : 'No';

            $("#ModalClasificacionControlHorasDetalle").modal('show');
            $("#TpClasificacion").val(result.tpClsDesc);

            if (result.tpClsDesc == 'Militar') {
                $("#ZonaClasificacionMilitarModal").show();
            } else {
                $("#ZonaClasificacionMilitarModal").hide();
            }

            $("#CatMilitar").val(result.catMilDesc);
            $("#Nombramiento").val(NombramientoVal);
            $("#TpContrato").val(result.tpContratoDesc);
            $("#Dependencia").val(result.dependenciaDesc);
            $("#Cargo").val(result.cargoDesc);
            $("#Nivel").val(result.nivelDesc);
            $("#Escala").val(result.escala);
            $("#Puntos").val(result.puntos);
            $("#HrsContratadas").val(result.hrsContratadas);
            $("#HrsPlanificadas").val(result.hrsPlanificadas);
            $("#HrsEfectivas").val(result.hrsEfectivas);
            $("#HrsPendientes").val(result.hrsPendientes);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR TRAER ULTIMO NUMERO ASIGNATURA", "Se presento un error en el consumo del método de obtención numero Asignatura", "Aceptar");
        }
    });
}

function CerrarDetalleClasificacionCtrlHoras() {
    $("#ModalClasificacionControlHorasDetalle").modal('hide');
}