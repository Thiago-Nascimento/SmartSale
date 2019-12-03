using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;

namespace backend {
    public class Startup {
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }
        //para habilitar o cors
        readonly string PermissaoEntreOrigens = "_PermissaoEntreOrigens";
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services) {
            services.AddControllers ();
            services.AddControllersWithViews ().AddNewtonsoftJson (
                opt => opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

            services.AddSwaggerGen (c => {
                c.SwaggerDoc ("v1", new OpenApiInfo { Title = "API", Version = "v1" });
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine (AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments (xmlPath);
            });

            // JWT
            services.AddAuthentication (JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer (options => {
                    options.TokenValidationParameters = new TokenValidationParameters {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey (Encoding.UTF8.GetBytes (Configuration["Jwt:Key"]))
                    };
                });

            //habilitação do cors
            services.AddCors (options => {
                options.AddPolicy (PermissaoEntreOrigens,
                    builder => builder.AllowAnyOrigin ().AllowAnyMethod ().AllowAnyHeader ());
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env) {
            app.UseStaticFiles (); // For the wwwroot folder

            // GET de Imagem
            app.UseStaticFiles (new StaticFileOptions {
                FileProvider = new PhysicalFileProvider (
                    //Nome da pasta que existe
                        Path.Combine (Directory.GetCurrentDirectory (), "imgOng")),
                    RequestPath = "/imgOng"
            });

            app.UseStaticFiles (new StaticFileOptions {
                FileProvider = new PhysicalFileProvider (
                    //Nome da pasta que existe
                        Path.Combine (Directory.GetCurrentDirectory (), "imgOferta")),
                    RequestPath = "/imgOferta"
            });


            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            }

            app.UseCors (builder => builder.AllowAnyOrigin ().AllowAnyMethod ().AllowAnyHeader ());

            //Habilitamos efetivamente o Swagger em nossa aplicação
            app.UseSwagger ();

            //Especifique o endpoint da documentação
            app.UseSwaggerUI (c => {
                c.SwaggerEndpoint ("swagger/v1/swagger.json", "API V1");
            });

            //Habilitamos efetivamente o JWT em nossa aplicação
            app.UseAuthentication ();

            // app.UseHttpsRedirection ();

            app.UseRouting ();

            app.UseAuthorization ();

            app.UseEndpoints (endpoints => {
                endpoints.MapControllers ();
            });

            app.UseSwagger ();

            app.UseSwaggerUI (c => {
                c.SwaggerEndpoint ("/swagger/v1/swagger.json", "API V1");

            });
        }
    }
}