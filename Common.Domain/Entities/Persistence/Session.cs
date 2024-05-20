using System;
using System.Collections.Generic;

namespace Common.Domain.Entities.Persistence
{
    public partial class Session
    {
        public Guid SesId { get; set; }
        public Guid SesIdentificador { get; set; }
        public int UsuId { get; set; }
        public string SesDatos { get; set; } = null!;
        public DateTime SesFechacreacion { get; set; }
        public DateTime SesFechaexpiracion { get; set; }
    }
}
