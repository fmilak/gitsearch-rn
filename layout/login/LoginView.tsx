import {observer} from 'mobx-react';
import {Box, Button, Center, CheckIcon, Heading, Icon, Input, Stack} from 'native-base';
import React from 'react';
import {useEffect} from 'react';
import {Text} from 'react-native-svg';
import {RootContext} from '../../App';

interface LoginViewProps {
    navigation: any;
}

const LoginView: React.FC<LoginViewProps> = observer(({navigation}) => {
    const {loginStore, restStore} = React.useContext(RootContext);
    loginStore.restStore = restStore;
    loginStore.navigation = navigation;

    useEffect(() => {}, [loginStore, restStore]);

    return (
        <Center flex={1}>
            <Box>
                <Heading size="2xl" mb={3} color="#486E95">
                    GitHub Search
                </Heading>
            </Box>
            <Box>
                <Heading size="lg" mb={2} color="#486E95">
                    Login
                </Heading>
            </Box>
            <Stack w="80%">
                <Box>
                    <Input size="lg" placeholder="Username" mb={2} onChangeText={loginStore.onUsernameChange} />
                </Box>
                <Box>
                    <Input type="password" size="lg" placeholder="Password" mb={2} onChangeText={loginStore.onPasswordChange} />
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
