import dotenv from 'dotenv';
import express from 'express';
import {MongoClient} from 'mongodb';

dotenv.config();

const app = express();
app.use(express.json());

const uri = process.env.MONGO_DB_URI;
const client = new MongoClient(uri);

let collection;

client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
    collection = client.db("test").collection("articles");
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  });

app.get('/articles', (req, res) => {
  collection.find({}).toArray((err, docs) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(docs);
    }
  });
});

app.post('/articles', (req, res) => {
  collection.insertOne(req.body, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result.ops[0]);
    }
  });
});

app.put('/articles/:id', (req, res) => {
  const {id} = req.params;
  collection.updateOne({_id: id}, {$set: req.body}, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete('/articles/:id', (req, res) => {
  const {id} = req.params;
  collection.deleteOne({_id: id}, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});