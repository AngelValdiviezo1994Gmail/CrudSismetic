$(document).ready(function () {
    getSelectBoxInstance("cmbPrograma").getDataSource().reload();
    $("#btnLimpiar").on("click", function () {
        getSelectBoxInstance("cmbPrograma").option('value', null);
        getSelectBoxInstance("cmbSemestre").option('value', null);
        getSelectBoxInstance("cmbAnio").option('value', null);
        getSelectBoxInstance("cmbCurso").option('value', null);
        ObtenerFiltros();
    });
});

var changedBySelectBox;
var titleSelectBox;
var clearSelectionButton;

var arrayIdsOperaciones = [];

function cmbProgramaValueChanged(data) {
    getSelectBoxInstance("cmbSemestre").option('value', null);
    getSelectBoxInstance("cmbSemestre").getDataSource().reload();
    getSelectBoxInstance("cmbAnio").option('value', null);
    getSelectBoxInstance("cmbAnio").getDataSource().reload();
    ObtenerFiltros(); 
}

function cmbSemestreValueChanged(data) {
    getSelectBoxInstance("cmbCurso").option('value', null);
    getSelectBoxInstance("cmbCurso").getDataSource().reload();
    ObtenerFiltros();
}

function cmbAnioValueChanged(data) {
    ObtenerFiltros();
}

function cmbCursoValueChanged(data) {
    ObtenerFiltros();
}

function getSemestre() {
    return getSelectBoxInstance("cmbSemestre").option('value');
}

function getProId() {
    return getSelectBoxInstance("cmbPrograma").option('value');
}

function getCurso() {
    return getSelectBoxInstance("cmbCurso").option('value');
}

function getAnio() {
    return getSelectBoxInstance("cmbAnio").option('value');
}

function ObtenerFiltros() {
    $.ajax({
        data: {
            prodId: getProId(),
            semestre: getSemestre(),
            anio: getAnio(),
            curso: getCurso()
        },
        type: "GET",
        url: `GetInfoPrograma`,
        success: function (response) {
            console.log(response);
            getDataGridInstance("gridConsultaInfo").refresh();
        },
        error: function (xhr, status, error) {
            console.error('Error al actualizar la tabla:', error);
        }
    });
}

function DetallesHojaVida(id) {
    
    $.ajax({
        type: "GET",
        url: `/HojaVidaEstudiante/Details/${id}`,
        success: function (response) {
            window.location.href = `/HojaVidaEstudiante/Details/${id}`;
        },
        error: function (xhr, status, error) {
            MensajeGeneral("error",
                "ERROR AL CARGAR HOJA DE VIDA ESTUDIANTE",
                "No se pudo cargar la hoja de vida del estudiante",
                "Aceptar");
        }
    });
}


function getDataGridInstance(idGridview) {
    let element = document.getElementById(idGridview);
    return DevExpress.ui.dxDataGrid.getInstance(element);
}

function getSelectBoxInstance(idSelectBox) {
    let element = document.getElementById(idSelectBox);
    return DevExpress.ui.dxSelectBox.getInstance(element);
}





