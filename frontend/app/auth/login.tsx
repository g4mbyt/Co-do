import AuthInputField from '@/components/ui/auth/authInputField';
import GoogleAuthButton from '@/components/ui/auth/googleAuthButton';
import LoginButton from '@/components/ui/auth/loginButton';
import SignupButton from '@/components/ui/auth/signupButton';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Keyboard,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        //await authClient.signIn.email({
        //    email,
        //    password,
        //});
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={style.wrapper}>
                <View style={style.form}>
                    <AuthInputField
                        label='Email'
                        placeholder='Enter your email address'
                        value={email}
                        onChangeText={setEmail}
                    />
                    <AuthInputField
                        label='Password'
                        placeholder='Enter your password'
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={style.controls}>
                    <LoginButton handleLogin={handleLogin} />
                    <GoogleAuthButton />
                    <View style={style.separator}>
                        <View style={style.separatorLine}></View>
                        <Text style={style.separatorText}>or</Text>
                        <View style={style.separatorLine}></View>
                    </View>
                    <Text>Are you new here?</Text>
                    <SignupButton
                        handleSignup={() => {
                            router.push('/auth/signup');
                        }}
                    />
                </View>
                <Text style={{ position: 'absolute', bottom: 40 }}>
                    Ran into a problem?{' '}
                    <Pressable>
                        <Text>Contact support.</Text>
                    </Pressable>
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const style = StyleSheet.create({
    wrapper: {
        fontFamily: Platform.select({
            android: 'SpaceGrotesk_400Regular',
            ios: 'SpaceGrotesk-Regular',
        }),
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        backgroundColor: '#FFFFFF',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        width: '100%',
    },
    controls: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        width: '100%',
    },
    signupSwitcherButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '88%',
        borderWidth: 3,
        borderColor: '#5A36FF',
        borderRadius: 20,
        padding: 20,
    },
    signupSwitcherButtonText: {
        color: '#000000',
    },
    separator: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        width: '88%',
    },
    separatorLine: {
        width: '40%',
        height: 1,
        backgroundColor: '#CACACA',
    },
    separatorText: {
        color: '#CACACA',
    },
});
