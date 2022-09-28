import * as functions from "firebase-functions";
import * as express from 'express';
import { addEntry, getAllEntries, updateEntry, deleteEntry } from './entryController';
import { getAllProperties } from './propertyController';
import { addPostedBy, getAllPostedBys, updatePostedBy, deletePostedBy } from './postedByController';
import { addConstructionStatus, getAllConstructionStatus, updateConstructionStatus, deleteConstructionStatus } from './constructionStatusController';
import { addFacing, getAllFacing, updateFacing, deleteFacing } from './facingController';
import {  addBhk, getAllBhk, updateBhk, deleteBhk } from './bhkController';

const app = express();
app.get('/', (req, res) => res.status(200).send('Hey there!'));
app.post('/entries', addEntry);
app.get('/entries', getAllEntries);
app.patch('/entries/:entryId', updateEntry);
app.delete('/entries/:entryId', deleteEntry);
app.get('/properties', getAllProperties);
app.post('/postedBy', addPostedBy);
app.get('/postedBy', getAllPostedBys);
app.patch('/postedBy/:postedById', updatePostedBy);
app.delete('/postedBy/:postedById', deletePostedBy);
app.post('/constructionStatus', addConstructionStatus);
app.get('/constructionStatus', getAllConstructionStatus);
app.patch('/constructionStatus/:constructionStatusId', updateConstructionStatus);
app.delete('/constructionStatus/:constructionStatusId', deleteConstructionStatus);
app.post('/facing', addFacing);
app.get('/facing', getAllFacing);
app.patch('/facing/:facingId', updateFacing);
app.delete('/facing/:facingId', deleteFacing);
app.post('/bhk', addBhk);
app.get('/bhk', getAllBhk);
app.patch('/bhk/:bhkId', updateBhk);
app.delete('/bhk/:bhkId', deleteBhk);

exports.prs = functions.https.onRequest(app)
