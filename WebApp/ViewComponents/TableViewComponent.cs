using System.ComponentModel;
using System.Reflection;
using WebApp.ViewModel;
using WebAPP.Filters;
using Microsoft.AspNetCore.Mvc;
using AngelValdiviezoWebApi.Domain.Entities;

namespace WebApp.ViewComponents
{
    public class TableViewComponent : ViewComponent
    {
        public async Task<IViewComponentResult> InvokeAsync(object datos, List<OpcionTablaViewModel> opciones,
            bool mostrarFiltros = true,
            bool esOrdenable = true,
            bool paginacion = true,
            bool mostrarBusqueda = false)
        {
            InformacionTablaViewModel responseModel = new InformacionTablaViewModel();

            var typeOfContainer = datos.GetType();
            
            bool isResponsePaged = typeOfContainer.Name.Contains("ResponsePaged"); //typeOfdata.PropertyType.Name.Contains("ResponsePaged");
            
            if (!isResponsePaged)
            {
                return View();
            }

            var datosProperty = typeOfContainer.GetProperty("Data");
            var typeOfList = datosProperty.PropertyType.GetProperty("Item");

            List<string> propertyInOptions = new List<string>();

            if (opciones is { Count: > 0 })
            {

                propertyInOptions.AddRange(opciones.SelectMany(s => s.PropiedadId.Split(',').Select(s => s.Trim())).Distinct());
            }
            
            List<PropertyInfo> listProperties = new();
            List<HeaderTablaViewModel> headerTabla = new();

            foreach (var property in typeOfList.PropertyType.GetProperties())
            {
                var fieldTableAttribute = property.GetCustomAttribute<TableFieldAttribute>();
                bool existsInOpciones = propertyInOptions.Contains(property.Name.Trim());
                
                if (fieldTableAttribute != null)
                {
                    listProperties.Add(property);
                    HeaderTablaViewModel header = new()
                    {
                        NombreDato = property.Name,
                        OrderColumna = string.IsNullOrEmpty(fieldTableAttribute.PropertyOrderBy) ? property.Name : fieldTableAttribute.PropertyOrderBy,
                        DisplayOrden = fieldTableAttribute.DisplayOrden
                    };

                    var displayName = property.GetCustomAttribute<DisplayNameAttribute>();
                    
                    if (displayName != null)
                    {
                        header.Descripcion = displayName.DisplayName;
                    }
                    
                    headerTabla.Add(header);
                }

                if (existsInOpciones)
                {
                    listProperties.Add(property);
                }
            }
            responseModel.Header = headerTabla;

            PropertyInfo[] propertyInfoList = null;
            propertyInfoList = typeOfContainer.GetProperties();

            foreach (var subItem in propertyInfoList)
            {
                var subProp = subItem.GetValue(datos);  //subItem.GetValue(prop);

                switch (subItem.Name)
                {
                    case "CriterioBusqueda":
                        responseModel.CriterioBusqueda = subProp?.ToString();
                        break;
                    case "Pagina":
                        responseModel.Pagina = (int)subProp;
                        break;
                    case "Cantidad":
                        responseModel.Cantidad = (int)subProp;
                        break;
                    case "TotalElementos":
                        responseModel.TotalElementos = (int)subProp;
                        break;
                    case "TotalPaginas":
                        responseModel.TotalPaginas = (int)subProp;
                        break;
                    case "Succeeded":
                        responseModel.Succeeded = (bool)subProp;
                        break;
                    case "Error":
                        responseModel.Error = (string)subProp;
                        break;
                    case "ErrorCode":
                        responseModel.ErrorCode = (int)subProp;
                        break;
                    case "TrackingId":
                        responseModel.TrackingId = (Guid)subProp;
                        break;
                    case "Data":
                        if (subProp is System.Collections.IEnumerable)
                        {
                            List<Dictionary<string, string>> datosTabla = new List<Dictionary<string, string>>();

                            foreach (var listitem in subProp as System.Collections.IEnumerable)
                            {
                                Dictionary<string, string> dato = new Dictionary<string, string>();
                                foreach (var itemPropr in listProperties)
                                {
                                    try
                                    {
                                        var value = itemPropr.GetValue(listitem);
                                        dato.Add(itemPropr.Name, value?.ToString() ?? string.Empty);
                                    }
                                    catch (Exception ex)
                                    {

                                    }
                                }
                                datosTabla.Add(dato);
                            }
                            responseModel.Data = datosTabla;
                        }
                        break;
                    case "Filtros":
                        responseModel.Filtros = (List<Filtro>?)subProp;
                        break;
                    case "Orden":
                        responseModel.Orden = (OrdenFiltro?)subProp;
                        break;
                    default:
                        break;
                }

            }

            responseModel.Opciones = opciones;
            ViewData["MostrarFiltros"] = mostrarFiltros;
            ViewData["MostrarBusqueda"] = mostrarBusqueda;
            ViewData["esOrdenable"] = esOrdenable;
            ViewData["paginacion"] = paginacion;
            return View(responseModel);
        }
    }
}
