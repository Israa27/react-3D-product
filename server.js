import express from 'express';
const app = express();
const PORT = 5173;
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');

  next();
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
