"use client"

import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"

interface Workshop {
  id: string
  title: string
  description: string
  workshop_type: string
  trainer_name: string
  location_district: string
  start_date: string
  end_date: string
  max_participants: number
  enrolled_count: number
  duration_hours: number
  fee: number
  topics: string
}

export default function TrainingPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [filteredWorkshops, setFilteredWorkshops] = useState<Workshop[]>([])
  const [selectedDistrict, setSelectedDistrict] = useState<string>("")
  const [selectedType, setSelectedType] = useState<string>("")
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      const { data } = await supabase.from("training_workshops").select("*").order("start_date", { ascending: true })

      if (data) {
        setWorkshops(data as Workshop[])
        setFilteredWorkshops(data as Workshop[])
      }
      setIsLoading(false)
    }

    fetchData()
  }, [])

  useEffect(() => {
    let filtered = workshops

    if (selectedDistrict) {
      filtered = filtered.filter((w) => w.location_district === selectedDistrict)
    }

    if (selectedType) {
      filtered = filtered.filter((w) => w.workshop_type === selectedType)
    }

    setFilteredWorkshops(filtered)
  }, [selectedDistrict, selectedType, workshops])

  const handleEnroll = async (workshopId: string) => {
    if (!user) {
      redirect("/auth/login")
      return
    }

    const supabase = createClient()
    const { error } = await supabase
      .from("workshop_enrollments")
      .insert([{ user_id: user.id, workshop_id: workshopId }])

    if (!error) {
      alert("Successfully enrolled in the workshop!")
    } else {
      alert("Already enrolled or error occurred")
    }
  }

  const districts = Array.from(new Set(workshops.map((w) => w.location_district)))
  const types = Array.from(new Set(workshops.map((w) => w.workshop_type)))

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-[#3ca63c] text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/" className="hover:text-green-100">
              ← Back to Home
            </Link>
          </div>
          <h1 className="text-4xl font-bold">Training & Workshops</h1>
          <p className="text-green-50">Learn modern animal husbandry techniques and best practices</p>
        </div>
      </header>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Workshop Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3ca63c]"
              >
                <option value="">All Types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3ca63c]"
              >
                <option value="">All Districts</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Workshops Grid */}
      <section className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="text-center py-16">
            <p className="text-gray-600">Loading workshops...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkshops.map((workshop) => (
              <div key={workshop.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-lg font-bold text-[#3ca63c] flex-1">{workshop.title}</h2>
                  <span className="bg-[#e2f4e1] text-[#3ca63c] text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ml-2">
                    {workshop.workshop_type}
                  </span>
                </div>

                <p className="text-gray-600 mb-3 text-sm">{workshop.description}</p>

                <div className="space-y-2 text-sm mb-4">
                  <div>
                    <span className="font-semibold text-gray-700">Trainer:</span>
                    <p className="text-gray-600">{workshop.trainer_name}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Location:</span>
                    <p className="text-gray-600">{workshop.location_district}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Duration:</span>
                    <p className="text-gray-600">{workshop.duration_hours} hours</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Fee:</span>
                    <p className="text-gray-600">₹{workshop.fee}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Participants:</span>
                    <p className="text-gray-600">
                      {workshop.enrolled_count}/{workshop.max_participants}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Topics:</span>
                    <p className="text-gray-600">{workshop.topics}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleEnroll(workshop.id)}
                  className="w-full bg-[#3ca63c] text-white py-2 rounded-lg font-semibold hover:bg-[#2e8b2e] transition disabled:opacity-50"
                  disabled={workshop.enrolled_count >= workshop.max_participants}
                >
                  {workshop.enrolled_count >= workshop.max_participants ? "Workshop Full" : "Enroll Now"}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-[#3ca63c] text-white mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Animal Husbandry Portal</p>
        </div>
      </footer>
    </main>
  )
}
