import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    role: {
      type: String,
      default: "user",
    },
    provider: {
      type: String,
      default: "credentials",
    },
    // isAdmin: {
    //   type: Boolean,
    //   required: true,
    //   default: false, //when a user registers, they are not an admin
    // },
  },
  {
    timestamps: true,
  }
);

//before saving the password, hash it
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } //if password has not been modified we move to the next middleware

  // //if the password has been modified, we hash it
  // const salt = await bcrypt.genSalt(10);
  // this.password = await bcrypt.hash(this.password, salt);
}); //"this" refers to the user we are saving

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); //return true or false if the entered password matches the password in the database
};

const User = mongoose.model("User", userSchema);

export default User;
