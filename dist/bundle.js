!function(e){var t={};function n(s){if(t[s])return t[s].exports;var a=t[s]={i:s,l:!1,exports:{}};return e[s].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:s})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t,n){"use strict";var s=n(5);t.a=class{constructor(e){this._element=null,this.template=e,this.events=["click","focus","blur"],this.functionExp=/\s*\(([\w, ]*)\)\n*\t*\s*{(.*)}/i}render(e){const t=document.createElement("div");t.innerHTML=s.a.getHTML(e,this.template),this._element=t.lastChild,this.addListeners(e)}appendChild(e){this._element.appendChild(e)}element(){return this._element}addListeners(e){this.events.forEach(t=>{if(e[t]){const n=e[t].match(this.functionExp);this._element.addEventListener(t,new Function(n[1],n[2]))}})}}},function(e,t,n){"use strict";var s=n(4),a=n(9);const r=new class{constructor(){this.lastView=null,this.urls={},this.insertionElement=document.querySelector(".root"),this.loadingElement=(new a.a).__render(),this.loadingElement.classList.add("hidden"),this.insertionElement.appendChild(this.loadingElement),this.start()}addUrl(e,t){return this.urls[e]={view:t,loaded:!1},this}viewUpdate(e){this.lastView.update(e);const t=this.deleteLast();this.lastView.__render(),t.appendChild(this.lastView.element),this.lastView.show()}go(e,t=this.insertionElement){if(!this.urls[e])return!1;this.showLoading(),e=this.checkAuth(e),this.route(e,t),window.history.pushState({path:e},e,e)}route(e,t=this.insertionElement){this.urls[e].loaded?this.pageUpdate(e):(this.urls[e].loaded=!0,this.urls[e].view.preRender().then(n=>{this.urls[e].view.__render(),t.appendChild(this.urls[e].view.element),this.pageUpdate(e)}))}start(){window.addEventListener("popstate",e=>{this.route(window.location.pathname)})}showPage(e){this.urls[e].view.show()}hideLast(){this.lastView&&this.lastView.hide()}deleteLast(){if(this.lastView.element){const e=this.lastView.element.parentNode;return e.removeChild(this.lastView.element),e}}checkAuth(e){return this.urls[e].view.needAuthorization()&&!s.a.isAuthorized?"/":!this.urls[e].view.needAuthorization()&&s.a.isAuthorized?"/user/":e}pageUpdate(e){this.hideLoading(),this.lastView=this.urls[e].view,this.showPage(e)}showLoading(){this.hideLast(),this.loadingElement.classList.remove("hidden")}hideLoading(){this.loadingElement.classList.add("hidden")}};t.a=r},function(e,t,n){"use strict";var s=n(10),a=n(5);t.a=class{constructor(){this.element=null,this.context={}}preRender(){return new Promise((e,t)=>e({}))}render(){return""}deleteElement(){if(this.element){const e=this.element.parentNode;return e.removeChild(this.element),e}}needAuthorization(){return!0}update(e={}){return null}hide(){this.element&&this.element.classList.add("hidden")}show(){this.element&&this.element.classList.remove("hidden")}__render(){return this.element=s.a.getHTML(a.a.getHTML(this.context,this.render())),this.element}}},function(e,t,n){"use strict";var s=n(8);const a=new class{constructor(){this.domen=s.e}doGet(e,t=[{name:s.b,value:s.c}]){return this.doRequest(s.a,e,t)}doPost(e,t=null,n=[{name:s.b,value:s.c}]){return this.doRequest(s.d,e,t,n)}doRequest(e=s.a,t="/",n=null,a=[]){return new Promise((s,r)=>{const i=new XMLHttpRequest;i.open(e,`${this.domen}${t}`,!0),i.addEventListener("load",()=>{const e=JSON.parse(i.responseText);i.status<300?s(e):r(e.message)}),i.addEventListener("error",()=>{r(new Error("Network error"))}),a.forEach(e=>i.setRequestHeader(e.name,e.value)),i.withCredentials=!0,n?i.send(JSON.stringify(n)):i.send()})}};t.a=a},function(e,t,n){"use strict";var s=n(3),a=n(1);const r=new class{checkSession(){return s.a.doGet("/me").then(e=>this.isAuthorized=!0,e=>this.isAuthorized=!1)}userLogin(){this.isAuthorized=!0}userLogout(){this.isAuthorized=!1,a.a.urls["/user/"].view.deleteElement(),a.a.urls["/user/"].loaded=!1,a.a.urls["/settings/"].loaded&&(a.a.urls["/settings/"].view.deleteElement(),a.a.urls["/settings/"].loaded=!1)}};t.a=r},function(e,t,n){"use strict";const s=new class{constructor(e=""){e&&this.changeTemplate(e)}getHTML(e,t){return t&&this.changeTemplate(t),this.template(e)}changeTemplate(e){this.template=Handlebars.compile(e)}};t.a=s},function(e,t,n){n(7),e.exports=n(27)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n(4),a=n(1),r=n(21),i=n(22),o=n(23),l=n(24),u=n(25),c=n(26);a.a.addUrl("/login/",new r.a).addUrl("/",new i.a).addUrl("/signup/",new o.a).addUrl("/user/",new l.a).addUrl(/leaderboard/,new c.a).addUrl(/settings/,new u.a),void 0===s.a.isAuthorized?s.a.checkSession().then(e=>a.a.go(document.location.pathname),e=>a.a.go(document.location.pathname)):a.a.go(document.location.pathname)},function(e,t,n){"use strict";t.e="http://deadlinez.herokuapp.com/alexalone";t.d="POST";t.a="GET";t.b="Content-Type";t.c="application/json;charset=UTF-8"},function(e,t,n){"use strict";var s=n(2);t.a=class extends s.a{render(){return"<Header>Loading...</Header>"}}},function(e,t,n){"use strict";var s=n(11),a=n(12),r=n(13),i=n(14),o=n(15),l=n(16),u=n(17),c=n(18),d=n(19),p=n(20);const h=new class{constructor(){this.regExp=/<[a-z0-9 _\-"'=(){}\[\],;:.@!?\/+]+>|<\/[a-z0-9 _\-"'=(){}\[\],;:.@!?]+>/gi,this.regExpEnd=/<\/[a-z0-9 _\-"'=(){}\[\],;:.@!?]+>/i,this.objects=[],this.tagStack=[],this.componentFactory={Button:()=>new s.a,Input:()=>new a.a,Header:()=>new r.a,MenuPoint:()=>new i.a,Menu:()=>new o.a,Form:()=>new l.a,Footer:()=>new u.a,Image:()=>new c.a,Trailer:()=>new d.a,div:()=>new p.a,a:()=>new p.a,p:()=>new p.a,img:()=>new p.a,ul:()=>new p.a}}getHTML(e){this.stringToObject(e);const t=document.createElement("div");return this.objects.forEach(e=>{e&&t.appendChild(this.getElement(e))}),this.objects=[],t}handleCloseTag(){const e=this.tagStack.pop();0!==this.tagStack.length?this.tagStack[this.tagStack.length-1].children.push(e):this.objects.push(e)}handleOpenTag(e){const t={object:e.slice(1,-1),children:[]};this.tagStack.push(t)}handleTag(e){this.regExpEnd.exec(e)?this.handleCloseTag(e):this.handleOpenTag(e)}parseHtml(e){let t="",n=0;for(e=e.replace(/\n/g," ");t=this.regExp.exec(e);)n<t.index&&this.tagStack.length&&(this.tagStack[this.tagStack.length-1].text=e.slice(n,t.index)),this.handleTag(t[0]),n=t.index+t[0].length}setObjectAttributes(e){const t=e.object.split(" ");e.tag=t[0],e.attributes={},e.attributes.text=e.text,e.attributes.tag=e.tag;let n="";const s=/([\w-_]+)="([^"]*)"/gi;for(;n=s.exec(e.object);)e.attributes[n[1]]=n[2]}performObject(e){return e&&e.object?(this.setObjectAttributes(e),e.children.length?void e.children.forEach(e=>this.performObject(e)):e):e}stringToObject(e){return this.parseHtml(e),this.objects.map(e=>this.performObject(e)),this.objects}getElement(e){const t=this.componentFactory[e.tag]();return t.render(e.attributes),e.children.forEach(e=>t.appendChild(this.getElement(e))),t.element()}};t.a=h},function(e,t,n){"use strict";var s=n(0);t.a=class extends s.a{render(e){this.template='<div class="button {{class}}"><p class="button__value">{{text}}</p></div>',super.render(e)}}},function(e,t,n){"use strict";var s=n(0);t.a=class extends s.a{render(e){this.template='<div class="input-block {{block-class}}">\n                            <input \n                            name="{{input-name}}" \n                            focus="{{focus}}" \n                            blur="{{blur}}" \n                            type={{type}} \n                            class="input-block__input {{input-class}}" \n                            placeholder="{{placeholder}}" \n                            value="{{value}}"/>\n                         </div>',super.render(e)}addListeners(e){this.events.forEach(t=>{if(e[t]){const n=e[t].match(this.functionExp);this._element.getElementsByTagName("input")[0].addEventListener(t,new Function(n[1],n[2]))}})}}},function(e,t,n){"use strict";var s=n(0);t.a=class extends s.a{render(e){this.template='<div class="header {{class}}">\n                         </div>',super.render(e)}}},function(e,t,n){"use strict";var s=n(0);t.a=class extends s.a{render(e){this.template='<div class="menu-point {{class}}"><p class="menu-point-text">{{text}}</p></div>',super.render(e)}}},function(e,t,n){"use strict";var s=n(0);t.a=class extends s.a{render(e){this.template='<div class="menu {{class}}"></div>',super.render(e)}}},function(e,t,n){"use strict";var s=n(0);t.a=class extends s.a{render(e){this.template='<form method="{{method}}"></form>',super.render(e)}}},function(e,t,n){"use strict";var s=n(0);t.a=class extends s.a{render(e){this.template='<div class="footer"><p>{{text}}</p></div>',super.render(e)}}},function(e,t,n){"use strict";var s=n(0);t.a=class extends s.a{render(e){this.template='<img class="{{class}}" src="{{src}}">',super.render(e)}}},function(e,t,n){"use strict";var s=n(0);t.a=class extends s.a{render(e){this.template='<iframe class="{{class}}" src="{{src}}" frameborder="{{frameborder}}" allow="{{allow}}" allowfullscreen></iframe>',super.render(e)}}},function(e,t,n){"use strict";var s=n(0);t.a=class extends s.a{render(e){this.template='<{{tag}} class="{{class}}">{{text}}</{{tag}}>',super.render(e)}}},function(e,t,n){"use strict";var s=n(2),a=n(1),r=n(4),i=n(3);t.a=class extends s.a{render(){return'<div class="page">\n                        <Header>Login</Header>\n                        <div class="form-block login">\n                            <Form>\n                                <Input block-class="user-name" error-class="hidden" error-text="empty username"\n                                label-text="Enter login:" type="text" placeholder="Enter login"\n                                focus="() { validateFocusLoginInput(document.querySelector(\'.login\').getElementsByClassName(\'input-block\')[0]) }"\n                                blur="() { validateBlurLoginInput(document.querySelector(\'.login\').getElementsByClassName(\'input-block\')[0]) }">\n                                </Input>\n                                <Input block-class="user-password"  error-class="hidden" error-text="empty password"\n                                label-text="Password:" type="password" placeholder="Enter password"\n                                focus="() { validateFocusLoginInput(document.querySelector(\'.login\').getElementsByClassName(\'input-block\')[1]) }"\n                                blur="() { validateBlurLoginInput(document.querySelector(\'.login\').getElementsByClassName(\'input-block\')[1]) }">\n                                </Input>\n                                <div class="button-container">\n                                    <Button class="button large" click="() {validateLogin();}">Log In!</Button>\n                                    <Button class="button large" click="(event){ event.preventDefault(); goBack();  }">Back</Button>\n                                </div>\n                            </Form>\n                        </div>\n                    </div>\n                    <Footer>Made by Tarados Feroces</Footer>'}needAuthorization(){return!1}},window.validateLogin=(()=>{const e=[...document.querySelector(".login").getElementsByClassName("input-block")];e.reduce((e,t)=>e+validateLoginInput(t),0)==e.length&&i.a.doPost("/signin",{login:e[0].querySelector("input").value,password:e[1].querySelector("input").value}).then(t=>{r.a.userLogin(),a.a.go("/user/"),e.forEach(e=>e.querySelector("input").value="")},e=>{alert(e)})}),window.validateLoginInput=(e=>{const t=e.querySelector("input"),n=e.querySelector(".error");return""===t.value?(t.classList.add("input-error"),n.classList.remove("hidden"),!1):(t.classList.remove("input-error"),n.classList.add("hidden"),!0)}),window.validateFocusLoginInput=(e=>{e.querySelector("input").classList.remove("input-error"),e.querySelector(".error").classList.add("hidden")}),window.validateBlurLoginInput=(e=>{const t=e.querySelector("input"),n=e.querySelector(".error");""===t.value&&(t.classList.add("input-error"),n.classList.remove("hidden"))})},function(e,t,n){"use strict";var s=n(2),a=n(1);t.a=class extends s.a{render(){return'<div class="main-page">\n                    <Header class="main-page__header">\n                        <div class="header-logo">\n                            <div class="header-logo-content"></div>\n                        </div>\n                    </Header>   \n                    <div class="main-page__content">\n                        <div class="main-page__content-row">\n                            <Menu>\n                                <MenuPoint>Play</MenuPoint>\n                                <MenuPoint>Sign In</MenuPoint>\n                                <MenuPoint>Sign Up</MenuPoint>\n                            </Menu>\n                            <div class="scroll">\n                                <div class="scroll-icon"></div>\n                            </div>\n                        </div>\n                       <div class="main-page__content-row main-page__content-row_low-height">\n                            <div class="main-page__content-description">\n                                <div class="text">\n                                    <p class="text__data">\n                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor\n                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud\n                                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure\n                                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor\n                                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud\n                                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure\n                                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n                                    </p>\n                                </div>\n                            </div>\n                       </div>\n                       <div class="main-page__content-row"\n                           <div class="main-page__content-trailer">\n                                <Trailer src="https://www.youtube.com/embed/L3Mg6lk6yyA" frameborder="0" allow="autoplay; encrypted-media"></Trailer>\n                           </div>\n                       </div>\n                    </div>\n                </div>'}needAuthorization(){return!1}},window.goToLogin=(()=>{a.a.go("/login/")}),window.goToSignUp=(()=>{a.a.go("/signup/")}),window.goToScore=(()=>{a.a.go("/leaderboard/")}),window.goBack=(()=>{a.a.go("/")})},function(e,t,n){"use strict";var s=n(2),a=n(1),r=n(4),i=n(3);t.a=class extends s.a{render(){return'<div class="page">\n                    <Header>Sign Up!</Header>\n                    <div class="form-block registration">\n                        <Form>\n                            <Input block-class="user-name" error-class="hidden" error-text="empty username"\n                            label-text="Login:" type="text" placeholder="Enter login"\n                            focus="() { validateFocusRegistrationInput(document.querySelector(\'.registration\').getElementsByClassName(\'input-block\')[0]) }"\n                            blur="() { validateBlurRegistrationInput(document.querySelector(\'.registration\').getElementsByClassName(\'input-block\')[0]) }">\n                            </Input>\n                            <Input block-class="user-email" error-class="hidden" error-text="empty email"\n                            label-text="E-mail:" type="text" placeholder="Enter E-mail"\n                            focus="() { validateFocusRegistrationInput(document.querySelector(\'.registration\').getElementsByClassName(\'input-block\')[1]) }"\n                            blur="() { validateBlurRegistrationInput(document.querySelector(\'.registration\').getElementsByClassName(\'input-block\')[1]) }">\n                            </Input>\n                            <Input block-class="user-password" error-class="hidden" error-text="empty password"\n                            label-text="Password:" type="password" placeholder="Enter password"\n                            focus="() { validateFocusRegistrationInput(document.querySelector(\'.registration\').getElementsByClassName(\'input-block\')[2]) }"\n                            blur="() { validateBlurRegistrationInput(document.querySelector(\'.registration\').getElementsByClassName(\'input-block\')[2]) }">\n                            </Input>\n                            <Input block-class="user-repeat-password" error-class="hidden" error-text="empty password"\n                            label-text="Repeat password:" type="password" placeholder="Enter password"\n                            focus="() { validateFocusRegistrationInput(document.querySelector(\'.registration\').getElementsByClassName(\'input-block\')[3]) }"\n                            blur="() { validateBlurRegistrationInput(document.querySelector(\'.registration\').getElementsByClassName(\'input-block\')[3]) }">\n                            </Input>\n                            <div class="button-container">\n                                <Button class="button large" click="(){ validateRegistration(); }">Sign Up!</Button>\n                                <Button class="button large" click="(event){ event.preventDefault(); goBack();  }">Back</Button>\n                            </div>\n                        </Form>\n                    </div>\n                </div>\n                <Footer>Made by Tarados Feroces</Footer>;'}needAuthorization(){return!1}},window.validateRegistration=(()=>{const e=[...document.querySelector(".registration").getElementsByClassName("input-block")];e.reduce((e,t)=>e+validateRegistrationInput(t),0)==e.length&&i.a.doPost("/signup",{login:e[0].querySelector("input").value,email:e[1].querySelector("input").value,password:e[2].querySelector("input").value}).then(t=>{r.a.userLogin(),a.a.go("/user/"),e.forEach(e=>e.querySelector("input").value="")},e=>{document.querySelector(".registration").getElementsByClassName("input-block")[0].querySelector(".error").innerText=e,document.querySelector(".registration").getElementsByClassName("input-block")[0].querySelector(".error").classList.remove("hidden")})}),window.validateRegistrationInput=(e=>{const t=e.querySelector("input"),n=e.querySelector(".error");return""===t.value?(t.classList.add("input-error"),n.classList.remove("hidden"),!1):(t.classList.remove("input-error"),n.classList.add("hidden"),!0)}),window.validateFocusRegistrationInput=(e=>{e.querySelector("input").classList.remove("input-error"),e.querySelector(".error").classList.add("hidden")}),window.validateBlurRegistrationInput=(e=>{const t=e.querySelector("input"),n=e.querySelector(".error");""===t.value&&(t.classList.add("input-error"),n.classList.remove("hidden"))})},function(e,t,n){"use strict";var s=n(2),a=n(3),r=n(4),i=n(1);t.a=class extends s.a{preRender(){return a.a.doGet("/me").then(e=>{this.context=e})}render(){return'<div class="page">\n                    <Header>Hello, {{login}}</Header>\n                    {{#if avatar}}\n                        <Image class="main-avatar" src="{{{avatar}}}"></Image>\n                    {{else}}\n                        <Image class="main-avatar" src="../../static/images/mainAvatar.jpg"></Image>\n                    {{/if}}    \n                    <div class="button-container">\n                        <Button class="button large" click="(event){ event.preventDefault(); goToSettings();  }">Settings</Button>\n                        <Button class="button large" click="(event){ event.preventDefault(); goToScore();  }">Leaderboard</Button>\n                        <Button class="button large" click="(event){ event.preventDefault(); signOut();  }">Sign out</Button>\n                    </div>\n                </div>'}},window.goToSettings=(()=>i.a.go("/settings/")),window.signOut=(()=>{a.a.doPost("/signout").then(e=>{r.a.userLogout(),i.a.go("/")})})},function(e,t,n){"use strict";var s=n(2),a=n(3),r=n(1);t.a=class extends s.a{preRender(){return a.a.doGet("/me").then(e=>{this.context=e})}render(){return'<div class="page">\n                    <Header>Settings</Header>\n                    <div class="form-block settings">\n                        {{#if avatar}}\n                            <Image class="main-avatar" src="{{{avatar}}}"></Image>\n                        {{else}}\n                            <Image class="main-avatar" src="../../static/images/mainAvatar.jpg"></Image>\n                        {{/if}} \n                        <Form>\n                            <Input block-class="user-name" error-class="hidden" error-text="empty username"\n                            label-text="Login:" type="text" value="{{login}}"\n                            focus="() { validateFocusSettingsInput(document.querySelector(\'.settings\').getElementsByClassName(\'input-block\')[0]) }"\n                            blur="() { validateBlurSettingsInput(document.querySelector(\'.settings\').getElementsByClassName(\'input-block\')[0]) }">\n                            </Input>\n                            <Input block-class="user-email" error-class="hidden" error-text="empty email"\n                            label-text="Email:" type="text" value="{{email}}"\n                            focus="() { validateFocusSettingsInput(document.querySelector(\'.settings\').getElementsByClassName(\'input-block\')[1]) }"\n                            blur="() { validateBlurSettingsInput(document.querySelector(\'.settings\').getElementsByClassName(\'input-block\')[1]) }">\n                            </Input>\n                            <Input error-class="hidden"\n                            label-text="Avatar:" type="file">\n                            </Input>\n                            <div class="button-container">\n                                <Button class="button large" click="(){ validateSettings(); }">Save</Button>\n                                <Button class="button large" click="(event){ event.preventDefault(); goToUser();  }">Back</Button>\n                            </div>\n                        </Form>\n                    </div>\n                </div>'}};const i=()=>{const e=[...document.querySelector(".settings").getElementsByClassName("input-block")];r.a.showLoading(),a.a.doPost("/user/update",{login:e[0].querySelector("input").value,email:e[1].querySelector("input").value,avatar:reader.result}).then(t=>{r.a.urls["/user/"].loaded=!1,r.a.urls["/user/"].view.deleteElement(),r.a.urls["/settings/"].loaded=!1,r.a.urls["/settings/"].view.deleteElement(),r.a.hideLoading(),r.a.go("/user/"),e.forEach(e=>e.querySelector("input").value="")},e=>{document.querySelector(".settings").getElementsByClassName("input-block")[0].querySelector(".error").innerText=e,document.querySelector(".settings").getElementsByClassName("input-block")[0].querySelector(".error").classList.remove("hidden")})};window.validateSettings=(()=>{const e=[...document.querySelector(".settings").getElementsByClassName("input-block")];if(window.reader=new FileReader,e.reduce((e,t)=>e+validateSettingsInput(t),0)==e.length){const t=e[2].querySelector("input").files[0];reader.readAsDataURL(t),reader.onload=i}}),window.validateSettingsInput=(e=>{const t=e.querySelector("input"),n=e.querySelector(".error");return""===t.value?(t.classList.add("input-error"),n.classList.remove("hidden"),!1):(t.classList.remove("input-error"),n.classList.add("hidden"),!0)}),window.validateFocusSettingsInput=(e=>{e.querySelector("input").classList.remove("input-error"),e.querySelector(".error").classList.add("hidden")}),window.validateBlurSettingsInput=(e=>{const t=e.querySelector("input"),n=e.querySelector(".error");""===t.value&&(t.classList.add("input-error"),n.classList.remove("hidden"))}),window.goToUser=(()=>r.a.go("/user/"))},function(e,t,n){"use strict";var s=n(2),a=n(3),r=n(1);t.a=class extends s.a{update(e={}){for(const t in Object.keys(e.data)){const n=[];n.push(e.data[t].login),n.push(e.data[t].points),this.context.rows.push(n)}}preRender(){return a.a.doPost("/score",{position:0,count:5}).then(e=>{this.context.rows=[],this.context.headers=["Login","Points"];for(const t in Object.keys(e.data)){const n=[];n.push(e.data[t].login),n.push(e.data[t].points),this.context.rows.push(n)}})}render(){return'<div class="leaderboard">\n                        <Header>Leaderboard</Header>\n                        <div class="table">\n                            <div class="table-row">\n                                {{#each headers}}\n                                <div class="table-data table-header">{{this}}</div>\n                                {{/each}}\n                            </div>\n                            {{#each rows}}\n                            <div class="table-row">\n                            {{#each this}}  \n                                <div class="table-data">\n                                {{this}}\n                                </div>\n                            {{/each}}\n                            </div>\n                            {{/each}}\n                        </div>\n                </div>\n                <div class="button-container">\n                    <Button class="button large" click="(event){ paginate(currentPosition) }">More</Button>\n                    <Button class="button large" click="(event){ event.preventDefault(); goBack(); }">Back</Button>\n                </div>\n                <Footer>Made by Tarados Feroces</Footer>'}},window.currentPosition=5,window.paginate=(e=>{a.a.doPost("/score",{position:e,count:5}).then(e=>r.a.viewUpdate(e)),window.currentPosition+=5})},function(e,t){}]);
//# sourceMappingURL=bundle.js.map