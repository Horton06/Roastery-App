import express from 'express';
import pool from './config/database';

const app = express();

// ...existing code...

app.get('/some-endpoint', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM some_table');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

// ...existing code...

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
