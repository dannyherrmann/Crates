using Crates.Models;
using Crates.Utils;

namespace Crates.Repositories;

public class TrackRepository : BaseRepository, ITrackRepository
{
    public TrackRepository(IConfiguration configuration) : base(configuration) { }

    public List<Track> GetAllTracks()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT  t.id,
                                            t.[name] AS trackName,
                                            t.[position],
                                            t.duration,
                                            t.bpm,
                                            t.[key],
                                            t.albumId,
                                            ar.name AS artistName,
                                            al.name AS albumName,
                                            al.photo AS albumPhoto
                                    FROM Tracks t
                                        JOIN Albums al ON t.albumId = al.id
                                        JOIN Artists ar ON al.artistId = ar.id";

                var reader = cmd.ExecuteReader();

                var tracks = new List<Track>();

                while (reader.Read())
                {
                    var track = new Track()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "trackName"),
                        Position = DbUtils.GetString(reader, "position"),
                        Duration = DbUtils.GetTimeSpan(reader, "duration"),
                        Bpm = DbUtils.GetNullableInt(reader, "bpm"),
                        Key = DbUtils.GetString(reader, "key"),
                        AlbumId = DbUtils.GetInt(reader, "albumId"),
                        AlbumName = DbUtils.GetString(reader, "albumName"),
                        ArtistName = DbUtils.GetString(reader, "artistName"),
                        AlbumPhoto = DbUtils.GetString(reader, "albumPhoto")
                    };

                    tracks.Add(track);
                }

                reader.Close();
                return tracks;
            }
        }
    }
    public List<Track> GetAlbumTracks(int albumId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT  t.id,
                                            t.[name] AS trackName,
                                            t.[position],
                                            t.duration,
                                            t.bpm,
                                            t.[key],
                                            t.albumId,
                                            ar.name AS artistName,
                                            al.name AS albumName,
                                            al.photo AS albumPhoto
                                    FROM Tracks t
                                        JOIN Albums al ON t.albumId = al.id
                                        JOIN Artists ar ON al.artistId = ar.id
                                    WHERE albumId = @albumId";

                DbUtils.AddParameter(cmd, "@albumId", albumId);

                var reader = cmd.ExecuteReader();

                var tracks = new List<Track>();

                while (reader.Read())
                {
                    var track = new Track()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "trackName"),
                        Position = DbUtils.GetString(reader, "position"),
                        Duration = DbUtils.GetTimeSpan(reader, "duration"),
                        Bpm = DbUtils.GetNullableInt(reader, "bpm"),
                        Key = DbUtils.GetString(reader, "key"),
                        AlbumId = DbUtils.GetInt(reader, "albumId"),
                        AlbumName = DbUtils.GetString(reader, "albumName"),
                        ArtistName = DbUtils.GetString(reader, "artistName"),
                        AlbumPhoto = DbUtils.GetString(reader, "albumPhoto")
                    };

                    tracks.Add(track);
                }

                reader.Close();
                return tracks;
            }
        }
    }

    public List<Track> GetUserTracks(int userId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT  t.id,
                                            t.[name] AS trackName,
                                            t.[position],
                                            t.duration,
                                            t.bpm,
                                            t.[key],
                                            t.albumId,
                                            ar.name AS artistName,
                                            al.name AS albumName,
                                            al.photo AS albumPhoto
                                    FROM UserAlbums ua
                                        JOIN Albums al ON ua.albumId = al.id
                                        JOIN Artists ar ON al.artistId = ar.id
                                        JOIN Tracks t ON t.albumId = al.id
                                    WHERE ua.userId = @userId";

                DbUtils.AddParameter(cmd, "@userId", userId);

                var reader = cmd.ExecuteReader();

                var tracks = new List<Track>();

                while (reader.Read())
                {
                    var track = new Track()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "trackName"),
                        Position = DbUtils.GetString(reader, "position"),
                        Duration = DbUtils.GetTimeSpan(reader, "duration"),
                        Bpm = DbUtils.GetNullableInt(reader, "bpm"),
                        Key = DbUtils.GetString(reader, "key"),
                        AlbumId = DbUtils.GetInt(reader, "albumId"),
                        ArtistName = DbUtils.GetString(reader, "artistName"),
                        AlbumName = DbUtils.GetString(reader, "albumName"),
                        AlbumPhoto = DbUtils.GetString(reader, "albumPhoto")
                    };

                    tracks.Add(track);
                }

                reader.Close();
                return tracks;
            }
        }
    }

    public Track GetById(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT  t.id,
                                            t.[name] AS trackName,
                                            t.[position],
                                            t.duration,
                                            t.bpm,
                                            t.[key],
                                            t.albumId,
                                            ar.name AS artistName,
                                            al.name AS albumName,
                                            al.photo AS albumPhoto
                                    FROM Tracks t
                                        JOIN Albums al ON t.albumId = al.id
                                        JOIN Artists ar ON al.artistId = ar.id
                                    WHERE t.id = @id";

                DbUtils.AddParameter(cmd, "@id", id);

                var reader = cmd.ExecuteReader();

                Track track = null;

                if (reader.Read())
                {
                    track = new Track()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "trackName"),
                        Position = DbUtils.GetString(reader, "position"),
                        Duration = DbUtils.GetTimeSpan(reader, "duration"),
                        Bpm = DbUtils.GetNullableInt(reader, "bpm"),
                        Key = DbUtils.GetString(reader, "key"),
                        AlbumId = DbUtils.GetInt(reader, "albumId"),
                        AlbumName = DbUtils.GetString(reader, "albumName"),
                        ArtistName = DbUtils.GetString(reader, "artistName"),
                        AlbumPhoto = DbUtils.GetString(reader, "albumPhoto")
                    };
                }

                reader.Close();
                return track;
            }
        }
    }

    public void Add(Track track)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO [Tracks]
                                        (name,
                                        [position],
                                        duration,
                                        bpm,
                                        [key],
                                        albumId)
                                    OUTPUT inserted.id
                                    VALUES
                                        (@name,
                                        @position,
                                        @duration,
                                        @bpm,
                                        @key,
                                        @albumId)";

                DbUtils.AddParameter(cmd, "@name", track.Name);
                DbUtils.AddParameter(cmd, "@position", track.Position);
                DbUtils.AddParameter(cmd, "@duration", track.Duration);
                DbUtils.AddParameter(cmd, "@bpm", track.Bpm);
                DbUtils.AddParameter(cmd, "@key", track.Key);
                DbUtils.AddParameter(cmd, "@albumId", track.AlbumId);

                track.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void Update(Track track)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"UPDATE [Tracks]
                                        SET name = @name,
                                            [position] = @position,
                                            duration = @duration,
                                            bpm = @bpm,
                                            [key] = @key,
                                            albumId = @albumId
                                    WHERE id = @id";

                DbUtils.AddParameter(cmd, "@id", track.Id);
                DbUtils.AddParameter(cmd, "@name", track.Name);
                DbUtils.AddParameter(cmd, "@position", track.Position);
                DbUtils.AddParameter(cmd, "@duration", track.Duration);
                DbUtils.AddParameter(cmd, "@bpm", track.Bpm);
                DbUtils.AddParameter(cmd, "@key", track.Key);
                DbUtils.AddParameter(cmd, "@albumId", track.AlbumId);

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
                cmd.CommandText = "DELETE FROM [Tracks] WHERE id = @id";
                DbUtils.AddParameter(cmd, "@id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }
}