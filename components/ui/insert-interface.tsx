// components/AdminDashboard.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// Move Supabase client creation to a separate file or use environment variables properly
// For now, you'll need to replace these with your actual values or import from a config file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Define interfaces for better type safety
interface Corner {
  id: string; // Required ID field
  corner_name: string;
  speed_kph: number;
  track: string;
  session_id: string;
}

interface RaceData {
  id: string;
  race_name: string;
  track: string;
  date: string;
  weather: string;
}

type SpeedType = 'HighSpeed' | 'MediumSpeed' | 'LowSpeed';

interface CornersState {
  HighSpeed: Corner[];
  MediumSpeed: Corner[];
  LowSpeed: Corner[];
}

interface CurrentCorner {
  speedType: SpeedType;
  corner_name: string;
  speed_kph: string;
}

export default function AdminDashboard() {
  const [raceData, setRaceData] = useState<RaceData>({
    id: '',
    race_name: '',
    track: '',
    date: '',
    weather: '',
  })

  const [corners, setCorners] = useState<CornersState>({
    HighSpeed: [],
    MediumSpeed: [],
    LowSpeed: []
  })

  const [currentCorner, setCurrentCorner] = useState<CurrentCorner>({
    speedType: 'HighSpeed',
    corner_name: '',
    speed_kph: '',
  })

  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddCorner = () => {
    // Clear any previous messages
    setMessage(null)

    // Validation
    if (!currentCorner.corner_name.trim()) {
      setMessage("Please enter a corner name.")
      return
    }

    if (!currentCorner.speed_kph.trim()) {
      setMessage("Please enter a speed.")
      return
    }

    // Validate and parse speed
    const speed = parseFloat(currentCorner.speed_kph.trim())
    if (isNaN(speed) || speed <= 0) {
      setMessage("Speed must be a valid positive number.")
      return
    }

    // Validate that race data has required fields for corner creation
    if (!raceData.id.trim() || !raceData.track.trim()) {
      setMessage("Please fill in Session ID and Track before adding corners.")
      return
    }

    // Create new corner object with generated ID
    const newCorner: Corner = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Generate unique ID
      corner_name: currentCorner.corner_name.trim(),
      speed_kph: speed,
      track: raceData.track.trim(),
      session_id: raceData.id.trim()
    }

    // Add corner to the appropriate speed category
    setCorners(prev => ({
      ...prev,
      [currentCorner.speedType]: [...prev[currentCorner.speedType], newCorner]
    }))

    // Clear the current corner input fields
    setCurrentCorner(prev => ({ 
      ...prev, 
      corner_name: '', 
      speed_kph: '' 
    }))

    setMessage(`Corner "${newCorner.corner_name}" added successfully!`)
  }

  const handleRemoveCorner = (speedType: SpeedType, index: number) => {
    setCorners(prev => ({
      ...prev,
      [speedType]: prev[speedType].filter((_, i) => i !== index)
    }))
    setMessage("Corner removed.")
  }

  const validateRaceData = (data: RaceData): string | null => {
    const { id, race_name, track, date, weather } = data
    
    if (!id.trim()) return "Session ID is required."
    if (!race_name.trim()) return "Race name is required."
    if (!track.trim()) return "Track is required."
    if (!date.trim()) return "Date is required."
    if (!weather.trim()) return "Weather is required."
    
    return null
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setMessage('Saving...')

    try {
      // Validate race data
      const validationError = validateRaceData(raceData)
      if (validationError) {
        setMessage(validationError)
        return
      }

      // Prepare race data with trimmed values
      const cleanRaceData = {
        id: raceData.id.trim(),
        race_name: raceData.race_name.trim(),
        track: raceData.track.trim(),
        date: raceData.date.trim(),
        weather: raceData.weather.trim()
      }

      // Insert race data
      const { error: raceError } = await supabase
        .from('races')
        .insert([cleanRaceData])

      if (raceError) {
        setMessage(`Error saving race: ${raceError.message}`)
        return
      }

      // Insert corners for each type using lowercase table names
      const cornerTypes: SpeedType[] = ['HighSpeed', 'MediumSpeed', 'LowSpeed']
      const tableNames = ['highspeed', 'mediumspeed', 'lowspeed']
      
      for (let i = 0; i < cornerTypes.length; i++) {
        const type = cornerTypes[i]
        const tableName = tableNames[i]
        
        if (corners[type].length > 0) {
          console.log(`Attempting to save ${type} corners to table ${tableName}:`, corners[type])
          
          try {
            const { data, error: cornerError } = await supabase
              .from(tableName)
              .insert(corners[type])
              .select() // Get the inserted data back
            
            if (cornerError) {
              console.error(`Supabase error saving ${type} corners:`, {
                message: cornerError.message,
                details: cornerError.details,
                hint: cornerError.hint,
                code: cornerError.code
              })
              
              // More specific error messages
              if (cornerError.code === '23502') {
                setMessage(`Error: Missing required field in ${type} corners. Check database schema.`)
              } else if (cornerError.code === '42P01') {
                setMessage(`Error: Table '${tableName}' does not exist.`)
              } else if (cornerError.code === '23503') {
                setMessage(`Error: Foreign key constraint violation in ${type} corners.`)
              } else {
                setMessage(`Error saving ${type} corners: ${cornerError.message || JSON.stringify(cornerError)}`)
              }
              return
            }
            
            if (data) {
              console.log(`Successfully saved ${data.length} ${type} corners to ${tableName}:`, data)
            } else {
              console.log(`Insert successful but no data returned for ${type}`)
            }
            
          } catch (unexpectedError) {
            console.error(`Unexpected error saving ${type} corners:`, unexpectedError)
            setMessage(`Unexpected error saving ${type} corners: ${unexpectedError}`)
            return
          }
        }
      }

      // Success - reset all states
      setMessage('Race and corners saved successfully! 🎉')
      setRaceData({ id: '', race_name: '', track: '', date: '', weather: '' })
      setCorners({ HighSpeed: [], MediumSpeed: [], LowSpeed: [] })
      setCurrentCorner({ speedType: 'HighSpeed', corner_name: '', speed_kph: '' })

    } catch (error) {
      console.error('Unexpected error:', error)
      setMessage('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getTotalCorners = () => {
    return corners.HighSpeed.length + corners.MediumSpeed.length + corners.LowSpeed.length
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Admin – Add Race & Corners</h2>

      {/* Race Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Race Information</h3>
        <div className="grid gap-4">
          <input 
            placeholder="Session ID" 
            className="input p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={raceData.id} 
            onChange={(e) => setRaceData({ ...raceData, id: e.target.value })}
            disabled={isLoading}
          />
          <input 
            placeholder="Race Name" 
            className="input p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={raceData.race_name} 
            onChange={(e) => setRaceData({ ...raceData, race_name: e.target.value })}
            disabled={isLoading}
          />
          <input 
            placeholder="Track" 
            className="input p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={raceData.track} 
            onChange={(e) => setRaceData({ ...raceData, track: e.target.value })}
            disabled={isLoading}
          />
          <input 
            type="date" 
            className="input p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={raceData.date} 
            onChange={(e) => setRaceData({ ...raceData, date: e.target.value })}
            disabled={isLoading}
          />
          <input 
            placeholder="Weather" 
            className="input p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={raceData.weather} 
            onChange={(e) => setRaceData({ ...raceData, weather: e.target.value })}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Corner Input */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Add Corner</h3>
        <div className="grid gap-4">
          <select 
            className="input p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={currentCorner.speedType} 
            onChange={(e) => setCurrentCorner({ ...currentCorner, speedType: e.target.value as SpeedType })}
            disabled={isLoading}
          >
            <option value="HighSpeed">High Speed</option>
            <option value="MediumSpeed">Medium Speed</option>
            <option value="LowSpeed">Low Speed</option>
          </select>
          <input 
            placeholder="Corner Name" 
            className="input p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={currentCorner.corner_name} 
            onChange={(e) => setCurrentCorner({ ...currentCorner, corner_name: e.target.value })}
            disabled={isLoading}
          />
          <input 
            type="number" 
            placeholder="Speed (kph)" 
            className="input p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value={currentCorner.speed_kph} 
            onChange={(e) => setCurrentCorner({ ...currentCorner, speed_kph: e.target.value })}
            disabled={isLoading}
            min="0"
            step="0.1"
          />
          <button 
            onClick={handleAddCorner} 
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={isLoading}
          >
            Add Corner
          </button>
        </div>
      </div>

      {/* Preview Corners */}
      {getTotalCorners() > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">
            Corners Preview ({getTotalCorners()} total)
          </h3>
          {(['HighSpeed', 'MediumSpeed', 'LowSpeed'] as SpeedType[]).map((type) => (
            <div key={type} className="mb-4">
              <h4 className="font-semibold text-gray-800">
                {type.replace(/([A-Z])/g, ' $1').trim()} Corners ({corners[type].length}):
              </h4>
              {corners[type].length > 0 ? (
                <ul className="list-none ml-4">
                  {corners[type].map((corner, i) => (
                    <li key={i} className="flex justify-between items-center py-1 text-sm text-gray-700 border-b border-gray-100">
                      <span>{corner.corner_name} – {corner.speed_kph} km/h</span>
                      <button
                        onClick={() => handleRemoveCorner(type, i)}
                        className="text-red-600 hover:text-red-800 text-xs px-2 py-1 rounded hover:bg-red-50 transition-colors"
                        disabled={isLoading}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm ml-4">No corners added</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Submit */}
      <button 
        onClick={handleSubmit} 
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full"
        disabled={isLoading || getTotalCorners() === 0}
      >
        {isLoading ? 'Saving...' : 'Save Race and Corners'}
      </button>

      {/* Message */}
      {message && (
        <div className={`mt-4 p-3 rounded text-sm ${
          message.includes('Error') || message.includes('required') || message.includes('must be') 
            ? 'text-red-700 bg-red-50 border border-red-200' 
            : message.includes('successfully') 
            ? 'text-green-700 bg-green-50 border border-green-200'
            : 'text-blue-700 bg-blue-50 border border-blue-200'
        }`}>
          {message}
        </div>
      )}
    </div>
  )
}