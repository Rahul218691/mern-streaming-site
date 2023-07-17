export const randomNumber = () => {
    return Math.floor(100000 + Math.random() * 900000)
}

export const dateFormat = (date) => {
    if (!date) return '-'
    const newDate = new Date(date)
    const formatted = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit"
    }).format(newDate)
    return formatted
}