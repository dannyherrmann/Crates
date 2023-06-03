using Crates.Models;
using Crates.Utils;

namespace Crates.Repositories;

public class ArtistRepository : BaseRepository, IArtistRepository
{
    public ArtistRepository(IConfiguration configuration) : base(configuration) { }

    public List<Artist> GetAllArtists()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
                                        id,
                                        name,
                                        bio, 
                                        photo
                                    FROM Artists";
                
                var reader = cmd.ExecuteReader();

                var artists = new List<Artist>();

                while (reader.Read())
                {
                    var artist = new Artist()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "name"),
                        Bio = DbUtils.GetString(reader, "bio"),
                        Photo = DbUtils.GetString(reader, "photo")
                    };

                    artists.Add(artist);
                }

                reader.Close();
                return artists;
            }
        }
    }

    public Artist GetById(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
                        id,
                        name,
                        bio, 
                        photo
                    FROM Artists
                    WHERE id = @id";

                DbUtils.AddParameter(cmd, "@id", id);

                var reader = cmd.ExecuteReader();

                Artist artist = null;

                if (reader.Read())
                {
                    artist = new Artist()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "name"),
                        Bio = DbUtils.GetString(reader, "bio"),
                        Photo = DbUtils.GetString(reader, "photo") 
                    };
                }

                reader.Close();
                return artist;
            }
        }
    }

    public void Add(Artist artist)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO Artists
                                        (name,
                                        bio,
                                        photo)
                                    OUTPUT inserted.id
                                    VALUES
                                        (@name,
                                        @bio,
                                        @photo)";
                
                DbUtils.AddParameter(cmd, "@name", artist.Name);
                DbUtils.AddParameter(cmd, "@bio", artist.Bio);
                DbUtils.AddParameter(cmd, "@photo", artist.Photo);

                artist.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void Update(Artist artist)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"UPDATE Artists
                                        SET name = @name,
                                            bio = @bio,
                                            photo = @photo
                                        WHERE id = @id";

                DbUtils.AddParameter(cmd, "@id", artist.Id);
                DbUtils.AddParameter(cmd, "@name", artist.Name);
                DbUtils.AddParameter(cmd, "@bio", artist.Bio);
                DbUtils.AddParameter(cmd, "@photo", artist.Photo);
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
                cmd.CommandText = "DELETE FROM Artists WHERE id = @id";
                DbUtils.AddParameter(cmd, "@id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }
}