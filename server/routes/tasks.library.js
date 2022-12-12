const express = require("express");
const router = express.Router();
const pg = require("pg");

const Pool = pg.Pool;

const pool = new Pool({
  database: "weekend-to-do-app",
  host: "localhost",
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
});
pool.on("connect", () => {
  console.log("postgres is connected");
});

pool.on("error", (error) => {
  console.log("pg error", error);
});

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
  const queryText = `INSERT INTO "tasks" ("task", "urgency", "isCompleted")
    VALUES ('${newTask.item}', '${newTask.urgency}', '${newTask.isCompleted}');
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
