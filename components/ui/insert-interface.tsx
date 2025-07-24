// components/AdminDashboard.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AdminDashboard() {
  const [raceData, setRaceData] = useState({
    id: '',
    race_name: '',
    track: '',
    date: '',
    weather: '',
  })

  const [corners, setCorners] = useState({
    HighSpeed: [],
    MediumSpeed: [],
    LowSpeed: []
  })

  const [currentCorner, setCurrentCorner] = useState({
    speedType: 'HighSpeed',
    corner_name: '',
    speed_kph: '',
  })

  const [message, setMessage] = useState<string | null>(null)

  const handleAddCorner = () => {
    if (!currentCorner.corner_name || !currentCorner.speed_kph) return
    setCorners((prev) => ({
      ...prev,
      [currentCorner.speedType]: [
        ...prev[currentCorner.speedType],
        {
          corner_name: currentCorner.corner_name,
          speed_kph: parseFloat(currentCorner.speed_kph),
          track: raceData.track,
          session_id: raceData.id
        }
      ]
    }))
    setCurrentCorner({ ...currentCorner, corner_name: '', speed_kph: '' })
  }

  const handleSubmit = async () => {
    setMessage('Saving...')
    // Insert race
    const { error: raceError } = await supabase.from('races').insert([raceData])
    if (raceError) {
      setMessage(`Error saving race: ${raceError.message}`)
      return
    }

    // Insert corners
    for (const type of ['HighSpeed', 'MediumSpeed', 'LowSpeed']) {
      if (corners[type].length > 0) {
        const { error: cornerError } = await supabase.from(type).insert(corners[type])
        if (cornerError) {
          setMessage(`Error saving ${type} corners: ${cornerError.message}`)
          return
        }
      }
    }

    setMessage('Race and corners saved successfully 🎉')
    // Reset state
    setRaceData({ id: '', race_name: '', track: '', date: '', weather: '' })
    setCorners({ HighSpeed: [], MediumSpeed: [], LowSpeed: [] })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Admin – Add Race & Corners</h2>

      {/* Race Info */}
      <div className="grid gap-4 mb-6">
        <input placeholder="Session ID" className="input" value={raceData.id} onChange={(e) => setRaceData({ ...raceData, id: e.target.value })} />
        <input placeholder="Race Name" className="input" value={raceData.race_name} onChange={(e) => setRaceData({ ...raceData, race_name: e.target.value })} />
        <input placeholder="Track" className="input" value={raceData.track} onChange={(e) => setRaceData({ ...raceData, track: e.target.value })} />
        <input type="date" className="input" value={raceData.date} onChange={(e) => setRaceData({ ...raceData, date: e.target.value })} />
        <input placeholder="Weather" className="input" value={raceData.weather} onChange={(e) => setRaceData({ ...raceData, weather: e.target.value })} />
      </div>

      {/* Corner Input */}
      <div className="grid gap-4 mb-4">
        <select className="input" value={currentCorner.speedType} onChange={(e) => setCurrentCorner({ ...currentCorner, speedType: e.target.value })}>
          <option value="HighSpeed">High Speed</option>
          <option value="MediumSpeed">Medium Speed</option>
          <option value="LowSpeed">Low Speed</option>
        </select>
        <input placeholder="Corner Name" className="input" value={currentCorner.corner_name} onChange={(e) => setCurrentCorner({ ...currentCorner, corner_name: e.target.value })} />
        <input type="number" placeholder="Speed (kph)" className="input" value={currentCorner.speed_kph} onChange={(e) => setCurrentCorner({ ...currentCorner, speed_kph: e.target.value })} />
        <button onClick={handleAddCorner} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Add Corner</button>
      </div>

      {/* Preview Corners */}
      <div className="mb-6">
        {['HighSpeed', 'MediumSpeed', 'LowSpeed'].map((type) => (
          <div key={type} className="mb-3">
            <h4 className="font-semibold">{type} Corners:</h4>
            <ul className="list-disc ml-6 text-sm text-gray-700">
              {corners[type].map((c, i) => (
                <li key={i}>{c.corner_name} – {c.speed_kph} km/h</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Submit */}
      <button onClick={handleSubmit} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
        Save Race and Corners
      </button>

      {/* Message */}
      {message && <div className="mt-4 text-sm text-blue-700">{message}</div>}
    </div>
  )
}
