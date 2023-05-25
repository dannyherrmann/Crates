namespace Crates.Models;

public class Track
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Position { get; set; }
    public TimeOnly Duration { get; set; }
    public int Bpm { get; set; }
    public string Key { get; set; }
    public int AlbumId { get; set; }

}
