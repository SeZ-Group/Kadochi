import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated} from 'react-native'
import Svg, { Circle } from 'react-native-svg';
import { Colors } from '../assets/Colors';

function ProgressBar({ questionNumber = 2, questionCounts = 5 }) {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const percentage = questionNumber*100/questionCounts;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: percentage,
            duration: 800, // مدت زمان انیمیشن (میلی‌ثانیه)
            useNativeDriver: false,
        }).start();
    }, [percentage]);

    const radius = 40; // شعاع دایره (اندازه داخل دایره)
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;
    
    const strokeDashoffset = animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [circumference, 0], // برای نمایش مقدار درصد
    });

    return (
        <View style={styles.container}>
            <Svg width={90} height={90} viewBox="0 0 90 90">
                {/* دایره پس‌زمینه */}
                <Circle
                    cx="45"
                    cy="45"
                    r={radius}
                    stroke={Colors.secondary}
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* دایره متحرک پیشرفت */}
                <AnimatedCircle
                    cx="45"
                    cy="45"
                    r={radius}
                    stroke={Colors.primary}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    rotation="-90"
                    origin="45,45"
                />
            </Svg>

            {/* دایره داخلی سفید */}
            <View style={styles.innerCircle}>
                <Animated.Text style={styles.text}>{questionNumber} / {questionCounts}</Animated.Text>
            </View>
        </View>
    );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
    container: {
        width: 90,
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerCircle: {
        position: 'absolute',
        width: 70,
        height: 70,
        borderRadius: 100,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primary,
    },
});

export default ProgressBar
