import { getPostDataToEdit, getSortedPostsData } from "@/lib/posts"
import { notFound } from "next/navigation"
import DummyElement from "@/components/DummyElement"

export default async function EditorPost({ params } : { params: { postId: string}}) {
  const posts = await getSortedPostsData()
  const { postId } = params

  if (!posts.find(post => post.id === postId)) {
    return notFound()
  }


  const { title, date, published,  body } = await getPostDataToEdit(postId)

  console.log("tree", body)
  
  return (
    <main>
      <h1>Editor</h1>
      <p>{title}</p>
      {/* use de DummyElememt to pass de JSON file to de console of de browser */}
      <DummyElement json={body} />
    </main>
  )}