const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

const data = {
  users: [
    { name: 'meytal', password: '1', username: 'meytalmesh' },
    { name: 'raz', password: '2', username: 'razya' },
  ],
};

app.get('/api/select', (req, res) => {
  try {
    // todo: query execution logic 
    const { field, condition, value } = req.query;
    const results = data.users.filter((user) => {
      if (condition === '=') {
        return user[field] === value;
      } else if (condition === '!=') {
        return user[field] !== value;
      }
      return false;
    });
    res.json({ results });
    res.json({ message: 'SELECT query executed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
