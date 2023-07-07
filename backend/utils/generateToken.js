import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", //30 days
  }); //passing the userId as a payload

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict", //prevents csrf attack
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
  });
}; //adds the token in the cookie for 30 days

export default generateToken;
