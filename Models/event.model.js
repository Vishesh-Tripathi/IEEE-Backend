import mongoose,{Schema} from "mongoose";
const EventSchema = new Schema(
    {
    name: String,
    description: String,
    time: String,
    imageUrl: String,
  }
);
export const Event = mongoose.model('Event', EventSchema);