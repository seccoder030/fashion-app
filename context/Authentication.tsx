import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useStorageState } from '@/hooks/useStorageState';
import { router, useRootNavigationState, useSegments } from 'expo-router';
import { ToastAndroid } from 'react-native';
import Request from '@/utils/request';
import axios from 'axios';

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
}

type AuthContextType = {
    signIn: (props: ISignInProps) => Promise<void>;
    signUp: (props: ISignUpProps) => Promise<void>;
    signOut: () => void;
    updateUserCategories: (categories: string[]) => Promise<void>;
    updateUser: () => Promise<void>;
    setUser: (date: ISetUserProps) => Promise<void>;
    token: string | null;
    user: IUser | null;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
    signIn: async () => { },
    signUp: async () => { },
    signOut: () => { },
    updateUserCategories: async () => { },
    updateUser: async () => { },
    setUser: async () => { },
    token: null,
    user: null,
    isLoading: true,
});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props: React.PropsWithChildren) {
    const [[isTokenLoading, token], setToken] = useStorageState('token');
    const [user, setUser] = useState<IUser | null>(null);
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
            const res = await Request.Get('/user');
            setUser(res.user);
            return res.user;
        } catch (error) {
            setToken(null);
            setUser(null);
            console.error('Error updating user:', error);
            ToastAndroid.show('获取用户信息失败', ToastAndroid.SHORT);
            throw error;
        }
    }, [token]);

    const updateUserCategories = async (categories: string[]) => {
        if (categories.length === 0) {
            ToastAndroid.show('请选择一个或多个类别', ToastAndroid.SHORT);
            return;
        }

        if (!token) {
            ToastAndroid.show('用户未登录', ToastAndroid.SHORT);
            return;
        }

        try {
            Request.setAuthorizationToken(token);
            const response = await Request.Post('/category', { categories });

            if (response.status == 'success') {
                const updatedUser = await updateUser();
                ToastAndroid.show('类别更新成功', ToastAndroid.SHORT);
                routeUser(updatedUser);
            } else {
                ToastAndroid.show('类别更新失败', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Error updating categories:', error);
            ToastAndroid.show('API 错误！', ToastAndroid.SHORT);
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            const inAuthGroup = segments[0] === '(auth)';
            console.log(token)

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
            routeUser(res.data.user);
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
                router.replace("/sign-in");
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

    const setUserData = async (date: ISetUserProps) => {
        if (!token) {
            ToastAndroid.show('用户未登录', ToastAndroid.SHORT);
            return;
        }

        try {
            Request.setAuthorizationToken(token);
            const response = await Request.Post('/user/update', date);

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

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signUp,
                signOut,
                updateUserCategories,
                updateUser,
                setUser: setUserData,
                token,
                user,
                isLoading,
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}