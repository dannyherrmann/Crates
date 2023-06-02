using Crates.Models;

namespace Crates.Repositories
{
    public interface IUserAlbumRepository
    {
        List<UserAlbum> GetUserAlbums(int userId, int? pageNumber, int? pageSize, UserAlbumRepository.SortOrder sortOrder, string? genres = null, string? styles = null, string? searchCriterion = null);
    }
}