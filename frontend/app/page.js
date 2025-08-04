'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function CustomerList() {
  const [customers, setCustomers] = useState([])
  const [filteredCustomers, setFilteredCustomers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get('http://localhost:4000/customers')
        // Assuming API returns { success: true, data: [...] }
        setCustomers(res.data.data)
        setFilteredCustomers(res.data.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch customers')
        setLoading(false)
      }
    }
    fetchCustomers()
  }, [])

  useEffect(() => {
    const filtered = customers.filter((c) => {
      const fullText = `${c.first_name} ${c.last_name} ${c.email}`.toLowerCase()
      return fullText.includes(searchTerm.toLowerCase())
    })
    setFilteredCustomers(filtered)
  }, [searchTerm, customers])

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
      )}
    </div>
  )
}
