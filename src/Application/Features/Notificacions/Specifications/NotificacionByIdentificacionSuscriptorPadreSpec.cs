using Ardalis.Specification;
using AngelValdiviezoWebApi.Domain.Entities.Notificacion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngelValdiviezoWebApi.Application.Features.Notificacions.Specifications
{
    public class NotificacionByIdentificacionSuscriptorPadreSpec : Specification<BitacoraNotificacion>
    {
        public NotificacionByIdentificacionSuscriptorPadreSpec(DateTime FechaDesde, DateTime FechaHasta, Guid UidSuscriptorPadre, Guid UidNotificPorAprobar, string estadoLeido)
        {
            Query.Where(p => p.FechaCreacion.Date >= FechaDesde.Date && p.FechaCreacion.Date <= FechaHasta.Date && p.Estado == "A");
        }
    }
}
