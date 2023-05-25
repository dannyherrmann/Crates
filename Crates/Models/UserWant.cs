namespace Crates.Models;

public class UserWant
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int AlbumId { get; set; }
    public DateTime DateAdded { get; set; }

}
