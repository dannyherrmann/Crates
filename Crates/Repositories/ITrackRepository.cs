using Crates.Models;

namespace Crates.Repositories
{
    public interface ITrackRepository
    {
        List<Track> GetUserTracks(int userId);
    }
}