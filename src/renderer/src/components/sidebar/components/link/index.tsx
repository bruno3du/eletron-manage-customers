import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

interface LinkProps {
  to: string
  children: React.ReactNode
}

export const LinkContent = ({ children, to }: LinkProps) => {
  return (
    <NavLink
      className={({ isActive }) => {
        return clsx('flex items-center text-sm gap-2 py-2 px-3 rounded group', {
          'bg-gray-50 font-semibold text-black': isActive,
          'text-gray-300': !isActive
        })
      }}
      to={to}
    >
      <span className="truncate">{children}</span>
    </NavLink>
  )
}
