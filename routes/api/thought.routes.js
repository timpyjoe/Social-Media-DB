const router = require('express').Router();
const { Thought, User } = require('../../models');
const Model = Thought; 


router.get("/", async (req, res) => {
  try {
    const payload = await Model.find();
    res.status(200).json({ result: "success", payload})
  } catch(err) {
    res.status(500).json({ result: "error", payload: err.message})
  }
})

router.get("/:id", async (req, res) => {
  try {
    const payload = await Model.findById(req.params.id);
    res.status(200).json({ result: "success", payload})
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message})
  }
})

router.post("/" , async (req, res) => {
  try {
    const payload = await Model.create(req.body);
    const thoughtObject = await User.findById(req.body.userID, {'thoughts':1, "_id":0})
    thoughtObject.thoughts.push(payload._id)
    const user = await User.findByIdAndUpdate(req.body.userID, {thoughts: thoughtObject.thoughts})
    res.status(200).json({ result: "success", payload})
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message})
  }
})

router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    const thoughtObject = await Model.findById(req.params.thoughtId, {'reactions':1, "_id":0})
    const bodyArray = [req.body]
    console.log(req.body)
    thoughtObject.reactions.push(bodyArray)
    const payload = await Model.findByIdAndUpdate(req.params.thoughtId, {reactions: thoughtObject.reactions})
    res.status(200).json({resutl: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message})
  }
})

router.put("/:id", async (req, res) => {
  try {
    const payload = await Model.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message})
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const payload = await Model.findByIdAndDelete(req.params.id)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message})
  }
})


module.exports = router;