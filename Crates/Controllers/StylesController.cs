using Crates.Models;
using Crates.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Crates.Controllers;

[Route("[controller]")]
[ApiController]

public class StylesController : Controller
{
    private readonly IStyleRepository _styleRepo;

    public StylesController(IStyleRepository styleRepository)
    {
        _styleRepo = styleRepository;
    }

    [HttpGet]
    public IActionResult GetAllStyles()
    {
        return Ok(_styleRepo.GetAllStyles());
    }

    [HttpPost]
    public IActionResult Post(Style style)
    {
        _styleRepo.Add(style);
        return Created("/style/" + style.Id, style);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, Style style)
    {
        if (id != style.Id)
        {
            return BadRequest();
        }

        _styleRepo.Update(style);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _styleRepo.Delete(id);
        return NoContent();
    }
}