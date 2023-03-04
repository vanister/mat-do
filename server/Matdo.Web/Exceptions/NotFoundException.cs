
namespace Matdo.Web.Exception;

[Serializable]
public class NotFoundException : System.Exception
{
    public NotFoundException() : base("Not found") { }
    public NotFoundException(string message) : base(message) { }
}
