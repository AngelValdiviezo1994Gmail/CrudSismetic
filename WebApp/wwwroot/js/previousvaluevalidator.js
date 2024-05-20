$(document).ready(function () {

    $.validator.addMethod("parcial2", function (value, element) {
        var previousval = $('.parcial1').val();
        var nextval1 = $('.parcial2').val();
        return (previousval != '0' && previousval!='') || nextval1 == '' || nextval1 == '0';
    }, "El valor anterior debe ser mayor a 0");
    //$('step-form-horizontal').validate();
    $('.inputform').validate();

    $.validator.addMethod("parcial3", function (value, element) {
        var previousval = $('.parcial2').val();
        var nextval1 = $('.parcial3').val();
        return (previousval != '0' && previousval != '') || nextval1 == '' || nextval1 == '0';
    }, "El valor anterior debe ser mayor a 0");
    //$('step-form-horizontal').validate();
    $('.inputform').validate();

    $.validator.addMethod("parcial4", function (value, element) {
        var previousval = $('.parcial3').val();
        var nextval1 = $('.parcial4').val();
        return (previousval != '0' && previousval != '') || nextval1 == '' || nextval1 == '0';
    }, "El valor anterior debe ser mayor a 0");
    //$('step-form-horizontal').validate();
    $('.inputform').validate();
});