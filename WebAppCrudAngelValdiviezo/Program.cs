using Microsoft.AspNetCore.Authentication.Cookies;
using System.Globalization;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);


var cultureInfo = new CultureInfo("en-GB");
cultureInfo.NumberFormat.CurrencySymbol = "$";

CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;

builder.Services.AddMvcCore();

//builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly()); ///Automapper

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.Name = "EAN.Cookie";
        options.ExpireTimeSpan = TimeSpan.FromMinutes(240); //4 Horas de Session
        options.SlidingExpiration = true;
        options.LoginPath = "/Autenticacion/Login";
    });

//builder.Services.AddSession();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

//app.UseAuthorization();

//app.MapRazorPages();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Autenticacion}/{action=Login}/{id?}");

app.Run();

