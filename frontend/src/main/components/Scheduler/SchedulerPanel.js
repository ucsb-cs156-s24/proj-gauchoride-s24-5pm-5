import React from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import scheduleEventsFixtures from "fixtures/scheduleEventsFixtures";

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const hours = [
    '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', 
    '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM'
];

// const events = [
//     {
//         title: "Meeting with Team",
//         day: "Tuesday",
//         startTime: "2:00PM",
//         endTime: "4:00PM"
//     }
// ];

export default function SchedulerPanel({ Events = scheduleEventsFixtures.sixEvents}) {

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

    return (
        <Container fluid style={styles.schedulerPanel}>
            <Row style={styles.headerRow}>
                <Col style={styles.timeColumn}></Col>
                {daysOfWeek.map(day => (
                    <Col key={day} style={styles.dayColumn}>
                        <Card style={styles.dayCard}>
                            <Card.Body>
                                <Card.Title style={styles.dayTitle}>{day}</Card.Title>
                            </Card.Body>
                            {Events
                                .filter(event => event.day === day)
                                .map(event => (
                                <Card key={event.title} style={getEventStyle(event.startTime, event.endTime)}>
                                    <Card.Body>
                                        <Card.Text>{event.title}</Card.Text>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row>
                <Col style={styles.timeColumn}>
                    <div style={{...styles.timeSlot, height: "30px", border: "0"}}></div>
                    {hours.map((hour, index) => (
                        <div key={index} style={{...styles.timeSlot, border: "0"}}>
                            <span style={styles.hourLabel}>{hour}</span>
                        </div>
                    ))}
                </Col>
                {daysOfWeek.map(day => (
                    <Col key={day} style={styles.dayColumn}>
                        <div style={{...styles.timeSlot, height: "30px"}}></div>
                        {hours.slice(0, hours.length-1).map(hour => (
                            <div key={hour} style={styles.timeSlot}>
                                <Card style={styles.eventCard}/>
                            </div>
                        ))}
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

const styles = {
    schedulerPanel: {
        backgroundColor: "#fff",
    },
    headerRow: {
        textAlign: "center",
    },
    timeColumn: {
        textAlign: "right",
        borderRight: "1px solid #ddd",
        position: "relative",
    },
    dayColumn: {
        padding: 0,
        borderRight: "1px solid #ddd"
    },
    dayCard: {
        backgroundColor: "#ddd",
        borderRadius: "0"
    },
    dayTitle: {
        fontSize: "1.2rem",
        fontWeight: "bold"
    },
    timeSlot: {
        height: "60px", /* Full time slot height */
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderBottom: "1px solid #ddd",
    },
    eventCard: {
        width: "100%",
        height: "100%",
        border: "0",
        // borderBottom: "1px solid #eeeeee",
        borderRadius: "0",
    },
    hourLabel: {
        height: "30px", /* Half of the full time slot height */
        display: "flex",
        alignItems: "center",
        justifyContent: "right",
        position: "absolute",
        top: 0,
        right: "5px",
        transform: "translateY(-50%)",
    }
};