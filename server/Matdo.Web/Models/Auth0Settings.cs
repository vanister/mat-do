namespace Matdo.Web.Models;

public class Auth0Settings
{
    public static Auth0Settings FromConfiguration(IConfiguration configuration, string section = "Auth0")
    {
        var instance = new Auth0Settings();

        configuration.GetSection(section).Bind(instance);

        return instance;
    }

    public string Audience { get; set; } = "set-in-appsettings.json";
    public string Authority { get; set; } = "set-in-appsettings.json";
}
