const router = require('express').Router();
const { response } = require('express');
const verifyUser = require('../middleware/verifyUser');
const Candidate = require('../models/Candidate');


router.patch('/cast_vote', verifyUser, async (req, res) => {
  const { symbolId } = req.body;

  const candidate = await Candidate.findOne({ symbolId });
  if (!candidate) return res.status(400).json({ error: "No candidate found !" });

  try {
    await Candidate.updateOne({ symbolId }, { $inc: { "voteCount" : 1 } } );
    res.json({ message: `Hurray, successfully vote added to ${candidate.name}` });
  } catch (err) {
    res.status(400).json({ error: err });
  };

})

module.exports = router;