using Matdo.Web.Models;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace Matdo.Web;

public static class Mongo
{
    /// <summary>
    /// Adds MongDB related confirations to the pipeline.
    /// </summary>
    /// <param name="builder">The builder to use.</param>
    public static void AddMongoDb(this WebApplicationBuilder builder)
    {
        var services = builder.Services;
        var configuration = builder.Configuration;
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        var settings = MongoDBSettings.FromConfiguration(configuration);

        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        services
            .AddSingleton<MongoDBSettings>((_) => settings)
            .AddSingleton<IMongoDatabase>((_) =>
            {
                var client = new MongoClient(settings.ConnectionString);
                var database = client.GetDatabase(settings.Database);

                return database;
            });
    }
}
