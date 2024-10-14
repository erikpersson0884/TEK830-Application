import React from 'react';
import './ReportPage.css';

const ReportPage = () => {

    const mockReports = [
        {
            date: '2021-01-01',
            estimatedWentToSleepTime: '22:34',
            estimatedWokeUpTime: '08:13',
            sleepMoodStartedAt: '19:48',
            sleepMoodEndedAt: '20:13',
        },
        {
            date: '2021-01-02',
            estimatedWentToSleepTime: '23:00',
            estimatedWokeUpTime: '07:45',
            sleepMoodStartedAt: '20:00',
            sleepMoodEndedAt: '20:30',
        },
        {
            date: '2021-01-03',
            estimatedWentToSleepTime: '21:45',
            estimatedWokeUpTime: '06:30',
            sleepMoodStartedAt: '18:30',
            sleepMoodEndedAt: '19:00',
        }
    ]

    const reports = mockReports;

    const [activeReport, setActiveReport] = React.useState(0);

    const handleNext = () => {
        if (activeReport < mockReports.length - 1) {
            setActiveReport(activeReport + 1);
        }
    }

    const handlePrevious = () => {
        if (activeReport > 0) {
            setActiveReport(activeReport - 1);
        }
    }

    return (
        <div className='reportPage'>
            <header>
                <button className={`${!(activeReport > 0) && "invisible"} noButtonFormatting`} onClick={handlePrevious}>Previous</button>
                <h1>Report Page</h1>
                <button className={`${!(activeReport < reports.length-1) && "invisible"} noButtonFormatting`} onClick={handleNext}>Next</button>
                
            </header>

            <article className='report'>
                <header>
                    <h2>{reports[activeReport].date}</h2>
                    <p>John Blund, your daily sleep report</p>
                    <hr />
                </header>


                <section>
                    <h2>Sleep</h2>
                    <div>
                        <p>You went to sleep at:</p>
                        <p>{reports[activeReport].estimatedWentToSleepTime}</p>
                    </div>

                    <div>
                        <p>You woke up at:</p>
                        <p>{reports[activeReport].estimatedWokeUpTime}</p>
                    </div>

                    <div>
                        <p>You slept for:</p>
                        <p>
                            {(() => {
                                const sleepTime = new Date(`1970-01-01T${reports[activeReport].estimatedWentToSleepTime}:00`);
                                const wakeTime = new Date(`1970-01-01T${reports[activeReport].estimatedWokeUpTime}:00`);
                                let diff = wakeTime.getTime() - sleepTime.getTime();
                                if (diff < 0) {
                                    diff += 24 * 60 * 60 * 1000; // Adjust for crossing midnight
                                }
                                const hours = Math.floor(diff / (1000 * 60 * 60));
                                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                                return `${hours} hours and ${minutes} minutes`;
                            })()}
                        </p>
                    </div>

                </section>
                
                <hr />
                <section>
                    <h2>Devices</h2>
                    <div>
                        <p>The sleep routine started at</p>
                        <p>{reports[activeReport].sleepMoodStartedAt}</p>
                    </div>
                    <div>
                        <p>The sleep routine ended at</p>
                        <p>{reports[activeReport].sleepMoodEndedAt}</p>
                    </div>
                    
                    <div>
                        <p>The wake up routine started at:</p>
                        <p>{reports[activeReport].sleepMoodStartedAt}</p>
                    </div>

                    <div>
                        <p>The wake up routine ended at:</p>
                        <p>{reports[activeReport].sleepMoodEndedAt}</p>
                    </div>

                </section>
            </article>
        </div>
    )
}

export default ReportPage;
