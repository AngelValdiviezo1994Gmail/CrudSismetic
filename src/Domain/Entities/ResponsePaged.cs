

using AngelValdiviezoWebApi.Domain.Interfaces;

namespace AngelValdiviezoWebApi.Domain.Entities
{
    public class ResponsePaged<T> : Response<T>, ITracking
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
