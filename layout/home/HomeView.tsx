import {useLazyQuery} from '@apollo/client';
import {observer} from 'mobx-react';
import {Box, Button, ChevronRightIcon, FlatList, Heading, Icon, Input, Stack, Text, View} from 'native-base';
import React, {ReactElement} from 'react';
import {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {RootContext} from '../../App';
import GitRepoResponse from '../../model/GitRepoResponse';
import {GET_REPOS_BY_USERNAME} from '../../service/GqlService';

const RepoView = observer(({repoName, callback}: {repoName: string; callback: Function}) => {
    return (
        <View
            style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                paddingHorizontal: 15,
                paddingVertical: 20,
            }}>
            <TouchableOpacity onPress={() => callback(repoName)} style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 9}}>
                    <Text>{repoName}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <ChevronRightIcon />
                </View>
            </TouchableOpacity>
        </View>
    );
});

const RepoHeader = observer(() => {
    return (
        <Box
            style={{
                borderBottomColor: '#486E95',
                borderTopColor: '#486E95',
                borderBottomWidth: 2,
                borderTopWidth: 2,
                marginBottom: 5,
                paddingHorizontal: 15,
                paddingVertical: 10,
            }}>
            <Text style={{fontSize: 20, alignSelf: 'center', color: '#486E95'}}>Repositories</Text>
        </Box>
    );
});

const HomeContent = observer(({repos, callback}: {repos: Array<GitRepoResponse>; callback: Function}) => {
    return (
        <Box>
            <FlatList
                ListHeaderComponent={<RepoHeader />}
                data={repos}
                keyExtractor={(item, index): string => index.toString()}
                renderItem={({item: repo}: {item: GitRepoResponse}): ReactElement => (
                    <RepoView repoName={repo.name} callback={callback} />
                )}
            />
        </Box>
    );
});

const HomeView = observer(({navigation}: {navigation: any}) => {
    const {homeStore, restStore} = React.useContext(RootContext);
    const [getRepos, {loading, error, data: repoData}] = useLazyQuery(GET_REPOS_BY_USERNAME);
    homeStore.restStore = restStore;
    homeStore.getRepos = getRepos;
    homeStore.navigation = navigation;

    useEffect(() => {
        if (repoData) {
            homeStore.setRepositories(repoData.user.repositories.edges);
        }
    }, [loading, repoData, homeStore]);

    useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error]);

    return (
        <View>
            <Heading style={{padding: 10, backgroundColor: '#486E95', color: 'white'}}>GitHub Search</Heading>
            <Stack w="80%" style={{marginHorizontal: 10, marginVertical: 15}}>
                <Box>
                    <Input
                        size="lg"
                        placeholder="Username"
                        mb={2}
                        onChangeText={homeStore.onUsernameChange}
                        InputRightElement={
                            <Button
                                ml={1}
                                roundedLeft="lg"
                                roundedRight="lg"
                                variant="ghost"
                                onPress={homeStore.searchRepos}
                                color="#486E95">
                                Search
                            </Button>
                        }
                    />
                </Box>
                <Box>
                    <Input size="lg" placeholder="Repository filter" mb={2} onChangeText={homeStore.filterRepos} />
                </Box>
            </Stack>
            <HomeContent repos={[...homeStore.shownData]} callback={homeStore.navigateToRepo} />
        </View>
    );
});

export default HomeView;
