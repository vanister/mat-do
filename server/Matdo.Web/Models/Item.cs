using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;

namespace Matdo.Web.Models;

public class Item
{
    public ObjectId Id { get; set; }

    [Required]
    public string UserId { get; set; }

    [Required]
    public string Name { get; set; }

    public DateTime CreatedAt { get; set; }

    public string? Description { get; set; }
}
