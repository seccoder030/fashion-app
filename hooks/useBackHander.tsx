import { useEffect, useRef } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';
import { router } from 'expo-router';

const useBackHandler = (): void => {
    const lastBackPressed = useRef<number>(0);

    useEffect(() => {
        const backAction = (): boolean => {
            if (router.canGoBack()) {
                router.back();
                return true;
            }

            const currentTime = new Date().getTime();

            if (currentTime - lastBackPressed.current < 2000) {
                BackHandler.exitApp();
                return true;
            }

            lastBackPressed.current = currentTime;
            ToastAndroid.show('再次按返回退出', ToastAndroid.SHORT);
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, []);
};

export default useBackHandler;
