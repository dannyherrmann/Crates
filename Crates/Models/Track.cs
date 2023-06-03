namespace Crates.Models;

public class Track
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Position { get; set; }
    public TimeSpan Duration { get; set; }
    public int Bpm { get; set; }
    public string Key { get; set; }
    public int AlbumId { get; set; }
    public string? AlbumName { get; set; }
    public string? ArtistName { get; set; }
    public string? AlbumPhoto { get; set; }

}
