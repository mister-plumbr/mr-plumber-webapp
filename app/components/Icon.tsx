interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
  size?: number;
}

export default function Icon({ name, className = "", filled = false, size = 24 }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${filled ? "filled" : ""} ${className}`}
      style={{ fontSize: size, lineHeight: 1 }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
