const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
  let queryText = 'SELECT * from "tasks";';
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

router.post("/", (req, res) => {
  const newTask = req.body;
  const queryText = `INSERT INTO "tasks" ("task", "priority", "isCompleted")
    VALUES ('${newTask.item}', '${newTask.priority}', '${newTask.isCompleted}');
    `;
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
module.exports = router;

router.delete("/:id", (req, res) => {
  console.log("hello from delete request!", req.params.id);
  const queryText = `DELETE from songs WHERE id = ${req.params.id};`;
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
  const queryText = `INSERT INTO "tasks" ("task", "priority", "is_checked",)
      VALUES ($1, $2, $3);
      `;
  //This process is called paramaterized query or sanitization, and it works for *some reason*
  //${newtask.rank}', '${newtask.artist}', '${newtask.track}', '${newtask.published}
  pool
    .query(queryText, [newtask.task, newtask.priority, newtask.is_checked])
    .then((result) => {
      console.log("result from DB", result);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error making insert query", error);
      res.sendStatus(500);
    });
});
