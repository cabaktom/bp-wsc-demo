import { useEffect, useState } from 'react';
import { useListState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';

import ProgrammeContext, { ProgrammeContextType } from './programme-context';
import type {
  DayType,
  ItemType,
  ParticipantType,
} from '../../@types/programme';
import { ProgrammeIn } from '../../schemas/Programme';

type ProgrammeProviderProps = {
  children: React.ReactNode;
  participants: ParticipantType[];
};

export default function ProgrammeProvider({
  children,
  participants: participantsProp,
}: ProgrammeProviderProps) {
  const [conferenceStart, setConferenceStart] = useState<Date | null>(null);
  const [days, daysHandlers] = useListState<DayType>([]);
  const [participants] = useListState<ParticipantType>(participantsProp);
  const [loading, setLoading] = useState(false);

  // initial fetch to populate programme state
  useEffect(() => {
    const fetchProgramme = async () => {
      setLoading(true);
      const res = await fetch('/api/programme');
      const data = await res.json();

      if (!res.ok) {
        showNotification({
          title: 'Error!',
          message: data.message ?? 'Could not load programme.',
          color: 'red',
        });
        setLoading(false);
        return;
      }

      const result = ProgrammeIn.safeParse(data);

      if (!result.success) {
        showNotification({
          title: 'Error!',
          message: 'Could not load programme.',
          color: 'red',
        });
      } else {
        const parsedData = result.data;
        if (parsedData.conferenceStart) {
          setConferenceStart(parsedData.conferenceStart);
        }

        if (parsedData.days) {
          daysHandlers.setState(parsedData.days);
        }
      }

      setLoading(false);
    };

    fetchProgramme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const recalculateDates = (start: Date) => {
    daysHandlers.apply((day, index = 0) => {
      const nextDay = new Date(start);
      nextDay.setDate(nextDay.getDate() + index);

      return {
        ...day,
        date: nextDay,
      };
    });
  };

  const recalculateDayEndTimes = (dayIndex: number, items: ItemType[]) => {
    const dayStart = days[dayIndex].start;
    if (!dayStart) return;

    const endTime = items.reduce((acc, { duration }) => {
      const itemEndTime = new Date(acc);
      return new Date(itemEndTime.getTime() + duration * 60 * 1000);
    }, dayStart);

    daysHandlers.setItemProp(dayIndex, 'end', endTime);
  };

  const handleSetConferenceStart = (date: Date) => {
    setConferenceStart(date);
    recalculateDates(date);
  };

  // day handlers
  const handleAddDay = (start: Date) => {
    daysHandlers.append({
      id: Date.now().toString(),
      date: new Date(start),
      additionalInfo: '',
      items: [],
    });
  };

  const handleChangeDayProp = (
    index: number,
    prop: keyof DayType,
    value: DayType[keyof DayType],
  ) => {
    if (prop === 'start') {
      const daysClone = [...days];
      daysClone[index].start = value as Date;
      recalculateDayEndTimes(index, daysClone[index].items);
    }

    daysHandlers.setItemProp(index, prop, value);
  };

  const handleDeleteDay = (index: number) => {
    daysHandlers.remove(index);

    if (!conferenceStart) return;
    recalculateDates(conferenceStart);
  };

  // day item handlers
  const handleAddDayItem = (dayIndex: number) => {
    const items: Array<ItemType> = [
      ...days[dayIndex].items,
      {
        id: Date.now().toString(),
        duration: 0,
        title: '',
        participantId: '',
        abstractId: '',
      },
    ];
    daysHandlers.setItemProp(dayIndex, 'items', items);

    recalculateDayEndTimes(dayIndex, items);
  };

  const handleChangeDayItemProp = (
    dayIndex: number,
    index: number,
    prop: keyof ItemType,
    value: ItemType[keyof ItemType],
  ) => {
    const items = days[dayIndex].items.map((item, i) => {
      if (i === index) {
        return { ...item, [prop]: value };
      }
      return item;
    });
    daysHandlers.setItemProp(dayIndex, 'items', items);

    if (prop === 'duration') {
      recalculateDayEndTimes(dayIndex, items);
    }
  };

  const handleChangeDayItemParticipantAndAbstract = (
    dayIndex: number,
    index: number,
    participantId: string,
    abstractId: string,
  ) => {
    const items = days[dayIndex].items.map((item, i) => {
      if (i === index) {
        return { ...item, participantId, abstractId };
      }
      return item;
    });

    daysHandlers.setItemProp(dayIndex, 'items', items);
  };

  const handleDayItemReorder = (dayIndex: number, from: number, to: number) => {
    const current = days[dayIndex].items;

    const cloned = [...current];
    const item = current[from];

    cloned.splice(from, 1);
    cloned.splice(to, 0, item);

    daysHandlers.setItemProp(dayIndex, 'items', cloned);
  };

  const handleDeleteDayItem = (dayIndex: number, index: number) => {
    const items = days[dayIndex].items.filter((_, i) => i !== index);

    daysHandlers.setItemProp(dayIndex, 'items', items);

    recalculateDayEndTimes(dayIndex, items);
  };

  const handleSaveProgramme = async () => {
    if (days.some((day) => !day.start)) {
      showNotification({
        title: 'Cannot save programme!',
        message: 'Please set start time for all days.',
        color: 'red',
      });
      return;
    }

    const res = await fetch('/api/programme', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ conferenceStart, days }),
    });

    if (!res.ok) {
      const data = await res.json();

      showNotification({
        title: 'Error saving programme!',
        message:
          data.message ?? 'Could not save programme, please try again later.',
        color: 'red',
      });
    } else {
      showNotification({
        title: 'Programme saved!',
        message: 'Changes to programme have been saved.',
        color: 'green',
      });
    }
  };

  const handleDeleteProgramme = async () => {
    const res = await fetch('/api/programme', {
      method: 'DELETE',
    });

    if (!res.ok) {
      const data = await res.json();

      showNotification({
        title: 'Error deleting programme!',
        message:
          data.message ?? 'Could not delete programme, please try again later.',
        color: 'red',
      });
    } else {
      showNotification({
        title: 'Programme deleted!',
        message: 'Programme has been deleted.',
        color: 'green',
      });

      setConferenceStart(null);
      daysHandlers.setState([]);
    }
  };

  const cartContext: ProgrammeContextType = {
    conferenceStart,
    setConferenceStart: handleSetConferenceStart,

    days,
    addDay: handleAddDay,
    changeDayProp: handleChangeDayProp,
    deleteDay: handleDeleteDay,

    addDayItem: handleAddDayItem,
    changeDayItemProp: handleChangeDayItemProp,
    changeDayItemParticipantAndAbstract:
      handleChangeDayItemParticipantAndAbstract,
    dayItemReorder: handleDayItemReorder,
    deleteDayItem: handleDeleteDayItem,

    participants,
    saveProgramme: handleSaveProgramme,
    deleteProgramme: handleDeleteProgramme,
    loading,
  };

  return (
    <ProgrammeContext.Provider value={cartContext}>
      {children}
    </ProgrammeContext.Provider>
  );
}
