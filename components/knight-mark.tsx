export function KnightMark({ label = false }: { label?: boolean }) {
  return <span className="knight-mark" aria-label={label ? "Randall Bassig" : undefined} role={label ? "img" : undefined} />;
}
