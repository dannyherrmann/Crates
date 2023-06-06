using Crates.Models;
using Crates.Utils;

namespace Crates.Repositories;

public class StyleRepository : BaseRepository, IStyleRepository
{
    public StyleRepository(IConfiguration configuration) : base(configuration) { }

    public List<Style> GetAllStyles()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT  id,
                                            [name]
                                    FROM Styles";

                var reader = cmd.ExecuteReader();

                var styles = new List<Style>();

                while (reader.Read())
                {
                    var style = new Style()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "name")
                    };

                    styles.Add(style);
                }

                reader.Close();
                return styles;
            }
        }
    }

    public void Add(Style style)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO [Styles]
                                        (name)
                                    OUTPUT inserted.id
                                    VALUES(@name)";
                
                DbUtils.AddParameter(cmd, "@name", style.Name);

                style.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void Update(Style style)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"UPDATE [Styles]
                                        SET name = @name
                                    WHERE id = @id";

                DbUtils.AddParameter(cmd, "@id", style.Id);
                DbUtils.AddParameter(cmd, "@name", style.Name);

                cmd.ExecuteNonQuery();
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
                cmd.CommandText = "DELETE FROM [Styles] WHERE id = @id";
                DbUtils.AddParameter(cmd, "@id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }
}