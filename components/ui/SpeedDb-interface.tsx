'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient' // Adjust path as needed

function RaceSelector({ onRaceSelect, selectedRaceId }) {
  const [races, setRaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchRaces = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('races')
        .select('id, race_name, track, date, weather')

      if (error) {
        console.error('Error fetching races:', error.message)
      } else {
        setRaces(data || [])
      }
      setLoading(false)
    }

    fetchRaces()
  }, [])

  const filteredRaces = races.filter(race =>
    race.race_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    race.track.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-4">Select Race Session</h2>

      <input
        type="text"
        placeholder="Search races or tracks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="grid gap-3 max-h-96 overflow-y-auto">
        {filteredRaces.length === 0 ? (
          <div className="text-center text-gray-500">
            {searchTerm ? 'No races found matching your search.' : 'No races available.'}
          </div>
        ) : (
          filteredRaces.map(race => (
            <div
              key={race.id}
              onClick={() => onRaceSelect(race)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                selectedRaceId === race.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h3 className="font-semibold text-gray-900">{race.race_name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Track:</span> {race.track}
              </p>
              <div className="flex gap-4 mt-2 text-xs text-gray-500">
                <span>📅 {new Date(race.date).toLocaleDateString()}</span>
                <span>🌤️ {race.weather}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function CornerSpeedTable({ sessionId, raceName }) {
  const [corners, setCorners] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCornerSpeeds = async () => {
      if (!sessionId) return

      setLoading(true)
      setError(null)

      try {
        const [high, medium, low] = await Promise.all([
          supabase.from('highspeed').select('*').eq('session_id', sessionId),
          supabase.from('mediumspeed').select('*').eq('session_id', sessionId),
          supabase.from('lowspeed').select('*').eq('session_id', sessionId)
        ])

        if (high.error || medium.error || low.error) {
          throw new Error(high.error?.message || medium.error?.message || low.error?.message)
        }

        const combined = [
          ...(high.data || []).map(c => ({ ...c, speed_type: 'High' })),
          ...(medium.data || []).map(c => ({ ...c, speed_type: 'Medium' })),
          ...(low.data || []).map(c => ({ ...c, speed_type: 'Low' }))
        ]

        combined.sort((a, b) => b.speed_kph - a.speed_kph)
        setCorners(combined)
      } catch (err) {
        setError(err.message || 'Error loading corner data')
      } finally {
        setLoading(false)
      }
    }

    fetchCornerSpeeds()
  }, [sessionId])

  if (!sessionId) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8 text-center text-gray-500">
        <div className="text-4xl mb-2">🏁</div>
        <h3 className="text-lg font-medium">Select a Race Session</h3>
        <p className="text-sm">Choose a race to view corner speed data.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 w-1/3 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 w-5/6 rounded"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 text-red-600">
        <h3 className="text-red-800 font-medium">Error</h3>
        <p className="text-sm">{error}</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-2">Corner Speeds – {raceName}</h2>
      <p className="text-sm text-gray-600 mb-4">
        Total corners: {corners.length} | 
        High: {corners.filter(c => c.speed_type === 'High').length} | 
        Medium: {corners.filter(c => c.speed_type === 'Medium').length} | 
        Low: {corners.filter(c => c.speed_type === 'Low').length}
      </p>

      {corners.length === 0 ? (
        <div className="text-center text-gray-500">No corner speed data found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Corner</th>
                <th className="border px-4 py-2 text-center">Speed (km/h)</th>
                <th className="border px-4 py-2 text-center">Type</th>
                <th className="border px-4 py-2 text-left">Track</th>
              </tr>
            </thead>
            <tbody>
              {corners.map(c => (
                <tr key={`${c.speed_type}-${c.id}`} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{c.corner_name}</td>
                  <td className="border px-4 py-2 text-center">{c.speed_kph.toFixed(1)}</td>
                  <td className="border px-4 py-2 text-center">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      c.speed_type === 'High'
                        ? 'bg-red-100 text-red-800'
                        : c.speed_type === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {c.speed_type}
                    </span>
                  </td>
                  <td className="border px-4 py-2">{c.track}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default function RaceSpeedDashboard() {
  const [selectedRace, setSelectedRace] = useState(null)

  return (
    <div className="h-screen bg-gray-50 p-4 pt-40 relative">
      <div className="max-w-7xl mx-auto space-y-6">

        <div className="grid lg:grid-cols-2 gap-6">
          <RaceSelector
            onRaceSelect={setSelectedRace}
            selectedRaceId={selectedRace?.id}
          />
          <CornerSpeedTable
            sessionId={selectedRace?.id}
            raceName={selectedRace?.race_name}
          />
        </div>
      </div>
    </div>
  )
}
