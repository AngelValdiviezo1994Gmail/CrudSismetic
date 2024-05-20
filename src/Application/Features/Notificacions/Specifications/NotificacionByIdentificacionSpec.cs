using Ardalis.Specification;
using AngelValdiviezoWebApi.Domain.Entities.Notificacion;

namespace AngelValdiviezoWebApi.Application.Features.Notifications.Specifications;

public class NotificacionByIdentificacionSpec : Specification<BitacoraNotificacion>
{
    public NotificacionByIdentificacionSpec(string Identificacion, DateTime FechaDesde, DateTime FechaHasta, string estadoLeido)
    {
        if (string.IsNullOrEmpty(estadoLeido))
        {
            if (string.IsNullOrEmpty(Identificacion))
            {
                Query.Where(p => p.FechaCreacion.Date >= FechaDesde.Date && p.FechaCreacion.Date <= FechaHasta.Date && p.Estado == "A" && p.EstadoLeido == estadoLeido);
            }
            else
            {
                Query.Where(p => p.FechaCreacion.Date >= FechaDesde.Date && p.FechaCreacion.Date <= FechaHasta.Date && p.Estado == "A" && p.EstadoLeido == estadoLeido);
            }
        }
        else
        {
            if (string.IsNullOrEmpty(Identificacion))
            {
                Query.Where(p => p.FechaCreacion.Date >= FechaDesde.Date && p.FechaCreacion.Date <= FechaHasta.Date && p.Estado == "A" && p.EstadoLeido == estadoLeido);
            }
            else
            {
                Query.Where(p => p.FechaCreacion.Date >= FechaDesde.Date && p.FechaCreacion.Date <= FechaHasta.Date && p.Estado == "A" && p.EstadoLeido == estadoLeido);
            }
        }


    }
}
