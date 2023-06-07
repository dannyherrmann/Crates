using Crates.Models;
using Crates.Utils;

namespace Crates.Repositories;

public class SizeRepository : BaseRepository, ISizeRepository
{
    public SizeRepository(IConfiguration configuration) : base(configuration) { }

    public List<Size> GetAllSizes()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT id,
                                        name
                                    FROM Sizes";

                var reader = cmd.ExecuteReader();

                var sizes = new List<Size>();

                while (reader.Read())
                {
                    var size = new Size()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "name")
                    };

                    sizes.Add(size);
                }

                reader.Close();
                return sizes;
            }
        }
    }

    public void Add(Size size)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO [Sizes]
                                        (name)
                                    OUTPUT inserted.id
                                    VALUES (@name)";

                DbUtils.AddParameter(cmd, "@name", size.Name);

                size.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void Delete(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = "DELETE FROM [Sizes] WHERE id = @id";
                DbUtils.AddParameter(cmd, "@id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }
}