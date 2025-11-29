const axios = require('axios');
const StaffProfile = require('../models/StaffProfile');
const User = require('../models/User');

// Mock data for fallback
const MOCK_DOCTORS = [
    {
        name: "Dr. Emily Chen",
        specialty: "Cardiologist",
        address: "123 Heartbeat Ln, Medical District",
        rating: 4.8,
        distance: "1.2 km",
        status: "Open Now"
    },
    {
        name: "Dr. Michael Ross",
        specialty: "Dermatologist",
        address: "456 Skin Care Blvd",
        rating: 4.5,
        distance: "2.5 km",
        status: "Closes at 5 PM"
    },
    {
        name: "Dr. Sarah Johnson",
        specialty: "General Physician",
        address: "789 Wellness Way",
        rating: 4.9,
        distance: "0.8 km",
        status: "Open 24/7"
    }
];

exports.searchDoctors = async (req, res) => {
    try {
        const { lat, lng, query, specialty } = req.query;
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;

        let results = [];

        // 1. Fetch from Google Places API if key is available
        if (apiKey && apiKey !== 'your_google_maps_api_key_here') {
            try {
                // Search for doctors/hospitals near the location
                const searchType = specialty || query || 'doctor';
                const radius = 5000; // 5km radius

                const googleResponse = await axios.get(
                    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&keyword=${searchType}&type=doctor&key=${apiKey}`
                );

                if (googleResponse.data.results) {
                    const googleDoctors = googleResponse.data.results.map(place => ({
                        name: place.name,
                        specialty: specialty || 'Specialist', // Google doesn't always give specific specialty
                        address: place.vicinity,
                        rating: place.rating,
                        distance: 'Near you', // We'd need to calculate exact distance
                        status: place.opening_hours?.open_now ? 'Open Now' : 'Closed',
                        source: 'Google'
                    }));
                    results = [...results, ...googleDoctors];
                }
            } catch (googleError) {
                console.error('Google Places API Error:', googleError.message);
                // Continue to internal search or fallback
            }
        }

        // 2. Search Internal Database
        // This is a basic implementation. In a real app, you'd use geospatial queries ($near)
        try {
            const internalDoctors = await StaffProfile.find({
                specialization: { $regex: new RegExp(specialty || query, 'i') }
            }).populate('userId', 'name');

            const formattedInternal = internalDoctors.map(doc => ({
                name: `Dr. ${doc.userId.name}`,
                specialty: doc.specialization,
                address: "Hospital Main Branch", // Placeholder
                rating: 5.0, // Placeholder
                distance: "Internal",
                status: "Available",
                source: 'Internal'
            }));

            results = [...results, ...formattedInternal];
        } catch (dbError) {
            console.error('Database Search Error:', dbError.message);
        }

        // 3. Fallback if no results found
        if (results.length === 0) {
            // Filter mock data based on query
            const filteredMock = MOCK_DOCTORS.filter(d => 
                !specialty || d.specialty.toLowerCase().includes(specialty.toLowerCase())
            );
            results = filteredMock.length > 0 ? filteredMock : MOCK_DOCTORS;
        }

        res.status(200).json({
            success: true,
            count: results.length,
            data: results
        });

    } catch (error) {
        console.error('Search Doctors Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error searching for doctors',
            error: error.message
        });
    }
};
