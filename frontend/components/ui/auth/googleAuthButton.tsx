import { Image, Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

export default function GoogleAuthButton() {
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
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <Image
                    style={{
                        position: 'absolute',
                        left: 20,
                        width: 30,
                        height: 30,
                    }}
                    source={require('@/assets/images/google.png')}
                />
                <Text style={style.authButtonText}>Continue with Google</Text>
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        width: '88%',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E1E1E1',
        borderRadius: 20,
        padding: 20,
    },
    authButtonText: {
        color: '#000000',
    },
});
