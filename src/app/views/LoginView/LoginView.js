import BaseView from '../BaseView/BaseView';
import router from '../../modules/Router/Router';
import userService from '../../modules/UserService/UserService';
import httpModule from '../../modules/HttpModule/HttpModule';
import Validation from '../../modules/Validator/index';

export default class LoginView extends BaseView {

    constructor() {
        super();
        window.httpModule = httpModule;
    }

    setContext() {

        this.context.validateLogin = () => {

            const blocks = window.router.getLastView().inputBlocks;
            const inputs = blocks.map((block) => block.querySelector('input'));
            const errors = {};
            window.Validation(inputs, errors);
            for (let key in errors) {
                blocks.map((block) => {
                    const error = block.querySelector('p[name=' + key + ']');
                    if (error) {
                        error.textContent = errors[key];
                    }
                });
            }

            for (let key in errors) {
                console.log(key, errors[key]);
                if (errors[key].length) {
                    return;
                }
            }

            window.httpModule.doPost('/signin',
                {
                    login: blocks[0].querySelector('input').value,
                    password: blocks[1].querySelector('input').value,
                }).then(
                (response) => {
                    window.userService.userLogin();
                    blocks.forEach((item) => item.querySelector('input').value = '');
                    return window.userService.init();
                },
                (error) => {
                    console.log(error);
                }
            ).then(
                (resolve) => {
                    window.router.go('/user/');
                }
            );

        };

        this.context.goBack = () => {
            window.router.go('/');
        };
    }

    render() {
        this.template = require('./LoginView.handlebars');
    }

    getDOMDependensies() {
        this.inputBlocks = [...document.querySelector('.login').getElementsByClassName('input-block')];
    }

    needAuthorization() {
        return false;
    }
}

// window.validateLoginInput = (block) => {
//     const input = block.querySelector('input');
//
//     if (input.value === '') {
//         input.classList.add('input-block__input_error');
//         return false;
//     } else {
//         input.classList.remove('input-block__input_error');
//         return true;
//     }
// };
