"use client"


import { NextUIProvider } from '@nextui-org/react';

import React, { useEffect, useRef, useState } from "react"
import { addPart } from "@/reducers/currentPostSlice"
import { useAppSelector, useAppDispatch } from "@/reducers/hooks"
// import { Button } from "@nextui-org/react";
// import PostPruerba from "./posts/prueba.md"
import { unified } from "unified";
import markdown from "remark-parse";
import { remarkToSlate } from "remark-slate-transformer";
// import ButtonApp from '@/components/Button';
// import nextMDX from '@next/mdx';
import Posts from '@/components/Posts';


const processor = unified().use(markdown).use(remarkToSlate);

const text = "# hello world"

const value = processor.processSync(text).result;
console.log(value);

const Home = () => {

  const currentPost = useAppSelector((state) => state.currentPost)
  const dispatch = useAppDispatch()

  const [count, setCount] = useState(0)
  const addCount = () => {
    setCount(count + 1)
    console.log(count)
  }

  const [trialPost, setTriallPost] = useState(value)
  // console.log("currentPost: ", currentPost)
  useEffect(() => {
    dispatch( addPart({ type: "title", text: "Esto es la bomba"}))
  }, [dispatch])
  // console.log("currentPost: ", currentPost)

  return (
    <main>
      <NextUIProvider>
        {/* <p>Hola</p>
        <p>{count}</p>
        <ButtonApp onClick={addCount} text="Cargar el Post"/> */}
        <Posts />
        {/* {
          currentPost?.parts.map((part: any) => (
            // <h3 key={part.type}>Title: {part.type} - Text {part.text}</h3>
            console.log("aaa")
            ))}
        {/* {
          trialPost.map((part: any) => (
            
          ))
        } */}
        {/* {text}
        <PostPruerba /> */}
      </NextUIProvider>
    </main>
  )
  // return <PostPruerba />;
}

export default Home
