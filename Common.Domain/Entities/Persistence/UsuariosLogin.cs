namespace Common.Domain.Entities.Persistence
{
    public partial class UsuariosLogin
    {
        public int LoginId { get; set; }
        public int UsuId { get; set; }
        public string UsuUser { get; set; } = null!;
        public string Hash { get; set; } = null!;
        public byte[] Salt { get; set; } = null!;
        public bool? Blocked { get; set; }
        public DateTime? BlockedAt { get; set; }
        public string? Token { get; set; }
        public DateTime? TokenExpire { get; set; }
        public int Tries { get; set; }
        public bool? ForceChangePass { get; set; }
        public string? Token2fa { get; set; }
        public string? TokenRecover2fa { get; set; }
        public bool Active { get; set; }

        public bool Dupper { get; set; }
        public int? EscId { get; set; }

        public virtual Usuario? Usu { get; set; }
    }
}
