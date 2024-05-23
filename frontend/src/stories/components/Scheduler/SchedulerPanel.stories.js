import React from 'react';
import SchedulerPanel from "main/components/Scheduler/SchedulerPanel";
// import { riderApplicationFixtures } from 'fixtures/riderApplicationFixtures';


export default {
    title: 'components/Scheduler/SchedulerPanel',
    component: SchedulerPanel
};

const Template = (args) => {
    return (
        <SchedulerPanel {...args} />
    )
};


export const Default = Template.bind({});