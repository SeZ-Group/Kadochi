import React from 'react';
import { View, StyleSheet, Image, ImageBackground, ScrollView, Text } from 'react-native';
import { Colors } from '../assets/Colors';
import Button from '../components/Button';

function Welcome({navigation}) { // ✅ Receive navigation prop
    return (
        <ImageBackground
            source={require('../assets/bg.jpg')}
            style={styles.imageBackground}
        >
            <View style={styles.overlay}>
                
                {/* Logo and Title */}
                <View style={styles.header}>
                    <Image source={require('../assets/logo.webp')} style={styles.logo} />
                    <Text style={styles.title}>کادوچی</Text>
                </View>

                <ScrollView 
                    contentContainerStyle={styles.scrollViewContent}
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            خرید کادو کلافت کرده؟ ایده کادو نداری ؟
                            {'\n'}
                            کادویاب با هوش مصنوعی کادو کمکت میکنه !
                            {'\n'}
                            ایده کادو خاص خودت رو با چالش دوست شناسی پیدا کن
                            {'\n'}
                            و بهترین خرید کادو رو انجام بده
                        </Text>
                    </View>
                </ScrollView>

                <View style={styles.buttonContainer}>
                    <Button title="بزن بریم" onPress={() => navigation.navigate('Questions')} />
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        width: '100%',
        backgroundColor: `${Colors.primary}95`,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginTop: 80,
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    textContainer: {
        width: '90%',
        minHeight: 100,
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 1)',
        textAlign: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: '10%',
        width: '80%',
        zIndex: 2,
    },
});

export default Welcome;
