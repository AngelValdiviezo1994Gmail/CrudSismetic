$(document).ready(function () {
    CargaEstudiantesInicial();

    MostrarDatosOrden();

    $('#CurAcadId').on('change', function () {
        let curso = $('#CurAcadId').val();
        CargarEstudiantes(curso);
    });
});

function iniciapaneles() {
    //$("#divlista").show();
    $("#divordenmatricula").hide();
}

function CargaEstudiantesInicial() {
    var vcurso = $("#CurAcadId").val();
    //if (vcurso !== '') CargarEstudiantes(vcurso);
}

function CargarEstudiantes(itemId) {
    /*
    let body = $("#tbodyEstudiantes");
    body.html();
    */
    $.ajax({
        data:
        {
            id: itemId,
        },
        url: "/OrdenMatricula/GetDetalleEstudiantes",
        success: function (respuesta) {
            let element = document.getElementById("gridEstudiantesLstPartial");
            let instance = DevExpress.ui.dxDataGrid.getInstance(element);
            instance.refresh(item);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL BUSCAR LOS ESTUDIANTES", "Se presento un error en la busqueda de los estudiantes", "Aceptar");
        }
    });

}


function MostrarDatosOrden() {
    $("#divordenmatricula").show();
    let body = $("#divordenmatricula");
    body.html('');

    //event.preventDefault();
    $.ajax({
        data: {
            id: 0
        },
        url: "/OrdenMatricula/CargarOrdenPartial",
        success: function (respuesta) {
            if (respuesta != null) {
                body.html(respuesta);
                try {
                    // Pickadate
                    $('.pickadate').datepicker({
                        format: "dd/mm/yyyy",
                        todayBtn: false,
                        language: "es"
                    });
                } catch (e) {

                }
            }
            else {
                MensajeGeneral("error",
                    "ERROR CARGA DE DATOS ORDEN",
                    "Se presento un error al intentar cargar formulario de orden",
                    "Aceptar");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR CARGA DE DATOS ORDEN",
                "Se presento un error al intentar cargar formulario de Orden",
                "Aceptar");
        }
    });
}

