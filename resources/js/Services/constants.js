import moment from "moment-jalaali";

export const lang = {
    fa: {
        week: "هفته",
        work_week: "هفته کاری",
        day: "روز",
        month: "ماه",
        previous: "قبل",
        next: "بعد",
        today: "امروز",
        agenda: "جدول",
        date: "تاریخ",
        time: "زمان",
        event: "رویداد",
        allDay: "همه ی روز",
        yesterday: "دیروز",
        tomorrow: "فردا",

        noEventsInRange: "There are no events in this range.",
        showMore: function showMore(total) {
            return "+" + total + " بیشتر";
        }
        // showMore: (total) => `+${total} إضافي`
    }
};

export const myEvents = [
    {
        title: "un",
        start: new Date(2022, 9, 4, 9, 0, 0),
        end: new Date(2022, 9, 4, 11, 0, 0),
        targa: "something",
        user: "Opedddddddddddddddddddddddddddddddddddddddddddddddratore 1",
        hexColor: "854456",
        color: "FFF"
    },
    {
        title: "deux",
        start: new Date(2022, 9, 4, 12, 0, 0),
        end: new Date(2022, 9, 4, 15, 0, 0),
        targa: "hello",
        user: "Operatore 2",
        hexColor: "ffa500",
        color: "FFF",
        duration: 1
    },
    {
        title: "trois",
        start: new Date(2022, 8, 4, 10, 0, 0),
        end: new Date(2022, 8, 4, 12, 0, 0),
        targa: "CR 568 ER",
        user: "Operatore 3",
        hexColor: "3cb371",
        color: "FFF"
    },
    {
        title: "quatre",
        start: new Date(2022, 3, 12, 12, 0, 0),
        end: new Date(2022, 3, 12, 14, 0, 0),
        targa: "CB 569 EG",
        user: "Operatore 1",
        hexColor: "13324b",
        color: "FFF"
    },
    {
        title: "cinq",
        start: new Date(2022, 3, 12, 10, 0, 0),
        end: new Date(2022, 3, 12, 11, 0, 0),
        targa: "CB 569 EG",
        user: "Operatore 2",
        hexColor: "ffa500",
        color: "FFF",
        duration: 1
    },
    {
        title: "six",
        start: new Date(2022, 3, 12, 12, 30, 0),
        end: new Date(2022, 3, 12, 14, 30, 0),
        targa: "CB 569 EG",
        user: "Operatore 3",
        hexColor: "3cb371",
        color: "FFF"
    },
    {
        title: "sept",
        start: new Date(2022, 3, 12, 15, 0, 0),
        end: new Date(2022, 3, 12, 17, 0, 0),
        targa: "CB 569 EG",
        user: "Operatore 1",
        hexColor: "13324b",
        color: "FFF"
    },
    {
        title: "huit",
        start: new Date(2022, 3, 12, 15, 0, 0),
        end: new Date(2022, 3, 12, 16, 0, 0),
        targa: "CB 569 EG",
        user: "Operatore 2",
        hexColor: "ffa500",
        color: "FFF",
        duration: 1
    },
    {
        title: "neuf",
        start: new Date(2022, 3, 12, 15, 0, 0),
        end: new Date(2022, 3, 12, 17, 0, 0),
        targa: "CB 569 EG",
        user: "Operatore 3",
        hexColor: "3cb371",
        color: "FFF"
    }
];

export const myBackgroundEvents = [
    {
        id: 0,
        title: "Available",
        start: new Date(2022, 9, 1, 9, 0, 0),
        end: new Date(2022, 9, 5, 18, 0, 0),
        targa: "CB 569 EG",
        user: "Operatore 3",
        hexColor: "25654585",
        color: "FFF"
    },
    {
        id: 1,
        title: "AAAAAAAAAa",
        start: new Date(2022, 9, 9, 9, 0, 0),
        end: new Date(2022, 9, 10, 18, 0, 0),
        targa: "CB 569 EG",
        user: "Operatore 3",
        hexColor: "25654585",
        color: "152552"
    },
    {
        id: 2,
        title: "AAAAAAAAdfcdfsAa",
        start: new Date(moment(new Date(2022, 9, 9, 12, 0, 0))),
        end: new Date(moment(new Date(2022, 11, 9, 12, 0, 0))),
        targa: "CB 569 EG",
        user: "Operatore 3",
        hexColor: "25654585",
        color: "152532"
    }
];
