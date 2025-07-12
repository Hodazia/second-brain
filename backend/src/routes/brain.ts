import { random } from '../utils';
import { UserModel, ContentModel, LinkModel } from '../db';
import { Request, Response } from 'express';


export const ShareBrain = async (req:Request,res:Response): Promise <void> => {
    // share the content via req.body.share , it has to be true
    const share = req.body.share;
    //@ts-ignore
    console.log("Reveived requests " , share, "\n",req.userId);
    
    try {
        const share = req.body.share;
        if (share) {
            //@ts-ignore
            console.log('Enabling sharing for user:', req.userId);

            const existingLink = await LinkModel.findOne({
                //@ts-ignore
                userId: req.userId
            });

            if (existingLink) {
                res.json({
                    message: "Shareable link already exist",
                    Link: existingLink.hash
                });
    
                return;
            }

            const hash = random(10);

            // create a new link and store it in linkmodel
            await LinkModel.create({
                //@ts-ignore
                userId: req.userId,
                hash: hash
            });

            console.log('Successfully created share link');
            res.json({
                hash
            });
        } else {

            const result = await LinkModel.deleteOne({
                //@ts-ignore
                userId: req.userId
            });


            res.json({
                message: "Removed link"
            });
        }
    } catch (error) {
        console.error('there is an error in sharing brain :');
        res.status(500).json({
            message: "Server error in sharing the brain",
        });
    }
}

export const ShareBrainByShareId = async (req: Request, res: Response): Promise<void> => {
    const hash = req.params.shareId;

    try {
        const link = await LinkModel.findOne({
            hash
        });

        if (!link) {
            console.error('Error finding share link ');
            res.status(404).json({
                message: "incorrect input, the share link not founded"
            });
            return;
        }

        // else case, we found sharable link
        const content = await ContentModel.find({
            userId: link.userId
        });


        const user = await UserModel.findOne({
            _id: link.userId
        });

        if (!user) {
            console.error('User not found for share link:', );
            res.status(404).json({
                message: "no user found"
            });
            return;
        }

        console.log('Successfully retrieved shared brain:', {
            username: user.username,
            contentCount: content.length,
            hash
        });

        res.json({
            username: user.username,
            content: content
        });
    } catch (error) {
        console.error('Error retrieving shared brain:',);
        res.status(500).json({
            message: "Server error in retrieving the shared brain",
        });
    }
}


