export const isDateInPast = (dateString: Date): boolean =>{
    const now = new Date
    const futureDate = new Date(dateString)
    return now < futureDate
}
export const isDateInFuture = (dateString: Date): boolean =>{
    const now = new Date
    const futureDate = new Date(dateString)
    return now < futureDate
}