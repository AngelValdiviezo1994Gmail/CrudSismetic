using AngelValdiviezoWebApi.Domain.Entities;

namespace WebApp.ViewModel
{
    public class InformacionTablaViewModel
    {
        public OrdenFiltro? Orden { get; set; }
        public List<Filtro>? Filtros { get; set; }

        public List<HeaderTablaViewModel> Header { get; set; }
        public List<Dictionary<string, string>> Data { get; set; }

        public bool Succeeded { get; set; }
        public string Error { get; set; }
        public int ErrorCode { get; set; }
        public Guid TrackingId { get; set; }

        public int Pagina { get; set; }
        public int Cantidad { get; set; }
        public int TotalElementos { get; set; }
        public int TotalPaginas { get; set; }
        public string CriterioBusqueda { get; set; }
        public List<OpcionTablaViewModel> Opciones { get; set; }
    }
}
