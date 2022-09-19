const { Router } = require("express");
const router = Router();

const { v4: uuidv4 } = require("uuid");

const { Comment } = require("../db");

router.post("/", async (req, res) => {
  const comment = req.body;
  try {
    const commentCreated = await Comment.create({ ...comment, id: uuidv4() });
    res.status(201).json(commentCreated);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await Comment.findAll({
      where: {
        dogId: id,
      },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
