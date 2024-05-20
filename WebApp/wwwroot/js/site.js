//$(document).ready(function () {
//    // Daterange picker
//    $('.input-daterange-datepicker').daterangepicker({
//        buttonClasses: ['btn', 'btn-sm'],
//        applyClass: 'btn-danger',
//        cancelClass: 'btn-inverse',
//        locale: {
//            format: 'YYYY/MM/DD'
//        }
//    });

//    // Pickadate
//    $('.pickadate').pickadate({
//        //min: 0,
//        format: 'yyyy/mm/dd',
//        formatSubmit: 'yyyy/mm/dd',
//        selectMonths: true,
//        selectYears: true,
//    });

//    // Colorpicker
//    $(".as_colorpicker").asColorPicker();
//    //Wizzard
//    var form = $("#step-form-horizontal");
//    var form1 = $("#step-edit-form-horizontal");

//    form.children('div').steps({
//        headerTag: "h4",
//        bodyTag: "section",
//        transitionEffect: "slideLeft",
//        autoFocus: true,
//        transitionEffect: "slideLeft",
//        labels: {
//            cancel: "Cancelar",
//            next: "Siguiente",
//            previous: "Anterior",
//            finish: "Crear"
//        },
//        onStepChanging: function (event, currentIndex, newIndex) {
//            form.validate().settings.ignore = ":disabled,:hidden";
//            return form.valid();
//        },
//        onFinished: function (event, currentIndex) {
//            form.submit();
//        }
//    });

//    form1.children('div').steps({
//        headerTag: "h4",
//        bodyTag: "section",
//        transitionEffect: "slideLeft",
//        autoFocus: true,
//        transitionEffect: "slideLeft",
//        labels: {
//            cancel: "Cancelar",
//            next: "Siguiente",
//            previous: "Anterior",
//            finish: "Guardar Cambios"
//        },
//        onStepChanging: function (event, currentIndex, newIndex) {
//            form1.validate().settings.ignore = ":disabled,:hidden";
//            return form1.valid();
//        },
//        onFinished: function (event, currentIndex) {
//            form1.submit();
//        }
//    });
//});

(function ($) {
    // Daterange picker
    try {
        $('.input-daterange-datepicker').daterangepicker({
            buttonClasses: ['btn', 'btn-sm'],
            applyClass: 'btn-danger',
            cancelClass: 'btn-inverse',
            locale: {
                format: 'YYYY/MM/DD'
            }
        });
    } catch (e) {

    }

    try {
        // Pickadate
        $('.pickadate').datepicker({
            format: "dd/mm/yyyy",
            todayBtn: false,
            language: "es"
        });
    } catch (e) {

    }

    try {
        //Wizzard
        var form = $("#step-form-horizontal");
        var form1 =$("#step-edit-form-horizontal");

        form.children('div').steps({
            headerTag: "h4",
            bodyTag: "section",
            transitionEffect: "slideLeft",
            autoFocus: true,
            transitionEffect: "slideLeft",
            labels: {
                cancel: "Cancelar",
                next: "Siguiente",
                previous: "Anterior",
                finish: "Crear"
            },
            onStepChanging: function (event, currentIndex, newIndex) {
                form.validate().settings.ignore = ":disabled,:hidden";
                return form.valid();
            },
            onFinished: function (event, currentIndex) {
                form.submit();
            }
        });

        form1.children('div').steps({
            headerTag: "h4",
            bodyTag: "section",
            transitionEffect: "slideLeft",
            autoFocus: true,
            transitionEffect: "slideLeft",
            labels: {
                cancel: "Cancelar",
                next: "Siguiente",
                previous: "Anterior",
                finish: "Guardar Cambios"
            },
            onStepChanging: function (event, currentIndex, newIndex) {
                form1.validate().settings.ignore = ":disabled,:hidden";
                return form1.valid();
            },
            onFinished: function (event, currentIndex) {
                form1.submit();
            }
        });
    } catch (e) {

    }

    try {

        // Colorpicker
        $(".as_colorpicker").asColorPicker();
    } catch (e) {

    }
   
}) (jQuery);

function GetURL() {
    var nameProject = '';
    var url;

    url = window.location.host + "/";
    if (url.split(":")[0] != "localhost") {
        //nameProject = "SEN/";
    }
    url = window.location.protocol + "//" + url + nameProject;
    return url;
}

function ConfirmarCargaUsuarios() {
    $.ajax({
        type: "POST",
        data: { ConfirmacionCarga: true },
        url: GetURL() + "Usuarios/ConfirmarCarga",
        success: function (respuesta) {
            MensajeGeneral(respuesta.tipoMensaje, respuesta.titulo, respuesta.mensaje, respuesta.botonAceptar, GetURL() + "Usuarios/CargaMasiva");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR CONFIRMACIÓN CARGA USUARIOS", "Se presento un error en el consumo del método de carga de usuarios masiva", "Aceptar");
        }
    });
}

function ConfirmarCargaUsuariosManual(CantidadUsuarios, nombrearchivo) {
    var TipoMensaje = "question"
        , Titulo = "CONFIRMAR IMPORTE ARCHIVO"
        , Mensaje = "Archivo " + nombrearchivo + ", Usuarios: " + CantidadUsuarios
        , TextBotonConfirmar = "Confirmar"
        , TextBotonCancelar = "Cancelar"
        , FuncionDestino = "ConfirmarCargaUsuarios()"

    MensajeConfirmacion(TipoMensaje, Titulo, Mensaje, TextBotonConfirmar, TextBotonCancelar, FuncionDestino);
}

function TomarPrimeraLetra(frase, palabras) {
    let primerasletras = frase
        .split(' ')
        .map(word => word[0])
        .join('');
    return primerasletras.substr(0, palabras);
}