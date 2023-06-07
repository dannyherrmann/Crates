using Crates.Models;

namespace Crates.Repositories
{
    public interface ILabelRepository
    {
        List<Label> GetAllLabels();
        Label GetById(int id);
        void Add(Label label);
        void Update(Label label);
        void Delete(int id);
    }
}