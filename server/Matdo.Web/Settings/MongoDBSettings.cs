namespace Matdo.Web.Settings;

public class MongoDBSettings
{
    public static MongoDBSettings FromConfiguration(IConfiguration configuration, string section = "MongoDB")
    {
        var instance = new MongoDBSettings();

        configuration.GetSection(section).Bind(instance);

        return instance;
    }

    public string ConnectionString { get; set; } = "set-in-appsettings,json";
    public string Collection { get; set; } = "items";
    public string Database { get; set; } = "matdo";
}
