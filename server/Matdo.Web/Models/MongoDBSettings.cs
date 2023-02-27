namespace Matdo.Web.Models
{
    public class MongoDBSettings
    {
        public MongoDBSettings(IConfiguration configuration)
        {
            configuration.GetSection("MongoDB").Bind(this);
        }

        public string ConnectionString { get; set; } = string.Empty;
        public string Collection { get; set; } = "items";
        public string Database { get; set; } = "matdo";
    }
}
