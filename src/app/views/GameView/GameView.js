import './GameView.scss';
import BaseView from '../BaseView/BaseView';
import OfflineGame from '../../game/core/offline';
import OnlineGame from '../../game/core/online';
import gameController from '../../game/GameController';
import Scene from '../../game/objects/Scene';

export default class GameView extends BaseView {

    constructor() {
        super();
        this.game = null;
        this.canvas = null;
    }

    setContext() {
        this.context.exitGame = () => {
            window.router.go('/');
        };

        this.context.goToGame = () => {
            window.router.go('/game/');        };
    }

    create(online) {
        this.canvas = document.querySelector('.game__battleground-canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        const pause = document.querySelector('.game__pause');
        pause.classList.add('hidden');

        this.doGame(online);
    }

    doGame(online) {
        if (online) {
            const scene = new Scene(this.canvas);
            this.game = new OnlineGame(gameController, scene);
            this.game.start();
            // bus.emit('START_GAME');
            return;
        }
        const scene = new Scene(this.canvas);
        this.game = new OfflineGame(gameController, scene);

        // 0 - transform %, 1 - direction, 2 - timeout ms
        const rounds = [
            [
                [[25, 0, 0], [55, 1, 200], [55, 2, 0], [55, 3, 400]],
                [[40, 0, 100], [70, 0, 0], [90, 1, 100], [70, 2, 0], [60, 3, 400]],
            ],
            [
                [
                    [20, 0, 0], [30, 0, 800], [60, 0, 600], [110, 0, 800],
                    [30, 1, 200], [60, 1, 400], [80, 1, 300],
                    [25, 2, 600], [45, 2, 0], [70, 2, 400], [90, 2, 600],
                    [40, 3, 100], [60, 3, 100], [80, 3, 100]
                ],
                [
                    [15, 0, 300], [30, 0, 400], [70, 0, 600], [100, 0, 1000],
                    [30, 1, 200], [55, 1, 1000], [60, 1, 400], [80, 1, 300],
                    [30, 2, 400], [70, 2, 400], [90, 2, 600],
                    [10, 3, 100], [20, 3, 100], [80, 3, 100]
                ],
                [
                    [50, 0, 0], [40, 0, 400], [60, 0, 800], [80, 0, 600],
                    [80, 1, 200], [70, 1, 800], [80, 1, 300],
                    [25, 2, 600], [45, 2, 0], [50, 2, 400], [60, 2, 600],
                    [10, 3, 100], [20, 3, 100], [100, 3, 600]
                ],
            ],
            [
                [
                    [5, 0, 120], [10, 0, 180], [15, 0, 240], [20, 0, 300], [25, 0, 360],
                    [30, 0, 400], [35, 0, 450], [40, 0, 500],
                    [45, 0, 500], [50, 0, 500], [55, 0, 500], [60, 0, 500], [65, 0, 500],
                    [70, 0, 500], [90, 0, 500], [95, 0, 500], [100, 0, 500], [105, 0, 500], [110, 0, 500],
                ],
                [
                    [5, 2, 120], [10, 2, 280], [15, 2, 340], [20, 2, 400], [25, 2, 460],
                    [30, 2, 500], [35, 2, 550], [40, 2, 600],
                    [45, 2, 500], [50, 2, 500], [55, 2, 500], [60, 2, 500], [65, 2, 500],
                    [70, 2, 500], [90, 2, 500], [95, 2, 500], [100, 2, 500], [105, 2, 500], [110, 2, 500],
                    [75, 2, 1300], [80, 2, 1300], [85, 2, 1300],
                ],
                [
                    [65, 1, 120], [70, 1, 280], [75, 1, 340], [80, 1, 400], [85, 1, 460],
                    [90, 1, 500], [95, 1, 550], [100, 1, 600], [105, 1, 650], [110, 1, 700], [115, 1, 750],
                    [120, 1, 700], [125, 1, 750], [130, 1, 800], [110, 2, 180], [115, 2, 240],
                    [120, 2, 300], [125, 2, 300], [130, 2, 300], [20, 3, 300], [25, 3, 300], [30, 3, 300],
                    [65, 3, 1400], [70, 3, 1500], [75, 3, 1600], [80, 3, 1700], [85, 3, 1800],
                    [90, 3, 1900], [95, 3, 2000], [100, 3, 2100], [105, 3, 2200], [110, 3, 2200], [115, 3, 2200],
                    [10, 0, 1500], [15, 0, 1500], [20, 0, 1500], [25, 0, 1800], [30, 0, 1800],
                    [20, 0, 1800], [25, 0, 1800], [30, 0, 1800],
                ],
            ],
        ];
        this.game.saveRounds(rounds);

        this.game.start();
    }

    needUpdate() {
        return true;
    }

    needAuthorization() {
        return false;
    }

    render() {
        return this.template = require('./GameView.handlebars');
    }
}

