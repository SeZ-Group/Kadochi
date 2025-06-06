import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Colors } from '../assets/Colors';
import ProgressBar from '../components/ProgressBar';
import TextBox from '../components/TextBox';
import AnswerBox from '../components/AnswerBox';
import axios from 'axios';

import { Adivery } from "adivery";

// declare your placementIds

// these are test placements , replace with your own
const rewardedPlacement = "c3573ea3-3e83-4f33-b235-1d0e85562cfe"
const adiveryAppId = "dc85320f-59f6-4071-833b-23889786555a"
// initialize Adivery
Adivery.configure(adiveryAppId)


Adivery.prepareRewardedAd(rewardedPlacement);

const questionsData = [
    {
      key: "gender",
      question: "کادو برای یه خانمه یا آقا؟",
      options: [
        { key: "male", text: "آقا 👨" },
        { key: "female", text: "خانم 👩" }
      ],
    },
    {
      key: "relation",
      question: "این هدیه برای کیه؟",
      options: [
        { key: "friend", text: "یه دوست صمیمی 👯" },
        { key: "family", text: "یکی از اعضای خانواده 👨‍👩‍👧‍👦" },
        { key: "partner", text: "یه پارتنر عاشقانه 💖" },
        { key: "colleague", text: "یه همکار یا آشنا 🤝" }
      ],
    },
    {
      key: "age_group",
      question: "حدوداً چند سالشه؟",
      options: [
        { key: "teen", text: "یه نوجوون خفن (۱۰-۱۸) 🧑‍🎓" },
        { key: "young", text: "یه جوون پرانرژی (۱۸-۳۵) 🕺" },
        { key: "adult", text: "یه بزرگسال کاردرست (۳۵-۵۰)  👔" },
        { key: "senior", text: "یه آدم باتجربه و باحال (۵۱+) 🧓" }
      ],
    },
    {
      key: "interest",
      question: "به چی علاقه داره؟",
      options: [
        { key: "tech", text: "تکنولوژی و گجت‌های باحال 📱" },
        { key: "fashion", text: "مد و استایل 👗" },
        { key: "art", text: "کارهای هنری و خلاقانه 🎨" },
        { key: "books", text: "کتاب خوندن و دنیای داستان‌ها 📖" },
        { key: "cooking", text: "آشپزی و غذا 🍳" },
        { key: "sports", text: "ورزش و تحرک 💪" },
        { key: "travel", text: " سفر و ماجراجویی ✈️" },
        { key: "gaming", text: "گیم و دنیای بازی‌ها 🎮" },
        { key: "movies", text: " فیلم و سریال 🎥" }
      ],
    },
    {
      key: "budget",
      question: "چقدر می‌خوای هزینه کنی؟",
      options: [
        { key: "low", text: "کمتر از ۱۰۰ تومن 🧃" },
        { key: "medium", text: "بین ۱۰۰ تا ۱ میلیون تومن 🛍️" },
        { key: "high", text: "بین ۱ میلیون تا ۵ میلیون تومن 💰" },
        { key: "very_high", text: "بالای ۵ میلیون تومن 💎" }
      ],
    },
  ];  

