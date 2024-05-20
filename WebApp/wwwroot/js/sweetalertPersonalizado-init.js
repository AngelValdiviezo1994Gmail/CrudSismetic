$(function () {
    var MensajeConfiguracion = $("#MensajeConfiguracion").val();
    if (MensajeConfiguracion) {
        var ConfiMensaje = JSON.parse(MensajeConfiguracion);

        switch (ConfiMensaje.TipoMensaje) {
            case "success":
            case "error":
            case "warning":
            case "info":
                MensajeGeneral(ConfiMensaje.TipoMensaje, ConfiMensaje.Titulo, ConfiMensaje.Mensaje, ConfiMensaje.BotonAceptar)
                break;
            case "question":
                MensajeConfirmacion(ConfiMensaje.TipoMensaje, ConfiMensaje.Titulo, ConfiMensaje.Mensaje, ConfiMensaje.BotonAceptar, ConfiMensaje.BotonCancelar, ConfiMensaje.FuncionDestino);
                break;
        }
    }
});

function MensajeGeneral(TipoMensaje, Titulo, Mensaje, TextBoton, UrlDestino = null) {
    Swal.fire({
        title: Titulo,
        text: Mensaje,
        icon: TipoMensaje,
        confirmButtonText: TextBoton,
        confirmButtonColor: '#1367c8',
    }).then(function (t) {
        if (UrlDestino) {
            window.location.href = UrlDestino;
        }
    });
}

function MensajeConfirmacion(TipoMensaje, Titulo, Mensaje, TextBotonConfirmar, TextBotonCancelar, FuncionDestino) {
    Swal.fire({
        title: Titulo,
        text: Mensaje,
        icon: TipoMensaje,
        showCancelButton: true,
        confirmButtonColor: '#1367c8',
        cancelButtonColor: '#9e9e9e',
        confirmButtonText: TextBotonConfirmar,
        cancelButtonText: TextBotonCancelar,
        showLoaderOnConfirm: true
    }).then((result) => {
        if (result.isConfirmed) {
            eval(FuncionDestino);
        }
    })
}