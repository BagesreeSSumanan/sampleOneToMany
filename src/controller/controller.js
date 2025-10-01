const db = require('../config/db');
const Tutorial = db.tutorials;
const Comment = db.comments;

const createTutorial = (tutorial) => {
  return Tutorial.create({
    title: tutorial.title,
    description: tutorial.description,
  })
    .then((tutorial) => {
      console.log(">> Created tutorial: " + JSON.stringify(tutorial, null, 4));
      return tutorial;
    })
    .catch((err) => {
      console.log(">> Error while creating tutorial: ", err);
    });
};

const createComment =  async(tutorialId, comment,res) => {

 const tutorial = await Tutorial.findByPk(tutorialId);
   if (tutorial == null) {
        return res.status(404).json({ message: "Tutorial not found" });
    }
  return Comment.create({
    name: comment.name,
    text: comment.text,
    tutorialId:tutorialId,
  })
    .then((comment) => {
      console.log(">> Created comment: " + JSON.stringify(comment, null, 4));
      return comment;
    })
    .catch((err) => {
      console.log(">> Error while creating comment: ", err);
    });
};

const GetAllTutorial = async () =>  {
  return Tutorial.findAll({
    include: ["comments"],
  }).then((tutorials) => {
    return tutorials;
  });
};

 const findTutorialById = (tutorialId) => {
  return Tutorial.findByPk(tutorialId, { include: ["comments"] })
    .then((tutorial) => {
      return tutorial;
    })
    .catch((err) => {
      console.log(">> Error while finding tutorial: ", err);
    });
};
const findCommentById = (id) => {
  return Comment.findByPk(id, { include: ["tutorial"] })
    .then((comment) => {
      return comment;
    })
    .catch((err) => {
      console.log(">> Error while finding comment: ", err);
    });
};
module.exports = { createTutorial ,createComment,GetAllTutorial,findTutorialById,findCommentById};