import { useCallback, useEffect, useState } from 'react';

import { db } from '~/data/database';
import { dairies, Dairy } from '~/data/schemas';
import { Food } from '~/data/types/Food';

type useDairyValue = {
  data: Omit<Dairy, 'id'>;
  addFoodToDairy: (food: Food) => Promise<void>;
  removeFoodFromDairy: (foodIndex: number) => Promise<void>;
};

const defaultData = {
  date: new Date().toDateString(),
  meals: ['Breakfast', 'Snacks', 'Lunch', 'Afternoon snacks', 'Dinner'], // @todo: use default user meals
  foods: [],
  weight: null,
};

export const useDairy = (date: Date): useDairyValue => {
  const [data, setData] = useState<useDairyValue['data']>(defaultData);

  const fetchData = useCallback(
    async (date: Date) => {
      const data = await db.query.dairies.findFirst({
        where: (dairies, { eq }) => eq(dairies.date, date.toDateString()),
      });
      setData(data || { ...defaultData, date: date.toDateString() });
    },
    [date]
  );

  useEffect(() => {
    fetchData(date);
  }, [date]);

  const addFoodToDairy = useCallback(
    async (food: Food) => {
      const updatedFoods = [...data.foods, food];
      await db
        .insert(dairies)
        .values({ ...data, foods: updatedFoods })
        .onConflictDoUpdate({ target: dairies.id, set: { foods: updatedFoods } });
      fetchData(date);
    },
    [data.foods]
  );

  const removeFoodFromDairy = useCallback(
    async (foodIndex: number) => {
      const updatedFoods = data.foods.filter((_, index) => index !== foodIndex);
      await db
        .insert(dairies)
        .values({ ...data, foods: updatedFoods })
        .onConflictDoUpdate({ target: dairies.id, set: { foods: updatedFoods } });
      fetchData(date);
    },
    [data.foods]
  );

  //   const editFoodInDairy = useCallback(

  return { data, addFoodToDairy, removeFoodFromDairy };
};
