$(document).ready(function () {
    iniciapaneles();
    $('#CtaBcoEstado').change(function () {
        let toggle = ($(this).val() == "0") ? true : false;
        tooglepanels(toggle);
    });
});

function iniciapaneles() {
    let toggle = ($('#CtaBcoEstado').val() == "0") ? true : false;
    tooglepanels(toggle);
}

function tooglepanels(show) {
    if (show === "true" || show == true) {
        $("#divMotivo").show();
    }
    else {
        $("#divMotivo").hide();
    }
}