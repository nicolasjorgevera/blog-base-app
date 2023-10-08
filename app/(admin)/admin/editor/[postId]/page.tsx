"use client"
import { getPostDataToEdit, getSortedPostsData } from "@/lib/posts"
import { notFound } from "next/navigation"
import DummyElement from "@/components/DummyElement"
import { mdToJson } from "@/lib/clientLibs"
import React, { useState, useEffect, useMemo } from "react"
import { 
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  // useDraggable
} from '@dnd-kit/core';
import { 
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable"
import BlogPart from "@/components/BlogPart"



export default function EditorPost({ params } : { params: { postId: string}}) {
  const [ blogPostJson, setBlogPostJson ] = useState({} as BlogPostWithBody)
  const [ blogPostArray, setBlogPostArray ] = useState([{} as any])
  const [ isLoading, setIsLoading ] = useState(true)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const flechData = async () => {
      const posts = await getSortedPostsData()
      const { postId } = params
      if (!posts.find(post => post.id === postId)) {
        return notFound()
      }
      const blogPostMd = await getPostDataToEdit(postId)

      const blogPostJsonData: BlogPostWithBody = await mdToJson (blogPostMd)
      // console.log("tree", body)
      setBlogPostJson(blogPostJsonData)
      setBlogPostArray(blogPostJsonData.body.children)
      // console.log("JSON",BlogPostJsonData)
      // console.log("array",BlogPostJsonData.body.children)
    }

    flechData()
      .then(() => {
        setIsLoading(false)
      })
  }, [params])

  const blogPostArrayIds = useMemo(() => blogPostArray.map((item) => item.position?.start.offset), [blogPostArray])
  // const arrayPrueba = [ { type: "Prueba 1", position:{ start: { offset :1 }, }, }, { type: "Prueba 2", position:{ start: {offset :2}, }, }, { type: "Prueba 3", position:{ start: {offset :3 }, }, },]
  const arrayPrueba = [ { type: "Prueba 1", position:1, }, { type: "Prueba 2", position:2, },  { type: "Prueba 3", position:3, },]
  const handleDragEnd = (event : any) => {
    const { active, over } = event
    console.log("active", active.id)
    console.log("over", over.id)
    if (active.id !== over.id) {
      setBlogPostArray((blogPostArray) => {
        const oldIndex = blogPostArray.findIndex((item) => item.position.start.offset === active.id);
        const newIndex = blogPostArray.findIndex((item) => item.position.start.offset === over.id);

        return arrayMove(blogPostArray, oldIndex, newIndex);
      });
    }
  }
  // console.log("blogPostArray", blogPostArray)

return (
    <main>
      <h1>Editor</h1>
      <p>{blogPostJson.title}</p>
      {/* use de DummyElememt to pass de JSON file to de console of de browser */}
      {isLoading ? <p>Loading...</p> : <DummyElement json={blogPostJson.body} />}
      {isLoading ? <p>Loading...</p> :  
        <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={blogPostArrayIds}
            strategy={verticalListSortingStrategy}
            >
            {
              // blogPostArray.map((part: any) => (
                blogPostArray.map((part: any) => (
                <BlogPart part={part} key={part.position.start.offset} />
                // <BlogPart part={part} key={part.position.start.offset} />
                ))
            }
          </SortableContext>
        </DndContext>
      }
    </main>
  )}