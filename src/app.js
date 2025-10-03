const express = require('express');
const config = require('./config/config');
const app = express();
require('dotenv').config();
const tutorialRouter = express.Router();
const {createTutorial,createComment,GetAllTutorial,findTutorialById,findCommentById,deleteTutorialById,deleteCommentById,updateComment,updateTutorial}= require('./controller/controller');
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
// Delete a tutorial
tutorialRouter.delete('/deleteTutorial/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCount = await deleteTutorialById(id);

        if (!deletedCount) {
            return res.status(404).json({ message: "Tutorial not found" });
        }

        res.status(200).json({ message: "Tutorial deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Delete a comment
tutorialRouter.delete('/deleteComment/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCount = await deleteCommentById(id);

        if (!deletedCount) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

tutorialRouter.put('/updateTutorial/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateCount = await updateTutorial(id,req.body);

        if (!updateCount) {
            return res.status(404).json({ message: "Tutorial not found" });
        }

        res.status(200).json({ message: "Tutorial updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

tutorialRouter.put('/updateComment/:id', async (req, res) => {
     try {
        const id = req.params.id;
        
        const Count = await updateComment(id,req.body,req.body.tutorialId);

        if (!Count) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.status(200).json({ message: "Comment updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});
