namespace Crates.Models;

public class Album
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Year { get; set; }
    public string CatalogNumber { get; set; }
    public string Photo { get; set; }
    public DateTime DateAdded { get; set; }
    public int CountryId { get; set; }
    public int ArtistId { get; set; }
    public int LabelId { get; set; }
    public int SizeId { get; set; }
    public int SpeedId { get; set; }

}
