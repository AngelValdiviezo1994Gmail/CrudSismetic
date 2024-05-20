
$("#t_1").change(fn => {
    fn.preventDefault();
    var check = $("#t_1").prop('checked');
    if (check) {      
        if (validaForm()) {
            fnGenSecurity(true);
        } else {
            $("#t_1").prop('checked', false);
        }
    }
});

$("#ddFakeBtnLogin").click(fn => {
    fn.preventDefault();
   
        if (validaForm()) {
            fnGenSecurity(false);
        }
    
});

$("#ddlNewT").click(fn => {
    fn.preventDefault();

    if (validaForm()) {
        $('#ddlNT').hide(500);
        fnGenSecurity(false);
    }

});

function validaForm() {
    var email = $('#usuario').val();
    var password = $('#id_password').val();

    var isValid = true;

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() === '') {
        isValid = false;
        $('.text-danger.field-validation-valid[data-valmsg-for="usuario"]').show();
        $('.text-danger.field-validation-valid[data-valmsg-for="usuario"]').text('Por favor, captura tu Usuario');

    } else if (!emailRegex.test(email)) {
        isValid = false;
        $('.text-danger.field-validation-valid[data-valmsg-for="usuario"]').text('Por favor, ingresa un correo electrónico válido');
        $('.text-danger.field-validation-valid[data-valmsg-for="usuario"]').show(500);
    } else {
        $('.text-danger.field-validation-valid[data-valmsg-for="usuario"]').text('');
        $('.text-danger.field-validation-valid[data-valmsg-for="usuario"]').remove();
    }

    if (password.trim() === '') {
        isValid = false;
        $('.text-danger.field-validation-valid[data-valmsg-for="clave"]').text('Por favor, captura tu Contraseña');
        $('.text-danger.field-validation-valid[data-valmsg-for="clave"]').show(500);
    } else {
        $('.text-danger.field-validation-valid[data-valmsg-for="clave"]').text('');
        $('.text-danger.field-validation-valid[data-valmsg-for="clave"]').remove();
    }
    return isValid;
}

function validaFormComplete() {
    var email = $('#usuario').val();
    var password = $('#id_password').val();
    var esc = $('select[name="EscId"]');
    var tk = $('input[name="token"]').val();

    var isValid = true;

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() === '') {
        isValid = false;
        $('.text-danger.field-validation-valid[data-valmsg-for="usuario"]').show();
        $('.text-danger.field-validation-valid[data-valmsg-for="usuario"]').text('Por favor, captura tu Usuario');

    } else if (!emailRegex.test(email)) {
        isValid = false;
        $('.text-danger.field-validation-valid[data-valmsg-for="usuario"]').text('Por favor, ingresa un correo electrónico válido');
        $('.text-danger.field-validation-valid[data-valmsg-for="usuario"]').show(500);
    } else {
        $('.text-danger.field-validation-valid[data-valmsg-for="usuario"]').text('');
        $('.text-danger.field-validation-valid[data-valmsg-for="usuario"]').remove();
    }

    if (password.trim() === '') {
        isValid = false;
        $('.text-danger.field-validation-valid[data-valmsg-for="clave"]').text('Por favor, captura tu Contraseña');
        $('.text-danger.field-validation-valid[data-valmsg-for="clave"]').show(500);
    } else {
        $('.text-danger.field-validation-valid[data-valmsg-for="clave"]').text('');
        $('.text-danger.field-validation-valid[data-valmsg-for="clave"]').remove();
    }

    if (esc == undefined || esc[0].selectedIndex < 1) {
        isValid = false;
        $('.text-danger.field-validation-valid[data-valmsg-for="EscId"]').text('Por favor, selecciona una escuela');
        $('.text-danger.field-validation-valid[data-valmsg-for="EscId"]').show(500);
    } else {
        $('.text-danger.field-validation-valid[data-valmsg-for="EscId"]').text('');
        $('.text-danger.field-validation-valid[data-valmsg-for="EscId"]').remove();
    }
    if (tk.trim() === '') {
        isValid = false;
        $('.text-danger.field-validation-valid[data-valmsg-for="token"]').text('Por favor, ingresa el token enviado a tu correo');
        $('.text-danger.field-validation-valid[data-valmsg-for="token"]').show(500);
    } else if (tk.trim().length !== 6) {
        isValid = false;
        $('.text-danger.field-validation-valid[data-valmsg-for="token"]').text('La longitud del token es incorrecta');
        $('.text-danger.field-validation-valid[data-valmsg-for="token"]').show(500);
    } else {
        $('.text-danger.field-validation-valid[data-valmsg-for="token"]').text('');
        $('.text-danger.field-validation-valid[data-valmsg-for="token"]').remove();
    }
    return isValid;
}

function fnGenSecurity(ck) {
    var Usr = $("#usuario").val();
    $.ajax({
        url: "/Autenticacion/GenerateToken",
        data:
        {
            usuario: Usr,
            hash: $("#id_password").val(),
            nToken: ck
        },
        cache: false,
        type: "POST",
        success: function (data) {
            if (data.succeeded) {
                $("#ddLoginEsc").show(500);
                $("#ddLoginTk").show(500);
                $("#ddFakeBtnLogin").hide();
                $("#ddlCToken").hide();
                $("#ddlActiva").hide();
                $("#ddBtnLogin").show(500);
                fnObtenerEscuelas();
                setTimeout(function () {
                    $('#ddlNT').show(500);
                }, 59000); // 60 segundos
                $("#usuario").prop('readonly', true);
                $('#id_password').prop('readonly', true);
            } else {
                location.reload();
            }
            
        },
        error: function (reponse) {
            alert("error : " + reponse);
        }
    });
}

function fnObtenerEscuelas() {
    var Usr = $("#usuario").val();
    if (Usr !== '') {

        $.ajax({
            url: "/Autenticacion/ObtenerEscuelasAsignadas",
            data:
            {
               usuario:Usr
            },
            cache: false,
            type: "POST",
            success: function (data) {
              
                var optEscuelas = data.length > 0 ? "<option value =-1>Seleccione Escuela</option>" : "<option value =70>Administrativo</option>";
                
                for (var x = 0; x < data.length; x++) {
                    optEscuelas += "<option value=" + data[x].escId + ">" + data[x].escNombre + "</option>";
                }
                $("#ddlEscuelas").html(optEscuelas);
                
                $("#ddlEscuelas").selectpicker('refresh');
                if (data.length > 0) {
                    $("#ddLoginEsc").show(500);
                }
            },
            error: function (reponse) {
                alert("error : " + reponse);
            }
        });
    }

    $("#frmLogin").submit(function (event) {
        // Código del manejador del evento
        event.preventDefault();
        if (validaFormComplete()) {
            $(this).off('submit').submit();
        }
    });
}