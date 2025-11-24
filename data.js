// TRACEAL Console - Data Storage

// Sample User Database
const userDatabase = [
    { name: "John A. Smith", userId: "john.smith", password: "admin123" },
    { name: "Sarah Connor", userId: "sarah.connor", password: "pass456" },
    { name: "Michael Chen", userId: "michael.chen", password: "secure789" },
    { name: "Emily Rodriguez", userId: "emily.rodriguez", password: "test2024" },
    { name: "David Kim", userId: "david.kim", password: "manager01" }
];

// Default Observer Units (initial data)
const defaultObservers = [
    {
        id: "OU-29H-G",
        name: "1125_Election_Ballot_12",
        serial: "OU-29H-G",
        events: 3
    },
    {
        id: "OU-4K9-F",
        name: "N25_EvidenceRoom_Storage_1",
        serial: "OU-4K9-F",
        events: 2
    },
    {
        id: "OU-9ZP-7",
        name: "N25_EvidenceRoom_Storage_2",
        serial: "OU-9ZP-7",
        events: 0
    },
    {
        id: "OU-A3T-W",
        name: "N25_EvidenceRoom_Storage_3",
        serial: "OU-A3T-W",
        events: 0
    }
];

// Event Log Database (example data for an observer)
const eventLogDatabase = {
    "N25_EvidenceRoom_Storage_1": [
        { type: "tamper_detected", timestamp: "2025.11.25 18:33:22", sensorId: "SU-87SJT-2" },
        { type: "tamper_detected", timestamp: "2025.11.25 15:19:32", sensorId: "SU-3AJOF-K" },
        { type: "seal_activated", timestamp: "2025.11.25 12:00:25", sensorId: "SU-1908S-L" },
        { type: "seal_activated", timestamp: "2025.11.25 12:00:14", sensorId: "SU-3AJOF-K" },
        { type: "seal_activated", timestamp: "2025.11.25 12:00:02", sensorId: "SU-87SJT-2" },
        { type: "seal_deactivated", timestamp: "2025.11.13 21:34:22", sensorId: "SU-87SJT-2" },
        { type: "low_battery", timestamp: "2025.11.13 21:31:00", sensorId: "SU-87SJT-2" },
        { type: "seal_deactivated", timestamp: "2025.11.10 21:30:22", sensorId: "SU-1908S-L" },
        { type: "seal_activated", timestamp: "2025.11.10 12:00:22", sensorId: "SU-1908S-L" }
    ]
};

// Event type configurations
const eventConfig = {
    "tamper_detected": {
        name: "Tamper Detected",
        icon: "tamperdetectedicon.svg",
        circleColor: "#E34949",
        dividerColor: "#E34949",
        useRedBackground: true,
        textWhite: true
    },
    "seal_activated": {
        name: "Seal Activated",
        icon: "sealactivatedicon.svg",
        circleColor: "#4C5158",
        dividerColor: "#4C5158",
        useRedBackground: false,
        textWhite: false
    },
    "seal_deactivated": {
        name: "Seal Deactivated",
        icon: "sealdeactivatedicon.svg",
        circleColor: "#C8CCD2",
        dividerColor: "#C8CCD2",
        useRedBackground: false,
        textWhite: false
    },
    "low_battery": {
        name: "Low Battery",
        icon: "lowbatteryicon.svg",
        circleColor: "#E34949",
        dividerColor: "#E34949",
        useRedBackground: false,
        textWhite: false
    }
};

