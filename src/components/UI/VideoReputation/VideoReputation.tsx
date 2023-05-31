import * as React from 'react';
import styles from './VideoReputation.module.css';

import likeSVG from '../../../assets/images/UI/like.svg';
import dislikeSVG from '../../../assets/images/UI/dislike.svg';
import { useTSelector } from './../../../hooks/redux';
import { useDispatch } from 'react-redux';
import videoSlice from './../../../store/reducers/videoSlice';

interface IVideoReputationProps {
    videoID?: string;
}

const VideoReputation: React.FC<IVideoReputationProps> = ({ videoID, ...props }) => {
    const video = useTSelector(state => state.videos.list).find(video => video.id === videoID);
    const dispatch = useDispatch();

    const likeClickHandler = () => {
        if (video) {
            dispatch(videoSlice.actions.like(video))
        }
    }

    const dislikeClickHandler = () => {
        if (video) {
            dispatch(videoSlice.actions.dislike(video))
        }
    }

    return (
        <div className={styles.body}>
            <div onClick={likeClickHandler} className={styles.like}>
                <img src={likeSVG} alt="like" />
                <p>{video?.likesCount}</p>
            </div>
            <div onClick={dislikeClickHandler} className={styles.dislike}>
                <img src={dislikeSVG} alt="dislike" />
                <p>{video?.dislikesCount}</p>
            </div>
        </div>
    );
};

export default VideoReputation;
