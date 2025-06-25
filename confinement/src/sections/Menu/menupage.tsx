"use client";

import { useState, useEffect } from "react";
import { format, parseISO, addDays } from "date-fns";
import { Box, Typography, Button, Paper, Divider, Slide, TextField } from "@mui/material";
import { recoveryMenuPool } from "@/components/menu/recoveryMenuPool";
import { nourishMenuPool } from "@/components/menu/nourishMenuPool";
import { getMenuIndexesForDate } from "../../components/menu/getMenuIndexesForDate";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Image from 'next/image';
import NextLink from 'next/link';

const RECOVERY_LENGTH = 7;
const NOURISH_LENGTH = 21;
const BASE_DATE = parseISO("2025-01-01");

export default function menupage() {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [startDateStr, setStartDateStr] = useState(format(new Date(), "yyyy-MM-dd"));
    const [selectedWeek, setSelectedWeek] = useState(1);
    const [weekDays, setWeekDays] = useState<{ day: string; date: string; rawDate: Date }[]>([]);
    const [selectedDay, setSelectedDay] = useState<{ day: string; date: string; rawDate: Date } | null>(null);
    const [selectedDayByWeek, setSelectedDayByWeek] = useState<Record<number, { day: string; date: string; rawDate: Date }>>({});
    const [menu, setMenu] = useState<Menu>({ lunchDishes: [], dinnerDishes: [] });
    const [nonOperatingDays, setNonOperatingDays] = useState<string[]>([]);

    interface Menu {
        lunchDishes: Dish[];
        dinnerDishes: Dish[];
    }

    interface Dish {
        english: string;
        chinese: string;
    }

    const getActualWeekStart = (baseDate: Date, weekIndex: number, nonOperatingDays: string[]): Date => {
        let count = 0;
        let currentDate = baseDate;
        let actualDayCount = 0;

        while (actualDayCount < (weekIndex - 1) * 7) {
            const dateStr = format(currentDate, "yyyy-MM-dd");
            if (!nonOperatingDays.includes(dateStr)) {
                actualDayCount++;
            }
            currentDate = addDays(currentDate, 1);
            if (count++ > 365) break;
        }
        return currentDate;
    };

    useEffect(() => {
        setSelectedWeek(1);
    }, []);

    useEffect(() => {
        const parsedStartDate = parseISO(startDateStr);
        const baseWeekStart = getActualWeekStart(parsedStartDate, selectedWeek, nonOperatingDays);

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

        if (selectedDayByWeek[selectedWeek]) {
            setSelectedDay(selectedDayByWeek[selectedWeek]);
        } else {
            const firstDay = rotatedWeek[0];
            setSelectedDay(firstDay);
            setSelectedDayByWeek((prev) => ({ ...prev, [selectedWeek]: firstDay }));
        }
    }, [startDate, selectedWeek, nonOperatingDays]);

    useEffect(() => {
        if (!selectedDay) return;
        const { recoveryIndex, nourishIndex } = getMenuIndexesForDate(selectedDay.rawDate, nonOperatingDays);
        const isRecoveryWeek = selectedWeek === 1;
        const menu = isRecoveryWeek
            ? recoveryMenuPool[recoveryIndex] ?? { lunchDishes: [], dinnerDishes: [] }
            : nourishMenuPool[nourishIndex] ?? { lunchDishes: [], dinnerDishes: [] };
        setMenu(menu);
    }, [selectedDay, selectedWeek, startDate]);

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
                        fontSize: { xs: '2rem', md: '2.75rem' },
                        mb: 3,
                    }}
                >
                    Conscientiously Crafted Confinement Meals
                </Typography>

                <Typography sx={{ color: '#6D6E71', maxWidth: 900, mx: 'auto', mb: 2 }}>
                    The tasty and healthy confinement catering meals included in our packages focus on the overall wellness of the new mum after childbirth.
                </Typography>

                <Typography sx={{ color: '#6D6E71', maxWidth: 900, mx: 'auto', mb: 2 }}>
                    With Chilli Padi Confinement Catering, our specially crafted meals promote lactation. Milk-boosting ingredients such as salmon, papaya, spinach and turmeric and many others have been incorporated in our menu to support breastfeeding.
                </Typography>

                <Typography sx={{ color: '#6D6E71', maxWidth: 900, mx: 'auto' }}>
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
                        <Typography variant="subtitle2" fontWeight="bold" mt={1} sx={{ color: '#f27b96' }}>
                            Immunity Boosting Cordyceps Militaris Chicken Soup
                        </Typography>
                        <Typography variant="body2" color="#6D6E71">
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
                        <Typography variant="subtitle2" fontWeight="bold" mt={1} sx={{ color: '#f27b96' }}>
                            Milk Boosting Fish and Papaya Soup
                        </Typography>
                        <Typography variant="body2" color="#6D6E71">
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
                        <Typography variant="subtitle2" fontWeight="bold" mt={1} sx={{ color: '#f27b96' }}>
                            Wok Fried Huai Shan Noodle with Egg
                        </Typography>
                        <Typography variant="body2" color="#6D6E71">
                            锅炒淮三面与蛋
                        </Typography>
                    </Box>

                </Box>
            </Box>

            <Box sx={{ mb: 4, p: 3, maxWidth: '48rem', mx: 'auto', bgcolor: 'white', boxShadow: 6, borderRadius: 2, border: '1px solid', borderColor: 'grey.200', textAlign: 'center' }}>
                <Typography variant="h4" sx={{ mb: 6, color: '#f27b96' }}>
                    Select Your Meal Start Date
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
                            <DatePicker
                                label="Start Date"
                                value={dayjs(startDate)}
                                onChange={(newValue) => {
                                    if (!newValue) return;
                                    const jsDate = (newValue as Dayjs).toDate();
                                    setStartDate(jsDate);
                                    setStartDateStr(format(jsDate, "yyyy-MM-dd"));
                                    setSelectedWeek(1);
                                    setSelectedDayByWeek({});
                                }}
                                shouldDisableDate={(date) =>
                                    nonOperatingDays.includes((date as Dayjs).format("YYYY-MM-DD"))
                                }
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        sx: {
                                            bgcolor: 'background.paper',
                                            borderRadius: 2,
                                            boxShadow: 1,
                                        },
                                    },
                                }}
                                sx={{ borderRadius: 2, bgcolor: 'background.paper', boxShadow: 1 }}
                            />
                        </Box>
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
                        <Typography variant="subtitle1" sx={{ mb: 2, color: '#f27b96' }}>
                            LONGAN RED DATE TEA SERVED WITH EVERY MEAL
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: ['column', 'row'], gap: 3, mt: 2 }}>
                            {["Lunch", "Dinner"].map((type) => (
                                <Paper key={type} elevation={3} sx={{ flex: 1, p: 3, textAlign: 'center', backgroundColor: '#FACAD5' }}>
                                    <Typography variant="h5" sx={{ fontWeight: 'extrabold', textTransform: 'uppercase', color: '#6D6E71' }}>
                                        {type}
                                    </Typography>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#f27b96' }}>
                                        {type === "Lunch" ? "午餐" : "晚餐"}
                                    </Typography>
                                    <Divider sx={{ my: 2 }} />
                                    <Box sx={{ textAlign: 'left' }}>
                                        {(type === "Lunch" ? menu.lunchDishes : menu.dinnerDishes).map((dish, index) => (
                                            <Box key={index} sx={{ mb: 2 }}>
                                                <Typography sx={{ fontWeight: 'extrabold', color: '#6D6E71' }}>{dish.english}</Typography>
                                                <Typography sx={{ color: '#f27b96' }}>{dish.chinese}</Typography>
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
                <Typography sx={{ color: '#6D6E71', maxWidth: 900, mx: 'auto', mb: 2 }}>
                    Book your confinement food delivery package with us now!

                </Typography>
                <Button
                    component={NextLink}
                    href="/productList"
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
                            variant="h4"
                            sx={{
                                color: '#f27b96',
                                mb: 2,
                            }}
                        >
                            Boost Your Recovery with Add-Ons
                        </Typography>

                        <Typography sx={{ maxWidth: 700, mx: 'auto', color: '#6D6E71', mb: 4 }}>
                            Complement your daily meals with nourishing extras carefully selected to aid recovery, boost energy, and enhance lactation.
                        </Typography>
                        {/* Dishes */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5, flexWrap: 'wrap', my: 6 }}>
                            {/* Dish 1 */}
                            <Box sx={{ textAlign: 'center', maxWidth: 180 }}>
                                <Image
                                    src="/Background/Addon_1.png" // Replace with your image path
                                    alt="Add on 1"
                                    width={200}
                                    height={180}
                                    style={{ borderRadius: '20%' }}
                                />
                                <Typography variant="subtitle2" mt={1} sx={{ color: '#f27b96' }}>
                                    Pig's Trotter with Ginger Vinegar and Egg
                                </Typography>
                                <Typography variant="body2" color="#6D6E71">
                                    1 Serving - $12.00
                                </Typography>
                                <Typography variant="body2" color="#6D6E71">
                                    3 Servings - $35.00
                                </Typography>
                                <Typography variant="body2" color="#6D6E71">
                                    5 Servings - $55.00
                                </Typography>

                            </Box>

                            {/* Dish 2 */}
                            <Box sx={{ textAlign: 'center', maxWidth: 180 }}>
                                <Image
                                    src="/Background/Addon_2.png" // Replace with your image path
                                    alt="Add on 2"
                                    width={200}
                                    height={180}
                                    style={{ borderRadius: '20%' }}
                                />
                                <Typography variant="subtitle2" mt={1} sx={{ color: '#f27b96' }}>
                                    Milk Boosting Fish and Papaya Soup
                                </Typography>
                                <Typography variant="body2" color="#6D6E71">
                                    1 Serving - $7.00
                                </Typography>
                                <Typography variant="body2" color="#6D6E71">
                                    3 Servings - $20.00
                                </Typography>
                                <Typography variant="body2" color="#6D6E71">
                                    5 Servings - $32.00
                                </Typography>
                            </Box>

                            {/* Dish 3 */}
                            <Box sx={{ textAlign: 'center', maxWidth: 180 }}>
                                <Image
                                    src="/Background/Addon_3.png" // Replace with your image path
                                    alt="Wok Fried Huai Shan Noodle"
                                    width={200}
                                    height={180}
                                    style={{ borderRadius: '20%' }}
                                />
                                <Typography variant="subtitle2" mt={1} sx={{ color: '#f27b96' }}>
                                    Homemade Bird's Nest
                                </Typography>
                                <Typography variant="body2" color="#6D6E71">
                                    1 Serving - $15.00
                                </Typography>
                                <Typography variant="body2" color="#6D6E71">
                                    3 Servings - $42.00
                                </Typography>
                                <Typography variant="body2" color="#6D6E71">
                                    5 Servings - $66.00
                                </Typography>
                            </Box>

                        </Box>

                    </Box>
                </Slide>
            </Box>

        </>
    );
}
