const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
  let queryText = 'SELECT * from "tasks" ORDER by "id" ASC;';
  pool
    .query(queryText)
    .then((result) => {
      console.log("results from DB", result);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error making a query", error);
    });
});

router.delete("/:id", (req, res) => {
  console.log("hello from delete request!", req.params.id);
  const queryText = `DELETE from tasks WHERE id = ${req.params.id};`;
  pool
    .query(queryText)
    .then((result) => {
      console.log(result);
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log("error making a query", error);
    });
});
router.post("/", (req, res) => {
  const newtask = req.body;
  const queryText = `INSERT INTO "tasks" (task, priority, is_completed)
      VALUES ('${newtask.task}', ${newtask.priority}, '${newtask.is_completed}');
      `;
  //This process is called paramaterized query or sanitization, and it works for *some reason*
  //${newtask.rank}', '${newtask.artist}', '${newtask.track}', '${newtask.published}
  pool
    .query(queryText)
    .then((result) => {
      console.log("result from DB", result);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error making insert query", error);
      res.sendStatus(500);
    });
});

router.put("/is_completed/:id", (req, res) => {
console.log('is_completed id', req.params.id);
console.log('is_completed body', req.body)
  let queryText = `UPDATE "tasks" SET "is_completed" = 'true' WHERE "id"=${req.params.id};`;
  pool
    .query(queryText)
    .then((dbResponse) => {
      console.log("dbresponse", dbResponse);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
