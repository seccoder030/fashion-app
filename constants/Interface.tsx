interface IPost {
    id: string;
    uri: string;
    user_id: string;
    type: boolean;
    title: string;
    content: string;
    user: IUser;
    likes?: number;
    comments?: number;
    favorited_users?: string;
    favorites?: number;
    views?: number;
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
    location?: string;
    content?: string;
    school?: string;
    profile_link?: string;
    is_public?: boolean;
    uuid?: string;
    categories?: string[];
    phone?: string
    last_seen_at?: string;
    created_at?: string;
    updated_at?: string;
}

interface IComment {
    id: number;
    sender_id: number;
    receiver_id: number;
    post_id: number;
    comment_text: string;
    sender_friends_count: number;
    received_comments_count: number;
    sender: IUser;
    receiver: IUser;
    post: IPost;
    created_at?: string;
    updated_at?: string;
}

interface ICommentNode extends IComment {
    replies: IComment[];
}

interface IFriend {
    id: string;
    user_id: string;
    frined_id: string;
    user1: IUser;
    created_at?: string;
    updated_at?: string;
}

interface IPendingFriend {
    event_type: string;
    message: string;
    notify_id: string;
    receiver_id: string;
    sender_avatar: string;
    sender_id: string;
    sender_name: string;
    updated_at: string;
}

interface IMessage {
    id: string | null;
    sender_id: string;
    receiver_id: string;
    message: string;
    sender?: IUser;
    receiver?: IUser;
    reply_id?: string | null;
    seen_at?: string | null;
    message_deleted_at?: string | null;
    created_at?: string;
    updated_at?: string;
}