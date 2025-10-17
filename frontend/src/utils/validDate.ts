export const isDateInPast = (dateString: Date): boolean =>{
    
    const now = new Date
    const futureDate = new Date(dateString)
    console.log("inside date string ",now < futureDate)
    return now < futureDate
}
const isDateInFuture = ()=>{}