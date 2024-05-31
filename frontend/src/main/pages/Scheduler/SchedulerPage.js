import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SchedulerPanel from "main/components/Scheduler/SchedulerPanel";

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { Button, ButtonGroup, Stack } from "react-bootstrap";

import { useBackend, useBackendMutation } from "main/utils/useBackend";

import { cellToAxiosParamsDelete as shiftCellToAxiosParamsDelete, onDeleteSuccess as shiftOnDeleteSuccess } from "main/utils/shiftUtils"
import { cellToAxiosParamsDelete as RideCellToAxiosParamsDelete, onDeleteSuccess as RideOnDeleteSuccess } from "main/utils/rideUtils"
import { cellToAxiosParamsDelete as driverAvailabilityCellToAxiosParamsDelete, onDeleteSuccess as driverAvailabilityOnDeleteSuccess } from "main/utils/driverAvailabilityUtils"

export default function SchedulerPage() {
    const { page } = useParams();

    const navigate = useNavigate();

    const [events, setEvents] = useState();
    const [createLink, setCreateLink] = useState();

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

    const editShiftCallback = (shift) => {
        navigate(`/shift/edit/${shift.id}`)
    }

    const infoShiftCallback = (shift) => {
        navigate(`/shiftInfo/${shift.id}`)
    }

    // Stryker disable all : hard to test for query caching

    const shiftDeleteMutation = useBackendMutation(
        shiftCellToAxiosParamsDelete,
        { onSuccess: shiftOnDeleteSuccess },
        ["/api/shift/all"]
    );
    // Stryker restore all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteShiftCallback = async (shift) => { shiftDeleteMutation.mutate({row: {values: {id: shift.id}}}); }




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

    const editRideCallback = (ride) => {
        navigate(`/ride/edit/${ride.id}`)
    }

    const assignRideCallback = (ride) => {
        navigate(`/ride/assigndriver/${ride.id}`)
    }

    // Stryker disable all : hard to test for query caching

    const RideDeleteMutation = useBackendMutation(
        RideCellToAxiosParamsDelete,
        { onSuccess: RideOnDeleteSuccess },
        ["/api/ride_request/all"]
    );
    // Stryker restore all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteRideCallback = async (ride) => { RideDeleteMutation.mutate({row: {values: {id: ride.id}}}); }




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

    const reviewDriverCallback = (driver) => {
        navigate(`/admin/availability/review/${driver.id}`)
    }

    // Stryker disable all : hard to test for query caching

    const DriverDeleteMutation = useBackendMutation(
        driverAvailabilityCellToAxiosParamsDelete,
        { onSuccess: driverAvailabilityOnDeleteSuccess },
        ["/availability"]
    );
    // Stryker restore all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteDriverCallback = async (driver) => { DriverDeleteMutation.mutate({row: {values: {id: driver.id}}}); }



    // Stryker disable all : hard to test for use effect
    useEffect(() => {
        if(page === "shifts") {
            if(shifts === undefined) return;
            setEvents(shifts.map(shift => ({
                id: shift.id,
                title: `Shift for Driver ${shift.driverID}`,
                description: `Backup Driver: ${shift.driverBackupID}`,
                day: shift.day,
                startTime: shift.shiftStart,
                endTime: shift.shiftEnd,
                actions: [
                    { text: "Edit", variant: "primary", callback: () => editShiftCallback(shift) },
                    { text: "Delete", variant: "danger", callback: () => {deleteShiftCallback(shift); navigate(0)} },
                    { text: "Info", variant: "success", callback: () => infoShiftCallback(shift) }
                ].filter(Boolean) // remove undefined values
            })));
            setCreateLink("/shift/create");
        }
        else if(page === "rides") {
            if(ride_request === undefined) return;
            setEvents(ride_request.map(request => ({
                id: request.id,
                title: `Ride Request for ${request.student}`,
                description: `From ${request.pickupBuilding} to ${request.dropoffBuilding}`,
                day: request.day,
                startTime: request.startTime,
                endTime: request.endTime,
                actions: [
                    { text: "Edit", variant: "primary", callback: () => editRideCallback(request) },
                    { text: "Delete", variant: "danger", callback: () => {deleteRideCallback(request); navigate(0)} },
                    { text: "Assign Driver", variant: "success", callback: () => assignRideCallback(request) }
                ].filter(Boolean) // remove undefined values
            })));
            setCreateLink("/ride/create");
        }
        else if(page === "driver") {
            if(driverAvailability === undefined) return;
            setEvents(driverAvailability.map(availability => ({
                id: availability.id,
                title: `Availability for Driver ${availability.driverId}`,
                description: availability.notes,
                day: availability.day,
                startTime: availability.startTime,
                endTime: availability.endTime,
                actions: [  
                    { text: "Delete", variant: "danger", callback: () => {deleteDriverCallback(availability); navigate(0)} },
                    { text: "Review", variant: "success", callback: () => reviewDriverCallback(availability) }
                ].filter(Boolean) // remove undefined values
            })));
            setCreateLink("/availability/create");
        }
        else {
            setEvents();
            setCreateLink();
        }
    }, [shifts, ride_request, driverAvailability, page]);
    // Stryker restore all

    return (
        <BasicLayout>
            <Stack className="flex-row justify-content-between">
                <ButtonGroup>
                    <Button onClick={() => {navigate('/admin/schedule/shifts')}}>Shifts</Button>
                    <Button onClick={() => {navigate('/admin/schedule/rides')}}>Ride Requests</Button>
                    <Button onClick={() => {navigate('/admin/schedule/driver')}}>Driver Availability</Button>
                </ButtonGroup>
                {page && 
                    <Button
                        variant="success"
                        onClick={() => navigate(createLink)}
                    >
                        Create {page}
                    </Button>
                }
            </Stack>
            <SchedulerPanel Events={events} />
        </BasicLayout>
    );
}