import Link from "next/link";
import Icon from "./Icon";

const navItems = [
  { label: "Home", href: "/", icon: "home", filled: true },
  { label: "Services", href: "/#services", icon: "build" },
  { label: "Orders", href: "/dashboard", icon: "receipt_long" },
  { label: "Profile", href: "/dashboard", icon: "person" },
];

export default function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 z-50 flex h-16 w-full items-center justify-around border-t border-border-subtle bg-surface pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:hidden">
      {navItems.map((item, idx) => {
        const isActive = idx === 0;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center justify-center rounded-2xl px-4 py-1 transition-transform active:scale-90 ${
              isActive
                ? "bg-secondary-container text-on-secondary-container"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <Icon name={item.icon} filled={item.filled} size={20} />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
