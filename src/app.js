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


   tutorialRouter.get('/findTutorialById/:id',  async (req, res)=>{
     try{
         const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
         const Tutorial =  await findTutorialById(id);
         res.status(200).json({Tutorial: Tutorial});
 
     } catch(e){
         console.log(e);
         res.sendStatus(400);
     }
  });

 tutorialRouter.get('/findCommentById/:id', async (req, res) => {
  try {
    const id = req.params.id; // get the id from the URL

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const comments = await findCommentById(id);

    if (!comments) {
      return res.status(404).json({ message: "Comments not found" });
    }

    res.status(200).json({ comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
