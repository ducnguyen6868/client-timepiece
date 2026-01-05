import { Link } from 'react-router-dom';

export default function SidebarLink({ item, isActive, collapsed }) {
  return (
    <Link
      to={item.key}
      className={`
        group flex items-center gap-3 px-4 py-2 rounded-xl
        transition-all duration-200
        ${isActive
          ? 'bg-teal-100 text-brand font-semibold shadow-sm'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
      `}
    >
      <item.icon className="w-6 h-6 shrink-0" />

      <span
        className={`
          whitespace-nowrap overflow-hidden
          transition-all duration-200
          ${collapsed
            ? 'opacity-0 w-0'
            : 'opacity-100 w-full'}
        `}
      >
        {item.name}
      </span>
    </Link>
  );
}
