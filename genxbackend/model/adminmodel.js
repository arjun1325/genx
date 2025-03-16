import { Schema } from "mongoose";
import mongoose from "mongoose";

const AdminSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    profilepic: {
        type: String,
        default: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
    },
    isActive: {
        type: Boolean,
        default: true,
    },
},
{
    timestamps: true,
}
);
const Admin = mongoose.model("admin", AdminSchema);
export default Admin;
