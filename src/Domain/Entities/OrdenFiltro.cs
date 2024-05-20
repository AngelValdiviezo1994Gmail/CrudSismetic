using AngelValdiviezoWebApi.Domain.Enums;

namespace AngelValdiviezoWebApi.Domain.Entities
{
    public class OrdenFiltro
    {
        public string? PropiedadBusqueda { get; set; }
        public OrdenFiltroEnum Orden { get; set; }
    }
}
