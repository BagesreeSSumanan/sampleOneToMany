const express = require('express');
const config = require('./config/config');
const app = express();
require('dotenv').config();
const tutorialRouter = express.Router();
const {createTutorial,createComment,GetAllTutorial,findTutorialById,findCommentById}= require('./controller/controller');
app.use(express.json());

const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});

app.use('/api', tutorialRouter);
  tutorialRouter.post('/createTutorial',  async (req, res, next)=>{
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
  tutorialRouter.post('/createComments',  async (req, res, next)=>{
     try{
         
        if (!req.body) {
            return res.sendStatus(400);
        }
         const NewTutorial =  await createComment(req.body.tutorial_id,req.body,res).then(() => res.json({ message: 'Comments created.' }));
 
     } catch(e){
         console.log(e);
         res.sendStatus(400);
     }
  });
   
  tutorialRouter.get('/GetAllTutorial',  async (req, res, next)=>{
     try{

         const Tutorial =  await GetAllTutorial();
         res.status(200).json({Tutorial: Tutorial});
 
     } catch(e){
         console.log(e);
         res.sendStatus(400);
     }
  });
   tutorialRouter.get('/findTutorialById',  async (req, res, next)=>{
     try{
        if (!req.body) {
          return res.sendStatus(400);
        }
         const id = req.body.id;
         const Tutorial =  await findTutorialById(id);
         res.status(200).json({Tutorial: Tutorial});
 
     } catch(e){
         console.log(e);
         res.sendStatus(400);
     }
  });

   tutorialRouter.get('/findTutorialById',  async (req, res, next)=>{
     try{
        if (!req.body) {
          return res.sendStatus(400);
        }
         const id = req.body.id;
         const Tutorial =  await findTutorialById(id);
         res.status(200).json({Tutorial: Tutorial});
 
     } catch(e){
         console.log(e);
         res.sendStatus(400);
     }
  });

  tutorialRouter.get('/findCommentById',  async (req, res, next)=>{
     try{
        if (!req.body) {
          return res.sendStatus(400);
        }
         const id = req.body.id;
         const Tutorial =  await findCommentById(id);
         res.status(200).json({Tutorial: Tutorial});
 
     } catch(e){
         console.log(e);
         res.sendStatus(400);
     }
  });