using Crates.Models;

namespace Crates.Repositories
{
    public interface IUserDigRepository
    {
        List<UserDig> GetUserDigs(int userId, int? pageNumber, int? pageSize, AlbumRepository.SortOrder sortOrder, string? genres = null, string? styles = null, string? searchCriterion = null);
        void Add(UserDig userDig);
        void Delete(int id);
    }
}