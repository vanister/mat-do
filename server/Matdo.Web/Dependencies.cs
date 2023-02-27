using Matdo.Web.Repositories;

namespace Matdo.Web
{
    public static class Dependencies
    {
        public static void AddServices(this IServiceCollection services)
        {

        }

        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddTransient<IItemRepository, ItemRepository>();
        }
    }
}
