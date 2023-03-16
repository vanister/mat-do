namespace Matdo.Web.Exception;

[Serializable]
public class InvalidUserIdException : System.Exception
{
    public InvalidUserIdException() : base("User Id is not in the correct format") { }
}
