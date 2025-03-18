import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Colors } from '../assets/Colors';
import ProgressBar from '../components/ProgressBar';
import TextBox from '../components/TextBox';
import AnswerBox from '../components/AnswerBox';

const questionsData = [
    {
        question: "زن هست یا مرد؟",
        options: [
            { key: "male", text: "👨 مرد" },
            { key: "female", text: "👩 زن" }
        ]
    },
    {
        question: "این هدیه برای کیه؟",
        options: [
            { key: "friend", text: "👯 یه دوست صمیمی" },
            { key: "family", text: "👨‍👩‍👧‍👦 یکی از اعضای خانواده" },
            { key: "partner", text: "💖 یه پارتنر عاشقانه" },
            { key: "colleague", text: "🤝 یه همکار یا آشنا" }
        ]
    },
    {
        question: "چند سالشه؟",
        options: [
            { key: "teen", text: "🧑‍🎓 یه نوجوون خفن (۱۰-۱۸)" },
            { key: "young", text: "🎉 یه جوون پرانرژی (۱۸-۳۵)" },
            { key: "adult", text: "📅 یه بزرگسال کاردرست (۳۵-۵۰)" },
            { key: "senior", text: "🌟 یه آدم باتجربه و باحال (۵۱+)" }
        ]
    },
    {
        question: "به چی علاقه داره؟",
        options: [
            { key: "tech", text: "📱 تکنولوژی و گجت‌های خفن " },
            { key: "fashion", text: "👗 مد و استایل " },
            { key: "art", text: "🎨 یه هنرمنده!" },
            { key: "books", text: "📖 یه کتاب‌خوره!" },
            { key: "cooking", text: "🍳 آشپزی و غذا" },
            { key: "sports", text: "💪 عاشق ورزشه" },
            { key: "travel", text: "✈️ عشق سفر و ماجراجوییه" },
            { key: "gaming", text: "🎮 گیمینگ" },
            { key: "movies", text: "🎥 عشق فیلم و سریاله" }
        ]
    },
    {
        question: "چقدر می‌خوای هزینه کنی؟",
        options: [
            { key: "low", text: "💵 کمتر از ۱۰۰ تومن" },
            { key: "medium", text: "💰 بین ۱۰۰ تا ۱ میلیون تومن" },
            { key: "high", text: "💳 بین ۱ میلیون تا ۵ میلیون تومن" },
            { key: "very_high", text: "💎 بالای ۵ میلیون تومن" }
        ]
    }
];

function Questions() {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const currentQuestion = questionsData[questionIndex];
    const isMultiSelect = currentQuestion.question === "به چی علاقه داره؟";

    const handleNext = () => {
        console.log("انتخاب‌های نهایی:", isMultiSelect ? selectedOptions : selectedOption);

        setQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
        setSelectedOptions([]); // Reset selections for next question
    };

    return (
        <View style={styles.container}>
            <View style={styles.progressBar}>
                <ProgressBar questionNumber={questionIndex + 1} />
            </View>

            {/* نمایش سوال */}
            <View style={styles.questionBoxContainer}>
                <TextBox text={currentQuestion.question} fontSize={18}/>
            </View>

            {/* نمایش گزینه‌ها داخل ScrollView */}
            <ScrollView style={styles.scrollableOptions} contentContainerStyle={styles.optionsContainer}>
                {currentQuestion.options.map(option => (
                    <View key={option.key} style={styles.answerBoxContainer}>
                        <AnswerBox 
                            text={option.text}
                            selectedOption={isMultiSelect ? selectedOptions : selectedOption}
                            setSelectedOption={isMultiSelect ? setSelectedOptions : setSelectedOption}
                            optionKey={option.key}
                            isMultiSelect={isMultiSelect}
                        />
                    </View>
                ))}
            </ScrollView>

            {/* دکمه بعدی */}
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>بعدی</Text>
            </TouchableOpacity>
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
        height: '18%',
    },
    scrollableOptions: {
        position: 'absolute',
        top: '45%',
        width: '80%',
        height: '40%',
    },
    optionsContainer: {
        alignItems: 'center',
        paddingBottom: 20, 
    },
    answerBoxContainer: {
        alignItems: 'center',
        width: '100%',
        marginBottom: 10, 
    },
    nextButton: {
        position: 'absolute',
        bottom: 50,
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    nextButtonText: {
        color: "#fff",
        fontSize: 18,
    },
});

export default Questions;
