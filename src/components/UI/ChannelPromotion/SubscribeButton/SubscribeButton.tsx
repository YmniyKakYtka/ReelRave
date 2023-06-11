import * as React from 'react';
import styles from './SubscribeButton.module.scss';
import { IChannel } from './../../../../types/channelTypes';
import { useTSelector } from '../../../../hooks/redux';

import channelSlice from '../../../../store/reducers/channelSlice';
import { useDispatch } from 'react-redux';

interface ISubscribeButtonProps {
    channel?: IChannel;
}

const SubscribeButton: React.FC<ISubscribeButtonProps> = ({ channel, ...props }) => {
    const thisChannel = channel;
    const subscribes = useTSelector(state => state.channels.subscribed);
    const dispatch = useDispatch();

    const subscribeClickHandler = (): void => {
        if (channel) {
            dispatch(channelSlice.actions.subscribe(channel));
        }
    }

    return (
        <div className={styles.body}>
            {
                subscribes.some(channel => channel.privateName === thisChannel?.privateName)
                ?
                <button 
                className={styles.subscribed} 
                onClick={subscribeClickHandler} >
                    Вы подписаны 
                    <svg className={styles.checked} width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.7251 0.260447C11.6457 0.17792 11.5513 0.112417 11.4472 0.0677155C11.3432 0.0230142 11.2316 0 11.1189 0C11.0062 0 10.8946 0.0230142 10.7905 0.0677155C10.6865 0.112417 10.592 0.17792 10.5126 0.260447L4.15139 6.82889L1.47882 4.06416C1.3964 3.98206 1.29911 3.91751 1.1925 3.87419C1.08589 3.83086 0.972054 3.80962 0.857483 3.81166C0.742911 3.81371 0.629852 3.839 0.524761 3.8861C0.419669 3.9332 0.324603 4.00118 0.244991 4.08617C0.165378 4.17116 0.102779 4.27148 0.0607656 4.38141C0.0187524 4.49135 -0.00185163 4.60874 0.000130571 4.72688C0.00211277 4.84503 0.0266423 4.96161 0.0723181 5.06998C0.117994 5.17835 0.183922 5.27638 0.266338 5.35848L3.54515 8.73955C3.62453 8.82208 3.71897 8.88758 3.82302 8.93229C3.92707 8.97699 4.03867 9 4.15139 9C4.26411 9 4.37572 8.97699 4.47977 8.93229C4.58382 8.88758 4.67825 8.82208 4.75763 8.73955L11.7251 1.55477C11.8118 1.47231 11.881 1.37225 11.9283 1.26086C11.9756 1.14948 12 1.0292 12 0.907606C12 0.786009 11.9756 0.66573 11.9283 0.554349C11.881 0.442967 11.8118 0.342898 11.7251 0.260447Z" fill="#09C61C"/>
                    </svg>
                </button>
                :
                <button className={styles.subscribe} onClick={subscribeClickHandler} >Подписаться</button>
            }
        </div>
  );
};

export default SubscribeButton;