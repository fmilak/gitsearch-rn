import {useLazyQuery} from '@apollo/client';
import {observer} from 'mobx-react';
import {Box, Button, Icon, Input, Stack, Text} from 'native-base';
import React from 'react';
import {useEffect} from 'react';
import {RootContext} from '../../App';
import {GET_REPOS_BY_USERNAME} from '../../service/GqlService';

const HomeView = observer(() => {
    const {homeStore, restStore} = React.useContext(RootContext);
    const [getRepos, {loading, error, data: repoData}] = useLazyQuery(GET_REPOS_BY_USERNAME);
    homeStore.restStore = restStore;
    homeStore.getRepos = getRepos;

    useEffect(() => {
        if (repoData) {
            homeStore.setRepositories(repoData.user.repositories.edges);
        }
    }, [homeStore, restStore]);

    return (
        <Box>
            <Stack w="80%">
                <Box>
                    <Input
                        size="lg"
                        placeholder="Username"
                        mb={2}
                        onChange={homeStore.onUsernameChange}
                        InputRightElement={
                            <Button ml={1} roundedLeft={0} roundedRight="md" onPress={homeStore.searchRepos}>
                                todo
                            </Button>
                        }
                    />
                </Box>
                <Box>
                    <Input size="lg" placeholder="Password" mb={2} onChange={homeStore.filterRepos} />
                </Box>
            </Stack>
            <Text>todo repo table</Text>
        </Box>
    );
});

export default HomeView;
