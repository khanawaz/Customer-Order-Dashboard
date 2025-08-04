'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function CustomerList() {
  const [customers, setCustomers] = useState([])
  const [filteredCustomers, setFilteredCustomers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [page, setPage] = useState(1)
  const [limit] = useState(10) // Can be made dynamic if needed

  // Fetch customers for the current page
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await axios.get('http://localhost:4000/customers', {
          params: { page, limit }
        })

        if (res.data.success) {
          setCustomers(res.data.data)
          setFilteredCustomers(res.data.data)
        } else {
          setError('Failed to fetch customers')
          setCustomers([])
          setFilteredCustomers([])
        }
      } catch (err) {
        setError('Failed to fetch customers')
        setCustomers([])
        setFilteredCustomers([])
      } finally {
        setLoading(false)
      }
    }
    fetchCustomers()
  }, [page, limit])

  // Filter customers on searchTerm change or when new data arrives
  useEffect(() => {
    const filtered = customers.filter((c) => {
      const fullText = `${c.first_name} ${c.last_name} ${c.email}`.toLowerCase()
      return fullText.includes(searchTerm.toLowerCase())
    })
    setFilteredCustomers(filtered)
  }, [searchTerm, customers])

  // Pagination handlers
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1)
  }

  const handleNextPage = () => {
    // If the current page has less than 'limit' customers, assume no more pages
    if (customers.length === limit) {
      setPage(page + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Customer List</h1>

      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full max-w-md block mx-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm"
      />

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredCustomers.length === 0 ? (
        <p className="text-center text-gray-600">No customers found.</p>
      ) : (
        <>
          <div className="overflow-x-auto max-w-5xl mx-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">Order Count</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{c.first_name} {c.last_name}</td>
                    <td className="px-4 py-2">{c.email}</td>
                    <td className="px-4 py-2">{c.city}</td>
                    <td className="px-4 py-2">{c.country}</td>
                    <td className="px-4 py-2">{c.orderCount ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center items-center space-x-4 mt-6">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`px-4 py-2 rounded ${
                page === 1
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Previous
            </button>

            <span>Page {page}</span>

            <button
              onClick={handleNextPage}
              disabled={customers.length < limit}
              className={`px-4 py-2 rounded ${
                customers.length < limit
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}
