function CargarUsuario() {

    $("#Apellidos").val('');
    $("#Nombres").val('');
    $("#UserId").val('');


    $("#FechaNacimiento").html('');
    $("#lblCiudad").html('');
    $("#hfUsuarioID").val('');

    $('#docenteControlHoras_HrsPlanificadas').change(function () {
        var valor1 = $('#docenteControlHoras_HrsPlanificadas').val();
        var valor2 = $('#docenteControlHoras_HrsEfectivas').val();
        var resultado = valor1 - valor2;
        $('#docenteControlHoras_HrsPendientes').val(resultado);        
    });

    $('#docenteControlHoras_HrsEfectivas').change(function () {
        var valor1 = $('#docenteControlHoras_HrsPlanificadas').val();
        var valor2 = $('#docenteControlHoras_HrsEfectivas').val();
        var resultado = valor1 - valor2;
        $('#docenteControlHoras_HrsPendientes').val(resultado);
    });

    $.ajax({
        data:
        {
            iTipoDoc: $("#TipoDocId").val(),
            sNumDoc: $("#NumDocumento").val(),
        },
        url: "/HojaVidaDocente/BuscarUsuarioDocente",
        success: function (respuesta) {
            if (respuesta.data !== null) {
                //MensajeGeneral('success',
                //    'Aviso de sistema',
                //    'Usuario encontrado',
                //    'Aceptar');

                $("#Apellidos").val(respuesta.data.usuApellidos);
                $("#Nombres").val(respuesta.data.usuNombres);
                $("#CiuIdExpedicionDoc").val(respuesta.data.usuLugarExpedicionDocId);
                $("#DepIdExpedicionDoc").val(respuesta.data.usuDepartamentoExpedicionDocId);
                $("#PaisIdNacimiento").val(respuesta.data.paisId);
                $("#EstCivId").val(respuesta.data.EstCivId);
                $("#FechaNacimiento").val(moment(respuesta.data.usuFechaNacimiento).format('YYYY/MM/DD'));
                $("#CuiIdNacimiento").val(respuesta.data.ciuId);
                $("#DepIdNacimiento").val(respuesta.data.DepId);
                $("#UserId").val(respuesta.data.usuId);
                $("#empleado_EmpNombre").val(respuesta.data.usuNombreCompleto);

                
                
            }
            else {
                MensajeGeneral('error',
                    'Aviso de sistema',
                    'Usuario no encontrado, ' + respuesta.error,
                    'Aceptar');

                $("#NumDocumento").val('');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL ENCONTRAR EL USUARIO", "Se presento un error en la busqueda de la identidad de la persona", "Aceptar");
        }
    });
}
