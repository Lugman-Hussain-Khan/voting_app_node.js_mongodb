const router = require('express').Router();
const Candidate = require('../models/Candidate');
const verifyUser = require('../middleware/verifyUser');

//Creating a new candidate
router.post('/create_candidate', async (req, res) => {
  
  const { symbolId, name, tagLine } = req.body;
  
  //Check all fields are filled
  if (!symbolId || !name || !tagLine)
    return res.status(400).json({ error: "Please fill all fields" });

  //Check Symbol availablity
  const symbolFound = await Candidate.findOne({ symbolId });
  if (symbolFound) return res.status(400).json({ error: "Symbol already taken" });

  const candidate = new Candidate({
    symbolId,
    name,
    tagLine,
  });

  try {
    await candidate.save();
    res.json({ message: `New Candidate added - Id: ${candidate._id}` });
  } catch (err) {
    res.status(400).json({ error: err });
  };

});

//Get List of Candidates
router.get('/all_candidates', verifyUser, async (req, res) => {
  try {
    const candidates = await Candidate.find({});

    //Hide vote count
    candidates.forEach((candidate) => {
      candidate.voteCount = undefined;
    })

    res.json({ data: candidates });
  } catch (err) {
    res.status(400).json({ error: err });
  }

});

//Get List of Candidates for admin
router.get('/admin/all_candidates', verifyUser, async (req, res) => {
  try {
    const candidates = await Candidate.find({});
    res.json({ data: candidates });
  } catch (err) {
    res.status(400).json({ error: err });
  }

});



module.exports = router;