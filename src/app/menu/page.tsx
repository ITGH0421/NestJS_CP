"use client";

import { useState, useEffect } from "react";
import { format, parseISO, addDays, parse, differenceInCalendarDays } from "date-fns";
import { recoveryMenuPool } from "./recoveryMenuPool";
import { nourishMenuPool } from "./nourishMenuPool";
import { getMenuIndexesForDate } from "./getMenuIndexesForDate";

const RECOVERY_LENGTH = 7;
const NOURISH_LENGTH = 21;
const BASE_DATE = parseISO("2025-01-01");

export default function MealMenu() {
  const today = new Date();
  const formattedToday = format(today, "yyyy-MM-dd");

  const [startDate, setStartDate] = useState(formattedToday);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [weekDays, setWeekDays] = useState<{ day: string; date: string; rawDate: Date}[]>([]);
  const [selectedDay, setSelectedDay] = useState<{ day: string; date: string; rawDate: Date } | null>(null);

  const [selectedDayByWeek, setSelectedDayByWeek] = useState<Record<number, { day: string; date: string; rawDate: Date }>>({});

  interface Dish {
    english: string;
    chinese: string;
  }
  
  interface Menu {
    lunchDishes: Dish[];
    dinnerDishes: Dish[];
  }
  
  const [menu, setMenu] = useState<Menu>({
    lunchDishes: [],
    dinnerDishes: []
  });

  // Initialise first day logic
  useEffect(() => {
    setSelectedWeek(1);
  }, []);

  // Update weekdays when startDate or selectedWeek changes
  useEffect(() => {
    const parsedStartDate = parseISO(startDate);
    const baseWeekStart = addDays(parsedStartDate, (selectedWeek - 1) * 7); // Adjust start date based on selected week
    // const startDayOffset = differenceInCalendarDays(baseWeekStart, BASE_DATE) % 7;

    const rotatedWeek = Array.from({ length: 7 }).map((_, i) => {
      const date = addDays(baseWeekStart, i);
      return {
        day: format(date, "EEEE"), // Full day name
        date: format(date, "dd/MM/yyyy"),
        rawDate: date
      };
    });

    setWeekDays(rotatedWeek);

    // Check if a day was selected before for this week
    if (selectedDayByWeek[selectedWeek]) {
      setSelectedDay(selectedDayByWeek[selectedWeek]);
    } else {
      // First time selecting this week — default to Day 1
      const firstDay = rotatedWeek[0];
      setSelectedDay(firstDay);
      setSelectedDayByWeek((prev) => ({
        ...prev,
        [selectedWeek]: firstDay,
      }));
    }

    // setSelectedDay(rotatedWeek[0]); // only auto-select first time
  }, [startDate, selectedWeek]);

  // Calculate the correct menu item for the selected day
  useEffect(() => {
    if (!selectedDay) return;

    const { recoveryIndex, nourishIndex } = getMenuIndexesForDate(selectedDay.rawDate);
    const isRecoveryWeek = selectedWeek === 1;

    const menu = isRecoveryWeek
    ? recoveryMenuPool[recoveryIndex] ?? { lunchDishes: [], dinnerDishes: [] }
    : nourishMenuPool[nourishIndex] ?? { lunchDishes: [], dinnerDishes: [] };

  setMenu(menu);
  }, [selectedDay, selectedWeek, startDate]);


  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg text-center border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Select Your Meal Start Date</h2>
      
      <div className="flex items-center space-x-2 mb-6 justify-center">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded p-2 w-64 text-center text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        />
      </div>

      <div className="grid grid-cols-4 gap-2 mb-6">
        {[1, 2, 3, 4].map((week) => (
          <button
            key={week}
            className={`p-3 rounded-lg font-semibold transition-all flex flex-col items-center justify-center
              ${
                selectedWeek === week
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100"
              }`}
            onClick={() => setSelectedWeek(week)}
          >
            <span className="text-base">Week {week}</span> {/* First row */}
            <span className="text-sm opacity-80">
              {" "}
              {/* Second row */}
              {format(
                addDays(parseISO(startDate), (week - 1) * 7),
                "dd/MM/yyyy"
              )}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6">
        {weekDays.map((item) => (
          <button
            key={item.date}
            className={`p-2 rounded-lg text-sm font-medium transition-all flex flex-col items-center
              ${
                selectedDay?.date === item.date
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-green-100"
              }`}
            onClick={() => {
              setSelectedDay(item);
              setSelectedDayByWeek((prev) => ({
                ...prev,
                [selectedWeek]: item,
              }));
            }}
          >
            <span className="uppercase font-semibold">{item.day.slice(0, 3)}</span>
            <span className="text-xs">{item.date}</span>
          </button>
        ))}
      </div>

      {selectedDay && (
        <>
          <h3 className="font-semibold text-lg text-gray-800 text-center mb-2">
            LONGAN RED DATE TEA SERVED WITH EVERY MEAL
          </h3>
          {/* Lunch Menu */}
          <div className="grid grid-cols-2 gap-6 mt-4">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-2xl font-extrabold text-gray-900 uppercase">Lunch</h4>
              <h5 className="text-xl font-semibold text-yellow-700">午餐</h5>
              <hr className="border-gray-300 my-3" />
              <ul className="text-left space-y-2">
                {menu.lunchDishes.map((dish, index) => (
                  <li key={index} className="font-semibold text-gray-900">
                    {dish.english} <br />
                    <span className="text-gray-700">{dish.chinese}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Dinner Menu */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-2xl font-extrabold text-gray-900 uppercase">Dinner</h4>
              <h5 className="text-xl font-semibold text-yellow-700">晚餐</h5>
              <hr className="border-gray-300 my-3" />
              <ul className="text-left space-y-2">
                {menu.dinnerDishes.map((dish, index) => (
                  <li key={index} className="font-semibold text-gray-900">
                    {dish.english} <br />
                    <span className="text-gray-700">{dish.chinese}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
