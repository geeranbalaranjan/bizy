'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Product {
  name: string
  description?: string
  price: number
}

interface AppClipBuilderProps {
  onSubmit: (config: {
    businessName: string
    products: Product[]
    contactInfo: { phone?: string; email?: string; address?: string }
    orderType: 'inquiry' | 'purchase' | 'booking'
  }) => void
}

export function AppClipBuilder({ onSubmit }: AppClipBuilderProps) {
  const [businessName, setBusinessName] = useState('')
  const [products, setProducts] = useState<Product[]>([
    { name: '', description: '', price: 0 },
  ])
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [orderType, setOrderType] = useState<'inquiry' | 'purchase' | 'booking'>(
    'purchase'
  )

  const addProduct = () => {
    setProducts([...products, { name: '', description: '', price: 0 }])
  }

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index))
  }

  const updateProduct = (index: number, field: keyof Product, value: string | number) => {
    setProducts(
      products.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      businessName,
      products: products.filter((p) => p.name.trim()),
      contactInfo: { phone: phone || undefined, email: email || undefined, address: address || undefined },
      orderType,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="businessName"
          className="mb-2 block font-heading text-sm font-medium text-brand-primary"
        >
          Business Name
        </label>
        <input
          id="businessName"
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
          required
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="font-heading text-sm font-medium text-brand-primary">
            Products
          </label>
          <Button type="button" variant="outline" size="sm" onClick={addProduct}>
            <Plus className="mr-1 h-4 w-4" />
            Add
          </Button>
        </div>
        <div className="space-y-3">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex gap-2 rounded-lg border border-gray-200 p-3"
            >
              <input
                type="text"
                placeholder="Product name"
                value={product.name}
                onChange={(e) => updateProduct(index, 'name', e.target.value)}
                className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm"
              />
              <input
                type="number"
                placeholder="Price"
                value={product.price || ''}
                onChange={(e) =>
                  updateProduct(index, 'price', parseFloat(e.target.value) || 0)
                }
                className="w-24 rounded border border-gray-300 px-3 py-2 text-sm"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeProduct(index)}
                disabled={products.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-heading text-sm font-medium text-brand-primary">
          Order Type
        </label>
        <select
          value={orderType}
          onChange={(e) =>
            setOrderType(e.target.value as 'inquiry' | 'purchase' | 'booking')
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        >
          <option value="inquiry">Inquiry</option>
          <option value="purchase">Purchase</option>
          <option value="booking">Booking</option>
        </select>
      </div>

      <Button type="submit" className="w-full">
        Generate App Clip
      </Button>
    </form>
  )
}
