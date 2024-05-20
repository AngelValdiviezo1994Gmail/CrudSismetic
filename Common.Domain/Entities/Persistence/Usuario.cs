using System;
using System.Collections.Generic;


namespace Common.Domain.Entities.Persistence
{
    public partial class Usuario
    {
        public Usuario()
        {
            UsuariosLogin = new HashSet<UsuariosLogin>();
        }
        public int UsuId { get; set; }
        public int? TipDocId { get; set; }
        public string? UsuNumeroDocumento { get; set; }
        public DateTime? UsuFechaExpedicion { get; set; }
        public string? UsuPrimerNombre { get; set; }
        public string? UsuSegundoNombre { get; set; }
        public string? UsuPrimerApellido { get; set; }
        public string? UsuSegundoApellido { get; set; }
        public int? GenId { get; set; }
        public int? EstCivId { get; set; }
        public DateTime? UsuFechaNacimiento { get; set; }
        public int? CiuId { get; set; }
        public decimal? UsuTelefonoContacto { get; set; }
        public string? UsuCorreoElectronico { get; set; }
        public string? UsuCorreoInstitucional { get; set; }
        public string? UsuDireccionInstitucional { get; set; }
        public string? UsuUsuario { get; set; }
        public string? UsuClave { get; set; }
        public bool UsuCambioClave { get; set; }
        public DateTime? UsuFechacambioclave { get; set; }
        public int? EstrId { get; set; }
        public bool? UsuActivo { get; set; }
        public int? GrhId { get; set; }
        public int? UsuLugarExpedicionDocId { get; set; }
        public int? UsuDepartamentoExpedicionDocId { get; set; }
        public string? UsuDireccionPersonal { get; set; }
        public int? PaisId { get; set; }
        public int? DepId { get; set; }
        public string? UsuAvatar { get; set; }

        public virtual ICollection<UsuariosLogin>? UsuariosLogin { get; set; }
        
    }
}
