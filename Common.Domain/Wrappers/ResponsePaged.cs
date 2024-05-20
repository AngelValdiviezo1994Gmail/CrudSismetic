using Common.Domain.Entities;
using Common.Domain.Interfaces;

namespace Common.Domain.Wrappers
{
    /// <summary>
    /// DEPRECADA NO USAR
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class ResponsePaged<T>: Response<T>, ITracking
    {
        public List<Filtro>? Filtros { get; set; }
        public int Pagina { get; set; }
        public int Cantidad { get; set; }
        public int TotalElementos { get; set; }
        public int TotalPaginas { get; set; }
        public OrdenFiltro? Orden { get; set; }
        public string CriterioBusqueda { get; set; }
    }
}
