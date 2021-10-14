import {action, observable} from 'mobx';
import RestOptions from '../../model/RestOptions';
import RestStore from '../../service/RestStore';

class LoginStore {
    restStore!: RestStore;

    navigation!: any;

    setGithubToken: any;

    @observable userRights = 'LoginNavigator';

    @observable username = '';

    @observable password = '';

    @action
    onUsernameChange = (value: string): void => {
        this.username = value;
    };

    @action
    onPasswordChange = (value: string): void => {
        this.password = value;
    };

    @action
    tryLogin = async (): Promise<void> => {
        this.userRights = 'AppNavigator';
        const restInit: RestOptions = new RestOptions();
        restInit.url = '/token';
        restInit.headers = {
            'Content-Type': 'application/json',
        };
        restInit.method = 'POST';
        restInit.body = JSON.stringify({
            uuid: '',
            username: this.username,
            password: this.password,
        });
        this.restStore.fetch(restInit.url, restInit, this.handleLoginResponse);
    };

    @action
    handleLoginResponse = (responseJson: any): void => {
        this.setGithubToken(responseJson.token);
        this.userRights = 'AppNavigator';
    };
}

export default LoginStore;
