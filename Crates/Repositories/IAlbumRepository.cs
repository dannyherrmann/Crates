using Crates.Models;

namespace Crates.Repositories
{
    public interface IAlbumRepository
    {
        List<Album> GetAllAlbums(int? pageNumber, int? pageSize, AlbumRepository.SortOrder sortOrder, string? genres = null, string? styles = null, string? searchCriterion = null);
    }
}