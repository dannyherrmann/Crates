using Crates.Models;
using Crates.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Crates.Controllers;

[Route("[controller]")]
[ApiController]

public class SizesController : Controller
{
    private readonly ISizeRepository _sizeRepo;

    public SizesController(ISizeRepository sizeRepository)
    {
        _sizeRepo = sizeRepository;
    }

    [HttpGet]
    public IActionResult GetAllSizes()
    {
        return Ok(_sizeRepo.GetAllSizes());
    }

    [HttpPost]
    public IActionResult Post(Size size)
    {
        _sizeRepo.Add(size);
        return Created("/size/" + size.Id, size);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _sizeRepo.Delete(id);
        return NoContent();
    }
}