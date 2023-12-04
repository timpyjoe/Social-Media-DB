const router = require('express').Router();
const { User } = require('../../models');
const Model = User; 

router.get("/", async (req, res) => {
  try {
    const payload = await Model.find().populate("thoughts");
    res.status(200).json({ result: "success", payload})
  } catch(err) {
    res.status(500).json({ result: "error", payload: err.message})
  }
})

router.get("/:id", async (req, res) => {
  try {
    const payload = await Model.findById(req.params.id).populate("thoughts");
    res.status(200).json({ result: "success", payload})
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message})
  }
})

router.post("/" , async (req, res) => {
  try {
    const payload = await Model.create(req.body);
    res.status(200).json({ result: "success", payload})
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message})
  }
})

router.post("/:userID/friends/:friendID", async (req, res) => {
  try {
    const friendObject = await Model.findById(req.params.userID, {'friends':1, "_id":0})
    friendObject.friends.push(req.params.friendID)
    const payload = await Model.findByIdAndUpdate(req.params.userID, {friends: friendObject.friends})
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message})
  }
})

router.delete("/:userID/friends/:friendID", async (req, res) => {
  try {
    const friendObject = await Model.findById(req.params.userID, {'friends':1, "_id":0})
    const index = friendObject.friends.indexOf(req.params.friendID)
    friendObject.friends.splice(index, 1)
    const payload = await Model.findByIdAndUpdate(req.params.userID, {friends: friendObject.friends})
    res.status(200).json({ result: "success", payload })
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




module.exports = router