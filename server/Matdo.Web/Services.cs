using Matdo.Web.Models;

namespace Matdo.Web
{
    public static class Services
    {
        /// <summary>
        /// Register the services that will be injected in the app here.
        /// </summary>
        /// <param name="services"></param>
        public static void RegisterServices(IServiceCollection services, IConfiguration configuration)
        {

        }

        /// <summary>
        /// Register repositories here.
        /// </summary>
        /// <param name="services"></param>
        public static void RegisterRepositories(IServiceCollection services, IConfiguration configuration)
        {

        }

        /// <summary>
        /// Register all other injectables here.
        /// </summary>
        /// <param name="services"></param>
        public static void RegisterMiscellaneous(IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<MongoDBSettings>((serviceProviders) =>
            {
                var mongoDbSettings = new MongoDBSettings(configuration);

                return mongoDbSettings;
            });
        }
    }
}
