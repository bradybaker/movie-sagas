const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM movies ORDER BY title;';
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error completing SELECT movies query', err);
      res.sendStatus(500);
    });
});

router.get('/:id', (req, res) => {
  console.log('GET - MOVIE WITH THE ID OF ======', req.params.id);
  let queryText = 'SELECT movies.id, movies.title, movies.poster, movies.description, genres.name AS genre FROM movies JOIN movie_genre AS mg ON movies.id = mg.movie_id JOIN genres ON genres.id = mg.genre_id WHERE movies.id=$1';
  pool.query(queryText, [req.params.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error in GET specific movie details', err);
      res.sendStatus(500);
    })
})


router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
    .then(result => {
      console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!

      const createdMovieId = result.rows[0].id

      // Depending on how you make your junction table, this insert COULD change.
      const insertMovieGenreQuery = `
      INSERT INTO "movie_genre" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY MAKES GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

      // Catch for first query
    }).catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
})

router.delete('/:id', (req, res) => {
  const queryText = 'DELETE FROM movies WHERE id=$1';
  pool.query(queryText, [req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing DELETE movies query', err);
      res.sendStatus(500);
    });
});

router.put('/:id', (req, res) => {
  let id = req.params.id
  let title = req.body.title
  let description = req.body.description
  const queryText = 'UPDATE movies SET title=$1, description=$2 WHERE id=$3'
  pool.query(queryText, [title, description, id])
    .then(() => { res.sendStatus(201) })
    .catch(err => {
      console.log('Error in PUT movieRouter', err)
    })
})

module.exports = router;