const Questions = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [answers, setAnswers] = useState([]);
  
    const currentQuestion = questionsData[questionIndex];
    const isMultiSelect = currentQuestion.key === "interest";
    const isLastQuestion = questionIndex === questionsData.length - 1;
    const isFirstQuestion = questionIndex === 0;
  
    const isDisabled = isMultiSelect
      ? selectedOptions.length === 0
      : selectedOption === null;

    const handleBackToHome = () => {
        navigation.navigate('Welcome');
    };
      
  
    const handleNext = useCallback(async () => {
      if (isDisabled) return;
  
      const currentAnswer = isMultiSelect ? selectedOptions : [selectedOption];
  
      if (isLastQuestion) {
        setLoading(true); // Show loader
        const allAnswers = [...answers, currentAnswer];
        const finalAnswers = {};
  
        questionsData.forEach((q, i) => {
          finalAnswers[q.key] = Array.isArray(allAnswers[i])
            ? (q.key === "interest" ? allAnswers[i] : allAnswers[i][0])
            : allAnswers[i];
        });

        Adivery.isLoaded(rewardedPlacement).then((isLoaded) => {
           let counter = 0
           let interval = setInterval(async ()=>{
            counter += 1;
            if (isLoaded) {
             clearInterval(interval);
             Adivery.showAd(rewardedPlacement);
          }
          if (counter>5){
            clearInterval(interval);
            const response = await axios.post(`https://kadopych.ir/api/suggest/`, finalAnswers, {
              headers: {
                "Content-Type": "application/json",
              },
            });
            const suggestions = response.data;
            navigation.navigate("Result", { giftSuggestion: suggestions });

          }
           }, 200)
          });
          
        


         Adivery.addGlobalListener({
           onRewardedAdLoaded: (rewardedPlacement) => {
           }, onRewardedAdClosed: async(_, reward) =>{

            if(reward){
              try {

              const response = await axios.post(`https://kadopych.ir/api/suggest/`, finalAnswers, {
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const suggestions = response.data;
              navigation.navigate("Result", { giftSuggestion: suggestions });

            } catch (error) {
              setErrorMessage("یه مشکلی هست انگار، دوباره بزن!");
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            }
            finally {
              setLoading(false); // Hide loader
            }
      
            } else {
              setLoading(false); // Hide loader
              setErrorMessage("برای دیدن نتیجه نهایی، لطفا ویدیو رو کامل ببین!");
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            }
           }
          });
        
  
        return;
      }
  
      setAnswers(prev => [...prev, currentAnswer]);
      setQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setSelectedOptions([]);
    }, [selectedOption, selectedOptions, questionIndex, answers, isDisabled]);
  
    const handlePrevious = () => {
      if (isFirstQuestion) return;
  
      const previousIndex = questionIndex - 1;
      const previousAnswer = answers[previousIndex];
  
      // برگشت به حالت قبلی پاسخ
      if (questionsData[previousIndex].key === "interest") {
        setSelectedOptions(previousAnswer);
      } else {
        setSelectedOption(previousAnswer[0]);
      }
  
      setAnswers(prev => prev.slice(0, -1));
      setQuestionIndex(previousIndex);
    };
  
    return (
      
      <View style={styles.container}>
        <View style={styles.progressBar}>
          <ProgressBar questionNumber={questionIndex + 1} />
        </View>
  
        <View style={styles.questionBoxContainer}>
          <TextBox text={currentQuestion.question} fontSize={16} />
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
  
        <View style={styles.buttonContainer}>
            {isFirstQuestion ? (
                <TouchableOpacity
                style={[styles.navButton, styles.backButton]}
                onPress={handleBackToHome}
                >
                <Text style={styles.navButtonText}> صفحه اصلی</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                style={[styles.navButton, styles.backButton]}
                onPress={handlePrevious}
                >
                <Text style={styles.navButtonText}>قبلی</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={[styles.navButton, isDisabled && styles.disabledButton]}
                onPress={handleNext}
                disabled={isDisabled}
            >
                {loading ? (
    <ActivityIndicator color="#fff" />
  ) : (
    <Text style={styles.navButtonText}>
      {isLastQuestion ? "دیدن نتیجه" : "بعدی"}
    </Text>
    
  )}

                
            </TouchableOpacity>
        </View>
        {errorMessage && (
  <View style={{ backgroundColor: '#fdd', padding: 10, marginVertical: 10, borderRadius: 8 }}>
    <Text style={{ color: '#900', textAlign: 'center' }}>{errorMessage}</Text>
  </View>
)}

      </View>
    );
  };
  

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
  disabledButton: {
    backgroundColor: '#cccccc',
    opacity: 0.6,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  navButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '48%',
  },
  navButtonText: {
    color: '#fff',
    fontFamily: 'Yaghut',
    fontSize: 13,
  },
  backButton: {
    backgroundColor: Colors.secondary, 
  },
  backButton: {
    backgroundColor: Colors.secondary,
  },
  loadingOverlay: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  }
  
  
});

export default Questions;
