// components/CustomPicker.tsx
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

interface PickerProps {
  label?: string;
  options: Array<{ label: string; value: number | string }>;
  selectedValue: number | string;
  onValueChange: (value: number | string) => void;
}

const CustomPicker: React.FC<PickerProps> = ({
  label = 'Select',
  options,
  selectedValue,
  onValueChange,
}) => {
  const [visible, setVisible] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || label;

  return (
    <>
      <TouchableOpacity
        style={styles.pickerContainer}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.pickerText}>{selectedLabel}</Text>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onValueChange(item.value);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default CustomPicker;

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: '50%',
  },
  option: {
    padding: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
});