'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <AdminSidebar>
        {children}
      </AdminSidebar>
    </ProtectedRoute>
  );
}