import notifee, {
  TimestampTrigger,
  RepeatFrequency,
  TriggerType,
} from '@notifee/react-native';
import palette from '@utils/colors';

const createChannel = async (id: string) => {
  const channelId = await notifee.createChannel({
    id: id,
    name: 'Default Channel',
  });
};
export const onCreateTriggerNotification = async (
  value: Date,
  title: string,
  description: string,
  offset: number,
) => {
  await createChannel(value.toISOString());

  // Parse the date string into a JavaScript Date object
  const date = new Date(value);

  // Apply the offset to the date
  const offsetMilliseconds = offset * 60 * 1000; // Convert offset from minutes to milliseconds
  const timestamp = date.getTime() + offsetMilliseconds;

  // Create a trigger notification
  const res = await notifee.createTriggerNotification(
    {
      title: title,
      body: description,
      android: {
        channelId: title,
        smallIcon: 'ic_launcher',
        color: palette.primary,
      },
    },
    {
      alarmManager: true,
      timestamp: timestamp,
      type: TriggerType.TIMESTAMP,
    },
  );
};
