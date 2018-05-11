'use strict'

const express = require('express')
const router = express.Router()
const movies = require('../models/movies')

function error404 (req, res, next) {
  let error = new Error()
  let locals = {
    title: 'Error 404',
    description: 'Recurso No Encontrado',
    error: error
  }
  error.status = 404
  res.render('error', locals)
  next()
}
router.use(movies)
router.get('/', (req, res) => {
  req.getConnection((err, movies) => {
    if (err) console.log(err)
    movies.query('SELECT * FROM movie', (err, rows) => {
      if (err) throw err
      let locals = {
        title: 'Lista de peliculas',
        noData: 'No existen peliculas en la base de datos',
        data: rows
      }
      res.render('index', locals)
    })
  })
})
router.get('/agregar', (req, res) => {
  res.render('addMovie', {title: 'Agregar pelicula'})
})
router.post('/', (req, res, next) => {
  req.getConnection((err, movies) => {
    if (err) throw err
    let movie = {
      movie_id: req.body.movie_id,
      title: req.body.title,
      release_year: req.body.release_year,
      rating: req.body.rating,
      imagen: req.body.imagen
    }
    console.log(movie)
    movies.query('INSERT INTO movie SET ?', movie, (err, rows) => {
      return (err) ? res.redirect('/agregar') : res.redirect('/')
    })
  })
})
router.get('/editar/:movie_id', (req, res, next) => {
  let movieId = req.params.movie_id
  console.log(movieId)
  req.getConnection((err, movies) => {
    if (err) throw err
    movies.query('SELECT * FROM movie WHERE movie_id = ?', movieId, (err, rows) => {
      if (err) throw err
      else {
        let locals = {
          title: 'Editar pelicula',
          data: rows
        }
        res.render('editMovie', locals)
      }
    })
  })
})
router.post('/actualizar/:movie_id', (req, res, next) => {
  req.getConnection((err, movies) => {
    if (err) throw err
    let movie = {
      movie_id: req.body.movie_id,
      title: req.body.title,
      release_year: req.body.release_year,
      rating: req.body.rating,
      imagen: req.body.imagen
    }
    console.log(movie)
    movies.query('UPDATE movie SET ? WHERE movie_id = ?', [movie, movie.movie_id], (err, rows) => {
      return (err) ? res.redirect('/editar/:movie_id') : res.redirect('/')
    })
  })
})
router.post('/eliminar/:movie_id', (req, res, next) => {
  let movieId = req.params.movie_id
  console.log(movieId)
  req.getConnection((err, movies) => {
    if (err) throw err
    movies.query('DELETE FROM movie WHERE movie_id = ?', movieId, (err, rows) => {
      return (err) ? next(new Error('registro no encontrado')) : res.redirect('/')
    })
  })
})
router.use(error404)

module.exports = router
