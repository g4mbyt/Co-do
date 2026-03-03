import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

export default function LoginButton({
    handleLogin,
}: {
    handleLogin: () => void;
}) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const handlePressIn = () => {
        scale.value = withSpring(0.91, { damping: 50, stiffness: 1200 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, { damping: 50, stiffness: 1200 });
    };

    return (
        <Animated.View style={[style.wrapper, animatedStyle]}>
            <Pressable
                style={style.authButton}
                onPress={handleLogin}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <Text style={style.authButtonText}>Authenticate</Text>
            </Pressable>
        </Animated.View>
    );
}

const style = StyleSheet.create({
    wrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    authButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '88%',
        backgroundColor: '#111114',
        borderRadius: 20,
        padding: 20,
    },
    authButtonText: {
        color: '#FFFFFF',
    },
});
