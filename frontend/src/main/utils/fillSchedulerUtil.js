import axios from 'axios';

// Function to convert a shift object to Axios parameters
const shiftToAxiosParams = (shift) => ({
    url: "/api/shift/post",
    method: "POST",
    data: {
        day: shift.day,
        driverBackupID: shift.driverBackupID,
        driverID: shift.driverID,
        id: shift.id,
        shiftEnd: shift.shiftEnd,
        shiftStart: shift.shiftStart,
    }
});

// Function to convert an availability object to Axios parameters
const driverToAxiosParams = (availability) => ({
    url: "/api/driverAvailability/new",
    method: "POST",
    data: {
        driverId: availability.driverId,
        day: availability.day,
        startTime: availability.startTime,
        endTime: availability.endTime,
        notes: availability.notes
    }
});

// Function to convert a ride object to Axios parameters
const rideToAxiosParams = (ride) => ({
    url: "/api/ride_request/post",
    method: "POST",
    data: {
        day: ride.day,
        startTime: ride.startTime,
        endTime: ride.endTime,
        pickupBuilding: ride.pickupBuilding,
        dropoffBuilding: ride.dropoffBuilding,
        dropoffRoom: ride.dropoffRoom,
        pickupRoom: ride.pickupRoom,
        course: ride.course,
        notes: ride.notes
    }
});

// Function to generate random notes of variable length
const generateRandomNotes = () => {
    const possibleNotes = [
        "Note 1", "Short note", "A bit longer note", "This is a much longer note to provide more detail",
        "Please be on time", "Student has special requirements", "Requires assistance with luggage",
        "Pickup location might change", "Contact student if any issues", "Prefers quiet rides"
    ];
    const randomIndex = Math.floor(Math.random() * possibleNotes.length);
    return possibleNotes[randomIndex];
};

// Function to fill the shift database with placeholder information
export const fillShiftDatabase = async () => {
    const placeholderShifts = [
        { id: 1, day: "Monday", shiftStart: "8:00AM", shiftEnd: "4:00PM", driverID: 1, driverBackupID: 2 },
        { id: 2, day: "Tuesday", shiftStart: "9:00AM", shiftEnd: "5:00PM", driverID: 3, driverBackupID: 4 },
        { id: 3, day: "Wednesday", shiftStart: "10:00AM", shiftEnd: "6:00PM", driverID: 5, driverBackupID: 6 },
        { id: 4, day: "Thursday", shiftStart: "11:00AM", shiftEnd: "7:00PM", driverID: 7, driverBackupID: 8 },
        { id: 5, day: "Friday", shiftStart: "12:00PM", shiftEnd: "8:00PM", driverID: 9, driverBackupID: 10 },
        { id: 6, day: "Saturday", shiftStart: "1:00PM", shiftEnd: "9:00PM", driverID: 11, driverBackupID: 12 },
        { id: 7, day: "Sunday", shiftStart: "2:00PM", shiftEnd: "10:00PM", driverID: 13, driverBackupID: 14 },
    ];

    for (const shift of placeholderShifts) {
        try {
            const axiosParams = shiftToAxiosParams(shift);
            await axios(axiosParams);
            console.log(`Shift for ${shift.day} successfully added`);
        } catch (error) {
            console.error(`Error adding shift for ${shift.day}: `, error);
        }
    }
};

