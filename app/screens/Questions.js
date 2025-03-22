import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Colors } from '../assets/Colors';
import ProgressBar from '../components/ProgressBar';
import TextBox from '../components/TextBox';
import AnswerBox from '../components/AnswerBox';
import axios from 'axios';
import Constants from 'expo-constants';

const { API_KEY, API_BASE_URL } = Constants.expoConfig?.extra ?? {};

const valueMap = {
    male: "مرد",
    female: "زن",
    friend: "دوست صمیمی",
    family: "عضو خانواده",
    partner: "پارتنر عاشقانه",
    colleague: "همکار یا آشنا",
    teen: "نوجوان بین ۱۰ تا ۱۸ سال",
    young: "جوان بین ۱۸ تا ۳۵ سال",
    adult: "بزرگسال بین ۳۵ تا ۵۰ سال",
    senior: "سالمند بالای ۵۰ سال",
    tech: "تکنولوژی",
    fashion: "مد و فشن",
    art: "هنر",
    books: "کتاب",
    cooking: "آشپزی",
    sports: "ورزش",
    travel: "سفر",
    gaming: "بازی و گیمینگ",
    movies: "فیلم و سریال",
    low: "کمتر از ۱۰۰ هزار تومان",
    medium: "بین ۱۰۰ هزار تا ۱ میلیون تومان",
    high: "بین ۱ تا ۵ میلیون تومان",
    very_high: "بیشتر از ۵ میلیون تومان"
};


const questionsData = [
    { question: "زن هست یا مرد؟", options: [
        { key: "male", text: "👨 مرد" },
        { key: "female", text: "👩 زن" }
    ]},
    { question: "این هدیه برای کیه؟", options: [
        { key: "friend", text: "👯 یه دوست صمیمی" },
        { key: "family", text: "👨‍👩‍👧‍👦 یکی از اعضای خانواده" },
        { key: "partner", text: "💖 یه پارتنر عاشقانه" },
        { key: "colleague", text: "🤝 یه همکار یا آشنا" }
    ]},
    { question: "چند سالشه؟", options: [
        { key: "teen", text: "🧑‍🎓 یه نوجوون خفن (۱۰-۱۸)" },
        { key: "young", text: "🎉 یه جوون پرانرژی (۱۸-۳۵)" },
        { key: "adult", text: "📅 یه بزرگسال کاردرست (۳۵-۵۰)" },
        { key: "senior", text: "🌟 یه آدم باتجربه و باحال (۵۱+)" }
    ]},
    { question: "به چی علاقه داره؟", options: [
        { key: "tech", text: "📱 تکنولوژی و گجت‌های خفن " },
        { key: "fashion", text: "👗 مد و استایل " },
        { key: "art", text: "🎨 یه هنرمنده!" },
        { key: "books", text: "📖 یه کتاب‌خوره!" },
        { key: "cooking", text: "🍳 آشپزی و غذا" },
        { key: "sports", text: "💪 عاشق ورزشه" },
        { key: "travel", text: "✈️ عشق سفر و ماجراجوییه" },
        { key: "gaming", text: "🎮 گیمینگ" },
        { key: "movies", text: "🎥 عشق فیلم و سریاله" }
    ]},
    { question: "چقدر می‌خوای هزینه کنی؟", options: [
        { key: "low", text: "💵 کمتر از ۱۰۰ تومن" },
        { key: "medium", text: "💰 بین ۱۰۰ تا ۱ میلیون تومن" },
        { key: "high", text: "💳 بین ۱ میلیون تا ۵ میلیون تومن" },
        { key: "very_high", text: "💎 بالای ۵ میلیون تومن" }
    ]}
];

function Questions({ navigation }) {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [answers, setAnswers] = useState([]);

    const currentQuestion = questionsData[questionIndex];
    const isMultiSelect = currentQuestion.question === "به چی علاقه داره؟";
    const handleNext = async () => {
        const currentAnswer = isMultiSelect ? selectedOptions : [selectedOption];
    
        if (questionIndex === questionsData.length - 1) {
            const allAnswers = [...answers, currentAnswer]; // اضافه کردن جواب آخر به لیست جواب‌ها
    
            // تبدیل به متن
            const selectedTexts = allAnswers.map((answerArray, index) => {
                const mappedAnswers = answerArray.map(key => valueMap[key]).filter(Boolean);
                return mappedAnswers.join(' و ');
            });
    
            // ساخت پرامپت
            let prompt = `من یک هدیه‌ای می‌خوام برای یک ${selectedTexts[0]} که ${selectedTexts[1]} حساب می‌شه، تقریبا سنش ${selectedTexts[2]} هست. به ${selectedTexts[3]} علاقه داره و می‌خوام که اندازه ${selectedTexts[4]} هزینه کنم. لطفا واسخ رو به این فرمت بده می خوام رد کد استفاده کنم:
    
    [
    {product-title: ..., product-image: ... product-description: ...},
    {product-title: ..., product-image: ... product-description: ...},
    ]
    و هیچ چیز اضافه‌ای نده. فقط همین json
    همچنین لینک عکس ،واقعی و valid بده.`;
            prompt += ' برام مهمه که تو ایران بتونم پیشنهادات رو پیدا کنم، مثلا از دی‌جی‌کالا یا ترب یا با سلام. لطفا پیشنهادت رو در قالب یه لیست ۵ تایی به همراه عکس و اگه لینک داره بده.';
    
            let giftSuggestion;
            let jsonString;
    
            try {
                console.log("پرامپت", prompt);
                const response = await axios.post(`${API_BASE_URL}/chat/completions`, {
                    model: "gpt-4o",
                    messages: [{ role: "user", content: prompt }],
                    temperature: 0.7,
                }, {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        "Content-Type": "application/json",
                    },
                });
    
                giftSuggestion = response.data.choices[0].message.content;
            } catch (error) {
                console.error("خطا در دریافت پاسخ:", error);
            }
    
            try {
                jsonString = giftSuggestion
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();
            } catch (error) {
                console.error(error);
            }
    
            console.log("Extracted JSON String:", jsonString);
            navigation.navigate('Result', {
                giftSuggestion: jsonString
            });
            return;
        }
    
        setAnswers(prev => [...prev, currentAnswer]);
        setQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
        setSelectedOptions([]);
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.progressBar}>
                <ProgressBar questionNumber={questionIndex + 1} />
            </View>
            <View style={styles.questionBoxContainer}>
                <TextBox text={currentQuestion.question} fontSize={18} />
            </View>
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
