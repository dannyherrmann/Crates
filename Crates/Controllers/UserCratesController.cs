using Crates.Models;
using Crates.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Crates.Controllers;

[Route("[controller]")]
[ApiController]

public class UserCratesController : Controller
{
    private readonly IUserCrateRepository _userCrateRepo;

    public UserCratesController(IUserCrateRepository userCrateRepository)
    {
        _userCrateRepo = userCrateRepository;
    }

    [HttpGet("{userId}")]
    public IActionResult GetAllUserCrates(int userId)
    {
        return Ok(_userCrateRepo.GetAllUserCrates(userId));
    }

    [HttpGet("id/{id}")]
    public IActionResult GetById(int id)
    {
        var userCrate = _userCrateRepo.GetById(id);
        if (userCrate == null)
        {
            return NotFound();
        }
        return Ok(userCrate);
    }

    [HttpPost]
    public IActionResult Post(UserCrate userCrate)
    {
        _userCrateRepo.Add(userCrate);
        return Created("/userCrate/" + userCrate.Id, userCrate);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, UserCrate userCrate)
    {
        if (id != userCrate.Id)
        {
            return BadRequest();
        }

        _userCrateRepo.Update(userCrate);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _userCrateRepo.Delete(id);
        return NoContent();
    }
}