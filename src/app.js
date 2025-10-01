const express = require('express');
const config = require('./config/config');
const app = express();
require('dotenv').config();
const empRouter = express.Router();
const {createTutorial,createComment}= require('./controller/controller');
app.use(express.json());

const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});

app.use('/api', empRouter);
  empRouter.post('/createTutorial',  async (req, res, next)=>{
     try{
         
        if (!req.body) {
            return res.sendStatus(400);
        }
         const NewTutorial =  await createTutorial(req.body).then(() => res.json({ message: 'Tutorial created.' }));
 
     } catch(e){
         console.log(e);
         res.sendStatus(400);
     }
  });
  empRouter.post('/createComments',  async (req, res, next)=>{
     try{
         
        if (!req.body) {
            return res.sendStatus(400);
        }
         const NewTutorial =  await createComment(req.body.tutorial_id,req.body).then(() => res.json({ message: 'Comments created.' }));
 
     } catch(e){
         console.log(e);
         res.sendStatus(400);
     }
  });