
import Loading from '@/components/Loading';
import MediaView from '@/components/MediaView';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import Blank from './Blank';
import Request from '@/utils/request';
import { useAuth } from '@/context/Authentication';

interface MediaPageProps {
    tab?: string;
}

const MediaPage: React.FC<MediaPageProps> = ({
    tab = '校友圈'
}) => {
    const tabs = ['精选', '推荐', '校友圈'];
    const { token, user } = useAuth();
    const [medias, setMedias] = useState<IPost[] | null>(null);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    if (tab === tabs[0]) {
                        Request.setAuthorizationToken(token);
                        const res = await Request.Get('/post/get');
                        setMedias(res.posts);
                    }
                    else if (tab === tabs[1]) {
                        Request.setAuthorizationToken(token);
                        const res = await Request.Get('/post/get');
                        setMedias(res.posts);
                    }
                    else if (tab === tabs[2]) {
                        Request.setAuthorizationToken(token);
                        const res = await Request.Get('/post/get');
                        setMedias(res.posts);
                    }
                }
            } catch (error) {
                ToastAndroid.show('API 错误！', ToastAndroid.SHORT);
            }
        }
        fetchData();
    }, []);

    const handlePageSelected = (e: any) => {
        const newPage = e.nativeEvent.position;
        setCurrentPage(newPage);
    };

    if (medias && medias.length == 0) {
        return <Blank />
    }

    if (medias === null) {
        return <View style={{ backgroundColor: 'black' }} />;
    }

    return (
        <PagerView onPageSelected={handlePageSelected} style={styles.view} initialPage={currentPage} orientation='vertical'>
            {medias.map((item, index) => (
                <MediaView key={index} item={item} reset={currentPage == index ? true : false} />
            ))}
        </PagerView>
    );
};

const styles = StyleSheet.create({
    view: {
        width: '100%',
        height: '100%',
    }
});

export default MediaPage;