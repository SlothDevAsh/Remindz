import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {ScreenProps} from 'src/types/navigation';
import palette from '@utils/colors';
import Button from '@components/button';
import {APP_NAME} from '@utils/constants';
import Card from '@components/card';
import Header from '@components/header';
import {useQuery} from 'react-query';
import {getData} from '@utils/storage';
import {reminder} from 'src/types/data';
import {useIsFocused} from '@react-navigation/native';

const Home: FC<ScreenProps> = ({navigation, route}) => {
  const [data, setData] = useState<reminder[]>([]);
  const fetchReminders = async () => {
    setloading(true);
    const response = require('../../../data.json');

    const localData = await getData();

    setData([...localData, ...response]);

    setloading(false);
  };

  const [loading, setloading] = useState(true);

  const {isLoading, isError, refetch} = useQuery('reminders', fetchReminders);

  const handleAddPress = () => {
    navigation.navigate('Create');
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    const handleRefetch = async () => {
      await refetch();
      setloading(false);
    };
    if (isFocused) {
      handleRefetch();
    }
  }, [isFocused, refetch]);

  return (
    <View style={styles.parent}>
      <Header heading={APP_NAME} />

      {isLoading || isError || loading ? (
        <View style={styles.container}>
          <ActivityIndicator size={25} color={palette.dark} />
        </View>
      ) : (
        <>
          <View style={styles.container}>
            <FlatList
              data={data}
              numColumns={2}
              horizontal={false}
              keyExtractor={(item, index) => `${Math.random() * 100} ${index}`}
              renderItem={({item, index}) => (
                <Card
                  title={item.title}
                  time={item.time}
                  description={item.description}
                />
              )}
            />
          </View>
          <Button onPress={handleAddPress} />
        </>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: palette.primary,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
