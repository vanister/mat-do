using Matdo.Web.Models;
using Matdo.Web.Repositories;
using Matdo.Web.Services;
using Moq;

namespace Matdo.Web.Test.Services;

[TestClass]
public class ItemServiceTest
{
    [TestMethod]
    public void Should_Instantiate_Service_Success()
    {
        var service = SetupService();

        Assert.IsNotNull(service);
    }

    private IItemService SetupService(IItemRepository? itemRepo = null)
    {
        var mockItemRepo = itemRepo ?? CreateItemRepoMock().Object;
        var service = new ItemService(mockItemRepo);

        return service;
    }

    private Mock<IItemRepository> CreateItemRepoMock()
    {
        var mockItemRepo = new Mock<IItemRepository>();
        mockItemRepo.Setup(x => x.CreateAsync(It.IsAny<Item>())).ReturnsAsync(new Item());

        return mockItemRepo;
    }
}
