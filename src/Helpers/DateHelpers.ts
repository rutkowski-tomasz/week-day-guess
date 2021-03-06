
const useDateHelpers = () => {
    const generateDate = (startYear = 1200, endYear = 2300): Date => {
        const startDate = new Date(startYear, 1, 1);
        const endDate = new Date(endYear, 12, 31);

        const diff = endDate.getTime() - startDate.getTime();
        return new Date(startDate.getTime() + (Math.random() * diff));
    };

    const formatDate = (date: Date): string => {
        const day = (date.getDate()).toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}.${month}.${date.getFullYear()}`;
    };

    const formatWeekDay = (day: number): string => {
        switch (day) {
            case 0: return 'Sunday';
            case 1: return 'Monday';
            case 2: return 'Tuesday';
            case 3: return 'Wednesday';
            case 4: return 'Thursday';
            case 5: return 'Friday';
            case 6: return 'Saturday';
            default: return 'Unknown day';
        }
    };

    const isLeap = (year: number) => new Date(year, 1, 29).getDate() === 29;

    return {
        generateDate,
        formatDate,
        formatWeekDay,
        isLeap
    };
}

export default useDateHelpers;