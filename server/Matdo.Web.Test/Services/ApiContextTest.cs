using System.Security.Claims;
using Matdo.Web.Exception;
using Matdo.Web.Models;
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
    public void GetUserId_Should_Fail_Parsing_Without_Prefix()
    {
        var userId = "abc123";
        var context = CreateApiContextMock(userId);
        var apiContext = SetupApiContext(context.Object);

        var result = apiContext.GetUserId();
    }

    [TestMethod]
    [ExpectedException(typeof(InvalidUserIdException))]
    public void GetUserId_Should_Fail_Parsing_With_Bad_Prefix()
    {
        var userId = "sith|abc123";
        var context = CreateApiContextMock(userId);
        var apiContext = SetupApiContext(context.Object);

        var result = apiContext.GetUserId();
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

        var mockAssessor = accessor ?? CreateApiContextMock().Object;
        var apiContext = new Auth0ApiContext(mockAssessor, mockSettings);

        return apiContext;
    }

    private Mock<IHttpContextAccessor> CreateApiContextMock(string auth0UserId = "auth0|abc123")
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
