namespace Crates.Models;

public class Album
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Year { get; set; }
    public string CatalogNumber { get; set; }
    public string Photo { get; set; }
    public DateTime DateAdded { get; set; }
    public string? Genres { get; set; }
    public string? Styles { get; set; }
    public int ArtistId { get; set; }
    public int? CountryId { get; set; }
    public int? LabelId { get; set; }
    public int? SizeId { get; set; }
    public int? SpeedId { get; set; }
    public Artist? Artist { get; set; }
    public Country? Country { get; set; }
    public Label? Label { get; set; }
    public Size? Size { get; set; } 
    public Speed? Speed { get; set; }

}
