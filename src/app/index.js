'use strict';

const router = new Router();

const context = {rows: [['Toha', 'rus', '100'], ['Sanya', 'uzb', '1'], ['Danechka', 'rus', '100500'],
        ['Dyrych', 'rus', '-100'], ['Nadya', 'japan', '300'], ['iron_man', 'usa', '10e10'],
        ['Toha', 'rus', '100'], ['Sanya', 'uzb', '1'], ['Danechka', 'rus', '100500'],
        ['Dyrych', 'rus', '-100'], ['Nadya', 'japan', '300'], ['iron_man', 'usa', '10e10'],
        ['Toha', 'rus', '100'], ['Sanya', 'uzb', '1'], ['Danechka', 'rus', '100500'],
        ['Dyrych', 'rus', '-100'], ['Nadya', 'japan', '300'], ['iron_man', 'usa', '10e10']],
    headers: ['Name', 'Region', 'Score']};

const loginCallback = () => {
    httpModule.doPost({url: 'http://deadlinez.herokuapp.com/alexalone/signup', callback: (err, data) => {
        if (err) {
            alert(err);
            return;
        }

        alert(data.message);
        }, data: {
        name: 'Jopa',
        email: 'lolkek',
        password: 'pass1234',
        login: '_turboback'}});
};

router
    .addUrl(
        '/login/',
        new LoginView(),
        loginCallback)
    .addUrl(
        '/',
        new MenuView()
    )
    .addUrl(
        '/signup/',
        new RegisterView()
    )
    .addUrl(
        '/user/',
        new AuthorizedView()
    )
    .addUrl(/leaderboard/,
        new LeaderboardView(context)
    );

router.go(document.location.pathname);
