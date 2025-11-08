export function toggleSelection(selectedSet: Set<string>, id: string): Set<string> {
    const newSet = new Set(selectedSet);
    if (newSet.has(id)) {
        newSet.delete(id);
    } else {
        newSet.add(id);
    }
    return newSet;
}
