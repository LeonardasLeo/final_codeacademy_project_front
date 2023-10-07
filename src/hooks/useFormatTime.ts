
const formatTime = (timestamp: Date): string => {
        const date: Date = new Date(timestamp)
        return`${date.getFullYear()}.${date.getMonth()}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}h`
}

export default formatTime