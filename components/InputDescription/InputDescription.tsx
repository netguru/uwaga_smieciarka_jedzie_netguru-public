import React from 'react';
import {Text, ViewProps, View, StyleSheet, ActivityIndicator} from 'react-native';
import Input from '../Input/Input';
import {FontFamily, FontSize, StyledText} from '../StyledText';
import Colors from '../../constants/Colors';

interface InputDescriptionProps extends ViewProps {
    onTextChange: (text: string) => void;
    text: string;
    isLoading: boolean;
}

const InputDescription: React.FC<InputDescriptionProps> = ({onTextChange, text, isLoading, ...props}) => {
    return (
        <View style={styles.container}>
            <StyledText fontSize={FontSize.f18} fontFamily={FontFamily.LatoBold} style={styles.header}>
                Opis
            </StyledText>
            <View style={styles.descriptionContainer}>
                {isLoading ? <StyledText>Generowanie opisu...</StyledText> : <StyledText
                    fontSize={FontSize.f12}
                    fontFamily={FontFamily.LatoRegular}
                    style={styles.description}>

                    Zapisuje się automatycznie.{' '}
                    <StyledText fontFamily={FontFamily.LatoBold}>Wklej go </StyledText>
                    podczas udostępniania!
                </StyledText>}
            </View>
            {isLoading ? <View style={styles.loaderWrapper}><ActivityIndicator/></View> :
                <Input
                    onTextChange={onTextChange}
                    text={text}
                    style={styles.input}
                    placeholder='W tym miejscu pojawi się wygenerowany opis 🤖'
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingBottom: 4,
    },
    description: {
        paddingBottom: 8,
    },
    descriptionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 12,
    },
    container: {
        paddingTop: 18,
        marginVertical: 8,
        marginBottom: 18,
    },
    input: {
        backgroundColor: Colors.white,
        paddingVertical: 16,
        paddingHorizontal: 24,
        paddingTop: 12,
        borderColor: Colors.black,
        borderWidth: 1,
        fontFamily: FontFamily.LatoRegular,
        fontSize: FontSize.f16,
        lineHeight: 24,
    },
    loaderWrapper: {
        padding: 20
    }
});

export default InputDescription;
