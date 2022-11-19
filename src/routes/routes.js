const express = require("express");
const {
  createContent,
  getAllContent,
  updateContent,
  deleteContent,
  getContentById,
} = require("../controllers/content_controller");
const {
  registerUser,
  loginUser,
  getAllUser,
} = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");
const authorise = require("../middleware/authorise");
const router = express.Router();
//  routes for curd blog....
router.post(
  "/blog/new",
  // authenticate,
  createContent
);
router.get(
  "/blog",
  // authorise("admin"),
  getAllContent
);
router
  .route("/blog/:id")
  .put(authenticate, authorise(["admin", "content_writer"]), updateContent)
  .delete(authenticate, authorise(["admin", "content_writer"]), deleteContent)
  .get(getContentById);


  
// for all user auth...
router.get("/user", getAllUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
module.exports = router;
