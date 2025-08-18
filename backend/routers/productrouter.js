const router = require("express").Router();
const ensureauthenticated = require("../middelware/authproduct");
router.get("/", ensureauthenticated, (req, res) => {
  if (req.user.email == "noman123@gmail.com") {
    res.status(200).json([
      {
        id: 1,
        name: "tv",
        price: 1000,
        description: "------------"
      },
      {
        id: 2,
        name: "AC",
        price: 5000000,
        description: "------------"
      },
      {
        id: 3,
        name: "Refrigerator",
        price: 300,
        description: "--------------"
      }
    ]);
  }
    else {
        res.status(403).json({ message: "Access denied" });
        
    }
});

module.exports = router;
