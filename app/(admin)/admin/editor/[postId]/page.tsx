"use client"
import { getPostDataToEdit, getSortedPostsData } from "@/lib/posts"
import { notFound } from "next/navigation"
import DummyElement from "@/components/DummyElement"
import { mdToJson } from "@/lib/clientLibs"
import React, { useState, useEffect } from "react"

export default function EditorPost({ params } : { params: { postId: string}}) {
  const [ blogPostJson, setBlogPostJson ] = useState({} as BlogPost & { body: any })
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    const flechData = async () => {
      const posts = await getSortedPostsData()
      const { postId } = params
      if (!posts.find(post => post.id === postId)) {
        return notFound()
      }
      const blogPostMd = await getPostDataToEdit(postId)

      const blogPostJson: BlogPostWithBody = await mdToJson (blogPostMd)
      // console.log("tree", body)
      setBlogPostJson(blogPostJson)
    }
    flechData()
      .then(() => {
        setIsLoading(false)
      })
  }, [params])

return (
    <main>
      <h1>Editor</h1>
      <p>{blogPostJson.title}</p>
      {/* use de DummyElememt to pass de JSON file to de console of de browser */}
      {isLoading ? <p>Loading...</p> : <DummyElement json={blogPostJson.body} />}
    </main>
  )}