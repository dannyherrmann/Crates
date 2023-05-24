USE [master]
GO
IF db_id('Crates') IS NULL
    CREATE DATABASE [Crates]
GO
USE [Crates]
GO

DROP TABLE IF EXISTS [AlbumGenres];
DROP TABLE IF EXISTS [AlbumStyles];
DROP TABLE IF EXISTS [Genres];
DROP TABLE IF EXISTS [Styles];
DROP TABLE IF EXISTS [UserAlbums];
DROP TABLE IF EXISTS [UserWants];
DROP TABLE IF EXISTS [CrateTracks];
DROP TABLE IF EXISTS [Tracks];
DROP TABLE IF EXISTS [Albums];
DROP TABLE IF EXISTS [Artists];
DROP TABLE IF EXISTS [Countries];
DROP TABLE IF EXISTS [Labels];
DROP TABLE IF EXISTS [Speeds];
DROP TABLE IF EXISTS [Sizes];
DROP TABLE IF EXISTS [UserCrates];
DROP TABLE IF EXISTS [Users];


DROP TABLE IF EXISTS [Users];

CREATE TABLE [Users] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [uid] nvarchar(255) NOT NULL,
    [name] nvarchar(255) NOT NULL,
    [email] nvarchar(255) NOT NULL,
    [photo] nvarchar(255)
)

GO

CREATE TABLE [UserCrates] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [name] nvarchar(255) NOT NULL,
    [userId] UNIQUEIDENTIFIER NOT NULL,
    [dateCreated] datetime NOT NULL
)

GO

CREATE TABLE [UserAlbums] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [userId] UNIQUEIDENTIFIER NOT NULL,
    [albumId] UNIQUEIDENTIFIER NOT NULL,
    [dateAdded] datetime NOT NULL
)

GO

CREATE TABLE [UserWants] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [userId] UNIQUEIDENTIFIER NOT NULL,
    [albumId] UNIQUEIDENTIFIER NOT NULL
)

GO

CREATE TABLE [Artists] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [name] nvarchar(255) NOT NULL,
    [bio] nvarchar(500),
    [photo] nvarchar(255)
)

GO

CREATE TABLE [Albums] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(), 
    [name] nvarchar(255) NOT NULL,
    [year] int,
    [catalogNumber] nvarchar(255),
    [photo] nvarchar(255),
    [dateAdded] datetime NOT NULL,
    [artistId] UNIQUEIDENTIFIER NOT NULL,
    [countryId] UNIQUEIDENTIFIER,
    [labelId] UNIQUEIDENTIFIER,
    [sizeId] UNIQUEIDENTIFIER,
    [speedId] UNIQUEIDENTIFIER
)

GO

CREATE TABLE [Genres] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [name] nvarchar(255) NOT NULL
)

GO

CREATE TABLE [AlbumGenres] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [albumId] UNIQUEIDENTIFIER NOT NULL,
    [genreId] UNIQUEIDENTIFIER NOT NULL
)

GO

CREATE TABLE [Styles] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [name] nvarchar(255) NOT NULL
)

GO

CREATE TABLE [AlbumStyles] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [albumId] UNIQUEIDENTIFIER NOT NULL,
    [styleId] UNIQUEIDENTIFIER NOT NULL
)

GO

CREATE TABLE [Tracks] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [name] nvarchar(255) NOT NULL,
    [position] nvarchar(255) NOT NULL,
    [duration] time NOT NULL,
    [bpm] int,
    [key] nvarchar(255),
    [albumId] UNIQUEIDENTIFIER NOT NULL
)

GO

CREATE TABLE [CrateTracks] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [crateId] UNIQUEIDENTIFIER NOT NULL,
    [trackId] UNIQUEIDENTIFIER NOT NULL,
    [bpm] int
)

CREATE TABLE [Countries] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [name] nvarchar(255) NOT NULL
)

GO

CREATE TABLE [Labels] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [name] nvarchar(255) NOT NULL,
    [photo] nvarchar(255)
)

