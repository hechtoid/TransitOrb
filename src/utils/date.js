export function niceDate(zulu) {
    return new Date(
        Date.parse(zulu))
            .toLocaleTimeString(
                [],{ 
                    hour: 'numeric', 
                    minute: 'numeric' 
                })
}

export function countDown(zulu) {
    return Math.floor(((new Date(Date.parse(zulu))-new Date()))/60000)
}