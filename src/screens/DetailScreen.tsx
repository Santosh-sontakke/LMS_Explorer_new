import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../hooks/useRedux';
import { getFromStorage, saveToStorage } from '../utils/storage';
import { Course } from '../types';

export default function DetailScreen({ route }) {
  const { id: courseId } = route.params.course;
  const navigation = useNavigation();
  const course: Course | undefined = useAppSelector(state =>
    state.courses.courses?.find(c => c.id === courseId)
  );
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    getFromStorage('favorites').then(val => {
      const ids = val ? val : [];
      setIsFavorite(ids.includes(courseId));
    });
  }, [courseId]);

  const toggleFavorite = async () => {
    const val = await getFromStorage('favorites');
    let ids: number[] = [];

    try {
      ids = val ? val : [];
    } catch (e) {
      console.error('Failed to parse favorites:', e);
      ids = [];
    }

    if (ids.includes(courseId)) {
      ids = ids.filter((id: number) => id !== courseId);
    } else {
      ids.push(courseId);
    }

    await saveToStorage('favorites', ids);
    setIsFavorite(!isFavorite);
  };

  if (!course) return <Text style={styles.message}>Course not found</Text>;

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{course.title}</Text>
          <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
            <Text style={styles.favoriteButtonText}>
              {isFavorite ? 'Unfavorite' : 'Favorite'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>
          Instructor ID: <Text style={styles.value}>{course.userId}</Text>
        </Text>

        <Text style={styles.label}>Description:</Text>
        <Text style={styles.body}>{course.body}</Text>

        <Text style={styles.label}>
          Title Word Count: <Text style={styles.value}>{course.title.split(' ').length}</Text>
        </Text>

        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <View style={styles.backButtonContent}>
            <Text style={styles.backButtonText}>Back</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 12,
    color: '#333',
  },
  favoriteButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  favoriteButtonText: {
    color: '#333',
    fontSize: 13,
    fontWeight: '600',
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    fontWeight: '600',
    color: '#555',
  },
  value: {
    fontWeight: '400',
    color: '#222',
  },
  body: {
    fontSize: 15,
    color: '#444',
    marginTop: 8,
    lineHeight: 20,
  },
  backButton: {
    marginTop: 30,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  backButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButtonArrow: {
    color: '#fff',
    fontSize: 15,
    marginRight: 6,
  },

  backButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  message: {
    fontSize: 18,
    color: 'red',
    padding: 20,
    textAlign: 'center',
  },
});