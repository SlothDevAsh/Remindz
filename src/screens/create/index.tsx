import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import Header from '@components/header';
import {SET_REMINDER} from '@utils/constants';
import {ScreenProps} from 'src/types/navigation';
import palette from '@utils/colors';
import dimensions, {mScale} from '@utils/dimensions';
import fonts from '@utils/fonts';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {getDateAndTime, getTimeInMiliseconds} from '@utils/helper';
import {storeData} from '@utils/storage';
import {onCreateTriggerNotification} from '@service/notifee';

const Create: FC<ScreenProps> = ({navigation}) => {
  const [title, setTitle] = useState({
    value: '',
    error: '',
  });
  const [desc, setDesc] = useState({
    value: '',
    error: '',
  });
  const [date, setDate] = useState({value: new Date(), error: '', offset: 0});
  const [selectedDateAndTime, setSelectedDateAndTime] = useState('');
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false);

    if (selectedDate instanceof Date) {
      console.log('Event is ', event);
      console.log(selectedDate);
      setDate({
        value: selectedDate,
        error: '',
        offset: event.nativeEvent.utcOffset,
      });

      const response = getDateAndTime(
        selectedDate,
        event.nativeEvent.utcOffset,
      );

      setSelectedDateAndTime(response);
    }
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const handleSave = async () => {
    if (title.value.trim().length === 0) {
      setTitle(props => ({
        ...props,
        error: 'Title is required',
      }));

      return;
    }

    if (desc.value.trim().length === 0) {
      setDesc(props => ({
        ...props,
        error: 'Description is required',
      }));

      return;
    }

    if (selectedDateAndTime === '') {
      setDate(props => ({
        ...props,
        error: 'Pick date and time',
      }));

      return;
    }

    console.log(getTimeInMiliseconds(date.value, date.offset));
    // console.log(date.value, selectedDateAndTime, getTime(selectedDateAndTime));
    // save date in local storage
    // await storeData({
    //   title: title.value.trim(),
    //   description: desc.value.trim(),
    //   time: date.value.toISOString(),
    // });

    if (date.value > new Date()) {
      // triggers a notification at saved date & time
      await onCreateTriggerNotification(
        title.value.trim(),
        desc.value.trim(),
        date.offset,
        getTimeInMiliseconds(date.value, date.offset),
      );
    }

    navigation.goBack();
  };
  return (
    <View style={styles.parent}>
      <ScrollView keyboardShouldPersistTaps={'never'}>
        <Header
          heading={SET_REMINDER}
          back
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.container1}>
          <TextInput
            placeholder="Enter Reminder Title"
            onChangeText={text =>
              setTitle({
                value: text,
                error: '',
              })
            }
            value={title.value}
            style={styles.text1}
            maxLength={20}
          />
        </View>

        {title.error.trim().length !== 0 && (
          <Text style={styles.error}>{title.error}</Text>
        )}

        <View
          style={[
            styles.container1,
            {
              marginTop: mScale(40),
              height: mScale(100),
            },
          ]}>
          <TextInput
            placeholder="Enter Reminder Description"
            onChangeText={text =>
              setDesc({
                value: text,
                error: '',
              })
            }
            value={desc.value}
            style={styles.text1}
            maxLength={20}
            multiline={true}
          />
        </View>

        {desc.error.trim().length !== 0 && (
          <Text style={styles.error}>{desc.error}</Text>
        )}

        <View style={styles.dateTimeContainer}>
          <View style={[styles.dateTimeBlock]}>
            <TouchableOpacity onPress={showDatepicker}>
              <Text
                style={[
                  styles.text1,
                  {
                    marginVertical: mScale(15),
                  },
                ]}>
                Pick Date
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.dateTimeBlock]}>
            <TouchableOpacity onPress={showTimepicker}>
              <Text
                style={[
                  styles.text1,
                  {
                    marginVertical: mScale(15),
                  },
                ]}>
                Pick Time
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {date.error !== '' && <Text style={styles.error}>{date.error}</Text>}

        {selectedDateAndTime !== '' && (
          <View
            style={[
              styles.container1,
              styles.dateTimeContainer,
              styles.selectedDateTimeContainer,
            ]}>
            <Text style={styles.text2}>Reminder at: {selectedDateAndTime}</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date.value}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: palette.primary,
  },
  container1: {
    height: mScale(60),
    backgroundColor: palette.highlight,
    marginHorizontal: mScale(30),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingLeft: mScale(10),
  },
  text1: {
    fontSize: dimensions.fontSize.lg,
    marginVertical: 5,
    fontFamily: fonts.openSans.regular,
    color: palette.off_white,
  },
  text2: {
    fontSize: dimensions.fontSize.base,
    fontFamily: fonts.openSans.regular,
    color: palette.off_white,
  },
  dateTimeContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: mScale(40),
  },
  selectedDateTimeContainer: {
    marginHorizontal: mScale(10),
    marginTop: mScale(40),
  },
  dateTimeBlock: {
    height: mScale(60),
    backgroundColor: palette.highlight,
    borderRadius: 20,
    width: '37%',
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: mScale(40),
    alignItems: 'center',
  },
  button: {
    width: '40%',
    backgroundColor: palette.accent,
    height: mScale(60),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: dimensions.fontSize.base2,
    fontFamily: fonts.openSans.bold,
    color: palette.dark,
  },
  error: {
    fontSize: dimensions.fontSize.base2,
    fontFamily: fonts.openSans.regular,
    color: palette.accent,
    marginLeft: mScale(35),
  },
});
