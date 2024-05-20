using AngelValdiviezoWebApi.Application;
using AngelValdiviezoWebApi.Persistence;
using Microsoft.OpenApi.Models;
using AngelValdiviezoWebApi.Extensions;
using FluentValidation.AspNetCore;
using ServiceExtAplication = AngelValdiviezoWebApi.Application.ServiceExtensions;
using System.Reflection;
using Microsoft.AspNetCore.HttpOverrides;
using Serilog;
using Serilog.Events;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Newtonsoft.Json;
using AngelValdiviezoWebApi.Application.Common.Wrappers;

// Setup serilog in a two-step process. First, we configure basic logging
// to be able to log errors during ASP.NET Core startup. Later, we read
// log settings from appsettings.json. Read more at
// https://github.com/serilog/serilog-aspnetcore#two-stage-initialization.
// General information about serilog can be found at
// https://serilog.net/
Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
            .Enrich.FromLogContext()
            .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {CorrelationId} {Level:u3}] {Message:lj}{NewLine}{Exception}")
            .CreateBootstrapLogger();

try
{
    Log.Information("Starting web host");
    var builder = WebApplication.CreateBuilder(args);
    string message = "";
    // Full setup of serilog. We read log settings from appsettings.json
    builder.Host.UseSerilog((context, services, configuration) => configuration
        .ReadFrom.Configuration(context.Configuration)
        .ReadFrom.Services(services)
        .Enrich.FromLogContext());


    // Add services to the container.
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
    });
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    //builder.Services.AddCors();
    builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo
        {
            Version = "v1",
            Title = "Clientes - API",
            Description = "Test EndPoints de Angel Valdiviezo",
            Contact = new OpenApiContact
            {
                Name = "Test de Angel Valdiviezo",
                Email = string.Empty,
                Url = new Uri("https://github.com/AngelValdiviezo1994Gmail/AplicacionWebApi/tree/main/AplicacionWebApiAngelValdiviezo"),
            }
        });
        
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Description = "Jwt Authorization",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
        });
        c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type=ReferenceType.SecurityScheme,
                        Id="Bearer"
                    }
                },
                new string[]{}
            }
        });
        
        var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        c.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
    });

    /*
    builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(o =>
    {
        o.RequireHttpsMetadata = false;
        o.SaveToken = false;
        o.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateIssuerSigningKey = true,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateActor = false,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["Jwt:JWT_SECRET_KEY"]))
        };
        o.Events = new JwtBearerEvents()
        {
            OnAuthenticationFailed = c =>
            {
                c.NoResult();
                c.Response.StatusCode = 500;
                c.Response.ContentType = "text/plain";
                return c.Response.WriteAsync(c.Exception.ToString());
            },
            OnChallenge = context =>
            {
                context.HandleResponse();
                context.Response.StatusCode = 401;
                context.Response.ContentType = "application/json";
                var result = JsonConvert.SerializeObject(new ResponseType<string>("Usted no esta autorizado"));
                return context.Response.WriteAsync(result);
            },
            OnForbidden = context =>
            {
                context.Response.StatusCode = 403;
                context.Response.ContentType = "application/json";
                var result = JsonConvert.SerializeObject(new ResponseType<string>("Usted no tiene permisos sobre este recurso"));
                return context.Response.WriteAsync(result);
            }
        };
    });
    */

    builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(o =>
    {
        o.RequireHttpsMetadata = false;
        o.SaveToken = false;
        o.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateIssuerSigningKey = true,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateActor = false,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["Jwt:JWT_SECRET_KEY"])),
            //IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["Jwt:JWT_SECRET_KEY"]))
            // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
            ClockSkew = TimeSpan.Zero
        };

        o.Events = new JwtBearerEvents()
        {
            OnAuthenticationFailed = ctx =>
            {
                ctx.NoResult();
                ctx.Response.StatusCode = StatusCodes.Status401Unauthorized;
                message += " From OnAuthenticationFailed: ";
                var stringBuilder = new StringBuilder();
                stringBuilder.AppendLine(ctx.Exception.Message);
                message += stringBuilder.ToString();
                return Task.CompletedTask;
            },
            OnChallenge = ctx =>
            {
                ctx.HandleResponse();
                message += "From OnChallenge: ";
                ctx.Response.StatusCode = StatusCodes.Status401Unauthorized;
                ctx.Response.ContentType = "application/json";
                var objResponseType = new ResponseType<string>()
                {
                    Succeeded = false,
                    Message = message,
                    StatusCode = StatusCodes.Status401Unauthorized.ToString(),
                };

                var result = JsonConvert.SerializeObject(objResponseType);
                return ctx.Response.WriteAsync(result);

            },
            OnMessageReceived = ctx =>
            {

                ctx.Request.Headers.TryGetValue("Authorization", out var BearerToken);
                var token = BearerToken.ToString().Split(" ").ToList().FirstOrDefault() ?? string.Empty;
                if (!(token.ToUpper().Equals("BEARER")))
                {
                    BearerToken = "no Bearer token sent ";
                    message += " Authorization Header sent: " + BearerToken;
                }
                else
                {
                    message = string.Empty;
                }

                return Task.CompletedTask;

            },

            OnForbidden = context =>
            {
                context.Response.StatusCode = 400;
                context.Response.ContentType = "application/json";
                var result = JsonConvert.SerializeObject(new ResponseType<string>("Usted no tiene permisos sobre este recurso"));
                return context.Response.WriteAsync(result);
            }
        };
    });

    builder.Services.AddFluentValidation(conf =>
    {
        conf.RegisterValidatorsFromAssembly(typeof(ServiceExtAplication).Assembly);
    });
    builder.Services.AddApplicationServices();
    builder.Services.AddInfrastructureServices(builder.Configuration);
    builder.Services.AddServiceExtensions();
    builder.Services.Configure<ForwardedHeadersOptions>(options =>
    {
        options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
        //options.KnownProxies.Add(IPAddress.Parse("127.0.10.1"));
    });

    var app = builder.Build();
    
    // Configure the HTTP request pipeline.
    app.UseSerilogRequestLogging(configure =>
    {
        configure.MessageTemplate = "HTTP {RequestMethod} {RequestPath} responded {StatusCode} in {Elapsed:0.0000}ms";
    }); // We want to log all HTTP requests
    

    if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
    {
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        });
    }

    app.UseHttpsRedirection();
    
    app.UseAuthentication();
    app.UseAuthorization();
    app.UseCors("AllowAll");
    app.UseErrorHandlerMiddleware();
    app.MapControllers();
    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Host terminated unexpectedly");
    return 1;
}
finally
{
    Log.CloseAndFlush();
}

return 0;





