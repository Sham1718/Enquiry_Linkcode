import { avatarColor, initials, cn } from "../../../utils/cn";

export function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  return (
    <div
      className={cn("inline-flex items-center justify-center rounded-full font-semibold text-white shadow-sm ring-2 ring-white bg-gradient-to-br", avatarColor(name))}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  );
}
