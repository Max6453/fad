'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface SpeedData {
  id: string
  corner_name: string
  speed_kph: number
  track: string
  sessionID: string
  speed_type: 'High' | 'Medium' | 'Low' // Added to identify source table
}

interface Props {
  sessionId: string
}

export default function CornerSpeedTable({ sessionId }: Props) {
  const [corners, setCorners] = useState<SpeedData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        // Fetch data from all three tables simultaneously
        const [highSpeedResponse, mediumSpeedResponse, lowSpeedResponse] = await Promise.all([
          supabase
            .from('HighSpeed')
            .select('*')
            .eq('session_id', sessionId),
          supabase
            .from('MediumSpeed')
            .select('*')
            .eq('session_id', sessionId),
          supabase
            .from('LowSpeed')
            .select('*')
            .eq('session_id', sessionId)
        ])

        // Check for errors
        if (highSpeedResponse.error) {
          console.error('HighSpeed table error:', highSpeedResponse.error.message)
          throw new Error(`HighSpeed: ${highSpeedResponse.error.message}`)
        }
        if (mediumSpeedResponse.error) {
          console.error('MediumSpeed table error:', mediumSpeedResponse.error.message)
          throw new Error(`MediumSpeed: ${mediumSpeedResponse.error.message}`)
        }
        if (lowSpeedResponse.error) {
          console.error('LowSpeed table error:', lowSpeedResponse.error.message)
          throw new Error(`LowSpeed: ${lowSpeedResponse.error.message}`)
        }

        // Combine data from all tables and add speed_type identifier
        const allCorners: SpeedData[] = [
          ...(highSpeedResponse.data || []).map(corner => ({ ...corner, speed_type: 'High' as const })),
          ...(mediumSpeedResponse.data || []).map(corner => ({ ...corner, speed_type: 'Medium' as const })),
          ...(lowSpeedResponse.data || []).map(corner => ({ ...corner, speed_type: 'Low' as const }))
        ]

        // Sort by speed (highest to lowest) for better display
        allCorners.sort((a, b) => b.speed_kph - a.speed_kph)

        setCorners(allCorners)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (sessionId) {
      fetchData()
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-600">Loading corner speeds...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-red-800 font-medium">Error loading data</h3>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Corner Speeds – Session: {sessionId}</h2>
        <p className="text-sm text-gray-600 mt-1">
          Total corners: {corners.length} 
          {corners.length > 0 && (
            <span className="ml-4">
              High: {corners.filter(c => c.speed_type === 'High').length} | 
              Medium: {corners.filter(c => c.speed_type === 'Medium').length} | 
              Low: {corners.filter(c => c.speed_type === 'Low').length}
            </span>
          )}
        </p>
      </div>

      {corners.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No corner speed data found for this session.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Corner</th>
                <th className="border px-4 py-2 text-center">Speed (km/h)</th>
                <th className="border px-4 py-2 text-center">Speed Type</th>
                <th className="border px-4 py-2 text-left">Track</th>
              </tr>
            </thead>
            <tbody>
              {corners.map((corner) => (
                <tr key={`${corner.speed_type}-${corner.id}`} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 font-medium">{corner.corner_name}</td>
                  <td className="border px-4 py-2 text-center tabular-nums">
                    {corner.speed_kph.toFixed(1)}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      corner.speed_type === 'High' 
                        ? 'bg-red-100 text-red-800' 
                        : corner.speed_type === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {corner.speed_type}
                    </span>
                  </td>
                  <td className="border px-4 py-2">{corner.track}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}