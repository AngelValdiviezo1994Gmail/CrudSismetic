$(document).ready(function () {
    iniciapaneles();
    MostrarDatosOrden();
});

function iniciapaneles() {
    $("#divlista").show();    
    $("#divordenmatricula").hide();
    $("#divdetordenmatricula").hide();
}

/*
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
*/

function MostrarDatosOrden() {
    $("#divlista").hide();
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

function CargarDatosOrden() {
    var retornaDatos = true;
    let orden = {};
    var _OrdenMatValor = $("#OrdenMatValor").val();
    var varOrdenMatValor = _OrdenMatValor.substring(1, _OrdenMatValor.length);//$("#OrdenMatValor").val();
    //var varOrdenMatValorConcat = $("#OrdenMatValorConcat").val();
    orden.OrdenMatValor = varOrdenMatValor;
    //orden.OrdenMatValorConcat = varOrdenMatValorConcat;
    //orden.EstId = ; 

    //orden.OrdenMatCode = "OM-0000";
    orden.OrdenMatCod = $("#OrdenMatCod").val();
    orden.CurAcadId = $("#CurAcadId").val();
    orden.OrdenMatConcepto = $("#OrdenMatConcepto").val();

    orden.OrdenMatFechaLimitePagoOrdinario = $('#OrdenMatFechaLimitePagoOrdinario').val();
    orden.OrdenMatFechaLimitePagoExtra = $('#OrdenMatFechaLimitePagoExtra').val();
    var RegPagoPeriodo = $('#RegPagoPeriodo').val();

    var ValidaFechaPagoOrd = ValidarFechaMenorActual(orden.OrdenMatFechaLimitePagoOrdinario);
    var ValidaFechaLimPagExtra = ValidarFechaMenorActual(orden.OrdenMatFechaLimitePagoExtra);
    var ValidaFechaExtraOrd = ComparacionFechas(orden.OrdenMatFechaLimitePagoExtra, orden.OrdenMatFechaLimitePagoOrdinario);

    if (ValidaFechaLimPagExtra || ValidaFechaPagoOrd) {
        MensajeGeneral("error",
            "ERROR CARGA DE DATOS ORDEN",
            "Las fechas deben ser mayor a la fecha actual.",
            "Aceptar");
        return null;
    }


    if (ValidaFechaExtraOrd) {
        MensajeGeneral("error",
            "ERROR CARGA DE DATOS ORDEN",
            "La fecha límite extraordinaria no puede ser menor a la ordinaria.",
            "Aceptar");
        return null;
    }

    let lstTmpMat = [];
    let element = document.getElementById("gridDetalleOrdenMat");
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    var allGridItems = instance.getDataSource().items();

    for (var i = 0; i < allGridItems.length; i++) {
        var row = allGridItems[i];
        lstTmpMat.push(row.concepCostoId);
    }

    orden.DetMatricula = lstTmpMat;

    let lstMat = [];
    let elementMat = document.getElementById("gridEstudiantesRegLstPartial");
    let instanceMat = DevExpress.ui.dxDataGrid.getInstance(elementMat);
    var allGridItemsMat = instanceMat.getSelectedRowsData();

    for (var i = 0; i < allGridItemsMat.length; i++) {
        var row = allGridItemsMat[i];
        lstMat.push(row.matId);
    }

    /*
    orden.Matriculas = $("#tblestudiantes input[type=checkbox]:checked").map(function () {
        return this.value;
    }).get();
    */

    orden.Matriculas = lstMat;

    if (orden.Matriculas.length == 0 || orden.DetMatricula.length == 0 || _OrdenMatValor == null || _OrdenMatValor == ""
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

function ConfirmarPagoMatricula(idItem) {
    var TipoMensaje = "question"
        , Titulo = "¿Quieres pagar la orden de matricula?"
        , Mensaje = "Se aplicará el pago de la orden de matricula"
        , TextBotonConfirmar = "Confirmar"
        , TextBotonCancelar = "Cancelar"
        , FuncionDestino = "PagarOrden(" + idItem + ")"

    MensajeConfirmacion(TipoMensaje, Titulo, Mensaje, TextBotonConfirmar, TextBotonCancelar, FuncionDestino);
}

function PagarOrden(ordenId) {
    event.preventDefault();
    $.ajax({
        type: "POST",
        data: {
            id: ordenId
        },
        url: "/OrdenMatricula/PagarOrden",
        success: function (respuesta) {
            MensajeGeneral(respuesta.tipoMensaje,
                respuesta.titulo,
                respuesta.mensaje,
                respuesta.botonAceptar);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error",
                "ERROR PAGO ORDEN DE MATRICULA",
                "Se presento un error al intentar pagar la orden",
                "Aceptar");
        }
    });
}


function ValidarFechaMenorActual(date) {
    var x = new Date();
    var fecha = date.split("/");
    x.setFullYear(fecha[2], fecha[1] - 1, fecha[0]);
    var today = new Date();

    if (x >= today)
        return false;
    else
        return true;
}

function ComparacionFechas(dateExtra, dateOrd) {
    var xExtra = new Date();
    var fechaExtra = dateExtra.split("/");
    xExtra.setFullYear(fechaExtra[2], fechaExtra[1] - 1, fechaExtra[0]);

    var xOrd = new Date();
    var fechaOrd = dateOrd.split("/");
    xOrd.setFullYear(fechaOrd[2], fechaOrd[1] - 1, fechaOrd[0]);

    if (xExtra >= xOrd)
        return false;
    else
        return true;
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
            MensajeGeneral("error", "ERROR AL ENCONTRAR LAS RESOLUCIONES DE COSTOS", "Se presentó un error al cargar las resoluciones de costos.", "Aceptar");
        }
    });

}

