using Matdo.Web.Models;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace Matdo.Web;

public static class Mongo
{
    public static void AddMongoDb(this WebApplicationBuilder builder)
    {
        var services = builder.Services;
        var configuration = builder.Configuration;
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };

        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        services.AddSingleton<MongoDBSettings>((_) =>
        {
            var settings = MongoDBSettings.FromConfiguration(configuration);

            return settings;
        });

        services.AddSingleton<IMongoDatabase>((serviceProvider) =>
        {
            var settings = serviceProvider.GetService<MongoDBSettings>()!;
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.Database);

            return database;
        });
    }
}
