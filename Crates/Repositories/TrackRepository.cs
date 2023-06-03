using Crates.Models;
using Crates.Utils;

namespace Crates.Repositories;

public class TrackRepository : BaseRepository, ITrackRepository
{
    public TrackRepository(IConfiguration configuration) : base(configuration) { }

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
                        Bpm = DbUtils.GetInt(reader, "bpm"),
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
}