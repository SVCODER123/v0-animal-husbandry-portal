"use client"

import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import Link from "next/link"

interface VeterinaryService {
  id: string
  clinic_name: string
  veterinarian_name: string
  specialization: string
  location_address: string
  location_district: string
  phone_number: string
  email: string
  services: string
  availability_days: string
  availability_hours: string
}

export default function VeterinaryPage() {
  const [services, setServices] = useState<VeterinaryService[]>([])
  const [filteredServices, setFilteredServices] = useState<VeterinaryService[]>([])
  const [selectedDistrict, setSelectedDistrict] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("veterinary_services").select("*").order("clinic_name")

      if (data) {
        setServices(data as VeterinaryService[])
        setFilteredServices(data as VeterinaryService[])
      }
      setIsLoading(false)
    }

    fetchServices()
  }, [])

  useEffect(() => {
    let filtered = services

    if (selectedDistrict) {
      filtered = filtered.filter((s) => s.location_district === selectedDistrict)
    }

    setFilteredServices(filtered)
  }, [selectedDistrict, services])

  const districts = Array.from(new Set(services.map((s) => s.location_district)))

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
          <h1 className="text-4xl font-bold">Veterinary Services</h1>
          <p className="text-green-50">Find veterinary clinics and services near you across Maharashtra</p>
        </div>
      </header>

      {/* District Filter */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by District</label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3ca63c]"
          >
            <option value="">All Districts</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="text-center py-16">
            <p className="text-gray-600">Loading services...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <h2 className="text-xl font-bold text-[#3ca63c] mb-2">{service.clinic_name}</h2>
                <p className="text-gray-600 font-semibold mb-4">{service.veterinarian_name}</p>

                {service.specialization && (
                  <div className="mb-3">
                    <span className="inline-block bg-[#e2f4e1] text-[#3ca63c] text-xs font-semibold px-3 py-1 rounded-full">
                      {service.specialization}
                    </span>
                  </div>
                )}

                <div className="space-y-2 text-sm mb-4">
                  <div>
                    <span className="font-semibold text-gray-700">Location:</span>
                    <p className="text-gray-600">{service.location_address}</p>
                    <p className="text-gray-600">{service.location_district}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Phone:</span>
                    <p className="text-gray-600">{service.phone_number}</p>
                  </div>
                  {service.email && (
                    <div>
                      <span className="font-semibold text-gray-700">Email:</span>
                      <p className="text-gray-600">{service.email}</p>
                    </div>
                  )}
                  <div>
                    <span className="font-semibold text-gray-700">Services:</span>
                    <p className="text-gray-600">{service.services}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Hours:</span>
                    <p className="text-gray-600">{service.availability_hours}</p>
                  </div>
                </div>

                <a
                  href={`tel:${service.phone_number}`}
                  className="block w-full text-center bg-[#3ca63c] text-white py-2 rounded-lg font-semibold hover:bg-[#2e8b2e] transition"
                >
                  Call Now
                </a>
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
