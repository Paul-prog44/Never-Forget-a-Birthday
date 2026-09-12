export interface FriendCreate {
    firstname: string
    lastname: string
    email: string
    date_of_birth: string
}

export interface FriendResponse {
    id: number
    firstname: string
    lastname: string
    email: string
    date_of_birth: string
    created_at: string
    user_id: number
}