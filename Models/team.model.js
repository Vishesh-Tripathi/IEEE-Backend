import mongoose,{Schema} from "mongoose";
const TeamSchema = new Schema(
    {
    name: String,
    role: String,
    imageUrl: String,
    socialLinks: {
        twitter: String,
        facebook: String,
        instagram: String,
        email: String
    }
  }
);
export const Team = mongoose.model('Team', TeamSchema);