using Crates.Models;
using Crates.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Crates.Controllers;

[Route("[controller]")]
[ApiController]

public class LabelsController : Controller
{
    private readonly ILabelRepository _labelRepo;

    public LabelsController(ILabelRepository labelRepository)
    {
        _labelRepo = labelRepository;
    }

    [HttpGet]
    public IActionResult GetAllLabels()
    {
        return Ok(_labelRepo.GetAllLabels());
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var label = _labelRepo.GetById(id);
        if (label == null)
        {
            return NotFound();
        }
        return Ok(label);
    }

    [HttpPost]
    public IActionResult Post(Label label)
    {
        _labelRepo.Add(label);
        return Created("/label/" + label.Id, label);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, Label label)
    {
        if (id != label.Id)
        {
            return BadRequest();
        }

        _labelRepo.Update(label);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _labelRepo.Delete(id);
        return NoContent();
    }
}