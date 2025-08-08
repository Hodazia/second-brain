import { Request, Response } from "express";
import { ContentModel } from "../db";

export const PostContent = async ( req:Request, res:Response): Promise<void> => {
    // check what we are getting from the post request;
    console.log("title is", req.body.title);
    console.log("content is  ", req.body.content);
    console.log("links are  ", req.body.link);    
    console.log("tags are ", req.body.tags);
    console.log("type is  ", req.body.type);
    //@ts-ignore
    console.log("who has send the user id ", req.userId); // it is userId


    try {
    // Ensure tags is an array of strings
    const tags = Array.isArray(req.body.tags)
        ? req.body.tags.map((tag: unknown) => String(tag).trim()).filter((tag: string) => tag.length > 0)
        : [];

    // Create content with validated tags
    const newContent = await ContentModel.create({
        content: req.body.content,
        link: req.body.link,
        type: req.body.type,
        title: req.body.title,
        //@ts-ignore
        userId: req.userId,
        tags: tags
    });

    console.log('Successfully created content:', {
        contentId: newContent._id,
        title: newContent.title,
        type: newContent.type,
        tags: newContent.tags
    });

    res.status(201).json({
        message: "Content added successfully",
        content: newContent
    });    
    }
    catch(error)
    {
        console.error('Error during signin:', error);
        res.status(500).json({
            message: "Error signing in"
        });
    }

}

export const GetContent = async (req:Request, res:Response) :Promise <void>  => {
    // fetch all the contents of a particular user
    try {
        const content = await ContentModel.find({
            //@ts-ignore
            userId: req.userId
        }).populate("userId", "username");

        //check how many content each user has console it
        console.log(" the content length is ", content.length, " and the content is ", content);

        res.json({
            content
        });
    }
    catch(error)
    {
        console.error('Error during signin:', error);
        res.status(500).json({
            message: "Error signing in"
        });
    }
}

export const DeleteContent = async (req: Request, res: Response): Promise<void> => {
    const contentId = req.body.contentId;

    try {
        const result = await ContentModel.deleteOne({
            _id: contentId,
            //@ts-ignore
            userId: req.userId
        });

        if (result.deletedCount === 0) {
            res.status(404).json({
                message: "Content not found or you don't have permission to delete it"
            });
            return;
        }

        res.json({
            message: "Content deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting content"
        });
    }
}