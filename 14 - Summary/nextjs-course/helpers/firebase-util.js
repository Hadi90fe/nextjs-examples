// FIREBASE DATABASE SECTION
export async function getAllMeetups() {
    const response = await fetch(
        "https://nextjs-course-d483f-default-rtdb.firebaseio.com/meetups.json"
    );
    const data = await response.json();
    return data;
}

export async function getFeaturedMeetups() {
    const allMeetups = await getAllMeetups();
    return allMeetups.filter((meetup) => meetup.isFeatured);
}

export async function getMeetupById(id) {
    const allMeetups = await getAllMeetups();
    return allMeetups.find((meetup) => meetup.id === id);
}

export async function getFilteredMeetups(dateFilter) {
    const { year, month } = dateFilter;

    const allMeetups = await getAllMeetups();

    let filteredMeetups = allMeetups.filter((meetup) => {
        const meetupDate = new Date(meetup.date);
        return (
            meetupDate.getFullYear() === year &&
            meetupDate.getMonth() === month - 1
        );
    });

    return filteredMeetups;
}