using Matdo.Web.Models;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Matdo.Web.Repositories
{
    public interface IItemRepository
    {
        Task<IEnumerable<Item>> ListByUserId(string userId);

    }

    public class ItemRepository : IItemRepository
    {
        private readonly IMongoDatabase mongoDatabase;
        private readonly MongoDBSettings settings;

        public ItemRepository(
            IMongoDatabase mongoDatabase,
            MongoDBSettings settings)
        {
            this.mongoDatabase = mongoDatabase;
            this.settings = settings;
        }

        public IMongoQueryable<Item> ItemCollection =>
            this.mongoDatabase.GetCollection<Item>(settings.Collection).AsQueryable();

        public async Task<IEnumerable<Item>> ListByUserId(string userId)
        {
            var items = await ItemCollection.Where(i => i.UserId == userId).ToListAsync();

            return items;
        }
    }
}
