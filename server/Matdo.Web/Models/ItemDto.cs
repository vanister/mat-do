using System.ComponentModel.DataAnnotations;

namespace Matdo.Web.Models;

public class ItemDto
{
    public string? Id { get; set; }
    public string? UserId { get; set; }
    [Required]
    public string Name { get; set; }
    public DateTime CreatedAt { get; set; }
    public string? Description { get; set; }
}
