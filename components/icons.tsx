export function Arrow({ diagonal = false }: { diagonal?: boolean }) { return <span aria-hidden="true" className={diagonal ? "arrow diagonal" : "arrow"}>→</span>; }
export function Mark() { return <span aria-hidden="true" className="mark"><i /><i /><i /></span>; }
