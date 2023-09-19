"use client"
// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
import { fromMarkdown } from "mdast-util-from-markdown"
import { gfm } from 'micromark-extension-gfm'
import { gfmFromMarkdown, gfmToMarkdown } from 'mdast-util-gfm'

// const postsDirectory = path.join(process.cwd(), 'blogposts');

export async function mdToJson ( blogPostMd : BlogPostWithBody ) {

  // const fullPath = path.join(postsDirectory, `${blogPostMd.id}.md`);
  // const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  // const matterResult = matter(fileContents);

  // Combine the data with the id
  // const blogPostJson: BlogPost & {  body: any } = {
  //   id: blogPostMd.id,
  //   title: blogPostMd.title,
  //   date: blogPostMd.date,
  //   published: blogPostMd.published,
  //   body: matterResult.content,
  // }

  // return blogPostJson;
// } 
  // const fullPath = path.join(postsDirectory, `${id}.md`);
  // const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  // const matterResult = matter(fileContents);


  // console.log ("MATTER", fileContents)
  const tree = fromMarkdown( blogPostMd.body ,'utf8' , {
    // uncomment next two line to enable gfm
    extensions: [ gfm() ],
    mdastExtensions: [ gfmFromMarkdown() ]
  })

  // const blogPost: BlogPost & {  body: any } = {
  //   id,
  //   title: matterResult.data.title,
  //   date: matterResult.data.date,
  //   published: matterResult.data.published ? "Published" : "Draft",
  //   // body: processedContent,
  //   body: tree,
  //   // body: matterResult.content,
  // }
  // console.log("body-LIB", blogPost)
  // Combine the data with the id

const blogPostJson: BlogPostWithBody = {
  // id: blogPostMd.id,
  // title: blogPostMd.title,
  // date: blogPostMd.date,
  // published: blogPostMd.published,
  // body: tree,
  ...blogPostMd, body: tree,
}

  return blogPostJson;
}
