'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { deleteLead, updateLeadStatus } from '../actions'
import { Trash2, CheckCircle2 } from 'lucide-react'

export function LeadActionsClient({ id, currentStatus }: { id: string, currentStatus: string }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this lead? This action cannot be undone.')) return
    
    setIsDeleting(true)
    try {
      const res = await deleteLead(id)
      if (res.success) {
        toast.success("Lead deleted successfully")
        router.push('/admin/leads')
      } else {
        toast.error("Failed to delete", { description: res.error })
      }
    } catch (err: any) {
      toast.error("Error", { description: err.message })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleMarkContacted = async () => {
    setIsUpdating(true)
    try {
      const res = await updateLeadStatus(id, 'Contacted')
      if (res.success) {
        toast.success("Lead marked as Contacted")
        router.refresh()
      } else {
        toast.error("Failed to update status", { description: res.error })
      }
    } catch (err: any) {
      toast.error("Error", { description: err.message })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="flex items-center gap-4">
      {currentStatus === 'New' && (
        <Button onClick={handleMarkContacted} disabled={isUpdating} className="gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {isUpdating ? 'Updating...' : 'Mark as Contacted'}
        </Button>
      )}
      
      <Button variant="destructive" onClick={handleDelete} disabled={isDeleting} className="gap-2 ml-auto">
        <Trash2 className="w-4 h-4" />
        {isDeleting ? 'Deleting...' : 'Delete Lead'}
      </Button>
    </div>
  )
}
