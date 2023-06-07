using Crates.Models;
using Crates.Utils;

namespace Crates.Repositories;

public class SpeedRepository : BaseRepository, ISpeedRepository
{
    public SpeedRepository(IConfiguration configuration) : base(configuration) { }

    public List<Speed> GetAllSpeeds()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT  id,
                                            name
                                    FROM Speeds";

                var reader = cmd.ExecuteReader();

                var speeds = new List<Speed>();

                while (reader.Read())
                {
                    var speed = new Speed()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "name")
                    };

                    speeds.Add(speed);
                }

                reader.Close();
                return speeds;
            }
        }
    }

    public void Add(Speed speed)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO [Speeds]
                                        (name)
                                    OUTPUT inserted.id
                                    VALUES (@name)";

                DbUtils.AddParameter(cmd, "@name", speed.Name);

                speed.Id = (int)cmd.ExecuteScalar();
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
                cmd.CommandText = "DELETE FROM [Speeds] WHERE id = @id";
                DbUtils.AddParameter(cmd, "@id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }
}