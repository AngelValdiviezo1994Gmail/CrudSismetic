using Ardalis.Specification;
using AngelValdiviezoWebApi.Domain.Entities.Notificacion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngelValdiviezoWebApi.Application.Features.Notificacions.Specifications
{
    public class NotificacionByIdSolicitudSpec : Specification<BitacoraNotificacion>
    {
        public NotificacionByIdSolicitudSpec(Guid IdSolicitud, Guid UidNotificPorAprobar)
        {
            Query.Where(p => p.SolicitudId == IdSolicitud);
        }
    }
}
