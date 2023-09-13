import { Button } from "./ui/button"
import Link from "next/link"


export default function NavBarBlog () {
  return(
    <nav>
      <Button>
        <Link href={"/"}>Home</Link>
      </Button>
      <Button>
        <Link href={"/about"}>About</Link>
      </Button>
    </nav>
  )
  
}