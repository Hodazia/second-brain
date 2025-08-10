import { Request, Response } from "express";
import { ContentModel } from "../db";
import { TagsModel } from "../db";

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
    // const tags = Array.isArray(req.body.tags)
    //     ? req.body.tags.map((tag: unknown) => String(tag).trim()).filter((tag: string) => tag.length > 0)
    //     : [];

      // Validate tags is an array
      const tags = req.body.tags
  if (!Array.isArray(tags) || tags.some(tag => typeof tag !== 'string')) {
    return 
    res.status(400).json({ message: "Tags must be an array of strings." });
  }
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

export const GetTagData =  async (req: Request, res: Response) => {
    try {
      const tags = await TagsModel.find({});
      return res.status(200).json({tags});
    } catch (error: any) {
      return res.status(500).json({ message: "An internal error occurred", error: error.message });
    }
  };
  
export const PutTagsData =  async (req: Request, res: Response) => {

    // Array of tags to be given, { tags: [] }
    const { tags }  = req.body;
    
    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({ message: "Missing or invalid required field: tags." });
    }
  
  
    try {
      // Insert new tags if they don't exist
      const insertedTags = await Promise.all(
        tags.map(async (tagName) => {
          const existingTag = await TagsModel.findOne({ name: tagName });
  
          if (!existingTag) {
            return new TagsModel({ name: tagName }).save();
          }
          return existingTag;
        })
      );
  
      return res.status(201).json({ message: "Tags created/updated successfully.", tags: insertedTags });
    } catch (error: any) {
      return res.status(500).json({ message: "An internal error occurred", error: error.message });
    }
  };

  export const Filtercontents = async (req:Request,res:Response) => {
    // :content => [Youtube, ]
    const filterParam = req.params.content;
    //@ts-ignore
    const userId = req.userId;

    // Convert the filter parameter to lowercase for consistent matching
  const filter = filterParam.toLowerCase();
  // Use a mapping object for search values
  const filterMap: Record<string, string | string[]> = {
      'videos': 'Youtube',
      'tweets': 'Twitter',
      'documents': 'Document',
      'website': 'Links',
      'notion':'Notion', //added notion as a type too
      'spotify':'Spotify',
      'google docs':'Google Docs',
      'google maps':'Google Maps',
      'linkedin':'Linkedin', // added medium blogs to the website
      'figma':'Figma',
      'canva':'Canva',
      'links': ['Links', 'Website'], 
  };

  const type = filter === "all" ? '' : filterMap[filter];

  if (!userId) {
      return res.status(401).json({ message: "User not authenticated." });
  }

    // Check if the filter is valid before proceeding
    if (filter !== 'all' && !type) {
        return res.status(400).json(
            { message: "Invalid content filter provided." });
      }
  try {
      let query: Record<string, unknown>;

      if (type) {
          // If linkType is an array (e.g., "Links" case), use $in
          query = Array.isArray(type)
              ? { type: { $in: type }, userId }
              : { type, userId };
      } else {
          // Handle "All" case
          query = { userId };
      }

      const content = await ContentModel.find(query);

      res.status(200).json({ message: "Content loaded successfully.", content });
  } catch (error) {
      res.status(500).json({ message: "An internal server error occurred." });
  }

  }