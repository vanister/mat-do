using MongoDB.Bson;

namespace Matdo.Web.Models.Mongo;

public class Item
{
    public ObjectId Id { get; set; }

    public string UserId { get; set; }

    public string Name { get; set; }

    public DateTime CreatedAt { get; set; }

    public string? Description { get; set; }
}
