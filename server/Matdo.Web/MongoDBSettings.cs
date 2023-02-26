namespace Matdo.Web.Models
{
    public class MongoDBSettings
    {
        private readonly IConfiguration configuration;

        public MongoDBSettings(IConfiguration configuration)
        {
            this.configuration = configuration;

            configuration.GetSection("MongoDB").Bind(this);
        }

        public string ConnectionString { get; set; } = string.Empty;
        public string Collection { get; set; } = "items";
        public string Database { get; set; } = "matdo";
    }
}
