DROP DATABASE IF EXISTS movies;

CREATE DATABASE  IF NOT EXISTS movies;

USE movies;

CREATE TABLE IF NOT EXISTS movie(
	movie_id VARCHAR(9) PRIMARY KEY,
	title VARCHAR(100),
	release_year VARCHAR(4),
	rating DECIMAL(2,1),
	imagen VARCHAR(255)
);

INSERT INTO movie 
(movie_id, title, release_year, rating, imagen) 
VALUES 
('tt5171438', 'Star Trek: Discovery', '2017', 7.4, 'https://ia.media-imdb.com/images/M/MV5BMjM3NDA1NjM1Nl5BMl5BanBnXkFtZTgwNzg5ODEzMzI@._V1_SY1000_CR0,0,685,1000_AL_.jpg');

INSERT INTO movie 
(movie_id, title, release_year, rating, imagen) 
VALUES 
('tt0816692', 'Interstellar', '2014', 8.6, 'https://ia.media-imdb.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SY1000_SX675_AL_.jpg');


SELECT title, release_year
FROM movie;