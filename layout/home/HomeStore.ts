import {action, observable} from 'mobx';
import GitRepoResponse from '../../model/GitRepoResponse';
import RestStore from '../../service/RestStore';

class HomeStore {
    restStore!: RestStore;

    getRepos!: Function;

    @observable username = '';

    repositories: Array<GitRepoResponse> = new Array<GitRepoResponse>();

    @observable shownData: Array<GitRepoResponse> = new Array<GitRepoResponse>();

    // Shown table columns
    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Languages',
            dataIndex: 'languages',
            key: 'languages',
        },
        {
            title: 'Owner',
            dataIndex: ['owner', 'login'],
            key: ['owner', 'login'],
        },
    ];

    @action
    onUsernameChange = (e: any): void => {
        this.username = e.target.value;
    };

    @action
    filterRepos = (e: any): void => {
        this.shownData = this.repositories.filter((repo: GitRepoResponse) => {
            if (repo.name.includes(e.target.value)) {
                return repo;
            }
        });
    };

    searchRepos = (): void => {
        this.getReposByUsername(this.username);
    };

    getReposByUsername = async (username: string): Promise<void> => {
        this.getRepos({
            variables: {username: username},
        });
    };

    @action
    setRepositories = (repositories: any): void => {
        this.repositories = repositories.map((repos: any) => {
            return {...repos.node};
        });
        this.repositories.forEach((repo: any) => {
            if (repo.languages) {
                repo.languages = repo.languages.nodes
                    .map((node: any) => {
                        return node.name;
                    })
                    .join(', ');
            }
        });
        this.shownData = [...this.repositories];
    };
}

export default HomeStore;
