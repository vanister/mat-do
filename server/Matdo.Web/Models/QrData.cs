using MongoDB.Bson;

namespace Matdo.Web.Models
{
    public class QrData
    {
        public ObjectId Id { get; set; }
        public string Data { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}
