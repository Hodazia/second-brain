import { Request, Response } from "express";
import { AuthRequest } from "../middleware";
import { ContentModel } from "../db";
import mongoose from "mongoose";
import { ObjectId } from "mongoose";

export const SearchedFilter =  async (req:Request,res:Response) => {
    // filter by the requests, 

    try{
        const { query, type } = req.query;
        //@ts-ignore
    const userId = req.userId;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // Build the base query
    let searchQuery = {
        //@ts-ignore
      userId,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } }
      ]
    };

    // If type is specified, filter by content type
    // the type will be the one we get from the sidebar
    /*



    so the search looks like -> /search?q=query&filter=Videos
    the page url will be dashboard/videos and 
    for each content we have a type="Youtube" so that will be a problem
     */


      // Convert the filter parameter to lowercase for consistent matching
  
      const validTypes = [
        'Youtube', 
        'Notion', 
        'Twitter', 
        'Document', 
        'Links', 
        'Spotify', 
        'Google Docs', 
        'Linkedin', 
        'Figma', 
        'Canva',
        'Website'
      ];

      const filterMap: Record<string, string | string[]> = {
        'videos': 'Youtube',
        'tweets': 'Twitter',
        'documents': 'Document',
        'website': 'Links',
        'notion':'Notion',
        'spotify':'Spotify',
        'google docs':'Google Docs', 
        'linkedin':'Linkedin', 
        'figma':'Figma',
        'canva':'Canva',
        'links': ['Links', 'Website'], 
    };
  
    if (type && typeof type=='string') {
      // Validate type against allowed content types
      const normalizedtypes = type.toLowerCase();


      // Validate filter type
      if (!Object.keys(filterMap).includes(normalizedtypes)) {
        return res.status(400).json({ 
          success: false,
          error: `Invalid filter type. Valid types are: ${Object.keys(filterMap).join(', ')}`
        });
      }

  // Use a mapping object for search values
  
  const mappedType = filterMap[normalizedtypes];
  //@ts-ignore
  searchQuery.type = Array.isArray(mappedType) 
    ? { $in: mappedType }
    : mappedType;

    }

    console.log("Search query:", searchQuery);

    // Fetch matching content
    const contentResults = await ContentModel.find(searchQuery)
      .select('title content link tags type createdAt').populate("userId", "username")
      .limit(50)
      .lean();
/* ̉ */
    console.log("The content results are ", contentResults);

    // Fetch related tags
    const contentIds = contentResults.map(item => item._id);
    // const tags = await TagsModel.find({ contentId: { $in: contentIds } })
    //   .select('contentId name')
    //   .lean();

    console.log("The contentIds are ", contentIds)

    // Combine content with their tags
    const results = contentResults.map(content => ({
      ...content,
    //   tags: tags
    //     .filter(tag => tag.contentId.toString() === content._id.toString())
    //     .map(tag => tag.name)
    }));

    console.log("Results are " , results);

    res.json({
      success: true,
      data: results,
      count: results.length
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}