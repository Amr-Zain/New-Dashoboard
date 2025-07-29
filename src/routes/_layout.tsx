import AppError from '@/components/generalComponents/ErrorHandle'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
    component: RouteComponent,
  errorComponent: AppError,
})

function RouteComponent() {
  return <><Outlet /></>
}
