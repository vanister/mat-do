using Matdo.Web.Models;
using Matdo.Web.Settings;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Matdo.Web.Repositories;

public interface IItemRepository
{
    Task<IEnumerable<Item>> ListByUserIdAsync(string userId);
    Task<Item?> GetByIdAsync(string id);
    Task<Item> GetByIdAsync(ObjectId id);
    Task<Item> CreateAsync(Item item);
    Task UpdateAsync(Item item);
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

    public IMongoQueryable<Item> QueryableItemCollection =>
        mongoDatabase.GetCollection<Item>(settings.Collection).AsQueryable();

    public IMongoCollection<Item> ItemCollection => mongoDatabase.GetCollection<Item>(settings.Collection);

    public async Task<IEnumerable<Item>> ListByUserIdAsync(string userId) =>
        await QueryableItemCollection.Where(i => i.UserId == userId).ToListAsync();

    public async Task<Item?> GetByIdAsync(string id)
    {
        if (!ObjectId.TryParse(id, out var objId))
        {
            return null;
        }

        var item = await GetByIdAsync(objId);

        return item;
    }

    public async Task<Item> GetByIdAsync(ObjectId id)
    {
        var item = await QueryableItemCollection.FirstOrDefaultAsync(item => item.Id == id);

        return item;
    }

    public async Task<Item> CreateAsync(Item item)
    {
        await ItemCollection.InsertOneAsync(item);

        return item;
    }

    public async Task UpdateAsync(Item item)
    {
        var filter = Builders<Item>.Filter.Eq(i => i.Id, item.Id);

        await ItemCollection.ReplaceOneAsync(filter, item);
    }
}
