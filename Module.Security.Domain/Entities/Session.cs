using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Module.Security.Domain.Entities
{
    public class Session
    {
        public Guid SesId { get; set; }
        public Guid SesIdentificador { get; set; }
        public int UsuId { get; set; }
        public string SesDatos { get; set; } = null!;
        public DateTime SesFechacreacion { get; set; }
        public DateTime SesFechaexpiracion { get; set; }
    }
}