GO

CREATE TABLE [Sizes] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [name] nvarchar(255) NOT NULL
)

GO

CREATE TABLE [Speeds] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [name] nvarchar(255) NOT NULL
)

GO

ALTER TABLE [UserCrates] ADD FOREIGN KEY ([userId]) REFERENCES [Users] ([id])

GO

ALTER TABLE [UserAlbums] ADD FOREIGN KEY ([userId]) REFERENCES [Users] ([id])

GO

ALTER TABLE [UserWants] ADD FOREIGN KEY ([userId]) REFERENCES [Users] ([id])

GO

ALTER TABLE [Albums] ADD FOREIGN KEY ([artistId]) REFERENCES [Artists] ([id])

GO

ALTER TABLE [Albums] ADD FOREIGN KEY ([countryId]) REFERENCES [Countries] ([id])

GO

ALTER TABLE [Albums] ADD FOREIGN KEY ([labelId]) REFERENCES [Labels] ([id])

GO

ALTER TABLE [Albums] ADD FOREIGN KEY ([sizeId]) REFERENCES [Sizes] ([id])

GO

ALTER TABLE [Albums] ADD FOREIGN KEY ([speedId]) REFERENCES [Speeds] ([id])

GO

ALTER TABLE [AlbumGenres] ADD FOREIGN KEY ([albumId]) REFERENCES [Albums] ([id])

GO

ALTER TABLE [AlbumGenres] ADD FOREIGN KEY ([genreId]) REFERENCES [Genres] ([id])

GO

ALTER TABLE [AlbumStyles] ADD FOREIGN KEY ([albumId]) REFERENCES [Albums] ([id])

GO

ALTER TABLE [AlbumStyles] ADD FOREIGN KEY ([styleId]) REFERENCES [Styles] ([id])

GO

ALTER TABLE [Tracks] ADD FOREIGN KEY ([albumId]) REFERENCES [Albums] ([id])

GO

ALTER TABLE [CrateTracks] ADD FOREIGN KEY ([crateId]) REFERENCES [UserCrates] ([id])

GO

ALTER TABLE [CrateTracks] ADD FOREIGN KEY ([trackId]) REFERENCES [Tracks] ([id])

GO

--STARTING DATA--

DECLARE @userId UNIQUEIDENTIFIER = NEWID();
INSERT INTO [Users] ([id], [uid], email, [name], photo)
VALUES
    (@userId, 'xcgwkM1tlrXk4klAukmfjHQjRo52','dannyherrmann91@gmail.com','DJ Danny Magic','https://firebasestorage.googleapis.com/v0/b/crates-6a625.appspot.com/o/face.JPG?alt=media&token=3efda0d6-6900-4086-b73a-d4470259fd96')

DECLARE @artistId UNIQUEIDENTIFIER = NEWID();
INSERT INTO [Artists] ([id], [name], photo, bio)
VALUES
    (@artistId, 'Pointer Sisters', 'https://firebasestorage.googleapis.com/v0/b/crates-6a625.appspot.com/o/pointer-sisters.jpg?alt=media&token=857a2546-8822-4365-9db5-19b35de68618','The Pointer Sisters are an American R&B singing group from Oakland, California, who achieved mainstream success during the 1970s and 1980s. Spanning over four decades, their repertoire has included such diverse genres as pop, disco, jazz, electronic music, bebop, blues, soul, funk, dance, country and rock. The Pointer Sisters have won three Grammy Awards and received a star on the Hollywood Walk of Fame in 1994. The group had 13 US top 20 hits between 1973 and 1985.')

DECLARE @countryId UNIQUEIDENTIFIER = NEWID();
INSERT INTO [Countries] ([id], [name])
VALUES
    (@countryId, 'US'),
	(NEWID(), 'UK'),
	(NEWID(), 'France')

