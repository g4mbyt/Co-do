import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function AuthInputField({
    label,
    placeholder,
    value,
    onChangeText,
}: {
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
}) {
    return (
        <View style={style.wrapper}>
            <Text>{label}</Text>
            <TextInput
                style={style.inputField}
                placeholder={placeholder}
                placeholderTextColor={'#A4A4A4'}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}

const style = StyleSheet.create({
    wrapper: {
        width: '88%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 10,
    },
    inputField: {
        padding: 20,
        width: '100%',
        backgroundColor: '#E3E3E3',
        borderRadius: 20,
    },
});
