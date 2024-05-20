$(document).ready(function () {

    let editmode = $("#EditMode").val();
    //crear
    if (editmode == "1")
        getSelectBoxInstance("cmbSeccion").getDataSource().reload();

    //ver detalle
    if (editmode == "0") {
        getSelectBoxInstance("cmbSubModulo").option('disabled', true);
        getSelectBoxInstance("cmbSeccion").option('disabled', true);
    }

});



function cmbSeccionValueChanged(data) {
    getSelectBoxInstance("cmbSubModulo").option('value', null);
    getSelectBoxInstance("cmbSubModulo").getDataSource().reload();
    getSelectBoxInstance("cmbSubModulo").option('value', $("#ModId").val());
}

function cmbSubModulosValueChanged(data) {
    $("#ModId").val(data.value);
}

function getIdSecLoadParams() {
    return getSelectBoxInstance("cmbSeccion").option('value');
}

function getSelectBoxInstance(idSelectBox) {
    let element = document.getElementById(idSelectBox);
    return DevExpress.ui.dxSelectBox.getInstance(element);
}


function CrearTransaccion() {

    event.preventDefault();
    var frmCreateTrans = $('#frmCreateTrans');
    var bFormValido = frmCreateTrans.valid();
    if (!bFormValido) {
        return false
    }

    $("#frmCreateTrans").submit();
}

function DeleteItem(id) {
    $.ajax({
        type: "POST",
        data: { id: id },
        url: GetURL() + "Opciones/Inactivar",

        success: function (respuesta) {
            MensajeGeneral(respuesta.tipoMensaje, respuesta.titulo, respuesta.mensaje, respuesta.botonAceptar, GetURL() + "Opciones/Index");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR CONFIRMACIÓN ELIMINAR TRANSACCIÓN", "Se presento un error en el consumo del método de eliminación de la Transacción", "Aceptar");
        }
    });

}

function ConfirmarEliminarItem(idItem, nombreItem) {
    var TipoMensaje = "question"
        , Titulo = "¿Quieres eliminar la Transacción?"
        , Mensaje = "La Transacción de nombre <" + nombreItem + "> será inactivada, esta seguro que desea ejecutar esta acción"
        , TextBotonConfirmar = "Confirmar"
        , TextBotonCancelar = "Cancelar"
        , FuncionDestino = "DeleteItem(" + idItem + ")"

    MensajeConfirmacion(TipoMensaje, Titulo, Mensaje, TextBotonConfirmar, TextBotonCancelar, FuncionDestino);
}
