const { where } = require('sequelize');
const db = require('../config/db');
const tutorial = require('../models/tutorial');
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
  return Tutorial.findByPk(tutorialId)
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
const deleteTutorialById = async (id) => {
  try {
    const tutorial = await Tutorial.findByPk(id);
    if (!tutorial) {
      console.log("Tutorial not found");
      return null;
    }
    await tutorial.destroy();
    console.log("Tutorial deleted successfully");
    return tutorial;
  } catch (err) {
    console.log(">> Error while deleting tutorial: ", err);
  }
};
const deleteCommentById = async (id) => {
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      console.log("Comment not found");
      return null;
    }
    await comment.destroy();
    console.log("Comment deleted successfully");
    return comment;
  } catch (err) {
    console.log(">> Error while deleting comment: ", err);
  }
};
const updateTutorial = async (id,tutorial,) => {
  try {
    const currenttutorial = await Tutorial.findByPk(id);
    if (!currenttutorial) {
      console.log("Tutorial not found");
      return null;
    }
    await currenttutorial.update({
       title: tutorial.title,
      description: tutorial.description,},
      {
      where: { id: id } 
    });
    return currenttutorial;
  } catch (err) {
    console.log(">> Error while updating tutorials: ", err);
  }
};
const updateComment = async (id,comment,tutorialId) => {
  try {
     console.log("id",id);
   const Currentcomment = await Comment.findByPk(id);
    if (!Currentcomment) {
      console.log("Comment not found");
      return null;
    }
    await Currentcomment.update({
      name: comment.name,
      text: comment.text,
      tutorialId:tutorialId,
    }, {
      where: { id: id } 
    });
   // await comment.destroy();
    console.log("Comment updated successfully");
    return Currentcomment;
  } catch (err) {
    console.log(">> Error while updating comment: ", err);
  }
};
module.exports = { createTutorial ,createComment,GetAllTutorial,findTutorialById,findCommentById,deleteTutorialById,deleteCommentById,updateComment,updateTutorial};