function GuardarOrden() {
    event.preventDefault();
    var frmDatos = $('#frmorden');
    let body = $("#divlista");
    var bFormValido = frmDatos.valid();
    if (!bFormValido) {
        return false
    }

    let vorden = CargarDatosOrden()
    event.preventDefault();

    if (vorden != null) {
        $.ajax({
            type: "POST",
            data: {
                //planid: idPlan,
                //asigid : idAsignatura,
                //semestreid: semestre,
                //proid: idPro,
                orden: vorden,
            },
            url: "/OrdenMatricula/AgregarOrden",
            success: function (respuesta) {
                if (respuesta != null) {
                    if (!respuesta.includes("error")) {
                        MensajeGeneral("success",
                            "REGISTRO DE ORDEN DE MATRICULA",
                            "El registro se guardó satisfactoriamente",
                            "Aceptar", GetURL() + "OrdenMatricula/Index");
                        //divlista, html(respuesta);
                        //iniciapaneles();

                    }
                    else {
                        MensajeGeneral("error",
                            "ERROR GRABAR ORDENES",
                            respuesta,
                            "Aceptar");
                    }
                }
                else {
                    MensajeGeneral("error",
                        "ERROR GRABAR ORDENES",
                        "Se presento un error al intentar grabar la orden",
                        "Aceptar");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                MensajeGeneral("error",
                    "ERROR CARGA DE ORDENES",
                    "Se presento un error al intentar cargar las ordenes",
                    "Aceptar");
            }
        });
    }

}


function MostrarResolucionesCostosSeleccionables() {
    /*
    $("#MatCodResCosto").val("");
    $("#ConceptoResCosto").val("");
    $("#ModalSeleccionableResolucionCostos").modal("show");
    */
    $.ajax({
        url: "/ConceptoCosto/GetConceptosCostosCarrito",
        success: function (respuesta) {
            if (respuesta !== null) {
                $("#MatCodResCosto").val("");
                $("#ConceptoResCosto").val("");
                $("#ModalSeleccionableResolucionCostos").modal("show");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL ENCONTRAR LAS RESOLUCIONES DE COSTOS", "Se presentó un error al cargar las resoluciones de costos.", "Aceptar");
        }
    });
    
}


function GuardarSeleccionResolucionesCostos() {
    let CodMat = "";
    let Concepto = "";
    let CantidadFinal = "";
    var SumaCantidades = 0;

    let element = document.getElementById("gridResolucionCostosSeleccionable");
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    var allGridItems = instance.getSelectedRowsData();

    /*
    var ContGrdTotal = instance.getDataSource().items().length;
    var ContGrdSelect = instance.getSelectedRowsData().length;
    
    if (ContGrdTotal == ContGrdSelect) {
        CodMat = "TODOS";
        Concepto = "TODOS";
        for (var i = 0; i < allGridItems.length; i++) {
            var row = allGridItems[i];
            SumaCantidades = SumaCantidades + row.resValor;
        }
    } else {
        */
    for (var i = 0; i < allGridItems.length; i++) {
        var row = allGridItems[i];
        var valor = Number(row.concepCostoValor);
        SumaCantidades = SumaCantidades + valor;//row.concepCostoValor;
        if (CodMat == "" || Concepto == "") {
            CodMat = row.concepCostoCodigo;
            Concepto = row.concepCostoDescripcion;
        } else {
            CodMat = CodMat + ", " + row.concepCostoCodigo;
            Concepto = Concepto + ", " + row.concepCostoDescripcion;
        }
    }

    //}

    CantidadFinal = "$" + SumaCantidades;
    //$("#MatCodResCosto").val(CodMat);
    $("#OrdenMatCod").val(CodMat);
    $("#OrdenMatConcepto").val(Concepto);
    $("#OrdenMatValor").val(CantidadFinal);

    $('#ModalSeleccionableResolucionCostos').modal('hide');
    //document.getElementById("div_nav_ut_masiv").click();
}

function CerrarModalSeleccionResolucionesCostos() {
    $('#ModalSeleccionableResolucionCostos').modal('hide');
}


function CargarDatosOrden() {
    var retornaDatos = true;
    let orden = {};
    var _OrdenMatValor = $("#OrdenMatValor").val();
    var varOrdenMatValor = _OrdenMatValor.substring(1, _OrdenMatValor.length);//$("#OrdenMatValor").val();
    orden.OrdenMatValor = varOrdenMatValor;

    //orden.OrdenMatCode = "OM-0000";
    orden.CurAcadId = $("#CurAcadId").val();
    orden.OrdenMatConcepto = $("#OrdenMatConcepto").val();
    orden.OrdenMatCod = $("#OrdenMatCod").val();
    
    orden.OrdenMatFechaLimitePagoOrdinario = $('#OrdenMatFechaLimitePagoOrdinario').val();
    orden.OrdenMatFechaLimitePagoExtra = $('#OrdenMatFechaLimitePagoExtra').val();
    var RegPagoPeriodo = $('#RegPagoPeriodo').val();

    /*
    orden.Matriculas = $("#tblestudiantes input[type=checkbox]:checked").map(function () {
        return this.value;
    }).get();
    */

    let lstTmpMat = [];
    let element = document.getElementById("gridEstudiantesLstPartial");
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    var allGridItems = instance.getSelectedRowsData();

    for (var i = 0; i < allGridItems.length; i++) {
        var row = allGridItems[i];
        lstTmpMat.push(row.matId);
    }

    orden.Matriculas = lstTmpMat;

    if (orden.Matriculas.length == 0 || _OrdenMatValor == null || _OrdenMatValor == ""
        || orden.OrdenMatFechaLimitePagoOrdinario == null || orden.OrdenMatFechaLimitePagoOrdinario == ""
        || orden.OrdenMatFechaLimitePagoExtra == null || orden.OrdenMatFechaLimitePagoExtra == "" || RegPagoPeriodo == "0") {
        retornaDatos = false;
    }

    if (!retornaDatos) {
        MensajeGeneral("error",
            "ERROR CARGA DE DATOS ORDEN",
            "Falta información para ingresar.",
            "Aceptar");
        return null;
    }

    return orden;
}


function MostrarTiposTramitesPopUp() {

    $.ajax({
        url: "/OrdenMatricula/TiposTramites",
        success: function (respuesta) {
            if (respuesta !== null) {
                /*
                $('#chkCursados').prop('checked', true);
                $('#chkXCursar').prop('checked', false);
                $("#lblProgramaAcademico").text("PENSUM " + respuesta.nombrePrograma);
                */
                $("#TiposTramitesModal").modal("show");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL ENCONTRAR LA EVALUACIÓN", "Se presentó un error al cargar la encuesta del docente.", "Aceptar");
        }
    });
}


function CerrarModalTiposTramites() {
    $("#TiposTramitesModal").modal("hide");
}

function MostrarResolucionesCostos() {
    $.ajax({
        url: "/ResolucionCostos/GetResolucionesCostosCarrito",
        success: function (respuesta) {
            if (respuesta !== null) {
                $("#ModalResolucionCostos").modal("show");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL ENCONTRAR LOS TRÁMITES", "Se presentó un error al cargar la encuesta del docente.", "Aceptar");
        }
    });
}

function CerrarModalResolucionesCostos() {
    $("#ModalResolucionCostos").modal("hide");
}

function AumentaResolucion(item) {

    let element = document.getElementById("gridResolucionCostos");
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    var lstRows = instance.getVisibleRows(item);

    for (var i = 0; i < lstRows.length; i++) {
        var row = lstRows[i];
        if (row.data.resId == item) {
            row.data.resCantidad += 1;
        }
    }

    instance.refresh(item);
}

function DisminuyeResolucion(item) {

    let element = document.getElementById("gridResolucionCostos");
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    var lstRows = instance.getVisibleRows(item);

    for (var i = 0; i < lstRows.length; i++) {
        var row = lstRows[i];
        if (row.data.resId == item && row.data.resCantidad > 0) {
            row.data.resCantidad -= 1;
        }
    }

    instance.refresh(item);
}

function GuardarCarritoResolucionesCostos() {

    let LstCarritoResolucion = [];

    let element = document.getElementById("gridResolucionCostos");
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    var allGridItems = instance.getDataSource().items();

    var SumaCantidades = 0;

    for (var i = 0; i < allGridItems.length; i++) {
        var row = allGridItems[i];
        if (row.resCantidad > 0) {
            SumaCantidades = SumaCantidades + (row.resValor * row.resCantidad);
            var arreglo = row.resId + "," + row.resCantidad + "," + row.resDescripcion + "," + row.resValor + ";";
            LstCarritoResolucion.push(arreglo);
        }
    }

    var CantidadFinal = "$" + SumaCantidades;

    $("#OrdenMatValor").val(CantidadFinal);
    /*
    $.ajax({
        type: "POST",
        data: {
            lista: LstCarritoResolucion.toString()
        },
        url: "/ResolucionCostos/GuardaSesionResolucionCostosCarrito",
        success: function (respuesta) {            
            $("#OrdenMatValor").val();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL ENCONTRAR LAS RESOLUCIONES DE COSTOS", "Se presentó un error al cargar las resoluciones de costos.", "Aceptar");
        }
    });
    */

    $('#ModalResolucionCostos').modal('hide');
    document.getElementById("div_nav_ut_masiv").click();
}
