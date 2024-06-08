const { Router } = require("express");

const UsersRouter = Router();

const { verifyToken , LoginValidator, authSignUser, generatedToken} = require("../middlewares/authMiddlewares");

  
  const checkError = require("../middlewares/errorMiddlewares");
  

const {CreateUser, GetAllUsersASF, searchUserASF, DeleteUserASF, EditDataUserASF, authentication} = require("../controllers/UsersControllers");



UsersRouter.post("/login",LoginValidator, checkError, authSignUser, generatedToken, authentication)


UsersRouter.post("/login/token", verifyToken, authentication)


// Create New user ASF

UsersRouter.post("/", verifyToken,CreateUser)


// Get All Users ASF 

UsersRouter.get("/", verifyToken,GetAllUsersASF )

// Serach User ASF

UsersRouter.get("/search", verifyToken, searchUserASF)

// Delete  User ASF

UsersRouter.delete("/:id", verifyToken, DeleteUserASF)

// Edit Data User ASF

UsersRouter.put("/:id", verifyToken, EditDataUserASF)


module.exports = UsersRouter