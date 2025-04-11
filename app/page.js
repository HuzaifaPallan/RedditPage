"use client";
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Changed from showing LoginPage to redirecting to RedditResearch
export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/RedditResearch')
  }, [router])

  return null
}