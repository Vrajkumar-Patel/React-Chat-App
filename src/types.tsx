export interface UserType{
    user: firebase.default.User | null
}
export type RoomType = {
    id: String;
    data: firebase.default.firestore.DocumentData
}