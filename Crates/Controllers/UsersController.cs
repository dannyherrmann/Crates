using Crates.Models;
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

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var user = _userRepo.GetById(id);
        if (user == null)
        {
            return NotFound();
        }
        return Ok(user);
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

    [HttpPost]
    public IActionResult Post(User user)
    {
        _userRepo.Add(user);
        return Created("/user/" + user.Id, user);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, User user)
    {
        if (id != user.Id)
        {
            return BadRequest();
        }

        _userRepo.Update(user);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _userRepo.Delete(id);
        return NoContent();
    }


}
