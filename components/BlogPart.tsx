"use client"
import React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"



export default function BlogPart( props : any ) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: props.part.position.start.offset,
        // id: props.part.position,
    })
    // console.log("PART", props)
    // console.log("ID", props.part.position.start.offset)
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div 
        style={style} 
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="h-full bg-gray-300 border-2 rounded-sm">
            <h1>{props.part.type}</h1>
        </div>
    )
} 