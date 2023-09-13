import { getSortedPostsData, getPostData } from "@/lib/posts"
import getFormattedDate from "@/lib/getFormattedDate"
import { notFound } from "next/navigation"
import Link from "next/link"


export async function generateStaticParams(){
  const posts = await getSortedPostsData()
  return posts.map((post) => ({
    postId: post.id
  }))
}

export async function generateMetadata ({ params } : { params: { postId: string}}) {
  const posts = await getSortedPostsData()
  const { postId } = params
  // console.log("post dentro de post",posts)
  const post = posts.find(post => post.id === postId)
  if (!post) {
    return {
      title: 'Post not found'
    }}
  return {
    title: post.title,
  }
}


export default async function Post({ params } : { params: { postId: string}}) {
  const posts = await getSortedPostsData()
  const { postId } = params

  if (!posts.find(post => post.id === postId)) {
    return notFound()
  }

  const { title, date, contentHtml } = await getPostData(postId)

  const pubDate = getFormattedDate(date)
  
  return (
    <main>
      <h1>{title}</h1>
      <p>{pubDate}</p>
      <article>
        <section dangerouslySetInnerHTML={{ __html: contentHtml }} className="prose prose-table:border-2"/>
        <p>
          <Link href={"/"}>Back to Home</Link>
        </p>
      </article>
    </main>
  )}