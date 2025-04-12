// hamro-patro-wrapper.js
// A simple wrapper around hamro-patro-scraper functionality to ensure
// all dependencies are properly loaded and handled

// Initialize wrapper as a global object
window.hamroPatroWrapper = {};

// Wait until the hamroPatro library is available
document.addEventListener('DOMContentLoaded', function() {
    // Import the library directly if it wasn't loaded correctly
    if (typeof hamroPatro === 'undefined') {
        console.error("hamroPatro library not found! Attempting to load it manually...");

        // Create custom implementation since the library doesn't export the expected functions
        window.hamroPatro = {
            date: {
                // Today's date function
                today: async function() {
                    try {
                        const response = await fetch('https://www.hamropatro.com/');
                        const html = await response.text();

                        // Simple parsing to extract date (this is a fallback approach)
                        const npDateMatch = html.match(/Nepali Date:[^\d]*([\d-]+)/);
                        const timeMatch = html.match(/Current time:[^\d]*([\d:]+\s*[APMapm]{2})/);

                        if (npDateMatch && timeMatch) {
                            return {
                                np_date: npDateMatch[1].trim(),
                                time: timeMatch[1].trim()
                            };
                        }
                        throw new Error("Failed to parse date from Hamro Patro");
                    } catch (error) {
                        console.error("Error fetching today's date:", error);
                        throw error;
                    }
                },

                // BS to AD conversion
                BSToAD: async function(bsDate) {
                    try {
                        const response = await fetch(`https://www.hamropatro.com/date-converter/bs-to-ad?date=${bsDate}`);
                        const html = await response.text();

                        // Simple parsing to extract date (this is a fallback approach)
                        const adDateMatch = html.match(/Result:[^\d]*([\d-]+)/);

                        if (adDateMatch) {
                            return {
                                ad: adDateMatch[1].trim()
                            };
                        }
                        throw new Error("Failed to convert BS to AD date");
                    } catch (error) {
                        console.error("Error converting BS to AD:", error);
                        throw error;
                    }
                },

                // AD to BS conversion
                ADToBS: async function(adDate) {
                    try {
                        const response = await fetch(`https://www.hamropatro.com/date-converter/ad-to-bs?date=${adDate}`);
                        const html = await response.text();

                        // Simple parsing to extract date (this is a fallback approach)
                        const bsDateMatch = html.match(/Result:[^\d]*([\d-]+)/);

                        if (bsDateMatch) {
                            return {
                                bs: bsDateMatch[1].trim()
                            };
                        }
                        throw new Error("Failed to convert AD to BS date");
                    } catch (error) {
                        console.error("Error converting AD to BS:", error);
                        throw error;
                    }
                }
            }
        };

        console.log("Manual implementation of hamroPatro created");
    }

    console.log("hamroPatro library found, initializing wrapper...");

    // Convert Nepali date (BS) to English date (AD)
    hamroPatroWrapper.convertBSToAD = async function(year, month, day) {
        try {
            // Format month and day with leading zeros
            const formattedMonth = month.toString().padStart(2, '0');
            const formattedDay = day.toString().padStart(2, '0');

            // Format as YYYY-MM-DD for hamroPatro API
            const bsDate = `${year}-${formattedMonth}-${formattedDay}`;

            // Call the API
            console.log("Converting BS to AD:", bsDate);
            const result = await hamroPatro.date.BSToAD(bsDate);
            console.log("BS to AD result:", result);

            // Parse the result
            if (result && result.ad) {
                const adDateParts = result.ad.split('-');
                if (adDateParts.length === 3) {
                    return {
                        year: parseInt(adDateParts[0]),
                        month: parseInt(adDateParts[1]),
                        day: parseInt(adDateParts[2]),
                        original: result.ad
                    };
                }
            }

            throw new Error("Invalid response format from BS to AD conversion");
        } catch (error) {
            console.error("Error in BS to AD conversion:", error);
            return null;
        }
    };

    // Convert English date (AD) to Nepali date (BS)
    hamroPatroWrapper.convertADToBS = async function(year, month, day) {
        try {
            // Format month and day with leading zeros
            const formattedMonth = month.toString().padStart(2, '0');
            const formattedDay = day.toString().padStart(2, '0');

            // Format as YYYY-MM-DD for hamroPatro API
            const adDate = `${year}-${formattedMonth}-${formattedDay}`;

            // Call the API
            console.log("Converting AD to BS:", adDate);
            const result = await hamroPatro.date.ADToBS(adDate);
            console.log("AD to BS result:", result);

            // Parse the result
            if (result && result.bs) {
                const bsDateParts = result.bs.split('-');
                if (bsDateParts.length === 3) {
                    return {
                        year: parseInt(bsDateParts[0]),
                        month: parseInt(bsDateParts[1]),
                        day: parseInt(bsDateParts[2]),
                        original: result.bs
                    };
                }
            }

            throw new Error("Invalid response format from AD to BS conversion");
        } catch (error) {
            console.error("Error in AD to BS conversion:", error);
            return null;
        }
    };

    // Get current Nepali date and time
    hamroPatroWrapper.getCurrentDateTime = async function() {
        try {
            console.log("Getting current date and time...");
            const result = await hamroPatro.date.today();
            console.log("Current date result:", result);

            if (result && result.np_date && result.time) {
                return {
                    date: result.np_date,
                    time: result.time,
                    original: result
                };
            }

            throw new Error("Invalid response format from current date API");
        } catch (error) {
            console.error("Error getting current date and time:", error);
            return null;
        }
    };

    console.log("hamroPatroWrapper initialized successfully!");
});