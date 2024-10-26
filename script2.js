// Attendance records for each UID (randomized for demonstration)
const attendanceRecords = {
    "U2304001": { "DSA": 10, "OOP": 8, "CSP": 5, "DMA": 7, "EVS": 6, "MINOR": 9, "OOP LAB": 5 },
    "U2304002": { "DSA": 9, "OOP": 6, "CSP": 5, "DMA": 8, "EVS": 7, "MINOR": 10, "OOP LAB": 4 },
    "U2304003": { "DSA": 11, "OOP": 7, "CSP": 6, "DMA": 9, "EVS": 5, "MINOR": 8, "OOP LAB": 3 },
    // Add more records as needed
};

// Timetable
const timetable = {
    "Monday": ["OOP", "DSA", "CSP", "DSA", "EVS", "DMA"],
    "Tuesday": ["CO", "MINOR", "DMA", "DS LAB", "DS LAB", "DS LAB"],
    "Wednesday": ["CSP", "EVS", "OOP", "CO", "MINOR", "DSA"],
    "Thursday": ["DSA", "MINOR", "CO", "DMA", "OOP", "CSP"],
    "Friday": ["DMA", "OOP", "CO", "MENTORING", "OOP LAB", "OOP LAB", "OOP LAB"]
};

// Calculate total classes held per subject from 1st August 2024 to 15th November 2024
const attendanceCounts = {
    "DSA": 0,
    "OOP": 0,
    "CSP": 0,
    "DMA": 0,
    "CO": 0,
    "MINOR": 0,
    "EVS": 0,
    "MENTORING": 0,
    "OOP LAB": 0,
    "DS LAB": 0,
};

// Define the start and end dates
const startDate = new Date("2024-08-01");
const endDate = new Date("2024-11-15");

// Calculate the total number of weeks and total classes held
let currentDate = new Date(startDate);

while (currentDate <= endDate) {
    const dayName = currentDate.toLocaleString('en-US', { weekday: 'long' });

    if (timetable[dayName]) {
        for (const subject of timetable[dayName]) {
            attendanceCounts[subject]++;
        }
    }

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
}

let attendanceChart; // Declare attendanceChart outside the function for global access

function showAttendance() {
    const subjectSelect = document.getElementById('subjectDropdown');
    const selectedSubject = subjectSelect.value;
    const uid = localStorage.getItem('loggedInUID'); // Get logged in UID from local storage

    if (!uid) {
        document.getElementById('attendanceMessage').innerText = 'User not logged in.';
        return;
    }

    const totalClassesHeld = attendanceCounts[selectedSubject];
    const totalClassesAttended = attendanceRecords[uid][selectedSubject]; // Use the UID from local storage

    if (totalClassesAttended === undefined) {
        document.getElementById('attendanceMessage').innerText = 'No attendance records found for this subject.';
        return;
    }

    const minAttendanceRequired = Math.ceil(0.8 * totalClassesHeld);
    const leaveClassesAllowed = totalClassesHeld - minAttendanceRequired;

    document.getElementById('attendanceMessage').innerHTML = `
        Subject: ${selectedSubject}<br>
        Total Classes Held: ${totalClassesHeld}<br>
        Classes Attended: ${totalClassesAttended}<br>
        Minimum Attendance Required: ${minAttendanceRequired}<br>
        Classes You Can Miss: ${leaveClassesAllowed}<br>
    `;

    // Prepare data for pie chart
    const totalClassesMissed = totalClassesHeld - totalClassesAttended;
    const chartData = {
        labels: ['Classes Attended', 'Classes Missed'],
        datasets: [{
            data: [totalClassesAttended, totalClassesMissed],
            backgroundColor: ['#4CAF50', '#F44336'],
            hoverOffset: 4
        }]
    };

    // Clear previous chart if it exists
    if (attendanceChart) {
        attendanceChart.destroy(); // Destroy the previous chart instance
    }

    // Render the pie chart
    const ctx = document.getElementById('attendanceChart').getContext('2d');
    attendanceChart = new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: `Attendance Overview for ${selectedSubject}`
                }
            }
        }
    });

    // Show the canvas
    document.getElementById('attendanceChart').style.display = 'block';
}
