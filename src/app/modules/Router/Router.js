(function() {
    'use strict';

    class Router {

        constructor() {
            this.lastView = null;
            this.urls = {};
            this.insertionElement = document.querySelector('.root');
            this.isAuth = false;
            httpModule.doGet('/me').then(
                (response) => this.isAuth = true,
                (reject) => this.isAuth = false
            );
            this.start();
        }

        addUrl(url, view) {
            this.urls[url] = {
                view,
                loaded: false,
            };
            return this;
        }

        viewUpdate(context) {
            this.lastView.update(context);
            const parent = this.lastView.element.parentNode;
            parent.removeChild(this.lastView.element);
            this.lastView.__render();
            parent.appendChild(this.lastView.element);
            this.lastView.show();
        }

        pageUpdate(url) {
            this.hideLast();

            this.lastView = this.urls[url].view;

            this.showPage(url);
        }

        checkAuth(url) {
            if (this.urls[url].view.needAuthorization() && !this.isAuth) {
                return '/';
            } else if (!this.urls[url].view.needAuthorization() && this.isAuth) {
                return '/user/';
            }

            return url;
        }

        route(url, insertionElement = this.insertionElement) {

            if (!this.urls[url].loaded) {
                this.urls[url].loaded = true;
                this.urls[url].view.preRender().then(
                    (response) => {
                        this.urls[url].view.__render();
                        insertionElement.appendChild(this.urls[url].view.element);

                        this.pageUpdate(url);
                    }
                );
            }

            this.pageUpdate(url);
        }

        go(url, insertionElement = this.insertionElement) {
            if (!this.urls[url]) {
                return false;
            }

            url = this.checkAuth(url);
            this.route(url, insertionElement);
            window.history.pushState({path: url}, url, url);
        }

        showPage(url) {
            this.urls[url].view.show();
        }

        hideLast() {
            this.lastView && this.lastView.hide();
        }

        start() {
            window.addEventListener('popstate', (event) => {
                this.route(window.location.pathname);
            });
        }
    }

    window.router = new Router();
})();
