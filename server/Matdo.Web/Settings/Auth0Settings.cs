namespace Matdo.Web.Settings;

public class Auth0Settings
{
    public static Auth0Settings FromConfiguration(IConfiguration configuration, string section = "Auth0")
    {
        var instance = new Auth0Settings();

        configuration.GetSection(section).Bind(instance);

        return instance;
    }

    public string Audience { get; set; } = "Audience is missing";
    public string Authority { get; set; } = "Authority is missing";
    public string Prefix { get; set; }
    public string Delimiter { get; set; }
}
