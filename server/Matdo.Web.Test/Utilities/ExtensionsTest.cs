using Matdo.Web.Models;
using Matdo.Web.Utilties;
using MongoDB.Bson;

namespace Matdo.Web.Test.Utilties;

[TestClass]
public class ExtensionsTesn
{
    [TestMethod]
    public void Should_Clone_Success()
    {
        var item = new Item
        {
            Id = new ObjectId(),
            Name = "Blaster",
            CreatedAt = DateTime.Parse("12/31/2022"),
            UserId = "string-representation-or-mongo-obj-id",
            Description = "Jyn's blaster"
        };

        var cloned = item.Clone();

        Assert.AreNotEqual(item, cloned);

        Assert.AreEqual(item.Id, cloned.Id);
        Assert.AreEqual(item.Description, cloned.Description);
        Assert.AreEqual(item.Name, cloned.Name);
        Assert.AreEqual(item.CreatedAt, cloned.CreatedAt);
        Assert.AreEqual(item.UserId, cloned.UserId);
    }
}
