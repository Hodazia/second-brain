/*
this component shall display preview of each card depending on its type 
in modal dialog form, 
*/

import { Button } from "./ui/button";
import { Card, CardDescription, CardContent, CardTitle,CardFooter, CardHeader } from "./ui/Card";

import {  Youtube, Twitter, FileText , Link, ExternalLink} from "lucide-react";

import { Badge } from "./ui/badge"
// react-tweet is for embedding tweets,
import { Tweet } from 'react-tweet'

import ReactMarkdown from 'react-markdown'
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

export const ContentPreview = ({ content }: ContentPreviewProps) => {
    // firsst based on the type of content , get its icon

    const getIcon = () => {
        switch(content.type)
        {
            case 'document':
                return  <FileText className="w-10 h-10"/>
            case 'Tweet':
                return <Twitter className="w-10 h-10"/>
            case 'Youtube':
                return <Youtube className="w-10 h-10"/>
            case 'link':
                return <Link className="w-10 h-10"/>
        }
    }

    // based on the type render the type of content, like youtube , or so on
    const renderEmbeddedContent = () => {
        if (content.type === 'Youtube') {
            // Uses a regular expression to extract the 
            // 11-character YouTube video ID from various YouTube URL formats
            const videoId = content.link.match(
              /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
            );
            if (videoId && videoId[1]) {
              return (
                <div className="aspect-video w-full rounded-lg overflow-hidden border border-accent-purple/20 dark:border-accent-blue/20">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId[1]}`}
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full"
                    title="YouTube Preview"
                  ></iframe>
                </div>
              );
            }
          }
      
          if (content.type === 'Tweet') {
            
            let tweetUrl = content.link;
            // 
            if (tweetUrl.includes('x.com')) {
              tweetUrl = tweetUrl.replace('x.com', 'twitter.com');
            }
            return (
              <div className="justify-center">
                <Tweet
                  id={tweetUrl.split('/').pop() || ''}
                />
              </div>
            );
          }
      
          if (content.type === 'document') {
            // 
            return (
              <Card className="bg-gradient-to-br from-background via-background to-muted/30 border-accent-purple/20 dark:border-accent-blue/20">
                <CardContent className="overflow-y-auto">
                  <div className="prose max-w-none">
                    <h2 className="text-xl font-semibold mb-4 text-foreground">{content.title}</h2>
                    <div className="p-4 rounded-lg border border-accent-purple/10 dark:border-accent-blue/10 bg-muted/30">
                      <div className="text-foreground">
                        <ReactMarkdown>
                          {content.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          }
      
          // For regular links, show a preview card
          return (
            <Card className="bg-gradient-to-br from-background via-background to-muted/30 border-accent-purple/20 dark:border-accent-blue/20">
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-purple/10 to-accent-blue/10 rounded-full flex items-center justify-center">
                    <Link className="w-5 h-5 text-accent-purple" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Web Link</div>
                    <div className="text-sm text-muted-foreground">{new URL(content.link).hostname}</div>
                  </div>
                </div>
                <iframe
                  src={content.link}
                  className="w-full h-full rounded border border-accent-purple/10 dark:border-accent-blue/10"
                  frameBorder={0}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Embedded Link Preview"
                />
              </CardContent>
            </Card>
          );
    }
    return (
        <>
    <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-start gap-2">
            <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-gradient-to-br from-accent-purple/10 to-accent-blue/10">
                {getIcon()}
            </div>
            <div>
                <h1 className="text-xl font-bold text-foreground">{content.title}</h1>
                <p className="text-sm mt-1 break-words whitespace-pre-line text-muted-foreground">
                {content.link.length > 40
                    ? content.link.slice(0, 37) + '...'
                    : content.link}
                </p>
            </div>
            </div>
        </div>

        {/* */}
        <div className="flex flex-wrap gap-2">
        {content.tags.map(tag => (
          <Badge
            key={tag}
            variant="secondary"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Content Preview */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Preview</h2>
        {renderEmbeddedContent()}
      </div>
      {content.type != 'document' &&
        <Button
          onClick={() => window.open(content.link, '_blank')}
          variant={"outline"}
          className="w-full"
        >
          <ExternalLink className="w-4 h-4" />
        </Button>
      }
    </div>
    </>
    )
}