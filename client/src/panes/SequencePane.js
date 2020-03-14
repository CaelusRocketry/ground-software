import React from 'react';

import { Timeline, Event } from '../components/Timeline';
import Header from '../components/Header';

const SequencePane = () => (
    <div className="pane">
        <Header title="Sequence" />
        <Timeline>
            <Event interval="Pending" title={<h1 className="text-xl">Propellant Loading</h1>}>
                <ol>
                    <li>1. Assemble test stand, prepare propellants, etc. </li>
                    <li>2. Ensure all solenoid valves are closed.</li>
                    <li>3. Load ethanol into ethanol tank via manual ball valve</li>
                    <li>4. Monitor ethanol level</li>
                        <ol>
                            <li>a. Provide warning when approaching proper amount.</li>
                            <li>b. Provide secondary warning when proper amount his reached.</li>
                        </ol>
                    <li>5. Close ethanol manual ball valve</li>
                    <li>6. Ensure all ball manual valves are closed</li>
                </ol>
            </Event>
            <Event interval="Pending" title={<h1 className="text-xl">Leak Testing Phase 1</h1>}>
                <ol>
                    <li>1. Return to safe location</li>
                    <li>2. Leave ethanol tank on test stand for 10 minutes</li>
                    <li>3. Ensure propellant mass does not decrease</li>
                </ol>
            </Event>
            <Event interval="Pending" title={<h1 className="text-xl">Pressurant Loading</h1>}>
                <ol>
                    <li>1. Open solenoid valve between N2 tank and ethanol tank</li>
                    <li>2. Close valve once tank pressure reaches 800 psi (monitor pressure)</li>
                    <li>3. Open solenoid valve between N2O cylinder and N2O tank</li>
                    <li>4. Close valve once tank volume reaches proper amount</li>
                </ol>
            </Event>
            <Event interval="Pending" title={<h1 className="text-xl">Leak Testing Phase 2</h1>}>
                <ol>
                    <li>1. Leave tanks on test stand for 30 minutes</li>
                    <li>2. Ensure neither pressure nor mass decreases for either tank</li>
                    <li>a. Monitor temperature, pressure, and mass data for any anomalies</li>
                </ol>
            </Event>
            <Event interval="Pending" title={<h1 className="text-xl">Pre-Ignition</h1>}>
                <ol>
                    <li>1. Item 1</li>
                    <li>2. Item 2</li>
                </ol>
            </Event>
            <Event interval="Pending" title={<h1 className="text-xl">Disconnection</h1>}>
                <ol>
                    <li>1. Item 1</li>
                    <li>2. Item 2</li>
                </ol>
            </Event>
        </Timeline>
    </div>
);

export default SequencePane;