// Function to fill the driver availability database with placeholder information
export const fillDriverAvailabilityDatabase = async () => {
    const placeholderAvailabilities = [
        { id: 1, driverId: 1, day: "Monday", startTime: "03:30PM", endTime: "03:30PM", notes: generateRandomNotes() },
        { id: 2, driverId: 1, day: "Monday", startTime: "03:30PM", endTime: "03:30PM", notes: generateRandomNotes() },
        { id: 3, driverId: 1, day: "Tuesday", startTime: "03:40PM", endTime: "03:40PM", notes: generateRandomNotes() },
        { id: 4, driverId: 1, day: "Wednesday", startTime: "3:30AM", endTime: "3:30AM", notes: generateRandomNotes() },
        { id: 5, driverId: 1, day: "Thursday", startTime: "4:00PM", endTime: "8:00PM", notes: generateRandomNotes() },
        { id: 6, driverId: 1, day: "Friday", startTime: "1:00PM", endTime: "5:00PM", notes: generateRandomNotes() },
        { id: 7, driverId: 1, day: "Saturday", startTime: "2:00PM", endTime: "6:00PM", notes: generateRandomNotes() },
    ];

    for (const availability of placeholderAvailabilities) {
        try {
            const axiosParams = driverToAxiosParams(availability);
            await axios(axiosParams);
            console.log(`Availability for Driver ${availability.driverId} on ${availability.day} successfully added`);
        } catch (error) {
            console.error(`Error adding availability for Driver ${availability.driverId} on ${availability.day}: `, error);
        }
    }
};

// Function to fill the ride request database with placeholder information
export const fillRideRequestDatabase = async () => {
    const placeholderRides = [
        { id: 1, riderId: 1, student: "Gen Tamada", day: "Tuesday", startTime: "3:30AM", endTime: "3:30AM", pickupBuilding: "Building A", dropoffBuilding: "Building B", dropoffRoom: "Room 101", pickupRoom: "Room 201", notes: generateRandomNotes(), course: "Course A", shiftId: 3 },
        { id: 2, riderId: 1, student: "Alex Johnson", day: "Wednesday", startTime: "4:00AM", endTime: "4:30AM", pickupBuilding: "Building C", dropoffBuilding: "Building D", dropoffRoom: "Room 102", pickupRoom: "Room 202", notes: generateRandomNotes(), course: "Course B", shiftId: 4 },
        { id: 3, riderId: 1, student: "Maria Garcia", day: "Thursday", startTime: "5:00AM", endTime: "5:30AM", pickupBuilding: "Building E", dropoffBuilding: "Building F", dropoffRoom: "Room 103", pickupRoom: "Room 203", notes: generateRandomNotes(), course: "Course C", shiftId: 5 },
        { id: 4, riderId: 1, student: "James Smith", day: "Friday", startTime: "6:00AM", endTime: "6:30AM", pickupBuilding: "Building G", dropoffBuilding: "Building H", dropoffRoom: "Room 104", pickupRoom: "Room 204", notes: generateRandomNotes(), course: "Course D", shiftId: 6 },
        { id: 5, riderId: 1, student: "Emily Davis", day: "Saturday", startTime: "7:00AM", endTime: "7:30AM", pickupBuilding: "Building I", dropoffBuilding: "Building J", dropoffRoom: "Room 105", pickupRoom: "Room 205", notes: generateRandomNotes(), course: "Course E", shiftId: 7 },
        { id: 6, riderId: 1, student: "Daniel Brown", day: "Sunday", startTime: "8:00AM", endTime: "8:30AM", pickupBuilding: "Building K", dropoffBuilding: "Building L", dropoffRoom: "Room 106", pickupRoom: "Room 206", notes: generateRandomNotes(), course: "Course F", shiftId: 8 },
        { id: 7, riderId: 1, student: "Sarah Wilson", day: "Monday", startTime: "9:00AM", endTime: "9:30AM", pickupBuilding: "Building M", dropoffBuilding: "Building N", dropoffRoom: "Room 107", pickupRoom: "Room 207", notes: generateRandomNotes(), course: "Course G", shiftId: 9 },
    ];

    for (const ride of placeholderRides) {
        try {
            const axiosParams = rideToAxiosParams(ride);
            await axios(axiosParams);
            console.log(`Ride request for ${ride.student} on ${ride.day} successfully added`);
        } catch (error) {
            console.error(`Error adding ride request for ${ride.student} on ${ride.day}: `, error);
        }
    }
};

// Function to fill all databases with placeholder information
export const fillAllDatabases = async () => {
    await fillShiftDatabase();
    await fillDriverAvailabilityDatabase();
    await fillRideRequestDatabase();
};