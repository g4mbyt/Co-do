import SignupButton from '@/components/ui/auth/signupButton';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function Signup() {
    const router = useRouter();
    return (
        <View>
            <Text>Signup</Text>
            <SignupButton
                handleSignup={() => {
                    router.back();
                }}
            />
        </View>
    );
}
