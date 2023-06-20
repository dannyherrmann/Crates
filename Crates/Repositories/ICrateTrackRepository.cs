using Crates.Models;

namespace Crates.Repositories
{
    public interface ICrateTrackRepository
    {
        List<CrateTrack> GetAllCrateTracks(int crateId); 
        void Add(CrateTrack crateTrack);
        void Delete(int crateId);
    }
}