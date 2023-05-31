﻿using Crates.Models;
using Crates.Utils;
using Microsoft.Data.SqlClient;

namespace Crates.Repositories;

public class AlbumRepository : BaseRepository, IAlbumRepository
{
    public AlbumRepository(IConfiguration configuration) : base(configuration) { }

    public enum SortOrder
    {
        DateAdded,
        Alphabetical,
        Artist
    }
    public List<Album> GetAllAlbums(int? pageNumber, int? pageSize, SortOrder sortOrder, string? genres = null, string? styles = null, string? searchCriterion = null)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                var sql = @" SELECT
                                al.id AS albumTableId,
                                al.name AS albumName,
                                al.[year],
                                al.catalogNumber,
                                al.photo AS albumPhoto,
                                al.dateAdded,
                                ar.id AS artistTableId,
                                ar.name AS artistName,
                                ar.bio AS artistBio,
                                ar.photo AS artistPhoto,
                                la.id AS labelTableId,
                                la.name AS labelName,
                                la.photo AS labelPhoto,
                                co.id AS countryTableId,
                                co.name AS countryName,
                                si.id AS sizeTableId,
                                si.name AS sizeName,
                                sp.id AS speedTableId,
                                sp.name AS speedName,
                                (SELECT STRING_AGG(g.name, ', ') FROM AlbumGenres ag JOIN Genres g ON ag.genreId = g.id WHERE ag.albumId = al.id) AS genres,
                                (SELECT STRING_AGG(s.name, ', ') FROM AlbumStyles asl JOIN Styles s ON asl.styleId = s.id WHERE asl.albumId = al.id) AS styles
                            FROM Albums al
                            JOIN Artists ar ON al.artistId = ar.id
                            JOIN Labels la ON al.labelId = la.id
                            JOIN Countries co ON al.countryId = co.id
                            JOIN Sizes si ON al.sizeId = si.id
                            JOIN Speeds sp ON al.speedId = sp.id
                            WHERE 1=1";

                if (!string.IsNullOrEmpty(genres))
                {
                    sql += @" AND al.id IN (
                                SELECT ag.albumId
                                FROM AlbumGenres ag
                                JOIN Genres g on ag.genreId = g.id
                                WHERE g.name LIKE @Genres
                              )";
                }

                if (!string.IsNullOrEmpty(styles))
                {
                    sql += @" AND al.id IN (
                                SELECT asl.albumId
                                FROM AlbumStyles asl
                                JOIN Styles s on asl.styleId = s.id
                                WHERE s.name LIKE @Styles
                              )";
                }

                if (!string.IsNullOrEmpty(searchCriterion))
                {
                    sql += " AND (al.name LIKE @Criterion OR ar.name LIKE @Criterion)";
                }

                switch (sortOrder)
                {
                    case SortOrder.DateAdded:
                        sql += " Order by al.dateAdded ASC";
                        break;
                    case SortOrder.Artist:
                        sql += " Order by ar.name ASC";
                        break;
                    default:
                        sql += " Order by al.name ASC";
                        break;
                }

                if (pageSize.HasValue && pageNumber.HasValue)
                {
                    sql += " OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY";
                }
               
                cmd.CommandText = sql;

                DbUtils.AddParameter(cmd, "@Offset", (pageNumber - 1) * pageSize);
                DbUtils.AddParameter(cmd, "@PageSize", pageSize);
                DbUtils.AddParameter(cmd, "@Genres", genres);
                DbUtils.AddParameter(cmd, "@Styles", styles);
                DbUtils.AddParameter(cmd, "@Criterion", $"%{searchCriterion}%");

                var reader = cmd.ExecuteReader();
                var albums = new List<Album>();

                while (reader.Read())
                {
                    var countryId = DbUtils.GetNullableInt(reader, "countryTableId");
                    var labelId = DbUtils.GetNullableInt(reader, "labelTableId");
                    var sizeId = DbUtils.GetNullableInt(reader, "sizeTableId");
                    var speedId = DbUtils.GetNullableInt(reader, "speedTableId");

                    Country country = null;
                    Label label = null;
                    Size size = null;
                    Speed speed = null;

                    if (countryId.HasValue)
                    {
                        country = new Country()
                        {
                            Id = countryId.Value,
                            Name = DbUtils.GetString(reader, "countryName")
                        };
                    }

                    if (labelId.HasValue)
                    {
                        label = new Label()
                        {
                            Id = labelId.Value,
                            Name = DbUtils.GetString(reader, "labelName"),
                            Photo = DbUtils.GetString(reader, "labelPhoto")
                        };
                    }

                    if (sizeId.HasValue)
                    {
                        size = new Size()
                        {
                            Id = sizeId.Value,
                            Name = DbUtils.GetString(reader, "sizeName")
                        };
                    }

                    if (speedId.HasValue)
                    {
                        speed = new Speed()
                        {
                            Id = speedId.Value,
                            Name = DbUtils.GetString(reader, "speedName")
                        };
                    }

                    var album = new Album()
                    {
                        Id = DbUtils.GetInt(reader, "albumTableId"),
                        Name = DbUtils.GetString(reader, "albumName"),
                        Year = DbUtils.GetInt(reader, "year"),
                        CatalogNumber = DbUtils.GetString(reader, "catalogNumber"),
                        Photo = DbUtils.GetString(reader, "albumPhoto"),
                        DateAdded = DbUtils.GetDateTime(reader, "dateAdded"),
                        CountryId = countryId,
                        ArtistId = DbUtils.GetInt(reader, "artistTableId"),
                        LabelId = labelId,
                        SizeId = sizeId,
                        SpeedId = speedId,
                        Genres = DbUtils.GetString(reader, "genres"),
                        Styles = DbUtils.GetString(reader, "styles"),
                        Artist = new Artist()
                        {
                            Id = DbUtils.GetInt(reader, "artistTableId"),
                            Name = DbUtils.GetString(reader, "artistName"),
                            Bio = DbUtils.GetString(reader, "artistBio"),
                            Photo = DbUtils.GetString(reader, "artistPhoto")
                        },
                        Country = country,
                        Label = label,
                        Size = size,
                        Speed = speed
                    };

                    albums.Add(album);
                }

                reader.Close();
                return albums;
            }
        }
    }
}
