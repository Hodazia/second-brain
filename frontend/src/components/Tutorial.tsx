import { Card, CardHeader, CardContent,  CardDescription, CardTitle, CardFooter } from "./ui/Card";
import { Badge } from "./ui/badge";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "./ui/dialog"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Link } from "lucide-react";
import { ContentPreview } from "./ContentPreview";

interface Content {
  _id: string,
  type: 'document' | 'Youtube' | 'Tweet' | 'link',
  link:string,
  title:string,
  tags: string[],
  content? :string
}

interface ContentPreviewProps {
  content: Content;
}

const content1 : Content[]= [  
  {_id: '123ksdbv',
  type:'Youtube',
  link:'https://www.youtube.com/watch?v=CJ-xMLz-ZrM&t=130s',
  title: 'Coding Setup',
  tags: ['coding','minimalist'],
  content: 'This is the coding setup of mine'},
  {_id: '1iweubgbv',
  type:'link',
  link:'https://lucide.dev/icons/external-link',
  title: 'Lucide.dev ',
  tags: ['icons','react'],
 content: 'This is the lucide website icons'},
]


export const Tutorial = () => {
    return (
        <>
        <Card className="w-[400px] mx-auto">
            <CardHeader>
                <CardTitle>ML / Aritificial Intelligence</CardTitle>
                <CardDescription>
                    This is all about AI stuff
                    <Badge variant="destructive">Secondary badge</Badge>
                    <Badge variant="outline">Outline</Badge>
                </CardDescription>
            </CardHeader>
            <CardFooter>
                This is about footer , where copyright 2025
            </CardFooter>

        </Card>

        <Card className="w-[400px] mx-auto">
            <CardHeader>
                <CardTitle>ML / Aritificial Intelligence</CardTitle>
                <CardDescription>
                    This is all about AI stuff
                </CardDescription>
                <CardDescription>
                <Button variant="link" size="sm" className="bg-yellow-200">Username, Signin</Button>
                </CardDescription>
            </CardHeader>
            <CardFooter>
                This is about footer , where copyright 2025
            </CardFooter>

        </Card>
        <Card className="mt-5 bg-gradient-to-br from-background via-background to-muted/30 border-accent-purple/20 dark:border-accent-blue/20">
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-purple/10 to-accent-blue/10 rounded-full flex items-center justify-center">
                    <Link className="w-5 h-5 text-accent-purple" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Web Link</div>
                    <div className="text-sm text-muted-foreground">{new URL("https://lucide.dev/icons/external-link").hostname}</div>
                  </div>
                </div>
                <iframe
                  src={"https://lucide.dev/icons/external-link"}
                  className="w-full h-full rounded border border-accent-purple/10 dark:border-accent-blue/10"
                  frameBorder={0}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Embedded Link Preview"
                />
              </CardContent>
            </Card>

          {
            content1.map((content,idx) => {
              return (
                <>
                 <ContentPreview key={idx} content={content}/>
                </>
              )
            })
          }
        </>
)
}

export const DialogDemo = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
