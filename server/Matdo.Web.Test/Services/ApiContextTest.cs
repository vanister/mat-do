using System.Security.Claims;
using Matdo.Web.Exception;
using Matdo.Web.Settings;
using Matdo.Web.Services;
using Microsoft.AspNetCore.Http;
using Moq;

namespace Matdo.Web.Test.Services;

[TestClass]
public class ApiContextTest
{
    [TestMethod]
    public void GetUserId_Should_Parse_Auth0_UserId()
    {
        var expected = "abc123";
        var apiContext = SetupApiContext();

        var result = apiContext.GetUserId();

        Assert.AreEqual(expected, result);
    }

    [TestMethod]
    [ExpectedException(typeof(InvalidUserIdException))]
    public void GetUserId_Should_Throw_When_Prefix_Is_Missing()
    {
        var userId = "abc123";
        var context = CreateHttpContextAccessorMock(userId);
        var apiContext = SetupApiContext(accessor: context.Object);

        var result = apiContext.GetUserId();
    }

    [TestMethod]
    [ExpectedException(typeof(InvalidUserIdException))]
    public void GetUserId_Should_Throw_When_Prefix_Is_Bad()
    {
        var userId = "sith|abc123";
        var context = CreateHttpContextAccessorMock(userId);
        var apiContext = SetupApiContext(accessor: context.Object);

        var result = apiContext.GetUserId();
    }

    [TestMethod]
    [ExpectedException(typeof(MissingSettingException))]
    public void GetUserId_Should_Throw_When_Prefix_Is_Null()
    {
        var settings = new Auth0Settings();
        var apiContext = SetupApiContext(settings: settings);

        var result = apiContext.GetUserId();
    }

    [TestMethod]
    public void GetUserId_Should_Get_Without_Prefix()
    {
        var userId = "useridwithoutprefix@clients";
        var settings = new Auth0Settings { Prefix = "", Delimiter = "|" };
        var accessor = CreateHttpContextAccessorMock(userId);
        var apiContext = SetupApiContext(accessor.Object, settings);

        var result = apiContext.GetUserId();

        Assert.AreEqual(userId, result);
    }

    private IApiContext SetupApiContext(
        IHttpContextAccessor? accessor = null,
        Auth0Settings? settings = null)
    {
        var mockSettings = settings ?? new Auth0Settings
        {
            Prefix = "auth0",
            Delimiter = "|"
        };

        var mockAssessor = accessor ?? CreateHttpContextAccessorMock().Object;
        var apiContext = new Auth0ApiContext(mockAssessor, mockSettings);

        return apiContext;
    }

    private Mock<IHttpContextAccessor> CreateHttpContextAccessorMock(string auth0UserId = "auth0|abc123")
    {
        var mockUser = new Mock<ClaimsPrincipal>();
        mockUser.Setup(x => x.FindFirst(ClaimTypes.NameIdentifier)).Returns(new Claim(ClaimTypes.NameIdentifier, auth0UserId));

        var mockHttpContext = new Mock<HttpContext>();
        mockHttpContext.Setup(x => x.User).Returns(mockUser.Object);

        var mockHttpContextAccessor = new Mock<IHttpContextAccessor>();
        mockHttpContextAccessor.Setup(x => x.HttpContext).Returns(mockHttpContext.Object);

        return mockHttpContextAccessor;
    }
}
