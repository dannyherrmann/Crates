namespace Crates.Models;

public class UserAlbum
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int AlbumId { get; set; }
    public DateTime DateAdded { get; set; }

}
