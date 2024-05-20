
$(document).ready(function () {
    ToglePanelSisbenEPS();
    ToglePanelTipoDiscapacidad();
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
    $("#estudianteDatosAdicionales_DatAdicDiscapacidad").change(function () {
        ToglePanelTipoDiscapacidad();
    });

});

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

function ToglePanelTipoDiscapacidad() {
    let show = false;
    if ($('#estudianteDatosAdicionales_DatAdicDiscapacidad').val()=='1') {
        show = true;
    }

    if (show === "true" || show == true) {
        $("#divtipodiscapacidad").show();
    }
    else {
        $("#divtipodiscapacidad").hide();
    }
}

function CargaUsuarioInicial() {
    let iTipoDoc= $("#TipoDocId").val();
    let sNumDoc= $("#NumDocumento").val();
    if (iTipoDoc !== '' && sNumDoc !== '') CargarUsuario();
}

function CargarUsuario() {

    $("#Apellidos").val('');
    $("#Nombres").val('');
    $("#UserId").val('');
    $("#EstId").val('');

    $("#FechaNacimiento").html('');
    $("#lblCiudad").html('');
    $("#hfUsuarioID").val('');

    $.ajax({
        data:
        {
            iTipoDoc: $("#TipoDocId").val(),
            sNumDoc: $("#NumDocumento").val(),
        },
        url: "/HojaVidaEstudiante/BuscarUsuarioEstudiante",
        success: function (respuesta) {
            if (respuesta.data !== null) {
                //MensajeGeneral('success',
                //    'Aviso de sistema',
                //    'Usuario encontrado',
                //    'Aceptar');


                $("#Apellidos").val(respuesta.data.usuApellidos);
                $("#Nombres").val(respuesta.data.usuNombres);
                $("#FechaNacimiento").val(moment(respuesta.data.usuFechaNacimiento).format('YYYY/MM/DD'));
      //          $("#lblCiudad").html(respuesta.data.ciudad.ciuNombre);
                $("#UserId").val(respuesta.data.usuId);
                $("#EstId").val(respuesta.data.matricula.matId);

            }
            else {
                MensajeGeneral('error',
                    'Aviso de sistema',
                    'Usuario no encontrado',
                    'Aceptar');

                $("#NumDocumento").val('');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL ENCONTRAR EL USUARIO", "Se presento un error en la busqueda de la identidad de la persona", "Aceptar");
        }
    });
}

function CerrarModalEvaluacionDocente() {
    DesmarcaPreguntasEvaluacion();
    $('#PregEvaluacionDocente').modal('hide');
}