function MostrarResolucionesCostosSeleccionables() {
    $.ajax({
        url: "/ResolucionCostos/GetResolucionesCostosCarrito",
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

//#REGION CONCESIONES MASIVAS
function MostrarConcesiones() {
    
    let element = document.getElementById("gridOrdenesMatriculasConsulta");
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    var allGridItems = instance.getSelectedRowsData();

    if (allGridItems.length == 0) {
        MensajeGeneral("error", "ERROR ASIGNACIÓN DE CONCESIONES", "Seleccione las órdenes de matrículas para aplicar concesiones", "Aceptar");
        return;
    }
    $("#ModalConcesiones").modal("show");
}

//#ENDREGION

//#REGION CONCESIONES INDIVIDUALES
function MostrarConcesionesToIndv(id) {
    sessionStorage.setItem("idMat", id);
    sessionStorage.setItem("EsConcIndiv", "S");
    $("#ModalConcesiones").modal("show");
}
//#ENDREGION

function AplicarConcesiones() {
    var MontoEscogidoTbl = true;
    var MontoEscogidoTxt = true;
    var montoDesc = $("#PorcTxt").val();
    let IdMatSession = sessionStorage.getItem("idMat");

    let SumaPorcentajes = 0;
    let LstEstudiantesToConcesiones = [];
    let LstConcesionesSeleccionadas = [];

    if (IdMatSession != null && IdMatSession != "") {
        LstEstudiantesToConcesiones.push(IdMatSession);
    } else {
        let elementEstudiante = document.getElementById("gridOrdenesMatriculasConsulta");
        let instanceEstudiante = DevExpress.ui.dxDataGrid.getInstance(elementEstudiante);
        var allGridItemsEstudiante = instanceEstudiante.getSelectedRowsData();

        for (var i = 0; i < allGridItemsEstudiante.length; i++) {
            var row = allGridItemsEstudiante[i];
            LstEstudiantesToConcesiones.push(row.ordenMatId);
        }
    }

    let elementConcesiones = document.getElementById("gridConcesiones");
    let instanceConcesiones = DevExpress.ui.dxDataGrid.getInstance(elementConcesiones);
    var allGridItemsConcesiones = instanceConcesiones.getSelectedRowsData();

    if (allGridItemsConcesiones.length == 0 && (montoDesc == "" || montoDesc == null)) {
        MensajeGeneral("error", "ERROR AL APLICAR CONCESIONES", "Escoja un concepto de concesión.", "Aceptar");
        return;
    }

    if (montoDesc != "" && montoDesc != null && montoDesc != undefined && allGridItemsConcesiones.length > 0) {
        MensajeGeneral("error", "ERROR AL APLICAR CONCESIONES", "Si llena el campo de Porcentaje de descuento, no se debe seleccionar los porcentajes de la tabla.", "Aceptar");
        return;
    }

    if (montoDesc == null || montoDesc == "") {
        MontoEscogidoTbl = true;
        MontoEscogidoTxt = false;
    } else {
        MontoEscogidoTbl = false;
        MontoEscogidoTxt = true;
    }

    if (MontoEscogidoTbl) {
        for (var i = 0; i < allGridItemsConcesiones.length; i++) {
            var row = allGridItemsConcesiones[i];
            LstConcesionesSeleccionadas.push(row.concId);
            SumaPorcentajes = SumaPorcentajes + row.concPorDescuento;
        }

        if (SumaPorcentajes > 100) {
            LstEstudiantesToConcesiones = [];
            LstConcesionesSeleccionadas = [];
            MensajeGeneral("error", "ERROR AL APLICAR CONCESIONES", "El porcentaje de concesiones no debe superar al 100%", "Aceptar");
            return;
        }
    }

    var EsConcIndiv = sessionStorage.getItem("EsConcIndiv");

    if (EsConcIndiv == 'S') {
        sessionStorage.setItem("EsConcIndiv", "");
        $.ajax({
            type: "POST",
            data: {
                ListaEstudiantes: LstEstudiantesToConcesiones.toString(),
                ListaConcesiones: LstConcesionesSeleccionadas.toString(),
                PorcentajeDescuento: montoDesc
            },
            url: "/OrdenMatricula/AplicaConcesionesOrdenesMatriculasIndividuales",
            success: function (respuesta) {
                sessionStorage.setItem("idMat", "");
                CerrarModalConcesiones();
                MensajeGeneral(respuesta.tipoMensaje, respuesta.titulo, respuesta.mensaje, respuesta.botonAceptar, GetURL() + "OrdenMatricula/Consultar");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                CerrarModalConcesiones();
                MensajeGeneral("error", "ERROR CONCESIONES", "Se presento un error al aplicar concesiones a los estudiantes seleccionados.", "Aceptar");
            }
        });

    }
    else {
        $.ajax({
            type: "POST",
            data: {
                ListaEstudiantes: LstEstudiantesToConcesiones.toString(),
                ListaConcesiones: LstConcesionesSeleccionadas.toString(),
                PorcentajeDescuento: montoDesc
            },
            url: "/OrdenMatricula/AplicaConcesionesOrdenesMatriculas",
            success: function (respuesta) {
                sessionStorage.setItem("idMat", "");
                CerrarModalConcesiones();
                MensajeGeneral(respuesta.tipoMensaje, respuesta.titulo, respuesta.mensaje, respuesta.botonAceptar, GetURL() + "OrdenMatricula/Consultar");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                CerrarModalConcesiones();
                MensajeGeneral("error", "ERROR CONCESIONES", "Se presento un error al aplicar concesiones a los estudiantes seleccionados.", "Aceptar");
            }
        });
    }
}


function CerrarModalConcesiones() {
    $("#ModalConcesiones").modal("hide");
}

//#REGION CONCESIONES MASIVAS
function MostrarEstados() {

    let element = document.getElementById("gridOrdenesMatriculasConsulta");
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    var allGridItems = instance.getSelectedRowsData();

    if (allGridItems.length == 0) {
        MensajeGeneral("error", "ERROR DE CAMBIO DE ESTADOS", "Seleccione las órdenes de matrículas para cambiar los estados", "Aceptar");
        return;
    }
    $("#ModalEstadosOrdMat").modal("show");
}

function AplicarEstados() {

    let LstEstudiantesToConcesiones = [];
    let LstEstadosSeleccionados = [];

        let elementEstudiante = document.getElementById("gridOrdenesMatriculasConsulta");
        let instanceEstudiante = DevExpress.ui.dxDataGrid.getInstance(elementEstudiante);
        var allGridItemsEstudiante = instanceEstudiante.getSelectedRowsData();

        for (var i = 0; i < allGridItemsEstudiante.length; i++) {
            var row = allGridItemsEstudiante[i];
            LstEstudiantesToConcesiones.push(row.ordenMatId);
        }
    

    let elementEstado = document.getElementById("gridEstados");
    let instanceEstado = DevExpress.ui.dxDataGrid.getInstance(elementEstado);
    var allGridItemsEstado = instanceEstado.getSelectedRowsData();

    if (allGridItemsEstado.length == 0) {
        MensajeGeneral("error", "ERROR DE CAMBIO DE ESTADOS", "Un estado para realizar el cambio", "Aceptar");
        return;
    }

    for (var i = 0; i < allGridItemsEstado.length; i++) {
        var row = allGridItemsEstado[i];
        LstEstadosSeleccionados.push(row.estadoId);
    }

    $.ajax({
        type: "POST",
        data: {
            ListaEstudiantes: LstEstudiantesToConcesiones.toString(),
            ListaEstados: LstEstadosSeleccionados.toString()
        },
        url: "/OrdenMatricula/AplicaEstadosOrdenesMatriculas",
        success: function (respuesta) {
            CerrarModalEstados();
            MensajeGeneral(respuesta.tipoMensaje, respuesta.titulo, respuesta.mensaje, respuesta.botonAceptar, GetURL() + "OrdenMatricula/Consultar");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            CerrarModalEstados();
            MensajeGeneral("error", "ERROR CONCESIONES", "Se presento un error al aplicar concesiones a los estudiantes seleccionados.", "Aceptar");
        }
    });

}

function CerrarModalEstados() {
    $("#ModalEstadosOrdMat").modal("hide");
}
//#ENDREGION

function GuardarSeleccionResolucionesCostos() {
    let LstConceptos = [];

    let SumaCantidades = 0;
    let element = document.getElementById("gridResolucionCostosSeleccionable");
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    var allGridItems = instance.getSelectedRowsData();

    let elementGrdDetOrd = document.getElementById("gridDetalleOrdenMat");
    let instanceGrdDetOrd = DevExpress.ui.dxDataGrid.getInstance(elementGrdDetOrd);

    for (var i = 0; i < allGridItems.length; i++) {
        
        var row = allGridItems[i];
        var valor = Number(row.concepCostoValor);
        SumaCantidades = SumaCantidades + valor;//row.concepCostoValor;

        if (valor > 0) {
            var arreglo = row.concepCostoId + "," + row.concCostoCantidad + "," + row.concepCostoDescripcion + "," + row.concepCostoValor + "," + row.concepCostoCodigo + ";";
            LstConceptos.push(arreglo);
        }
    }
    
    $.ajax({
        type: "POST",
        data: {
            lista: LstConceptos.toString()
        },
        url: "/OrdenMatricula/GuardaSesionConceptoCosto",
        success: function (respuesta) {
            CantidadFinal = "$" + SumaCantidades;
            $("#OrdenMatValor").val(CantidadFinal);
            $('#ModalSeleccionableResolucionCostos').modal('hide');
            $("#divdetordenmatricula").show();
            instanceGrdDetOrd.refresh();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL GUARDAR ÓRDENES DE MATRÍCULAS", "Se presentó un error al guardar el detalle de la orden de matrícula.", "Aceptar");
        }
    });

}

function CerrarModalSeleccionResolucionesCostos() {
    $('#ModalSeleccionableResolucionCostos').modal('hide');
}

function CerrarModalResolucionesCostos() {
    $("#ModalResolucionCostos").modal("hide");
}

/*
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
*/

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

    $('#ModalResolucionCostos').modal('hide');
    //document.getElementById("div_nav_ut_masiv").click();
}


function AnulacionSeleccionOrdenMatricula() {
    let OrdenAnulada = "";
    let LstOrdenesAnuladas = [];

    let element = document.getElementById("gridOrdenesMatriculasConsulta");
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    var allGridItems = instance.getSelectedRowsData();

    if (allGridItems.length == 0) {
        MensajeGeneral("error", "ERROR ANULACIÓN DE ÓRDENES", "Seleccione las órdenes de matrículas a anular", "Aceptar");
        return;
    }

    for (var i = 0; i < allGridItems.length; i++) {
        var row = allGridItems[i];
        LstOrdenesAnuladas.push(row.ordenMatId);
    }

    $.ajax({
        type: "POST",
        data: {
            ListaMatriculas: LstOrdenesAnuladas.toString()
        },
        url: "/OrdenMatricula/AnularOrdenesMatriculas",
        success: function (respuesta) {
            MensajeGeneral(respuesta.tipoMensaje, respuesta.titulo, respuesta.mensaje, respuesta.botonAceptar, GetURL() + "OrdenMatricula/Consultar");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR ANULACIÓN DE ÓRDENES", "Se presento un error en el consumo del método de anulación de órdenes", "Aceptar");
        }
    });

}

function EnviaEmails(id) {
    let LstOrdenesEnvio = [];

    let element = document.getElementById("gridOrdenMatCreadasMatReg");//
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    var allGridItems = instance.getSelectedRowsData();

    if (allGridItems.length == 0 && (id == "" || id == undefined || id == null)) {
        MensajeGeneral("error", "ERROR AL ENVIAR EMAILS", "Seleccione las órdenes de matrículas para enviar correo", "Aceptar");
        return;
    }

    for (var i = 0; i < allGridItems.length; i++) {
        var row = allGridItems[i];
        LstOrdenesEnvio.push(row.ordenMatId);
    }

    if (allGridItems.length == 0) {
        LstOrdenesEnvio.push(id);
    }

    $.ajax({
        type: "POST",
        data: {
            LstOrdenesEnvio: LstOrdenesEnvio.toString()
        },
        url: "/OrdenMatricula/EnvioMasivoOrdenesMatriculas",
        success: function (respuesta) {
            MensajeGeneral(respuesta.tipoMensaje, respuesta.titulo, respuesta.mensaje, respuesta.botonAceptar, GetURL() + "OrdenMatricula/Index");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR ENVÍO DE ÓRDENES", "Se presento un error en el consumo del método de anulación de órdenes", "Aceptar");
        }
    });

}

function EnviaEmailsConsultas(id) {
    let LstOrdenesEnvio = [];

    let element = document.getElementById("gridOrdenesMatriculasConsulta");//
    let instance = DevExpress.ui.dxDataGrid.getInstance(element);
    var allGridItems = instance.getSelectedRowsData();

    if (allGridItems.length == 0 && (id == "" || id == undefined || id == null)) {
        MensajeGeneral("error", "ERROR AL ENVIAR EMAILS", "Seleccione las órdenes de matrículas para enviar correo", "Aceptar");
        return;
    }

    for (var i = 0; i < allGridItems.length; i++) {
        var row = allGridItems[i];
        LstOrdenesEnvio.push(row.ordenMatId);
    }

    if (allGridItems.length == 0) {
        LstOrdenesEnvio.push(id);
    }

    $.ajax({
        type: "POST",
        data: {
            LstOrdenesEnvio: LstOrdenesEnvio.toString()
        },
        url: "/OrdenMatricula/EnvioMasivoOrdenesMatriculas",
        success: function (respuesta) {
            MensajeGeneral(respuesta.tipoMensaje, respuesta.titulo, respuesta.mensaje, respuesta.botonAceptar, GetURL() + "OrdenMatricula/Consultar");
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR ENVÍO DE ÓRDENES", "Se presento un error en el consumo del método de anulación de órdenes", "Aceptar");
        }
    });

}


function Cancelar() {
    
}

function MostrarConfirmarPago(ruta, id) {
    if (ruta != undefined && ruta != "" && ruta != null) {
        $.ajax({
            type: "POST",
            data: {
                Id: id.toString(),
                RutaAdjunto: ruta.toString()
            },
            url: "/OrdenMatricula/ModalConfirmaPagoOrdMat",
            success: function (respuesta) {
                $("#ModalConfirmaPagoOrdMat").modal("show");
            },
            error: function (xhr, ajaxOptions, thrownError) {
                MensajeGeneral("error", "ERROR CONFIRMACIÓN DE PAGO DE ÓRDENES", "Se presento un error en el consumo del método de pago de órdenes", "Aceptar");
            }
        });
    } else {
        MensajeGeneral("error", "ERROR CONFIRMACIÓN DE PAGO DE ÓRDENES", "Estudiante no ha subido su comprobante de pago.", "Aceptar");
    }
}

function ConfirmaPago() {
    $.ajax({
        type: "POST",
        url: "/OrdenMatricula/ConfirmaPago",
        success: function (respuesta) {
            MensajeGeneral(respuesta.tipoMensaje, respuesta.titulo, respuesta.mensaje, respuesta.botonAceptar);//, GetURL() + "OrdenMatricula/Consultar");
            //CerrarModalConfirmarPago();
            CerrarModalConfirmarPago();
            window.location.reload();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR ENVÍO DE ÓRDENES", "Se presento un error en el consumo del método de anulación de órdenes", "Aceptar");
        }
    });
    
}

function RechazoPago() {


    $.ajax({
        type: "POST",

        //data: oEstado,

        /*
        data: {
            Id: id.toString(),
            Estado: estado
        },
        */
        url: "/OrdenMatricula/RechazarPago",
        success: function (respuesta) {
            MensajeGeneral(respuesta.tipoMensaje, respuesta.titulo, respuesta.mensaje, respuesta.botonAceptar);//, GetURL() + "OrdenMatricula/Index");
            CerrarModalConfirmarPago();
            window.location.reload();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR ENVÍO DE ÓRDENES", "Se presento un error en el consumo del método de anulación de órdenes", "Aceptar");
        }
    });

}


function CerrarModalConfirmarPago() {
    $("#ModalConfirmaPagoOrdMat").modal("hide");
}


function ConsultaOrdenesMatriculas() {

    let NumDocId = $("#NumDocIdOm").val();
    let NombreEstudiante = $("#NomEstOm").val();
    let IdProgOm = $("#IdProgOm").val();
    let IdCursoOm = $("#IdCursoOm").val();
    let IdSemOm = $("#IdSemOm").val();

    $.ajax({
        type: "POST",
        data: {
            NumDocIdent: NumDocId,
            NomEstud: NombreEstudiante,
            ProgOm: IdProgOm + "",
            CurOm: IdCursoOm + "",
            SemOm: IdSemOm + ""
        },
        url: "/OrdenMatricula/GuardaSesionFiltroConsultaOmXAdmin",
        success: location.reload(),
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL ENCONTRAR LOS TRAMITES", "Se presento un error al buscar los tramites del alumno.", "Aceptar");
        }
    });

}
