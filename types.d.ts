type BlogPost = {
  id: string;
  title: string;
  date: string;
  published: string;
}

type JsonBlogPost = {
  type: string;
  depth: number;
  children: Array<string | number>[];
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

type heading = {
  type: string;
  depth: number;
  children: Array<text>[];
  position: Position;
}

type text = {
  type : string;
  value: string;
  position: FullPosition;
}

