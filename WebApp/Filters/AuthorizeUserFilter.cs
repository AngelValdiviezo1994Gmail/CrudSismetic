using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace WebAPP.Filters
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false)]
    public class AuthorizeUserFilter : ActionFilterAttribute
    {
        private  string _keyOpMenu;


        public AuthorizeUserFilter(string keyOpMenu)
        {
            _keyOpMenu = keyOpMenu;
        }

        public override async void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);
            bool continuar = false;

            context.Result = new RedirectToRouteResult(
                  new RouteValueDictionary()
                  {
                      { "controller", "Home" },
                      { "action", "Privacy" }
                  });
            return;
        }

    }
}
