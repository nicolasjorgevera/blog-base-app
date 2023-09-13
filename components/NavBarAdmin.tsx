import { Button } from "./ui/button"
import Link from "next/link"

export default function NavBarAdmin () {
  return(
    <nav>
      <Button>
        <Link href={"/admin/blogs"}>Blogs</Link>
      </Button>
      <Button>
        <Link href={"/admin/users"}>Users</Link>
      </Button>
      <Button>
        <Link href={"/admin/newentry"}>New Entry</Link>
      </Button>
    </nav>
  )
  
}