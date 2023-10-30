export interface Credit {
    id: number,
    user: string,
    issuance_date: Date,
    return_date: Date,
    actual_return_date: Date,
    body: number,
    percent: number
}
