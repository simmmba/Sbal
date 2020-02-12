export type Study = {
    id: number,
    title: string,
    leader: {
        id: number,
        nickname: string,
    },
    city: string,
    town: string,
    state: number,
    maxParticipants: number,
    hits: number,
    isOnline: boolean,
    enrollDate: string,
    joinedMemberCount: number,
    lcategory: string,
    scategory: string
}