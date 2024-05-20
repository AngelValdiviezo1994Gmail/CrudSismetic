using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
//using System.Web.WebPages;

namespace WebAPP.Filters
{
    public class AuthorizationFilter : ActionFilterAttribute
    {
        private readonly string _modulo;
        private readonly string _metodo;

        public AuthorizationFilter()
        {
            _modulo = string.Empty;
            _metodo = string.Empty;
        }

        public AuthorizationFilter(string modulo)
        {
            _modulo = modulo;
            _metodo = string.Empty;
        }

        public AuthorizationFilter(string modulo, string metodo)
        {
            _modulo = modulo;
            _metodo = metodo;
        }

        public override async void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            var userPrincipal = context.HttpContext.User;
            string sessionId = (from c in userPrincipal.Claims where c.Type == "SessionId" select c.Value).FirstOrDefault();
            bool continuar = false;
            if (Guid.TryParse(sessionId, out Guid _sessionId))
            {
            //    var sessionClient = context.HttpContext.RequestServices.GetService<ISessionClient>();
            
            }

            if (!continuar)
            {
                /*
                var sesionHelper = context.HttpContext.RequestServices.GetService<ISesionHelper>();
                sesionHelper.SetDatos(null);
                */
                context.Result = new RedirectToRouteResult(
                  new RouteValueDictionary()
                  {
                      { "controller", "Autenticacion" },
                      { "action", "Login" }
                  });
                return;
            }
        }

    }
}
