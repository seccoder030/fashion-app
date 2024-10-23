import { useStorageState } from '@/hooks/useStorageState';
import Request from '@/utils/request';
import axios from 'axios';
import { router, useSegments } from 'expo-router';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import * as FileSystem from 'expo-file-system';

export interface ISignInProps {
    email: string;
    password: string;
}

export interface ISignUpProps {
    email: string;
    name: string;
    username: string;
    password: string;
}

interface ISignInResponse {
    msg: string;
    token: string;
    user: IUser;
}

interface ISignUpResponse {
    msg: string;
}

interface ISetUserProps {
    name: string;
    username: string;
    birthday?: string;
    phone?: string;
    school?: string;
    content?: string;
    location?: string;
    link?: string;
    avatar?: string;
    profileBg?: string;
}

type AuthContextType = {
    signIn: (props: ISignInProps) => Promise<void>;
    signUp: (props: ISignUpProps) => Promise<void>;
    signOut: () => void;
    updateUserCategories: (categories: string[]) => Promise<boolean>;
    updateUser: () => Promise<void>;
    setUser: (data: ISetUserProps) => Promise<void>;
    updateFriends: (user_id: string) => Promise<boolean>;
    updateFavorites: (post_id: string) => Promise<boolean>;
    token: string | null;
    user: IUser | null;
    friends: Set<string> | null;
    favorites: Set<string> | null;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
    signIn: async () => { },
    signUp: async () => { },
    signOut: () => { },
    updateUserCategories: async () => false,
    updateUser: async () => { },
    setUser: async () => { },
    updateFriends: async () => false,
    updateFavorites: async () => false,
    token: null,
    user: null,
    friends: null,
    favorites: null,
    isLoading: true,
});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props: React.PropsWithChildren) {
    const [[isTokenLoading, token], setToken] = useStorageState('token');
    const [user, setUser] = useState<IUser | null>(null);
    const [friends, setFriends] = useState<Set<string> | null>(null);
    const [favorites, setFavorites] = useState<Set<string> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const segments = useSegments();

    const routeUser = (user: IUser) => {
        if (user.categories && user.categories.length > 0) {
            router.replace("/HomeScreen");
        } else {
            router.replace("/CategoryScreen");
        }
    };

    const updateUser = useCallback(async () => {
        if (!token) {
            ToastAndroid.show('用户未登录', ToastAndroid.SHORT);
            return;
        }

        try {
            Request.setAuthorizationToken(token);
            const res = await Request.Get('/user').
                then(res => res).
                catch(error =>
                    console.log(error)
                );
            console.log(res)
            if (res.status === 'success') {
                var arr: IUser = res.user;
                arr.categories = JSON.parse(res.user.categories);
                setUser(arr);
                const resFriends = await Request.Get('/friends/get');
                const resFavorites = await Request.Get('/profile/posts');
                if (resFriends.status === 'success' && resFavorites.status === 'success') {
                    resFriends.friends.forEach((item: { friend_id: string }) => {
                        setFriends(prevItem => {
                            const newItem = new Set(prevItem);
                            newItem.add(item.friend_id);
                            return newItem;
                        });
                    });
                    resFavorites.favorites.forEach((item: { post_id: string }) => {
                        setFavorites(prevItem => {
                            const newItem = new Set(prevItem);
                            newItem.add(item.post_id);
                            return newItem;
                        });
                    });
                }
                return res.user;
            }
        } catch (error) {
            setToken(null);
            setUser(null);
            console.error('Error getting user:', error);
            ToastAndroid.show('获取用户信息失败', ToastAndroid.SHORT);
            throw error;
        }
    }, [token]);

    const updateUserCategories = async (categories: string[]) => {
        if (categories.length === 0) {
            ToastAndroid.show('请选择一个或多个类别', ToastAndroid.SHORT);
            return false;
        }

        if (!token) {
            ToastAndroid.show('用户未登录', ToastAndroid.SHORT);
            return false;
        }

        try {
            Request.setAuthorizationToken(token);
            const response = await Request.Post('/category', { categories });

            if (response.status == 'success') {
                const updatedUser = await updateUser();
                ToastAndroid.show('类别更新成功', ToastAndroid.SHORT);
                return true;
            } else {
                ToastAndroid.show('类别更新失败', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Error updating categories:', error);
            ToastAndroid.show('API 错误！', ToastAndroid.SHORT);
        }
        return false;
    };

    useEffect(() => {
        const initializeAuth = async () => {
            console.log(segments)
            const inAuthGroup = segments[0] === '(auth)';

            if (!token && !inAuthGroup) {
                router.replace("/sign-in");
            } else if (token && inAuthGroup) {
                const updatedUser = await updateUser();
                setIsLoading(false);
                if (updatedUser) routeUser(updatedUser);
            }
            if (!isTokenLoading && !token) {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, [isTokenLoading, token, segments, updateUser]);

    const signIn = async ({ email, password }: ISignInProps) => {
        try {
            const res = await axios.post<ISignInResponse>(`${process.env.EXPO_PUBLIC_API_URL}/login`, { email, password });
            setToken(res.data.token);
            setUser(res.data.user);
            ToastAndroid.show('登录成功！', ToastAndroid.SHORT);
        } catch (error) {
            console.error('Error signing in:', error);
            ToastAndroid.show('API 错误！', ToastAndroid.SHORT);
        }
    };

    const signUp = async ({ email, name, username, password }: ISignUpProps) => {
        try {
            const res = await axios.post<ISignUpResponse>(`${process.env.EXPO_PUBLIC_API_URL}/register`, { email, name, username, password, password_confirmation: password });
            if (res.data.msg === 'Register successfully!') {
                ToastAndroid.show('注册成功！', ToastAndroid.SHORT);
                signIn({ email, password });
            }
        } catch (error) {
            console.error('Error signing up:', error);
            ToastAndroid.show('API 错误！', ToastAndroid.SHORT);
        }
    };

    const signOut = () => {
        setToken(null);
        setUser(null);
        router.replace("/sign-in");
    };

    const setUserData = async (data: ISetUserProps) => {
        if (!token) {
            ToastAndroid.show('用户未登录', ToastAndroid.SHORT);
            return;
        }

        const formData = new FormData();

        if (data.avatar?.startsWith('file:///')) {
            const fileInfo = await FileSystem.getInfoAsync(data.avatar);
            if (fileInfo.exists) {
                const fileExtension = data.avatar.split('.').pop();
                const fileName = `file.${fileExtension}`;

                formData.append('files', {
                    uri: data.avatar,
                    name: fileName,
                    type: `image/${fileExtension}`
                } as any);
            }
        }

        if (data.profileBg?.startsWith('file:///')) {
            const fileInfo = await FileSystem.getInfoAsync(data.profileBg);
            if (fileInfo.exists) {
                const fileExtension = data.profileBg.split('.').pop();
                const fileName = `file.${fileExtension}`;

                formData.append('files_profileBg', {
                    uri: data.profileBg,
                    name: fileName,
                    type: `image/${fileExtension}`
                } as any);
            }
        }

        try {
            formData.append('name', data.name);
            formData.append('username', data.username);
            data.birthday && formData.append('birthday', data.birthday);
            data.phone && formData.append('phone', data.phone);
            data.school && formData.append('school', data.school);
            data.content && formData.append('content', data.content);
            data.location && formData.append('location', data.location);
            data.link && formData.append('profile_link', data.link);

            Request.setAuthorizationToken(token);
            console.log(formData)
            const response = await Request.Post('/user/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 'success') {
                setUser(response.user);
                updateUser();
                ToastAndroid.show('用户信息更新成功', ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('用户信息更新失败', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Error updating user:', error);
            ToastAndroid.show('API 错误！', ToastAndroid.SHORT);
        }
    };

    const updateFriends = async (user_id: string) => {
        if (!token) {
            ToastAndroid.show('用户未登录', ToastAndroid.SHORT);
            return false;
        }

        try {
            Request.setAuthorizationToken(token);
            const res = await Request.Post('/friend/save', { friend_id: user_id });
            if (res.status === 'success') {
                setFriends(prevItem => {
                    const newItem = new Set(prevItem);
                    newItem.add(user_id);
                    return newItem;
                });
                ToastAndroid.show(res.msg, ToastAndroid.SHORT);
                return true;
            } else {
                ToastAndroid.show(res.msg, ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Error updating categories:', error);
            ToastAndroid.show('API 错误！', ToastAndroid.SHORT);
        }
        return false
    };

    const updateFavorites = async (post_id: string) => {
        if (!token) {
            ToastAndroid.show('用户未登录', ToastAndroid.SHORT);
            return false;
        }

        try {
            Request.setAuthorizationToken(token);
            const res = await Request.Post('/post/likes/save', { post_id: post_id });
            if (res.status === 'success') {
                setFavorites(prevItem => {
                    const newItem = new Set(prevItem);
                    newItem.add(post_id);
                    return newItem;
                });
                ToastAndroid.show(res.msg, ToastAndroid.SHORT);
                return true;
            } else {
                ToastAndroid.show(res.msg, ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Error updating categories:', error);
            ToastAndroid.show('API 错误！', ToastAndroid.SHORT);
        }
        return false;
    };

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signUp,
                signOut,
                updateUserCategories,
                updateUser,
                setUser: setUserData,
                updateFriends,
                updateFavorites,
                token,
                user,
                friends,
                favorites,
                isLoading,
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}