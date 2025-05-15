import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import CustomPicker from '../component/CustomPicker';
import { fetchCourses } from '../redux/coursesSlice';
import { RootState } from '../redux/store';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state: RootState) => state.courses);

  const [selectedInstructor, setSelectedInstructor] = useState<'all' | number>('all');
  const [showLongTitlesOnly, setShowLongTitlesOnly] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  const uniqueInstructorIds = useMemo(() => {
    const ids = courses.map((course) => course.userId);
    return Array.from(new Set(ids)).sort((a, b) => a - b);
  }, [courses]);

  const filteredCourses = useMemo(() => {
    let data = [...courses];

    if (selectedInstructor !== 'all') {
      data = data.filter((item) => item.userId === selectedInstructor);
    }

    if (showLongTitlesOnly) {
      data = data.filter((item) => item.title.trim().split(/\s+/).length >= 5);
    }

    data.sort((a, b) => {
      const wcA = a.title.trim().split(/\s+/).length;
      const wcB = b.title.trim().split(/\s+/).length;
      return sortAsc ? wcA - wcB : wcB - wcA;
    });

    return data;
  }, [courses, selectedInstructor, showLongTitlesOnly, sortAsc]);

  const handleRetry = () => {
    dispatch(fetchCourses());
  };

  const renderCourse = ({ item }) => (
    <TouchableOpacity
      style={styles.courseCard}
      onPress={() => navigation.navigate('Detail', { course: item })}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.instructor}>Instructor ID: {item.userId}</Text>
      <Text style={styles.wordCount}>
        Word Count: {item.title.trim().split(/\s+/).length}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Failed to load courses</Text>
        <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>LMS Explorer</Text>

      <CustomPicker
        label="All Instructors"
        selectedValue={selectedInstructor}
        onValueChange={(value) => setSelectedInstructor(value)}
        options={[
          { label: 'All Instructors', value: 'all' },
          ...uniqueInstructorIds.map((id) => ({
            label: `Instructor ${id}`,
            value: id,
          })),
        ]}
      />

      <View style={styles.toggleRow}>
        <Text>Long Titles (≥ 5 words)</Text>
        <Switch
          value={showLongTitlesOnly}
          onValueChange={setShowLongTitlesOnly}
        />
      </View>

      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => setSortAsc((prev) => !prev)}
      >
        <Text style={styles.sortText}>
          Sort by Word Count ({sortAsc ? 'Asc' : 'Desc'})
        </Text>
      </TouchableOpacity>

      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCourse}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  courseCard: {
    backgroundColor: '#f8f8f8',
    padding: 14,
    marginVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  instructor: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  wordCount: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  sortButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  sortText: {
    color: '#fff',
    fontSize: 14,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 8,
  },
  retryButton: {
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 6,
  },
  retryText: {
    color: '#fff',
  },
});