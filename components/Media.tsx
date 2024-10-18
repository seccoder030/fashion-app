import { AVPlaybackSource, ResizeMode } from 'expo-av';
import React, { useEffect, useState } from 'react';
import {
    ColorValue,
    Image,
    ImageSourcePropType,
    ToastAndroid
} from 'react-native';
import CustomVideoPlayer from './CustomVideoPlayer';
import Loading from './Loading';

interface MediaProps {
    type: boolean;
    source: ImageSourcePropType | AVPlaybackSource;
    backgroundColor?: ColorValue;
    play?: boolean;
    reset?: boolean;
    enableControls?: boolean;
    resizeMode?: number;
    isMuted?: boolean;
}

const Media: React.FC<MediaProps> = ({
    type,
    source,
    backgroundColor = '#000',
    play = false,
    reset = false,
    enableControls = false,
    resizeMode = 0,
    isMuted = true
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (error) ToastAndroid.show(error, ToastAndroid.SHORT);
    }, [error]);

    return (
        <>
            {type ?
                <CustomVideoPlayer source={source as AVPlaybackSource} resizeMode={resizeMode == 0 ? ResizeMode.CONTAIN : (resizeMode == 1 ? ResizeMode.COVER : ResizeMode.STRETCH)} play={play} reset={reset} backgroundColor={backgroundColor} enableControls={enableControls} isMuted={isMuted} /> :
                <>
                    <Image
                        source={source as ImageSourcePropType}
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: backgroundColor,
                            display: isLoading ? 'none' : 'flex'
                        }}
                        onLoadStart={() => setIsLoading(true)}
                        onLoad={() => setIsLoading(false)}
                        onError={(error) => {
                            setIsLoading(false);
                            setError('Failed to load image');
                            console.error('Image loading error:', error);
                        }}
                        resizeMode={resizeMode == 0 ? 'contain' : (resizeMode == 1 ? 'cover' : 'stretch')}
                    />
                    {isLoading && <Loading backgroundColor={backgroundColor} />}
                </>
            }
        </>
    );
};
export default Media;