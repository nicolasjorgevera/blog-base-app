import { getSortedPostsData } from "@/lib/posts";
import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getSortedPostsData().then((response) => {
      const publishedPosts = response.filter(post => post.published === "Published")
      setPosts(publishedPosts)
      setIsLoading(false)
      console.log("response", response)
      return response
    })
  }, [])

  // useEffect(() => {
  //   const getPosts = async () => {
  //     const response = await getSortedPostsData()
  //     return response
  //   }
  //   const allPost = getPosts()
  //   setPosts(allPost)
  //   setIsLoading(false)
  //   // console.log("response", response)
  // }
  // , [])

  console.log("posts:", posts)
  return(
    <section className="max-w-2xl px-4 mx-auto mt-6">
      <h2 className="text-4xl font-bold">Blog</h2>
      {isLoading ? <p>Loading...</p> : null}
      <ul className="w-full">
        {posts.map((post) => (
          // JSON.stringify(post)
          <ListItem key={post.id} post={post} />
        )
        )}
      </ul>
    </section>
  )
}