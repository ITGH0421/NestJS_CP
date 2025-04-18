"use client";

import { useState, useEffect } from "react";
import { format, parseISO, addDays, parse, differenceInCalendarDays } from "date-fns";
import { Box, Typography, TextField, Button, Paper, Divider, Slide } from "@mui/material";
import { recoveryMenuPool } from "../../components/menu/recoveryMenuPool";
import { nourishMenuPool } from "../../components/menu/nourishMenuPool";
import { getMenuIndexesForDate } from "../../components/menu/getMenuIndexesForDate";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Image from 'next/image';
import NextLink from 'next/link';

const RECOVERY_LENGTH = 7;
const NOURISH_LENGTH = 21;
const BASE_DATE = parseISO("2025-01-01");

export default function menupage() {
    const today = new Date();
    // const formattedToday = format(today, "yyyy-MM-dd");

    // const [startDate, setStartDate] = useState(formattedToday);

    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [startDateStr, setStartDateStr] = useState(format(new Date(), "yyyy-MM-dd"));
    const [selectedWeek, setSelectedWeek] = useState(1);
    const [weekDays, setWeekDays] = useState<{ day: string; date: string; rawDate: Date }[]>([]);
    const [selectedDay, setSelectedDay] = useState<{ day: string; date: string; rawDate: Date } | null>(null);
    const [selectedDayByWeek, setSelectedDayByWeek] = useState<Record<number, { day: string; date: string; rawDate: Date }>>({});
    const [menu, setMenu] = useState<Menu>({ lunchDishes: [], dinnerDishes: [] });
    const [nonOperatingDays, setNonOperatingDays] = useState<string[]>([]);

    // Interface of Menu
    interface Menu {
        lunchDishes: Dish[];
        dinnerDishes: Dish[];
    }

    interface Dish {
        english: string;
        chinese: string;
    }

    //Helper to get the date start and date to skip
    const getActualWeekStart = (
        baseDate: Date,
        weekIndex: number,
        nonOperatingDays: string[]
    ): Date => {
        let count = 0;
        let currentDate = baseDate;
        let actualDayCount = 0;

        while (actualDayCount < (weekIndex - 1) * 7) {
            const dateStr = format(currentDate, "yyyy-MM-dd");
            if (!nonOperatingDays.includes(dateStr)) {
                actualDayCount++;
            }
            currentDate = addDays(currentDate, 1);

            // Safety check: avoid infinite loops
            if (count++ > 365) break;
        }
        return currentDate;
    };

    // Initialise first day logic
    useEffect(() => {
        setSelectedWeek(1);
    }, []);

    // Update weekdays when startDate or selectedWeek changes
    useEffect(() => {
        const parsedStartDate = parseISO(startDateStr); // ✅ uses the string
        // const baseWeekStart = addDays(parsedStartDate, (selectedWeek - 1) * 7); // Adjust start date based on selected week
        const baseWeekStart = getActualWeekStart(parsedStartDate, selectedWeek, nonOperatingDays)

        const rotatedWeek = [];
        let count = 0;
        let currentDate = baseWeekStart;

        while (rotatedWeek.length < 7 && count < 30) {
            const dateStr = format(currentDate, "yyyy-MM-dd");
            if (!nonOperatingDays.includes(dateStr)) {
                rotatedWeek.push({
                    day: format(currentDate, "EEEE"),
                    date: format(currentDate, "dd/MM/yyyy"),
                    rawDate: currentDate
                });
            }
            currentDate = addDays(currentDate, 1);
            count++;
        }

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
    }, [startDate, selectedWeek, nonOperatingDays]);

    // Calculate the correct menu item for the selected day
    useEffect(() => {
        if (!selectedDay) return;

        // #1
        // const { recoveryIndex, nourishIndex } = getMenuIndexesForDate(selectedDay.rawDate);
        // #2
        const { recoveryIndex, nourishIndex } = getMenuIndexesForDate(selectedDay.rawDate, nonOperatingDays);
        const isRecoveryWeek = selectedWeek === 1;

        const menu = isRecoveryWeek
            ? recoveryMenuPool[recoveryIndex] ?? { lunchDishes: [], dinnerDishes: [] }
            : nourishMenuPool[nourishIndex] ?? { lunchDishes: [], dinnerDishes: [] };

        setMenu(menu);
    }, [selectedDay, selectedWeek, startDate]);

    // Get the block dates that is not operate from the backend via API
    useEffect(() => {
        fetch("/api/nonOperatingDays")
            .then((res) => res.json())
            .then((data) => setNonOperatingDays(data))
            .catch(() => setNonOperatingDays([]));
    }, []);


    return (
        <>
            <Box
                sx={{
                    pt: { xs: 6, md: 8 },
                    px: { xs: 2, md: 10 },
                    textAlign: 'center',
                    borderRadius: 3,
                    mb: 6,
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        color: '#f27b96',
                        fontWeight: 'bold',
                        fontSize: { xs: '2rem', md: '2.75rem' },
                        mb: 3,
                    }}
                >
                    Conscientiously Crafted Confinement Meals
                </Typography>

                <Typography sx={{ color: 'text.secondary', maxWidth: 900, mx: 'auto', mb: 2 }}>
                    The tasty and healthy confinement catering meals included in our packages focus on the overall wellness of the new mum after childbirth.
                </Typography>

                <Typography sx={{ color: 'text.secondary', maxWidth: 900, mx: 'auto', mb: 2 }}>
                    With Chilli Padi Confinement Catering, our specially crafted meals promote lactation. Milk-boosting ingredients such as salmon, papaya, spinach and turmeric and many others have been incorporated in our menu to support breastfeeding.
                </Typography>

                <Typography sx={{ color: 'text.secondary', maxWidth: 900, mx: 'auto' }}>
                    In addition, to help mummies with lactation, we have created our own lactation treats to supplement our confinement meals and increase milk supply for mummies!
                </Typography>

                {/* Dishes */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap', my: 6 }}>
                    {/* Dish 1 */}
                    <Box sx={{ textAlign: 'center', maxWidth: 180 }}>
                        <Image
                            src="/Background/CordycepSoup.png" // Replace with your image path
                            alt="Cordycep Chicken Soup"
                            width={180}
                            height={180}
                            style={{ borderRadius: '50%' }}
                        />
                        <Typography variant="subtitle2" fontWeight="bold" mt={1}>
                            Immunity Boosting Cordyceps Militaris Chicken Soup
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            增强免疫力北虫草鸡汤
                        </Typography>
                    </Box>

                    {/* Dish 2 */}
                    <Box sx={{ textAlign: 'center', maxWidth: 180 }}>
                        <Image
                            src="/Background/MilkFish.png" // Replace with your image path
                            alt="Milk Fish Papaya Soup"
                            width={180}
                            height={180}
                            style={{ borderRadius: '50%' }}
                        />
                        <Typography variant="subtitle2" fontWeight="bold" mt={1}>
                            Milk Boosting Fish and Papaya Soup
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            木瓜鱼汤
                        </Typography>
                    </Box>

                    {/* Dish 3 */}
                    <Box sx={{ textAlign: 'center', maxWidth: 180 }}>
                        <Image
                            src="/Background/Noodle.png" // Replace with your image path
                            alt="Wok Fried Huai Shan Noodle"
                            width={180}
                            height={180}
                            style={{ borderRadius: '50%' }}
                        />
                        <Typography variant="subtitle2" fontWeight="bold" mt={1}>
                            Wok Fried Huai Shan Noodle with Egg
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            锅炒淮三面与蛋
                        </Typography>
                    </Box>

                </Box>
            </Box>

            <Box sx={{ mb: 4, p: 3, maxWidth: '48rem', mx: 'auto', bgcolor: 'white', boxShadow: 3, borderRadius: 2, border: '1px solid', borderColor: 'grey.200', textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 6, color: '#f27b96' }}>
                    Select Your Meal Start Date
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Select Start Date"
                            value={startDate}
                            onChange={(newValue: Date | null) => {
                                if (!newValue) return;
                                setStartDate(newValue);
                                setStartDateStr(format(newValue, "yyyy-MM-dd"));
                                setSelectedWeek(1);
                                setSelectedDayByWeek({});
                            }}
                            format="dd/MM/yyyy"
                            shouldDisableDate={(date) => {
                                const formatted = format(date, "yyyy-MM-dd");
                                return nonOperatingDays.includes(formatted); // ❌ disables if match
                            }}
                            slotProps={{
                                textField: {
                                    size: "small",
                                    sx: { width: 256 },
                                },
                            }}
                        />
                    </LocalizationProvider>


                </Box>

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap', mb: 2 }}>
                    {[1, 2, 3, 4].map((week) => (
                        <Button
                            key={week}
                            variant={selectedWeek === week ? "contained" : "outlined"}
                            onClick={() => setSelectedWeek(week)}
                            sx={{
                                flex: '1 0 22%',
                                display: 'flex',
                                flexDirection: 'column',
                                py: 2,
                                fontWeight: 'bold',
                                minWidth: 80,
                                backgroundColor: selectedWeek === week ? '#f27b96' : '#FACAD5',
                                color: selectedWeek === week ? '#fff' : '#f27b96',
                                borderColor: '#FACAD5',
                                '&:hover': {
                                    backgroundColor: selectedWeek === week ? '#e26782' : '#fce9ed',
                                },
                            }}
                        >
                            <span>Week {week}</span>
                            <span style={{ fontSize: 12, opacity: 0.8 }}>
                                {week === 1 ? "Recovery" : "Nourish"}
                            </span>
                        </Button>
                    ))}
                </Box>

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap', mb: 6 }}>
                    {weekDays.map((item) => (
                        <Button
                            key={item.date}
                            variant={selectedDay?.date === item.date ? "contained" : "outlined"}
                            onClick={() => {
                                setSelectedDay(item);
                                setSelectedDayByWeek((prev) => ({
                                    ...prev,
                                    [selectedWeek]: item,
                                }));
                            }}
                            sx={{
                                flex: '1 0 13%',
                                display: 'flex',
                                flexDirection: 'column',
                                py: 1,
                                minWidth: 60,
                                backgroundColor: selectedDay?.date === item.date ? '#f27b96' : 'transparent',
                                color: selectedDay?.date === item.date ? '#fff' : '#f27b96',
                                borderColor: '#f27b96',
                                '&:hover': {
                                    backgroundColor: selectedDay?.date === item.date ? '#e26782' : '#fce9ed',
                                },
                            }}
                        >
                            <span style={{ fontWeight: 600, textTransform: 'uppercase' }}>{item.day.slice(0, 3)}</span>
                            <span style={{ fontSize: 12 }}>{item.date}</span>
                        </Button>
                    ))}
                </Box>

                {selectedDay && (
                    <>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: '#f27b96' }}>
                            LONGAN RED DATE TEA SERVED WITH EVERY MEAL
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: ['column', 'row'], gap: 3, mt: 2 }}>
                            {["Lunch", "Dinner"].map((type) => (
                                <Paper key={type} elevation={3} sx={{ flex: 1, p: 3, textAlign: 'center', backgroundColor: '#FACAD5' }}>
                                    <Typography variant="h5" sx={{ fontWeight: 'extrabold', textTransform: 'uppercase', color: 'grey.900' }}>
                                        {type}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#f27b96' }}>
                                        {type === "Lunch" ? "午餐" : "晚餐"}
                                    </Typography>
                                    <Divider sx={{ my: 2 }} />
                                    <Box sx={{ textAlign: 'left' }}>
                                        {(type === "Lunch" ? menu.lunchDishes : menu.dinnerDishes).map((dish, index) => (
                                            <Box key={index} sx={{ mb: 2 }}>
                                                <Typography sx={{ fontWeight: 600, color: 'grey.900' }}>{dish.english}</Typography>
                                                <Typography sx={{ color: 'grey.700' }}>{dish.chinese}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Paper>
                            ))}
                        </Box>
                    </>
                )}
            </Box>
            <Box
                sx={{
                    px: { xs: 2, md: 10 },
                    textAlign: 'center',
                    borderRadius: 3,
                    mb: 6,
                }}
            >
                <Typography sx={{ color: 'text.secondary', maxWidth: 900, mx: 'auto', mb: 2 }}>
                    Book your confinement food delivery package with us now!

                </Typography>
                <Button
                    component={NextLink}
                    href="/order"
                    variant="contained"
                    sx={{
                        backgroundColor: '#f27b96',
                        color: '#fff',
                        borderRadius: '12px',
                        px: 4,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        '&:hover': {
                            backgroundColor: '#e26782',
                        },
                    }}
                >
                    Order Now
                </Button>
                <Slide direction="up" in={true} timeout={600}>
                    <Box
                        sx={{
                            px: { xs: 2, md: 10 },
                            pt: 6,
                            pb: 8,
                            backgroundColor: '#fff0f3',
                            borderRadius: 3,
                            textAlign: 'center',
                            mt: 6,
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                color: '#f27b96',
                                fontWeight: 'bold',
                                mb: 2,
                            }}
                        >
                            Boost Your Recovery with Add-Ons
                        </Typography>

                        <Typography sx={{ maxWidth: 700, mx: 'auto', color: 'text.secondary', mb: 4 }}>
                            Complement your daily meals with nourishing extras carefully selected to aid recovery, boost energy, and enhance lactation.
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                gap: 4,
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                            }}
                        >
                            {/* Add-On 1 */}
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 2,
                                    width: 220,
                                    borderRadius: 2,
                                    backgroundColor: 'white',
                                    textAlign: 'center',
                                }}
                            >
                                {/* <Image
                                    src="/Background/red-date-tea.png"
                                    alt="Red Date Tea"
                                    width={120}
                                    height={120}
                                    style={{ borderRadius: '12px', objectFit: 'cover' }}
                                /> */}
                                <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                                    Red Date Tea
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Packed with iron and antioxidants for blood circulation.
                                </Typography>
                            </Paper>

                            {/* Add-On 2 */}
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 2,
                                    width: 220,
                                    borderRadius: 2,
                                    backgroundColor: 'white',
                                    textAlign: 'center',
                                }}
                            >
                                {/* <Image
                                    src="/Background/bird-nest.png"
                                    alt="Bird's Nest"
                                    width={120}
                                    height={120}
                                    style={{ borderRadius: '12px', objectFit: 'cover' }}
                                /> */}
                                <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                                    Bird's Nest
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Promote cell regeneration and glowing skin.
                                </Typography>
                            </Paper>

                            {/* Add-On 3 */}
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 2,
                                    width: 220,
                                    borderRadius: 2,
                                    backgroundColor: 'white',
                                    textAlign: 'center',
                                }}
                            >
                                {/* <Image
                                    src="/Background/pig-trotter.png"
                                    alt="Pig Trotter Vinegar"
                                    width={120}
                                    height={120}
                                    style={{ borderRadius: '12px', objectFit: 'cover' }}
                                /> */}
                                <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                                    Pig Trotter Vinegar
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Traditional recipe to strengthen joints and aid digestion.
                                </Typography>
                            </Paper>
                        </Box>
                    </Box>
                </Slide>
            </Box>

        </>
    );
}
