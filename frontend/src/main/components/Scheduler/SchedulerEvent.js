import React from "react";
import { Card } from 'react-bootstrap';

const convertTimeToMinutes = (time) => {
    const [timePart, modifier] = [time.slice(0, -2), time.slice(-2)];
    let [hours, minutes] = timePart.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
        hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
        hours = 0;
    }

    return hours * 60 + minutes;
};


const getEventStyle = (startTime, endTime) => {
    const startMinutes = convertTimeToMinutes(startTime);
    const endMinutes = convertTimeToMinutes(endTime);

    // Normalize the start time to 7 AM
    const startOffset = 6 * 59.5 - 30;
    const topPosition = startMinutes - startOffset;
    const height = endMinutes - startMinutes;

    return {
        position: 'absolute',
        top: `${topPosition}px`,
        height: `${height}px`,
        width: '100%',
        backgroundColor: '#d1ecf188',
        border: '2px solid #bee5eb',
        zIndex: 1
    };
};

export default function SchedulerEvents({ event }) {
    return(
        <Card key={event.title} style={getEventStyle(event.startTime, event.endTime)}>
            <Card.Body>
                <Card.Text>{event.title}</Card.Text>
            </Card.Body>
        </Card>
    )
}