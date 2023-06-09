using Crates.Models;
using Crates.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Crates.Controllers;

[Route("[controller]")]
[ApiController]

public class UserDigsController : Controller
{
    private readonly IUserDigRepository _userDigRepo;

    public UserDigsController(IUserDigRepository userDigRepository)
    {
        _userDigRepo = userDigRepository;
    }

    [HttpGet("{userId}")]
    public IActionResult GetUserDigs(int userId, int? pageNumber, int? pageSize, AlbumRepository.SortOrder sortOrder, string? genres = null, string? styles = null, string? searchCriterion = null)
    {
        return Ok(_userDigRepo.GetUserDigs(userId, pageNumber, pageSize, sortOrder, genres, styles, searchCriterion));
    }

    [HttpPost]
    public IActionResult AddUserDig(UserDig userDig)
    {
        _userDigRepo.Add(userDig);
        return Created("/userDig/" + userDig.Id, userDig);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _userDigRepo.Delete(id);
        return NoContent();
    }
}