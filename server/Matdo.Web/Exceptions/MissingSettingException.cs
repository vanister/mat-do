namespace Matdo.Web.Exception;

[Serializable]
public class MissingSettingException : System.Exception
{
    public MissingSettingException(string setting) :
        base($"The '{setting}' setting is missing from app settings.")
    { }
}
