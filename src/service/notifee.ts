import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';

const createChannel = async (title: string) => {
  const channelId = await notifee.createChannel({
    id: title,
    name: 'Default Channel',
  });
};
export const onCreateTriggerNotification = async (
  value: Date,
  title: string,
  description: string,
  offset: number,
) => {
  await createChannel(title);

  const originalDate = new Date(value);

  const newDate = new Date(originalDate.getTime() + offset * 1000);

  // Create a time-based trigger
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: newDate.getTime(), // fire at 11:10am (10 minutes before meeting)
  };

  // Create a trigger notification
  await notifee.createTriggerNotification(
    {
      title: title,
      body: description,
      android: {
        channelId: title,
      },
    },
    trigger,
  );
};
