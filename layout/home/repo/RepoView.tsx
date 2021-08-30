import {observer} from 'mobx-react';
import {Box, Container, Heading, Text, View} from 'native-base';
import React, {useEffect} from 'react';
import {Touchable, TouchableOpacity} from 'react-native';
import GitRepoResponse from '../../../model/GitRepoResponse';

interface RepoViewProps {
    navigation: any;
    route: any;
}

const RepoView: React.FC<RepoViewProps> = observer(({navigation, route}) => {
    const {selectedRepo} = route.params;
    const repo: GitRepoResponse = JSON.parse(selectedRepo);

    return (
        <View>
            <Heading style={{padding: 10, backgroundColor: '#486E95', color: 'white'}}>Repository details</Heading>
            <View style={{alignContent: 'center', justifyContent: 'center', marginHorizontal: 15, marginVertical: 20}}>
                <View style={{flexDirection: 'row', marginVertical: 15}}>
                    <Text style={{flex: 4, fontSize: 20, fontWeight: 'bold', color: '#486E95'}}>Repository name: </Text>
                    <Text style={{flex: 6, fontSize: 20}}>{repo.name}</Text>
                </View>
                <View style={{flexDirection: 'row', marginVertical: 15}}>
                    <Text style={{flex: 4, fontSize: 20, fontWeight: 'bold', color: '#486E95'}}>Repository description: </Text>
                    <Text style={{flex: 6, fontSize: 20}}>{repo.description}</Text>
                </View>
                <View style={{flexDirection: 'row', marginVertical: 15}}>
                    <Text style={{flex: 4, fontSize: 20, fontWeight: 'bold', color: '#486E95'}}>Repository languages: </Text>
                    <Text style={{flex: 6, fontSize: 20}}>{repo.languages}</Text>
                </View>
                <View style={{flexDirection: 'row', marginVertical: 15}}>
                    <Text style={{flex: 4, fontSize: 20, fontWeight: 'bold', color: '#486E95'}}>Repository owner: </Text>
                    <Text style={{flex: 6, fontSize: 20}}>{repo.owner.login}</Text>
                </View>
            </View>
        </View>
    );
});

export default RepoView;
