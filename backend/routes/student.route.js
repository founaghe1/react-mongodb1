let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

const error = require("mongoose/lib/error");
// Student Model
let studentSchema = require("../models/Student");

// CREATE Student
// router.post("/create-student", (req, res, next) => {
//   studentSchema.create(req.body, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       console.log(data);
//       res.json(data);
//     }
//   });
// });

router.post("/create-student", (req, res, next) => {
  studentSchema.create(req.body)
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(err => {
      return next(err);
    });
});


// READ Students
router.get("/", (req, res) => {
  studentSchema.find(req.body)
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(err => {
      return next(err);
    });
});


// UPDATE student
// Obtenez un seul étudiant
router.get("/update-student/:id", async (req, res, next) => {
  try {
    const data = await studentSchema.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Étudiant non trouvé" });
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
});

  
  // Update Student Data
  router.put("/update-student/:id", async (req, res, next) => {
    try {
      const updatedStudent = await studentSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      if (!updatedStudent) {
        return res.status(404).json({ message: "Étudiant non trouvé" });
      }
      console.log("Étudiant mis à jour avec succès !");
      res.json(updatedStudent);
    } catch (error) {
      next(error);
    }
  });


// Delete Student
router.delete("/delete-student/:id", (req, res, next) => {
  studentSchema
    .findByIdAndRemove(req.params.id)
    .then(data => {
      if (!data) {
        return res.status(404).json({ message: "User not found" });
      }
      console.log("User deleted successfully");
      res.json(data);
    })
    .catch(err => {
      return next(err);
    });
});


module.exports = router;
