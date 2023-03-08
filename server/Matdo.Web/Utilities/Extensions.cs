using System.Reflection;

namespace Matdo.Web.Utilties;

public static class Extensions
{
    public static T Clone<T>(this T original, bool deep = false) where T : class
    {
        if (deep)
        {
            throw new NotImplementedException();
        }

        var type = typeof(T);
        var cloned = Activator.CreateInstance<T>();

        foreach (var property in type.GetProperties())
        {
            var value = property.GetValue(original);

            property.SetValue(cloned, value);
        }

        return cloned;
    }
}
