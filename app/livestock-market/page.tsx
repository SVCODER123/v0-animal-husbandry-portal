"use client"

import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import Link from "next/link"

interface Price {
  id: string
  livestock_type: string
  breed: string
  price_per_unit: number
  unit_type: string
  location_district: string
  market_name: string
  trend: string
}

export default function LivestockMarketPage() {
  const [prices, setPrices] = useState<Price[]>([])
  const [filteredPrices, setFilteredPrices] = useState<Price[]>([])
  const [selectedType, setSelectedType] = useState<string>("")
  const [selectedDistrict, setSelectedDistrict] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPrices = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("livestock_prices").select("*").order("date", { ascending: false })

      if (data) {
        setPrices(data as Price[])
        setFilteredPrices(data as Price[])
      }
      setIsLoading(false)
    }

    fetchPrices()
  }, [])

  useEffect(() => {
    let filtered = prices

    if (selectedType) {
      filtered = filtered.filter((p) => p.livestock_type === selectedType)
    }

    if (selectedDistrict) {
      filtered = filtered.filter((p) => p.location_district === selectedDistrict)
    }

    setFilteredPrices(filtered)
  }, [selectedType, selectedDistrict, prices])

  const livestockTypes = Array.from(new Set(prices.map((p) => p.livestock_type)))
  const districts = Array.from(new Set(prices.map((p) => p.location_district)))

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
          <h1 className="text-4xl font-bold">Livestock Market Prices</h1>
          <p className="text-green-50">Real-time pricing across Maharashtra</p>
        </div>
      </header>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Livestock Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#3ca63c]"
              >
                <option value="">All Types</option>
                {livestockTypes.map((type) => (
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

      {/* Prices Table */}
      <section className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="text-center py-16">
            <p className="text-gray-600">Loading prices...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-[#3ca63c] text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Livestock</th>
                  <th className="px-6 py-3 text-left">Breed</th>
                  <th className="px-6 py-3 text-left">Price</th>
                  <th className="px-6 py-3 text-left">District</th>
                  <th className="px-6 py-3 text-left">Market</th>
                  <th className="px-6 py-3 text-left">Trend</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrices.map((price) => (
                  <tr key={price.id} className="border-b border-gray-200 hover:bg-[#e2f4e1] transition">
                    <td className="px-6 py-4 font-semibold text-[#3ca63c]">{price.livestock_type}</td>
                    <td className="px-6 py-4">{price.breed}</td>
                    <td className="px-6 py-4 font-bold">
                      ₹{price.price_per_unit} {price.unit_type}
                    </td>
                    <td className="px-6 py-4">{price.location_district}</td>
                    <td className="px-6 py-4">{price.market_name}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          price.trend === "increasing"
                            ? "bg-green-100 text-green-800"
                            : price.trend === "decreasing"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {price.trend}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
