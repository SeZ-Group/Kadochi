import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../assets/Colors';
import ProgressBar from '../components/ProgressBar';
import TextBox from '../components/TextBox';

function Questions() {
    return (
        <View style={styles.container}>
            <View style={styles.progressBar}>
                <ProgressBar />
            </View>

            <View style={styles.questionBoxContainer}>
                <TextBox text="چند سالشه؟" fontSize={18}/>
            </View>

            <View style={styles.answerBoxContainer}>
                <TextBox text=" یه نوجوون خفن (۱۰-۱۸) 🧑‍🎓" fontSize={20}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    progressBar: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '12%',
        zIndex: 2,
    },
    questionBoxContainer: {
        alignItems: 'center',
        position: 'absolute',
        top: '20%',
        zIndex: 1,
        width: '80%',
        height: '20%',
    },
    answerBoxContainer: {
        alignItems: 'center',
        position: 'absolute',
        top: '45%',
        zIndex: 1,
        width: '80%',
        height: '7%',
    },
});

export default Questions;