DECLARE @labelId UNIQUEIDENTIFIER = NEWID();
INSERT INTO [Labels] ([id], [name], photo)
VALUES
    (@labelId, 'Planet', 'https://firebasestorage.googleapis.com/v0/b/crates-6a625.appspot.com/o/planet.jpg?alt=media&token=9c17e051-b474-48bc-8a6c-30a9f79e8cb8')

DECLARE @speedId1 UNIQUEIDENTIFIER = NEWID();
INSERT INTO [Speeds] ([id], [name])
VALUES
    (@speedId1, '33 RPM'),
    (NEWID(), '45 RPM')

DECLARE @sizeId1 UNIQUEIDENTIFIER = NEWID();
INSERT INTO [Sizes] ([id], [name])
VALUES
    (@sizeId1, '12"'),
    (NEWID(), '7"')

DECLARE @albumId UNIQUEIDENTIFIER = NEWID();
INSERT INTO [Albums] ([id], [name], [year], catalogNumber, photo, dateAdded, countryId, artistId, labelId, sizeId, speedId)
VALUES
    (@albumId, 'Jump (For My Love)', 1984, 'YW-13781', 'https://firebasestorage.googleapis.com/v0/b/crates-6a625.appspot.com/o/jump.jpg?alt=media&token=b9ac257a-10d7-4416-853b-73433da9e3da', '2005-03-21T00:59:51.000Z', @countryId, @artistId, @labelId, @sizeId1, @speedId1)

DECLARE @genreId1 UNIQUEIDENTIFIER = NEWID();
DECLARE @genreId2 UNIQUEIDENTIFIER = NEWID();
DECLARE @genreId3 UNIQUEIDENTIFIER = NEWID();
INSERT INTO [Genres] ([id], [name])
VALUES
    (@genreId1, 'Electronic'),
    (@genreId2, 'Rock'),
    (@genreId3, 'Funk / Soul')

INSERT INTO [AlbumGenres] (albumId, genreId)
VALUES
    (@albumId, @genreId1),
    (@albumId, @genreId2),
    (@albumId, @genreId3)

DECLARE @styleId1 UNIQUEIDENTIFIER = NEWID();
DECLARE @styleId2 UNIQUEIDENTIFIER = NEWID();
DECLARE @styleId3 UNIQUEIDENTIFIER = NEWID();
DECLARE @styleId4 UNIQUEIDENTIFIER = NEWID();
INSERT INTO [Styles] ([id], [name])
VALUES
    (@styleId1, 'Soft Rock'),
    (@styleId2, 'Disco'),
    (@styleId3, 'Soul'),
    (@styleId4, 'Synth-pop')
INSERT INTO [AlbumStyles] (albumId, styleId)
VALUES
    (@albumId, @styleId1),
    (@albumId, @styleId2),
    (@albumId, @styleId3),
    (@albumId, @styleId4)

DECLARE @trackId UNIQUEIDENTIFIER = NEWID();
INSERT INTO [Tracks] ([id], [name], position, duration, bpm, [key], albumId)
VALUES
    (@trackId, 'Jump (For My Love) (Long Version)', 'A', '00:06:24', 134, 'B-flat minor', @albumId),
    (NEWID(), 'Jump (For My Love) (Instrumental)', 'B1', '00:06:07', 134, 'B-flat minor', @albumId),
    (NEWID(), 'Heart Beat', 'B2', '00:04:22', 117, 'B minor', @albumId)

DECLARE @crateId UNIQUEIDENTIFIER = NEWID();
INSERT INTO [UserCrates] ([id], [name], userId, dateCreated)
VALUES 
    (@crateId, 'The Dive Motel', @userId, '2022-05-22T07:25:34.000Z')

INSERT INTO [CrateTracks] (crateId, trackId, bpm)
VALUES
    (@crateId, @trackId, 130)

INSERT INTO [UserAlbums] (userId, albumId, dateAdded)
VALUES
    (@userId, @albumId, '2021-08-04T13:56:30.000Z')
GO