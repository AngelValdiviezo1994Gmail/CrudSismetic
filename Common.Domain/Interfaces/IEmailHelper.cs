
namespace Common.Domain.Interfaces
{
    public interface IEmailHelper
    {
        void SendMail(string toName, List<string> toEmail, string subject, string body);
        void SendMailWithAttachment(string toName, List<string> toEmail, string subject, string body, string rutaArchivo, string path);
        Task SendMailAsync(string toName, List<string> toEmail, string subject, string body);
    }
}
