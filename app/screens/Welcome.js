import React from 'react';
import { View, StyleSheet, Image, ImageBackground, ScrollView, Text, TouchableOpacity } from 'react-native';
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
                    <Image source={require('../assets/best-logo.png')} style={styles.logo} />
                    <Text style={styles.title}>کادوپیچ</Text>
                </View>

                <ScrollView 
                    contentContainerStyle={styles.scrollViewContent}
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                        ایده‌ای برای اینکه کادو چی بخری، نداری؟ 
                            {'\n'}
                            {'\n'}
                            اشکال نداره، کادوپیچ اینجاست تا با چند تا سوال ساده با کسی که میخوای براش کادو بخری آشنا بشه و کلی ایده‌ی خاص و باحال بهت بده.
                            {'\n'}
                            {'\n'}
                            بریم سراغ سوال‌ها؟
                            </Text>
                    </View>
                </ScrollView>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Questions')}>
                        <Text style={styles.buttonText}>بزن بریم</Text>
                    </TouchableOpacity>
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
        backgroundColor: `${Colors.primary}80`,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
        marginBottom: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 100,
        width: 160,
        height: 160,
        position: 'relative', // make it a positioned container
    },
    logo: {
        width: 95,
        height: 95,
        resizeMode: 'contain',
    },
    title: {
        position: 'absolute',
        bottom: '8%',
        right: '20%',
        fontSize: 14,
        color: '#F8C660',
        fontFamily: 'Yaghut',
        textAlign: 'right',
        writingDirection: 'rtl',
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
        bottom: '10%',
        width: '85%',
        minHeight: 100,
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 13,
        color: '#EEEFF2',
        textAlign: 'right',
        fontFamily: 'Yaghut',
        // textAlign: 'justify',
        writingDirection: 'rtl',
        
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height:'100%'
    },
    buttonContainer: {
        position: 'absolute',
        bottom: '10%',
        width: '80%',
        height: '6.5%',
        zIndex: 2,  
        borderRadius: 20,
        backgroundColor: '#F8C660',
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: 'Yaghut',
    }
});

export default Welcome;
