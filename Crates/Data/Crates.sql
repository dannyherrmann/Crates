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
DROP TABLE IF EXISTS [Tracks];
DROP TABLE IF EXISTS [Albums];
DROP TABLE IF EXISTS [Artists];
DROP TABLE IF EXISTS [Countries];
DROP TABLE IF EXISTS [Labels];
DROP TABLE IF EXISTS [Speeds];
DROP TABLE IF EXISTS [Sizes];
DROP TABLE IF EXISTS [CrateTracks];
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
    [albumId] int NOT NULL
)

GO

CREATE TABLE [UserWants] (
    [id] int PRIMARY KEY identity,
    [userId] int NOT NULL,
    [albumId] int NOT NULL
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
    [position] nvarchar(255) NOT NULL,
    [name] nvarchar(255) NOT NULL,
    [duration] time NOT NULL,
    [bpm] int,
    [key] nvarchar(255),
    [albumId] int NOT NULL
)

GO

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

--STARTING DATA--

INSERT INTO [Users] ([uid], email, [name], photo)
VALUES
    ('xcgwkM1tlrXk4klAukmfjHQjRo52','dannyherrmann91@gmail.com','DJ Danny Magic','https://firebasestorage.googleapis.com/v0/b/crates-6a625.appspot.com/o/face.JPG?alt=media&token=3efda0d6-6900-4086-b73a-d4470259fd96')
GO
INSERT INTO [Artists] ([name], photo, bio)
VALUES
    ('Pointer Sisters', 'https://firebasestorage.googleapis.com/v0/b/crates-6a625.appspot.com/o/pointer-sisters.jpg?alt=media&token=857a2546-8822-4365-9db5-19b35de68618','The Pointer Sisters are an American R&B singing group from Oakland, California, who achieved mainstream success during the 1970s and 1980s. Spanning over four decades, their repertoire has included such diverse genres as pop, disco, jazz, electronic music, bebop, blues, soul, funk, dance, country and rock. The Pointer Sisters have won three Grammy Awards and received a star on the Hollywood Walk of Fame in 1994. The group had 13 US top 20 hits between 1973 and 1985.')
GO
INSERT INTO [Countries] ([name])
VALUES
    ('US')
GO
INSERT INTO [Labels] ([name], photo)
VALUES
    ('Planet', 'https://firebasestorage.googleapis.com/v0/b/crates-6a625.appspot.com/o/planet.jpg?alt=media&token=9c17e051-b474-48bc-8a6c-30a9f79e8cb8')
GO
INSERT INTO [Speeds] ([name])
VALUES
    ('33 RPM'),
    ('45 RPM')
INSERT INTO [Sizes] ([name])
VALUES
    ('7"'),
    ('12"')
INSERT INTO [UserCrates] ([name], userId, dateCreated)
VALUES 
    ('The Dive Motel', 1, '2022-05-22T07:25:34.000Z')