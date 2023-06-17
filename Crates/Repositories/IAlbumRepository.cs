using Crates.Models;

namespace Crates.Repositories
{
    public interface IAlbumRepository
    {
        List<Album> GetAllAlbums(int? pageNumber, int? pageSize, int? decade, AlbumRepository.SortOrder sortOrder, string? genres = null, string? styles = null, string? searchCriterion = null, string? albumCountry = null);

        Album GetById(int id);
        List<int> GetAlbumDecades();

        void Add(Album album);

        void Update(Album album);

        void Delete(int id);

    }
}