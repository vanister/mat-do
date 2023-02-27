using MongoDB.Bson;

namespace Matdo.Web.Models
{
    public class Item
    {
        public ObjectId Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public string? Description { get; set; }
    }
}
