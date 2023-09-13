
import './globals.css'
import Providers from "@/components/Provider"
import NavBarAdmin from "@/components/NavBarAdmin"
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <NavBarAdmin />
        </header>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
