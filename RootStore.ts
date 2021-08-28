import HomeStore from './layout/home/HomeStore';
import RepoStore from './layout/home/repo/RepoStore';
import LoginStore from './layout/login/LoginStore';
import RestStore from './service/RestStore';

class RootStore {
    loginStore: LoginStore;
    homeStore: HomeStore;
    repoStore: RepoStore;
    restStore: RestStore;

    constructor() {
        this.loginStore = new LoginStore();
        this.homeStore = new HomeStore();
        this.repoStore = new RepoStore();
        this.restStore = new RestStore();
    }
}

export default RootStore;
