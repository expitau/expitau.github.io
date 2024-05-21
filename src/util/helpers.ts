export function formatDate(d, includeDays = false) {
    if (!d) return '';
    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: includeDays ? 'numeric' : undefined,
    })
    return formatter.format(new Date(d))
}
