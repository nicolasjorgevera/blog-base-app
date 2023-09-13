"use server"
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm'
import codeFrontmatter  from 'remark-code-frontmatter'
import remarkMdx from 'remark-mdx'
import html from 'remark-html';


import { fromMarkdown } from "mdast-util-from-markdown"
import { toMarkdown } from 'mdast-util-to-markdown'


import { gfm } from 'micromark-extension-gfm'
import { gfmFromMarkdown, gfmToMarkdown } from 'mdast-util-gfm'


const postsDirectory = path.join(process.cwd(), 'blogposts');

export async function getSortedPostsData () {
  // get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // remove ".md" from file name to get id
    const id = fileName.replace(/\.(md|mdx)$/, '');
    // const id = fileName.replace(/\.md$/, '');

    // read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // use gray-matter to parse the post metadata section

    const matterResult = matter(fileContents);

    const blogpost: BlogPost = {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      published: matterResult.data.published ? "Published" : "Draft",
    }

    return blogpost;
  });

  // Sort posts by date
  console.log("allPostsData", allPostsData);
  return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1);
  // return Promise.resolve ()
};

export async function getPostData (id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const processedContent = await remark()
  .use(remarkGfm)
  .use(codeFrontmatter)
  .use(html)
  .process(matterResult.content);

  const contentHtml = processedContent.toString();


  const blogPostWithHTML: BlogPost & {  contentHtml: string } = {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    published: matterResult.data.published ? "Published" : "Draft",
    contentHtml,
  }

  // Combine the data with the id

  return blogPostWithHTML;
};


export async function getPostDataToEdit (id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);


  console.log ("MATTER", fileContents)
  const tree = fromMarkdown(matterResult.content,'utf8' , {
    // uncomment next two line to enable gfm
    // extensions: [gfm()],
    // mdastExtensions: [ gfmFromMarkdown() ]
  })

  const blogPost: BlogPost & {  body: any } = {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    published: matterResult.data.published ? "Published" : "Draft",
    // body: processedContent,
    body: tree,
  }
  // console.log("body-LIB", blogPost)
  // Combine the data with the id

  return blogPost;
};


