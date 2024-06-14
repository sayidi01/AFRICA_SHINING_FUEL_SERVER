const { Router } = require("express");

const UsersRouter = Router();

const { verifyToken , LoginValidator, authSignUser, generatedTokenUserBackoffice, verifyTokenBackoffice} = require("../middlewares/authMiddlewares");

  
  const checkError = require("../middlewares/errorMiddlewares");
  

const {CreateUser, GetAllUsersASF, searchUserASF, DeleteUserASF, EditDataUserASF, authentication, Logout, GetUserConnectedNow} = require("../controllers/UsersControllers");



UsersRouter.post("/login",LoginValidator, checkError, authSignUser, generatedTokenUserBackoffice, authentication)


UsersRouter.post("/login/token", verifyTokenBackoffice, authentication)


// Create New user ASF

UsersRouter.post("/", verifyTokenBackoffice,CreateUser, generatedTokenUserBackoffice)

// Logout User ASF

UsersRouter.delete("/logout",Logout)



// Get All Users ASF 

UsersRouter.get("/", verifyToken,GetAllUsersASF )

// Get user Connected now


UsersRouter.get("/byuser", verifyToken,GetUserConnectedNow )

// Serach User ASF

UsersRouter.get("/search", verifyToken, searchUserASF)

// Delete  User ASF

UsersRouter.delete("/:id", verifyToken, DeleteUserASF)

// Edit Data User ASF

UsersRouter.put("/:id", verifyToken, EditDataUserASF)




module.exports = UsersRouter