using Matdo.Web.Models;
using Matdo.Web.Repositories;

namespace Matdo.Web.Services
{
    public interface IItemService
    {
        Task<IEnumerable<Item>> List(string userId);
    }

    public class ItemService : IItemService
    {
        private readonly IItemRepository itemRepository;

        public ItemService(IItemRepository itemRepository)
        {
            this.itemRepository = itemRepository;
        }

        public async Task<IEnumerable<Item>> List(string userId)
        {
            var items = await itemRepository.ListByUserId(userId);

            return items;
        }
    }
}
