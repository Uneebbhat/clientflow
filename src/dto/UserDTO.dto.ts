import { Types } from "mongoose";

interface UserDTOProps {
  _id: Types.ObjectId | unknown;
  profilePic: string;
  name: string;
  email: string;
}

class UserDTO {
  _id: Types.ObjectId | unknown;
  profilePic: string;
  name: string;
  email: string;

  constructor(user: UserDTOProps) {
    this._id = user._id;
    this.profilePic = user.profilePic;
    this.name = user.name;
    this.email = user.email;
  }
}

export default UserDTO;
