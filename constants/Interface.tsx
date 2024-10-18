interface IPost {
    id: string;
    comments: number;
    content: string;
    created_at: string;
    user_id: number;
    type: boolean;
    title: string;
    likes: number;
    uri: string;
    user: IUser;
    favorited_users: string;
    favorites: number;
    published_at: string;
    updated_at: string;
    views: number
}

interface ICategory {
    id: string;
    name: string;
}

interface IUser {
    id: string;
    username: string;
    avatar: string;
    birthday: string;
    email: string;
    email_verified_at: string;
    last_seen_at: string;
    location: string;
    name: string;
    phone: string
    created_at: string;
    updated_at: string;
    uuid: string;
    categories: string[];
}

interface IWithMedia {
    type: string;
    uri: string;
}

interface IMessage {
    id: string;
    userid: string;
    date: string;
    receive: boolean;
    text: string;
    replyMessage?: IMessage;
    medias?: IWithMedia[];
}