const Users = require("../models/Users");

const CLIENT_ID_PREFIX = "ASF_USER_";

const generateClientID = (clientCount) => {
  return CLIENT_ID_PREFIX + (Number(clientCount) + 1);
};

const authentication = (req, res) => {
  const user = req.backofficeUser;
  const data = { ...user._doc, password: null };

  console.log("Req user", user);

  res.status(200).send({ data });
};

// Create NEW User ASF

const CreateUser = async (req, res) => {
  const countClients = await Users.countDocuments();

  const id = generateClientID(countClients.toString());

  Users.create({ ...req.body, id })
    .then((data) => {
      console.log(data);
      res.status(201).send({ message: "User Create Successfully" });
    })
    .catch((err) => {
      console.log(err, "err");
      res.status(400).send({ status: 400, ...err });
    });
};

const Logout = (req, res) => {
  try {
    // Clear cookies and send response
    res
      .clearCookie("accesToken")
      .clearCookie("accessToken")
      .clearCookie("refreshToken");
    res.status(200).json({ message: "Successful disconnection" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Error during logout" });
  }
};

// Get all Users ASF

const GetAllUsersASF = (req, res) => {
  Users.find()
    .then((data) => {
      console.log(data);
      res.send({ data });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "vous n'avez pas recuperer les Users" });
    });
};

// Get User ASF Connected

const GetUserConnectedNow = (req, res) => {
  const userID = req.user._id;
  Users.findOne({ user_id: userID })
    .then((data) => {
      console.log(data);
      res.send({ data });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({
          message: "vous n'avez pas recuperer User connectè maintenant",
        });
    });
};

// Serach User ASF

const searchUserASF = (req, res) => {
  const textSearchUser = req.query.query;

  if (!textSearchUser) {
    return res.status(400).json({ error: "Search query is required" });
  }

  Users.find({
    $or: [
      { first_name: { $regex: textSearchUser, $options: "i" } },
      { last_name_name: { $regex: textSearchUser, $options: "i" } },
      { email: { $regex: textSearchUser, $options: "i" } },
    ],
  })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    });
};

// Delete User ASF

const DeleteUserASF = (req, res) => {
  const UserId = req.params.id;

  Users.deleteOne({ _id: UserId })
    .then((data) => {
      console.log(data);
      res.status(200).json({ message: " User supprimé avec succès" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: 500, ...err });
    });
};

// Edit data user ASF

const EditDataUserASF = (req, res) => {
  const UserId = req.params.id;
  Users.findByIdAndUpdate(UserId, req.body, { new: true })
    .then((data) => {
      console.log(data);
      res.status(200).send({ data, message: "User updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send({ ...err, message: "invalid user id" });
    });
};

// Logout User ASF

module.exports = {
  CreateUser,
  GetAllUsersASF,
  searchUserASF,
  DeleteUserASF,
  EditDataUserASF,
  authentication,
  Logout,
  GetUserConnectedNow,
};
