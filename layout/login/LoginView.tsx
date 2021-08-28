import {observer} from 'mobx-react';
import {Box, Button, Center, CheckIcon, Heading, Icon, Input, Stack} from 'native-base';
import React from 'react';
import {useEffect} from 'react';
import {Text} from 'react-native-svg';
import {RootContext} from '../../App';

const LoginView = observer(() => {
    const {loginStore, restStore} = React.useContext(RootContext);

    useEffect(() => {
        loginStore.restStore = restStore;
    }, [loginStore, restStore]);

    return (
        <Center flex={1}>
            <Box>
                <Heading size="2xl" mb={3}>
                    GitHub Search
                </Heading>
            </Box>
            <Box>
                <Heading size="lg" mb={2}>
                    Login
                </Heading>
            </Box>
            <Stack w="80%">
                <Box>
                    <Input size="lg" placeholder="Username" mb={2} onChange={loginStore.onUsernameChange} />
                </Box>
                <Box>
                    <Input type="password" size="lg" placeholder="Password" mb={2} onChange={loginStore.onPasswordChange} />
                </Box>
            </Stack>
            <Box w="60%">
                <Button variant="outline" onPress={loginStore.tryLogin}>
                    Login
                </Button>
            </Box>
        </Center>
    );
});

export default LoginView;
