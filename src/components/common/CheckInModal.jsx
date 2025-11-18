import { Icon } from '@iconify/react';

export default function CheckInModal({point ,onClose}) {
    return (
        <>
            <h3 className="checkin-success-title">
                <span style={{ marginRight: "8px" }}>Check-in Successful!</span>
                <Icon icon="noto:party-popper" width="50" height="50" />
            </h3>
            <div className="checkin-points-earned">+{point?.scoreBoard[point.streak]||0} Points</div>
            <div className="checkin-calendar">
                {point?.scoreBoard?.map((points, index) => (
                    <div key={index} className={`checkin-day ${index <point.streak ? 'completed' : index ===(point.streak) ? 'today' : ''}`}>
                        <div className="day-number">Day {index + 1}</div>
                        <div className="day-icon">{index <(point.streak) ? '✓' : index ===(point.streak) ? '⭐' : '○'}</div>
                        <div className="day-points">{points} pts</div>
                    </div>
                ))}
            </div>
            <div className="checkin-streak-info">
                <span className="streak-text">Current Streak: {point.streak} days</span>
                <span className="streak-next">Next: {point?.scoreBoard[point.streak] || 'Complete!'} pts</span>
            </div>
            <button className="modal-btn" onClick={() => onClose()}>Got it!</button>
        </>
    )
}