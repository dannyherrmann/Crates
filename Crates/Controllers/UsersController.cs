using Crates.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Crates.Controllers;

[Route("[controller]")]
[ApiController]
public class UsersController : Controller
{
    private readonly IUserRepository _userRepo;

    public UsersController(IUserRepository userRepo)
    {
        _userRepo = userRepo;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_userRepo.GetAll());
    }

    [HttpGet("uid/{uid}")]
    public IActionResult GetUserByUid(string uid)
    {
        var user = _userRepo.GetUserByUid(uid);
        if (user == null)
        {
            return NotFound();
        }
        return Ok(user);
    }
}
