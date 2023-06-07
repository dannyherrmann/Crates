using Crates.Models;
using Crates.Utils;

namespace Crates.Repositories;

public class LabelRepository : BaseRepository, ILabelRepository
{
    public LabelRepository(IConfiguration configuration) : base(configuration) { }

    public List<Label> GetAllLabels()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT  id,
                                            name,
                                            photo
                                    FROM Labels";

                var reader = cmd.ExecuteReader();

                var labels = new List<Label>();

                while (reader.Read())
                {
                    var label = new Label()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "name"),
                        Photo = DbUtils.GetString(reader, "photo")
                    };

                    labels.Add(label);
                }

                reader.Close();
                return labels;
            }
        }
    }

    public Label GetById(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT  id,
                                            name,
                                            photo
                                    FROM Labels
                                    WHERE id = @id";

                DbUtils.AddParameter(cmd, "@id", id);

                var reader = cmd.ExecuteReader();

                Label label = null;

                if (reader.Read())
                {
                    label = new Label()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "name"),
                        Photo = DbUtils.GetString(reader, "photo")
                    };
                }

                reader.Close();
                return label;
            }
        }
    }

    public void Add(Label label)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO [Labels]
                                        (name,
                                        photo)
                                    OUTPUT inserted.id
                                    VALUES (@name,
                                            @photo)";

                DbUtils.AddParameter(cmd, "@name", label.Name);
                DbUtils.AddParameter(cmd, "@photo", label.Photo);

                label.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void Update(Label label)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"UPDATE Labels
                                        SET name = @name,
                                            photo = @photo
                                        WHERE id = @id";

                DbUtils.AddParameter(cmd, "@id", label.Id);
                DbUtils.AddParameter(cmd, "@name", label.Name);
                DbUtils.AddParameter(cmd, "photo", label.Photo);
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
                cmd.CommandText = "DELETE FROM Labels WHERE id = @id";
                DbUtils.AddParameter(cmd, "@id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }

}