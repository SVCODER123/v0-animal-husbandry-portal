import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-[#3ca63c] text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-3">Animal Husbandry Portal</h1>
          <p className="text-green-50">Empowering farmers with livestock resources and knowledge</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <Link href="#" className="text-[#3ca63c] font-semibold hover:underline">
                Home
              </Link>
              <Link href="/schemes" className="text-[#3ca63c] font-semibold hover:underline">
                Schemes
              </Link>
              <Link href="/livestock-market" className="text-[#3ca63c] font-semibold hover:underline">
                Market Prices
              </Link>
              <Link href="/veterinary" className="text-[#3ca63c] font-semibold hover:underline">
                Veterinary
              </Link>
              <Link href="/training" className="text-[#3ca63c] font-semibold hover:underline">
                Training
              </Link>
            </div>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700">Welcome, {user.email}</span>
                <Link href="/auth/logout" className="bg-[#3ca63c] text-white px-4 py-2 rounded hover:bg-[#2e8b2e]">
                  Logout
                </Link>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link href="/auth/login" className="bg-[#3ca63c] text-white px-4 py-2 rounded hover:bg-[#2e8b2e]">
                  Login
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="border border-[#3ca63c] text-[#3ca63c] px-4 py-2 rounded hover:bg-[#e2f4e1]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#a7d7a7] to-[#3ca63c] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Comprehensive Support for Modern Farming</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Access government schemes, track livestock market prices, find veterinary services, and learn modern farming
            techniques - all in one platform.
          </p>
          <Link
            href="/schemes"
            className="inline-block bg-white text-[#3ca63c] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Explore Services
          </Link>
        </div>
      </section>

      {/* Features Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Government Schemes Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:scale-105 transition">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-[#3ca63c] mb-3">Government Schemes</h3>
            <p className="text-gray-600 mb-4">
              Find central and state-level animal husbandry schemes, subsidies, and farmer benefits.
            </p>
            <Link href="/schemes" className="text-[#3ca63c] font-semibold hover:underline">
              View Schemes →
            </Link>
          </div>

          {/* Livestock Market Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:scale-105 transition">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-[#3ca63c] mb-3">Livestock Market</h3>
            <p className="text-gray-600 mb-4">
              Real-time pricing for cows, goats, poultry, and other livestock across districts.
            </p>
            <Link href="/livestock-market" className="text-[#3ca63c] font-semibold hover:underline">
              Check Prices →
            </Link>
          </div>

          {/* Veterinary Services Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:scale-105 transition">
            <div className="text-4xl mb-4">⚕️</div>
            <h3 className="text-xl font-bold text-[#3ca63c] mb-3">Veterinary Services</h3>
            <p className="text-gray-600 mb-4">
              Locate nearby vets, access health tips, and consult professionals online.
            </p>
            <Link href="/veterinary" className="text-[#3ca63c] font-semibold hover:underline">
              Find Vets →
            </Link>
          </div>

          {/* Training & Resources Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:scale-105 transition">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-bold text-[#3ca63c] mb-3">Training & Workshops</h3>
            <p className="text-gray-600 mb-4">
              Learn modern farming techniques, AI-based management, and best practices.
            </p>
            <Link href="/training" className="text-[#3ca63c] font-semibold hover:underline">
              Explore Training →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3ca63c] text-white mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="mb-2">&copy; 2025 Animal Husbandry Portal | Designed with commitment to farmers</p>
            <p className="text-green-50">
              <Link href="#" className="hover:underline">
                Contact Us
              </Link>{" "}
              |
              <Link href="#" className="hover:underline ml-2">
                Privacy Policy
              </Link>{" "}
              |
              <Link href="#" className="hover:underline ml-2">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
