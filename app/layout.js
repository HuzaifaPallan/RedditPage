import '../styles/globals.css'

export const metadata = {
  title: 'Reddit Research Tool',
  description: 'Analyze community feedback and sentiment from Reddit',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}