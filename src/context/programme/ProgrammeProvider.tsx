import { useEffect, useState } from 'react';
import { useListState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { v4 as uuid } from 'uuid';

import ProgrammeContext, { ProgrammeContextType } from './programme-context';
import { DayType, ItemType, ParticipantType } from '../../@types/programme';
import { ProgrammeIn } from '../../schemas/Programme';

type ProgrammeProviderProps = {
  children: React.ReactNode;
  participants: ParticipantType[];
};

/**
 * Provides the programme context to the application.
 * @param children React children to be wrapped by the provider.
 * @param participants List of participants to be used in the programme.
 */
export default function ProgrammeProvider({
  children,
  participants: participantsProp,
}: ProgrammeProviderProps) {
  const [conferenceStart, setConferenceStart] = useState<Date | null>(null);
  const [days, daysHandlers] = useListState<DayType>([]);
  const [participants] = useListState<ParticipantType>(participantsProp);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // initial fetch to populate programme state from the database
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

  // recalculate dates when conference start changes
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

  // recalculate day end times when day items change
  const recalculateDayEndTimes = (
    dayIndex: number,
    items: (typeof days)[number]['items'],
  ) => {
    const dayStart = days[dayIndex].start;
    if (!dayStart) return;

    const endTime = items.reduce((acc, item) => {
      const itemEndTime = new Date(acc);
      if (item.type === 'CHAIRMAN') return itemEndTime;

      if (item.duration === null) return itemEndTime;
      return new Date(itemEndTime.getTime() + item.duration * 60 * 1000);
    }, dayStart);

    daysHandlers.setItemProp(dayIndex, 'end', endTime);
  };

  // handle setting conference start and recalculating dates
  const handleSetConferenceStart = (date: Date) => {
    setConferenceStart(date);
    recalculateDates(date);
  };

  // handle adding a day to the programme
  const handleAddDay = (start: Date) => {
    const date = new Date(start);
    daysHandlers.append({
      id: uuid(),
      date,
      additionalInfo: '',
      items: [],
      start: date,
      end: date,
    });
  };

  // handle changing a day property (start, additionalInfo)
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

  // handle deleting a day from the programme
  const handleDeleteDay = (index: number) => {
    daysHandlers.remove(index);

    if (!conferenceStart) return;
    recalculateDates(conferenceStart);
  };

  // handle adding a day item (ITEM or CHAIRMAN)
  const handleAddDayItem = (dayIndex: number, type: 'ITEM' | 'CHAIRMAN') => {
    const items: (typeof days)[number]['items'] = [
      ...days[dayIndex].items,
      type === 'ITEM'
        ? {
            type,
            id: uuid(),
            duration: 0,
            title: '',
            participantId: '',
            abstractId: '',
          }
        : {
            type,
            id: uuid(),
            participantId: '',
          },
    ];
    daysHandlers.setItemProp(dayIndex, 'items', items);

    recalculateDayEndTimes(dayIndex, items);
  };

  // handle changing a day item property (duration, title, participantId, abstractId)
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

  // handle changing a day item participant and abstract
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

  // handle reordering day items
  const handleDayItemReorder = (dayIndex: number, from: number, to: number) => {
    const current = days[dayIndex].items;

    const cloned = [...current];
    const item = current[from];

    cloned.splice(from, 1);
    cloned.splice(to, 0, item);

    daysHandlers.setItemProp(dayIndex, 'items', cloned);
  };

  // handle deleting a day item
  const handleDeleteDayItem = (dayIndex: number, index: number) => {
    const items = days[dayIndex].items.filter((_, i) => i !== index);

    daysHandlers.setItemProp(dayIndex, 'items', items);

    recalculateDayEndTimes(dayIndex, items);
  };

  // handle saving programme
  const handleSaveProgramme = async () => {
    setSaving(true);
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
    setSaving(false);
  };

  // handle deleting programme
  const handleDeleteProgramme = async () => {
    setDeleting(true);
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
    setDeleting(false);
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
    saving,
    deleting,
  };

  return (
    <ProgrammeContext.Provider value={cartContext}>
      {children}
    </ProgrammeContext.Provider>
  );
}
