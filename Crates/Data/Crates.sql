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
DROP TABLE IF EXISTS [UserDigs];
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

CREATE TABLE [Users] (
    [id] int PRIMARY KEY identity,
    [uid] nvarchar(255) NOT NULL,
    [name] nvarchar(255) NOT NULL,
    [email] nvarchar(255) NOT NULL,
    [photo] nvarchar(255)
)

GO

CREATE TABLE [UserCrates] (
    [id] int PRIMARY KEY identity,
    [name] nvarchar(255) NOT NULL,
    [userId] int NOT NULL,
    [dateCreated] datetime NOT NULL
)

GO

CREATE TABLE [UserAlbums] (
    [id] int PRIMARY KEY identity,
    [userId] int NOT NULL,
    [albumId] int NOT NULL,
    [dateAdded] datetime NOT NULL
)

GO

CREATE TABLE [UserDigs] (
    [id] int PRIMARY KEY identity,
    [userId] int NOT NULL,
    [albumId] int NOT NULL,
    [dateAdded] datetime NOT NULL
)

GO

CREATE TABLE [Artists] (
    [id] int PRIMARY KEY identity,
    [name] nvarchar(255) NOT NULL,
    [bio] nvarchar(500),
    [photo] nvarchar(255)
)

GO

CREATE TABLE [Albums] (
    [id] int PRIMARY KEY identity, 
    [name] nvarchar(255) NOT NULL,
    [year] int,
    [catalogNumber] nvarchar(255),
    [photo] nvarchar(255),
    [dateAdded] datetime NOT NULL,
    [artistId] int NOT NULL,
    [countryId] int,
    [labelId] int,
    [sizeId] int,
    [speedId] int
)

GO

CREATE TABLE [Genres] (
    [id] int PRIMARY KEY identity,
    [name] nvarchar(255) NOT NULL
)

GO

CREATE TABLE [AlbumGenres] (
    [id] int PRIMARY KEY identity,
    [albumId] int NOT NULL,
    [genreId] int NOT NULL
)

GO

CREATE TABLE [Styles] (
    [id] int PRIMARY KEY identity,
    [name] nvarchar(255) NOT NULL
)

GO

CREATE TABLE [AlbumStyles] (
    [id] int PRIMARY KEY identity,
    [albumId] int NOT NULL,
    [styleId] int NOT NULL
)

GO

CREATE TABLE [Tracks] (
    [id] int PRIMARY KEY identity,
    [name] nvarchar(255) NOT NULL,
    [position] nvarchar(255) NOT NULL,
    [duration] time NOT NULL,
    [bpm] int,
    [key] nvarchar(255),
    [albumId] int NOT NULL
)

GO

CREATE TABLE [CrateTracks] (
    [id] int PRIMARY KEY identity,
    [crateId] int NOT NULL,
    [trackId] int NOT NULL,
    [bpm] int
)

CREATE TABLE [Countries] (
    [id] int PRIMARY KEY identity,
    [name] nvarchar(255) NOT NULL
)

GO

CREATE TABLE [Labels] (
    [id] int PRIMARY KEY identity,
    [name] nvarchar(255) NOT NULL,
    [photo] nvarchar(255)
)

GO

CREATE TABLE [Sizes] (
    [id] int PRIMARY KEY identity,
    [name] nvarchar(255) NOT NULL
)

GO

CREATE TABLE [Speeds] (
    [id] int PRIMARY KEY identity,
    [name] nvarchar(255) NOT NULL
)

GO

ALTER TABLE [UserCrates] ADD FOREIGN KEY ([userId]) REFERENCES [Users] ([id])

GO

ALTER TABLE [UserAlbums] ADD FOREIGN KEY ([userId]) REFERENCES [Users] ([id])

GO

ALTER TABLE [UserDigs] ADD FOREIGN KEY ([userId]) REFERENCES [Users] ([id])

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

INSERT INTO [Users] ([uid], email, [name], photo)
VALUES
    ('xcgwkM1tlrXk4klAukmfjHQjRo52','dannyherrmann91@gmail.com','DJ Danny Magic','https://firebasestorage.googleapis.com/v0/b/crates-6a625.appspot.com/o/face.JPG?alt=media&token=3efda0d6-6900-4086-b73a-d4470259fd96')
GO
INSERT INTO [Artists] ([name], photo, bio)
VALUES
    ('Pointer Sisters', 'https://firebasestorage.googleapis.com/v0/b/crates-6a625.appspot.com/o/pointer-sisters.jpg?alt=media&token=857a2546-8822-4365-9db5-19b35de68618','The Pointer Sisters are an American R&B singing group from Oakland, California, who achieved mainstream success during the 1970s and 1980s. Spanning over four decades, their repertoire has included such diverse genres as pop, disco, jazz, electronic music, bebop, blues, soul, funk, dance, country and rock. The Pointer Sisters have won three Grammy Awards and received a star on the Hollywood Walk of Fame in 1994. The group had 13 US top 20 hits between 1973 and 1985.'),
    ('Key-West', 'https://firebasestorage.googleapis.com/v0/b/crates-6a625.appspot.com/o/key-west.jpg?alt=media&token=2ec103eb-1df4-4202-9e6a-5579bc382d9b', 'In the summer of 1982, French pop/funk group Elegance had a massive hit in France with " Vacances J''oublie Tout". The song, one of the first French raps to meet with success, was a huge with extensive play on radio and in any nightclub.'),
    ('Revelation', 'https://firebasestorage.googleapis.com/v0/b/crates-6a625.appspot.com/o/revelation-artist-image.jpg?alt=media&token=264e4f85-25a7-49cf-beb4-5313698109ce', 'Soul - disco band')
