export interface Chirp {
    id: number;
    userid : User["id"];
    content: string;
    location: string;
    created_at: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: string;
}