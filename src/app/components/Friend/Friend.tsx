import * as React from 'react';

import './Friend.scss';

interface IProps {
    avatar?: string;
    login?: string;
    onClick?: any;
    online?: boolean;
}

export default class Friend extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const {avatar, login, onClick, online}: any = this.props;
        return (
            <div className='friend' onClick={onClick}>
                <img className='friend__avatar' src={avatar}/>
                <div className='friend__login'>
                    <p className='friend__login-value'>{login}</p>
                </div>
                <div className="friend__online">
                    {   online &&
                        <div className="friend__online-value"/>
                    }
                </div>
            </div>
        );
    }
};
