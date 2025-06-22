'use client'

import React, { useEffect, useState } from 'react'

type MediaItem = {
  href: string
  data: {
    title: string
    media_type: string
    nasa_id: string
    description: string
  }[]
  links: {
    href: string
    render?: string
    rel?: string
  }[]
}

const ImageItem = ({ thumbnail, title }: { thumbnail: string; title: string }) => (
  <div className="bg-gray-900 p-4 rounded w-full max-w-sm">
    <img src={thumbnail} alt={title} className="w-full rounded" />
    <p className="mt-2 font-semibold text-center">{title}</p>
  </div>
)

const VideoItem = ({ nasaId, title }: { nasaId: string; title: string }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`https://images-api.nasa.gov/asset/${nasaId}`)
        const data = await res.json()
        const video = data.collection.items.find((item: any) =>
          item.href.endsWith('.mp4')
        )
        if (video) setVideoUrl(video.href)
      } catch (err) {
        console.error('Error fetching video:', err)
      }
    }

    fetchVideo()
  }, [nasaId])

  return (
    <div className="bg-gray-900 p-4 rounded w-full max-w-sm">
      {videoUrl ? (
        <video src={videoUrl} controls className="w-full rounded" />
      ) : (
        <p className="text-center">Loading video...</p>
      )}
      <p className="mt-2 font-semibold text-center">{title}</p>
    </div>
  )
}

export default function NasaLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('mars')
  const [mediaType, setMediaType] = useState('both')
  const [results, setResults] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchResults('mars', 'both')
  }, [])

  const fetchResults = async (query: string, media: string) => {
    setLoading(true)
    try {
      const mediaParam = media !== 'both' ? `&media_type=${media}` : ''
      const res = await fetch(
        `https://images-api.nasa.gov/search?q=${query}${mediaParam}`
      )
      const data = await res.json()
      setResults(data.collection.items || [])
    } catch (err) {
      console.error('Error fetching NASA data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    fetchResults(searchQuery, mediaType)
  }

  return (
    <main className="mx-auto w-full px-12 py-16 sx:px-3 sm:px-4 bg-black text-white min-h-screen">
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-title">NASA Library</h1>
        <p className="text-subtitle max-w-[80%] text-center md:max-w-[50%]">
          Access NASA’s archive of space images and videos from the Image and Video Library API!
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 px-4 pt-10 sm:pt-8">
        <input
          type="text"
          className="text-black px-4 py-2 rounded w-full md:w-fit"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
        />
        <select
          className="text-black px-4 py-2 rounded"
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
        >
          <option value="both">Both</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="flex h-[50vh] w-full items-center justify-center">
          <p className="text-subtitle text-lg">Loading...</p>
        </div>
      )}

      {!loading && results.length === 0 && (
        <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-2">
          <p className="text-red-500 text-lg font-semibold">Sorry! No results found.</p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-3">
        {results.map((item, idx) => {
          const media = item.data[0]
          const thumbnail = item.links?.[0]?.href

          if (media.media_type === 'image') {
            return (
              <ImageItem
                key={media.nasa_id || idx}
                thumbnail={thumbnail}
                title={media.title}
              />
            )
          }

          if (media.media_type === 'video') {
            return (
              <VideoItem
                key={media.nasa_id || idx}
                nasaId={media.nasa_id}
                title={media.title}
              />
            )
          }

          return null
        })}
      </div>
    </main>
  )
}
