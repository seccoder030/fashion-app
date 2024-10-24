
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
    page = 1
}) => {
    const { token, user, friends, favorites } = useAuth();
    const [medias, setMedias] = useState<IPost[] | null>(null);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    console.log('friend', friends)
                    Request.setAuthorizationToken(token);
                    var res = await Request.Get('/post/get_all_post');
                    var arr: IPost[] = [];
                    res.posts.map((item: IPost) => {
                        page === 0 ? favorites && favorites.has(item.id) && arr.push(item) :
                            page === 1 ? arr.push(item) :
                                friends && friends.has(item.user_id) && arr.push(item)
                    })
                    setMedias(arr);
                } catch (error) {
                    console.error(error);
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
                <MediaView key={index} item={item} active={currentPage === index ? true : false} />
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