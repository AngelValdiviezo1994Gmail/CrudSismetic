
using AngelValdiviezoWebApi.Domain.Interfaces;

namespace AngelValdiviezoWebApi.Domain.Entities
{
    public class RequestPaged : Request<List<Filtro>>, ITracking
    {
        public RequestPaged()
        {
            this.TrackingId = new Guid();
        }

        public RequestPaged(List<Filtro> data)
        {
            this.TrackingId = new Guid();
            this.Data = data;
            this.Orden = null;
        }

        public RequestPaged(List<Filtro> data, OrdenFiltro orden)
        {
            this.TrackingId = new Guid();
            this.Data = data;
            this.Orden = orden;
        }

        public OrdenFiltro? Orden { get; set; }

        public int Pagina { get; set; } = 1;
        public int Cantidad { get; set; } = 10;
        public string CriterioBusqueda { get; set; }        
    }
}
