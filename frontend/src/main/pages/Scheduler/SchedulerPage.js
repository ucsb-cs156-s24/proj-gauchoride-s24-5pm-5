import SchedulerPanel from "main/components/Scheduler/SchedulerPanel";
import React, { useState } from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { Button, ButtonGroup } from "react-bootstrap";
import { useBackend } from "main/utils/useBackend";
import scheduleEventsFixtures from "fixtures/scheduleEventsFixtures";

export default function SchedulerPage() {
    const [events, setEvents] = useState(scheduleEventsFixtures.sixEvents);

    const { data: shifts } =
        useBackend(
            // Stryker disable next-line all : don't test internal caching of React Query
            [`/api/shift/all`],
            {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
                method: "GET",
                url: `/api/shift/all`
                // Stryker restore all
            },
        );
        
    const { data: ride_request } =
        useBackend(
            // Stryker disable next-line all : don't test internal caching of React Query
            [`/api/ride_request/all`],
            {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
                method: "GET",
                url: `/api/ride_request/all`
                // Stryker restore all
            },
        );
        
    const { data: driverAvailability } =
        useBackend(
            // Stryker disable next-line all : don't test internal caching of React Query
            [`/api/driverAvailability/admin/all`],
            {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
                method: "GET",
                url: `/api/driverAvailability/admin/all`
                // Stryker restore all
            },
        );

    return (
        <BasicLayout>
            <ButtonGroup>
                <Button onClick={() => {setEvents([]);setEvents(shifts.map(shift => ({
                    id: shift.id,
                    title: `Shift for Driver ${shift.driverID}`,
                    description: `Backup Driver: ${shift.driverBackupID}`,
                    day: shift.day,
                    startTime: shift.shiftStart,
                    endTime: shift.shiftEnd
                })))}}>Shifts</Button>

                <Button onClick={() => {setEvents([]);setEvents(ride_request.map(request => ({
                    id: request.id,
                    title: `Ride Request for ${request.student}`,
                    description: `From ${request.pickupBuilding} to ${request.dropoffBuilding}`,
                    day: request.day,
                    startTime: request.startTime,
                    endTime: request.endTime
                })))}}>Ride Requests</Button>

                <Button onClick={() => {setEvents([]);setEvents(driverAvailability.map(availability => ({
                    id: availability.id,
                    title: `Availability for Driver ${availability.driverId}`,
                    description: availability.notes,
                    day: availability.day,
                    startTime: availability.startTime,
                    endTime: availability.endTime
                })))}}>Driver Availability</Button>
            </ButtonGroup>
            <SchedulerPanel Events={events} />
        </BasicLayout>
    );
}