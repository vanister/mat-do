namespace Matdo.Web.Models;

public class MongoDBSettings
{
    public MongoDBSettings(IConfiguration configuration, string section = "MongoDB")
    {
        configuration.GetSection(section).Bind(this);
    }

    public string ConnectionString { get; set; } = "set-in-appsettings-json";
    public string Collection { get; set; } = "items";
    public string Database { get; set; } = "matdo";
}
