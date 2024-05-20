$(document).ready(function () {
    ToglePanelTraslado();

    CargaUsuarioInicial();

    $("#TipoSolId").change(function () {
        ToglePanelTraslado();
    });

    $("#UsuId").change(function () {
        CargarUsuario();
        CargarPrograma();
    });

});

function ToglePanelTraslado() {
    let show = false;
    if ($('#TipoSolId').val() === "2") {
        show = true;
    }

    if (show === "true" || show == true) {
        $("#divTraslado").show();
    }
    else {
        $("#divTraslado").hide();
    }
}

function CargaUsuarioInicial() {
    var vestId = $("#UsuId").val();
    if (vestId !== '') {
        CargarUsuario();
        CargarPrograma();
    }
}

function CargarUsuario() {

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
        $("#EstId").val(result.estId);
    }
}

function CargarPrograma() {

    var usuId = $("#UsuId").val();
    var result = lstUsuario.find(obj => {
        var intEstId = parseInt(usuId);
        return obj.usuId === intEstId
    });

    if (result != null) {
        var vEstId = result.estId;
    }
    $.ajax({
        data:
        {
            EstId: vEstId,
        },
        url: "/Programa/BuscarProgramaPorEstudiante",
        success: function (respuesta) {
            if (respuesta.data !== null) {
                var vRetiroProVal = $("#RetiroProId").val();
                $("#RetiroProId").empty().append('<option value=""></option>');
                $(respuesta.data).each(function () {
                    $("#RetiroProId").append('<option " value="' + this.proId + '">' + this.proNombre + '</option>');
                });
                $("#RetiroProId").selectpicker('refresh');
                $("#RetiroProId").val(vRetiroProVal);
                $("#RetiroProId").trigger('change');
            }
            else {
                MensajeGeneral('error',
                    'Aviso de sistema',
                    'Programa no encontrado',
                    'Aceptar');
                $("#RetiroProId").val('');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL ENCONTRAR EL PROGRAMA", "Se presento un error en la busqueda del identificador del programa", "Aceptar");
        }
    });
}
