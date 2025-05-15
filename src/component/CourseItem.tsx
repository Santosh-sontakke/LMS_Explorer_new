import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Course } from '../types';

interface Props {
  course: Course;
  onPress: () => void;
  wordCount: number;
  isFavorite: boolean;
}

export default function CourseItem({ course, onPress, wordCount, isFavorite }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{course.title}</Text>
      <Text>Instructor ID: {course.userId}</Text>
      <Text>Title Word Count: {wordCount}</Text>
      {isFavorite && <Text>⭐ Favorite</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontWeight: 'bold',
  },
});
