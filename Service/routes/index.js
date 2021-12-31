const express = require("express");
const router = express.Router();

const Attribute = require("../model/Attribute");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params || "";
    if (id !== "") {
      const resp = await Attribute.find({ attrId: id });
      if(resp.length === 0) {
        res.status(404).json([]);
      } else {
        res.status(200).json(resp);
      }
    } else {
      res.status(204).json([]);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!!");
  }
});

router.post("/", async (req, res) => {
  try {
    const { id, ipName, ipId, ipClass, ipSize, ipType, ipPlaceholder, ipLabel } = req.body;
    if (id && ipName && ipId && ipClass && ipSize && ipType && ipLabel ) {
      const attr = new Attribute({
        id,
        ipLabel,
        ipName,
        ipId,
        ipClass,
        ipSize,
        ipType,
        ipPlaceholder
      });

      const resp = await attr.save();
      res.status(200).json(resp);
    } else {
      res.status(500).json([]);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!!");
  }
});

module.exports = router;
