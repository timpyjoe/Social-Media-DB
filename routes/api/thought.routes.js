const router = require('express').Router();
const { Thought } = require('../../models');
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
    res.status(200).json({ result: "success", payload})
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