$(document).ready(function () {
    $.validator.addMethod("endDate", function (value, element) {
        var startDate = moment($('.startDate').val(), "DD/MM/YYYY");
        var endDate = moment($('.endDate').val(), "DD/MM/YYYY");
        return startDate <= endDate || endDate == "" || $('.endDate').val() == "";
    }, "La fecha inicial debe ser menor a la fecha final");
    $('.inputform').validate();

    $.validator.addMethod("endTime", function (value, element) {
        var startTime = $('.startTime').val();
        var endTime = $('.endTime').val();
        return startTime <= endTime || endTime == "";
    }, "La hora inicial debe ser menor a la hora final");
    $('.inputform').validate();

});