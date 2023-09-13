"use client"
import { getSortedPostsData } from "@/lib/posts";
import React, { useEffect, useState } from "react";
import { columns } from "./columns"
import { DataTable } from "./data-table"


export default function Blogs () {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getSortedPostsData().then((response) => {
      setPosts(response)
      setIsLoading(false)
      console.log("response", response)
      return response
    })
  }, [])

  
  return (
    <div className="container py-10 mx-auto">
      <DataTable columns={columns} data={posts} />
    </div>
  )
}