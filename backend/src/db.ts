import  mongoose, {model, Schema } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDb =  async () => 
{
    try {
    const result = await mongoose.connect(process.env.MONGO_DBURL as string);
    console.log("The DB is connected ");
    } catch (e) {
        console.error("Failed to connect to MongoDB:", e);
    }
}


const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: {type: String , required: true},
})

export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
    title: { type: String, required: true},
    content: { type: String, required: true},
    link: { type: String, required: true},
    tags: [String],
    type: { type: String, required: true},
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date , default:Date.now()}, // No default value
})

const LinkSchema = new Schema({
    hash: String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
})

const tagSchema = new Schema(
    {
      name: { type: String, required: true, unique: true },
    },
    { timestamps: true }
  );

export const TagsModel = mongoose.model('Tag', tagSchema);
export const LinkModel = model("Links", LinkSchema);
export const ContentModel = model("Content", ContentSchema);
