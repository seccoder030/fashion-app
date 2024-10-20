
import MediaView from '@/components/MediaView';
import { useAuth } from '@/components/navigation/Authentication';
import Request from '@/utils/request';
import { useEffect, useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import Blank from './Blank';
import Loading from './Loading';

interface MediaPageProps {
    page?: number;
}

const MediaPage: React.FC<MediaPageProps> = ({
    page = 2
}) => {
    const { token, user } = useAuth();
    const [medias, setMedias] = useState<IPost[] | null>(null);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    Request.setAuthorizationToken(token);
                    switch (page) {
                        case 0:
                            var res = await Request.Get('/post/get');
                            break;
                        case 1:
                            var res = await Request.Get('/post/get');
                            break;
                        case 2:
                            var res = await Request.Get('/post/get');
                            break;
                        default:
                            var res = await Request.Get('/post/get');
                            break;
                    }
                    setMedias(res.posts);
                } catch (error) {
                    console.log(error);
                    ToastAndroid.show('API 错误！', ToastAndroid.SHORT);
                }
            }
        }
        fetchData();
    }, [token, page]);

    if (!medias) {
        return <Loading backgroundColor={'#000'} />;
    }

    if (medias.length === 0) {
        return <Blank />
    }


    const handlePageSelected = (e: any) => {
        const newPage = e.nativeEvent.position;
        setCurrentPage(newPage);
    };

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