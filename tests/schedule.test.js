// A simple function to test the 8-hour (480 mins) logic
const checkScheduleLimit = (currentTotal, newTaskDuration) => {
    const LIMIT = 480; // 8 hours in minutes
    return (currentTotal + newTaskDuration) <= LIMIT;
};

describe('Scheduling Algorithm Logic', () => {

    test('Should allow a 60-min task when the schedule is empty', () => {
        expect(checkScheduleLimit(0, 60)).toBe(true);
    });

    test('Should allow a task that fits exactly at the 480-minute limit', () => {
        expect(checkScheduleLimit(400, 80)).toBe(true); // 400 + 80 = 480
    });

    test('Should reject a task that exceeds the 8-hour workday', () => {
        expect(checkScheduleLimit(450, 40)).toBe(false); // 450 + 40 = 490
    });

    test('Should reject a single task longer than 8 hours', () => {
        expect(checkScheduleLimit(0, 500)).toBe(false);
    });
});