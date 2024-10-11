// script.js
let sleepData = {
    dates: [],
    durations: []
};

function calculateSleepDuration(sleepTime, wakeUpTime) {
    let sleep = new Date(1970-01-01T${sleepTime}:00);
    let wakeUp = new Date(1970-01-01T${wakeUpTime}:00);

    if (wakeUp < sleep) {
        wakeUp.setHours(wakeUp.getHours() + 24);
    }

    const duration = (wakeUp - sleep) / (1000 * 60 * 60); // Convert milliseconds to hours
    return duration;
}

function addSleepData() {
    const sleepTime = document.getElementById("sleepTime").value;
    const wakeUpTime = document.getElementById("wakeUpTime").value;

    if (sleepTime && wakeUpTime) {
        const duration = calculateSleepDuration(sleepTime, wakeUpTime);
        const today = new Date().toLocaleDateString();

        sleepData.dates.push(today);
        sleepData.durations.push(duration);

        updateChart();
    } else {
        alert("Please enter both sleep and wake-up times.");
    }
}

// Update the sleep chart using Chart.js
function updateChart() {
    const ctx = document.getElementById('sleepChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: sleepData.dates,
            datasets: [{
                label: 'Sleep Duration (hours)',
                data: sleepData.durations,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Hours of Sleep'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            }
        }
    });
}
