
using Matdo.Web.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Matdo.Web;

public static class Auth0
{
    /// <summary>
    /// Adds Auth0 related configuaration to the pipeline.
    /// </summary>
    /// <param name="builder">The builder to use.</param>
    public static void AddAuth0(this WebApplicationBuilder builder)
    {
        var services = builder.Services;
        var configuration = builder.Configuration;
        var settings = Auth0Settings.FromConfiguration(configuration);

        services.AddSingleton<Auth0Settings>((_) => settings);

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.Authority = settings.Authority;
            options.Audience = settings.Audience;
        });
    }
}
