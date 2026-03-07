// DASHBOARD ONLY - safe to merge
'use client'

import { Sidebar } from '@/components/layout/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex bg-[#F1F5F9] font-['Inter',sans-serif] min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col w-full h-full overflow-y-auto">{children}</main>
    </div>
  )
}

