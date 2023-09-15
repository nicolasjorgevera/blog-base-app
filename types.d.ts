import { type } from "os";

type BlogPost = {
  id: string;
  title: string;
  date: string;
  published: string;
}

type JsonBlogPost = {
  type: "root";
  depth: number;
  children: Array<Heading | Paragraph | List | Blockquote | Html | ThematicBreak | Code>[];
  position: FullPosition;
}

type FullPosition ={
  start: Position;
  end: Position;
}

type Position = {
  line: number;
  column: number;
  offset: number;
}

type Heading = {
  type: "heading";
  depth: number;
  children: Array<BasicText>[];
  position: Position;
}

type BasicText = {
  type : "text";
  value: string;
  position: FullPosition;
}

type TextModification = {
  type: "strong" | "emphasis" | "delete" | "inlineCode";
  children: Array<BasicText>[];
  position: FullPosition;
}

type Link = {
  type: "link";
  title: string | null;
  url: string;
  children: Array<BasicText>[];
  position: FullPosition;
}

type Image = {
  type: "image";
  title: string | null;
  url: string | null;
  alt: string | null;
  position: FullPosition;
}

type Paragraph = {
  type: "paragraph";
  children: Array<BasicText | TextModification | Link | Image>[];
  position: FullPosition;
}

type List = {
  type: "list";
  ordered: boolean;
  start: number | null;
  spread: boolean;
  chilildren: Array<ListItem>[];
  position: FullPosition;
}

type ListItem = {
  type: "listItem";
  spread: boolean;
  checked: boolean | null;
  children: Array<Paragraph | List>[];
  position: FullPosition;
}

type Blockquote = {
  type: "blockquote";
  children: Array<Paragraph | Blockquote>[];
  position: FullPosition;
}


type ThematicBreak = {
  type: "thematicBreak";
  position: FullPosition;
}

type Html = {
  type : "html";
  value: string;
  position: FullPosition;
}

type Code = {
  type: "code";
  lang: string | null;
  meta: string | null;
  value: string;
  position: FullPosition;
}