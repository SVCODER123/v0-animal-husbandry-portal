import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

export default async function SchemesPage() {
  const supabase = await createClient()
  const { data: schemes } = await supabase
    .from("government_schemes")
    .select("*")
    .order("created_at", { ascending: false })

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
          <h1 className="text-4xl font-bold">Government Schemes</h1>
          <p className="text-green-50">Central and state-level animal husbandry schemes and subsidies</p>
        </div>
      </header>

      {/* Schemes Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes?.map((scheme) => (
            <div key={scheme.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-bold text-[#3ca63c] flex-1">{scheme.title}</h2>
                <span className="bg-[#e2f4e1] text-[#3ca63c] text-xs font-semibold px-3 py-1 rounded-full">
                  {scheme.scheme_type}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{scheme.description}</p>

              <div className="space-y-2 mb-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Eligibility:</span>
                  <p className="text-gray-600">{scheme.eligibility}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Benefits:</span>
                  <p className="text-gray-600">{scheme.benefits}</p>
                </div>
                {scheme.subsidy_percentage && (
                  <div>
                    <span className="font-semibold text-gray-700">Subsidy:</span>
                    <p className="text-gray-600">{scheme.subsidy_percentage}%</p>
                  </div>
                )}
              </div>

              {scheme.application_link && (
                <a
                  href={scheme.application_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center bg-[#3ca63c] text-white py-2 rounded-lg font-semibold hover:bg-[#2e8b2e] transition"
                >
                  Apply Now
                </a>
              )}
            </div>
          ))}
        </div>
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
