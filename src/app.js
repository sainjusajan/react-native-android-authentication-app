import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Header, Button, CardSection, Spinner } from './components/common'
import firebase from 'firebase';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = { loggedIn :null };
    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyC_BY9wRJFzqyOnHXUx9u6iAQW_8buFLgE',
            authDomain: 'authentication-49380.firebaseapp.com',
            databaseURL: 'https://authentication-49380.firebaseio.com',
            projectId: 'authentication-49380',
            storageBucket: 'authentication-49380.appspot.com',
            messagingSenderId: '144720822799'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                this.setState({ loggedIn: true });
            }else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch(this.state.loggedIn) {
            case true:
                return(
                     <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
                    </CardSection>
                );
            case false: 
                return <LoginForm />
            default: 
                return (
                    <CardSection>
                        <Spinner size="large" />
                    </CardSection>
                )
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication"></Header>
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
