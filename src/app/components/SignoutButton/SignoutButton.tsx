import * as React from 'react';

interface IProps {
    onClick?: any;
}

export default class SignoutButton extends React.Component<IProps, any> {

    public render(): JSX.Element {
        const { onClick }: any = this.props;
        return (
            <div onClick={ onClick } className="header__user-info-settings">
                <div className="header__user-info-settings-value logout">
                    <img className="header__user-info-settings-value" src="../static/imgs/logout.png"/>
                </div>
            </div>
        );
    }
};