GO
INSERT INTO [Countries] ([name])
VALUES
    ('US'),
    ('UK'),
    ('Germany'),
    ('Canada'),
    ('France'),
    ('Netherlands')
GO
INSERT INTO [Labels] ([name], photo)
VALUES
    ('Planet', 'https://firebasestorage.googleapis.com/v0/b/crates-6a625.appspot.com/o/planet.jpg?alt=media&token=9c17e051-b474-48bc-8a6c-30a9f79e8cb8'),
    ('CAT Record', 'https://firebasestorage.googleapis.com/v0/b/crates-6a625.appspot.com/o/cat-record.jpg?alt=media&token=1ce51c71-abfd-401a-b776-aee6731d8ae5'),
    ('Handshake Records And Tapes', 'https://firebasestorage.googleapis.com/v0/b/crates-6a625.appspot.com/o/handshake.jpg?alt=media&token=239bf342-78d7-41c7-b8d2-344bafd809c0')
GO
INSERT INTO [Speeds] ([name])
VALUES
    ('33 RPM'),
    ('45 RPM')
GO
INSERT INTO [Sizes] ([name])
VALUES
    ('12"'),
    ('7"')
INSERT INTO [Albums] ([name], [year], catalogNumber, photo, dateAdded, countryId, artistId, labelId, sizeId, speedId)
VALUES
    ('Jump (For My Love)', 1984, 'YW-13781', 'https://firebasestorage.googleapis.com/v0/b/crates-6a625.appspot.com/o/jump.jpg?alt=media&token=b9ac257a-10d7-4416-853b-73433da9e3da', '2005-03-21T00:59:51.000Z', 1, 1, 1, 1, 1),
    ('Wanna Grove', 1983, 'CAT 2004', 'https://firebasestorage.googleapis.com/v0/b/crates-6a625.appspot.com/o/key-west-wannagroove.jpg?alt=media&token=9b246c98-2496-429a-8382-d2562e96b8d3', '2008-12-14T04:41:00.000Z', 5, 2, 2, 1, 1),
    ('Feel It', 1981, '600 350', 'https://firebasestorage.googleapis.com/v0/b/crates-6a625.appspot.com/o/revelation.jpg?alt=media&token=107037ec-2eec-4add-a069-be556a44dda3', '2008-04-25T09:17:29.000Z', 3, 3, 3, 1, 2)
GO
INSERT INTO [Genres] ([name])
VALUES
    ('Electronic'),
    ('Rock'),
    ('Funk / Soul')
GO
INSERT INTO [Styles] ([name])
VALUES
    ('Soft Rock'),
    ('Disco'),
    ('Soul'),
    ('Synth-pop')
GO
INSERT INTO [AlbumGenres] (albumId, genreId)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (2, 3),
    (3, 3)
GO
INSERT INTO [AlbumStyles] (albumId, styleId)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (2, 2),
    (3, 2)
GO
INSERT INTO [Tracks] ([name], position, duration, bpm, [key], albumId)
VALUES
    ('Jump (For My Love) (Long Version)', 'A', '00:06:24', 134, '3A', 1),
    ('Jump (For My Love) (Instrumental)', 'B1', '00:06:07', 134, '3A', 1),
    ('Heart Beat', 'B2', '00:04:22', 117, '1B', 1),
    ('Wanna Groove', 'A', '00:05:27', 110, '10B', 2),
    ('Shake Together', 'B', '00:03:35', null, null, 2),
    ('Feel It', 'A', '00:05:36', 115, '4A', 3),
    ('Walk On The Wild Side', 'B', '00:06:45', 120, '4A', 3)
GO
INSERT INTO [UserCrates] ([name], userId, dateCreated)
VALUES 
    ('The Dive Motel', 1, '2022-05-22T07:25:34.000Z')
GO
INSERT INTO [CrateTracks] (crateId, trackId, bpm)
VALUES
    (1, 1, 130),
    (1, 6, 112)
GO
INSERT INTO [UserAlbums] (userId, albumId, dateAdded)
VALUES
    (1, 1, '2021-08-04T13:56:30.000Z'),
    (1, 3, '2021-07-25T09:21:30.000Z')
GO
INSERT INTO [UserDigs] (userId, albumId, dateAdded)
VALUES
    (1, 2, '2023-05-23T12:45:30.000Z')
GO