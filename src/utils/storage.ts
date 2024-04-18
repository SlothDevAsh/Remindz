import AsyncStorage from '@react-native-async-storage/async-storage';
import {reminder} from 'src/types/data';

type keys = {
  reminder: string;
};
const Keys: keys = {
  reminder: 'reminder',
};

export const storeData = async (value: reminder) => {
  try {
    // Retrieve existing data from storage
    const existingDataString = await AsyncStorage.getItem(Keys.reminder);
    let existingData: reminder[] = [];

    if (existingDataString) {
      // Parse the existing data if it exists
      existingData = JSON.parse(existingDataString);

      // Append the new value to the existing data
      existingData.push(value);
    } else {
      // If no existing data, create a new array with the new value
      existingData = [value];
    }

    // Stringify the updated data
    const updatedDataString = JSON.stringify(existingData);

    // Store the updated data back into storage
    await AsyncStorage.setItem(Keys.reminder, updatedDataString);
  } catch (e) {
    // saving error
  }
};

export const getData = async (): Promise<reminder[] | []> => {
  try {
    const existingDataString = await AsyncStorage.getItem(Keys.reminder);

    if (existingDataString) {
      // Parse the existing data if it exists
      return JSON.parse(existingDataString);
    }
    return [];
  } catch (error) {
    return [];
  }
};
