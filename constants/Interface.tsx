interface IPost {
    id: string;
    comments: number;
    content: string;
    uri: string;
    user: IUser;
    user_id: string;
    type: boolean;
    title: string;
    likes?: number;
    favorited_users?: string;
    favorites?: number;
    views?: number
    published_at?: string;
    updated_at?: string;
    created_at?: string;
}

interface ICategory {
    id: string;
    name: string;
}

interface IUser {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    birthday?: string;
    email?: string;
    email_verified_at?: string;
    location: string;
    uuid?: string;
    categories?: string[];
    phone?: string
    last_seen_at?: string;
    created_at?: string;
    updated_at?: string;
}

interface IWithMedia {
    type: string;
    uri: string;
}

interface IMessage {
    id: string | null;
    userid?: string;
    date: string;
    receive?: boolean;
    text?: string;
    replyMessage?: IMessage;
    medias?: IWithMedia[];
}

interface IComment {
    id: string;
    name: string;
    uri: string;
    date: string;
    comments: number;
    likes: number;
    star: number;
    post: string;
    replyTo?: string;
}