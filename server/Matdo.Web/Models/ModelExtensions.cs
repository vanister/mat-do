using Matdo.Web.Models.Mongo;
using MongoDB.Bson;

namespace Matdo.Web.Models;

public static class ModelExtensions
{
    public static ItemDto ToItemDto(this Item item)
    {
        return new ItemDto
        {
            Id = item.Id.ToString(),
            UserId = item.UserId,
            Name = item.Name,
            Description = item.Description,
            CreatedAt = item.CreatedAt
        };
    }

    public static Item ToItem(this ItemDto itemDto)
    {
        ObjectId id = ObjectId.Empty;

        if (itemDto.Id != null && !ObjectId.TryParse(itemDto.Id, out id))
        {
            // throw?
            throw new BsonException("Could not parse `Id`");
        }

        return new Item
        {
            Id = id,
            UserId = itemDto.UserId,
            Name = itemDto.Name,
            Description = itemDto.Description,
            CreatedAt = itemDto.CreatedAt
        };
    }
}
