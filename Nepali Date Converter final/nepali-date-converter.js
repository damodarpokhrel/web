// nepali-date-converter.js
// A simple and reliable Nepali date conversion utility

(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = global || self, factory(global.NepaliDateConverter = {}));
}(this, (function(exports) {
    'use strict';

    // Nepali calendar data mapping
    const calendarData = {
        // Minimum dates supported
        minBsYear: 2000,
        maxBsYear: 2090,

        // Data for Nepali dates (total days in each month per year)
        // From 2000 BS to 2090 BS
        bsMonthData: {
            2000: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2001: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2002: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2003: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2004: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2005: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2006: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2007: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2008: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
            2009: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2010: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2011: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2012: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
            2013: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2014: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2015: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2016: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
            2017: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2018: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2019: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2020: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
            2021: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2022: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
            2023: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2024: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
            2025: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2026: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2027: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2028: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2029: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
            2030: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2031: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2032: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2033: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2034: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2035: [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
            2036: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2037: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2038: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2039: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
            2040: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2041: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2042: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2043: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
            2044: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2045: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2046: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2047: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
            2048: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2049: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
            2050: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2051: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
            2052: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2053: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
            2054: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2055: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2056: [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
            2057: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2058: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2059: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2060: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2061: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2062: [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
            2063: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2064: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2065: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2066: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
            2067: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2068: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2069: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2070: [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
            2071: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2072: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
            2073: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
            2074: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
            2075: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2076: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
            2077: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
            2078: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
            2079: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
            2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
            2081: [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30],
            2082: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
            2083: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
            2084: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
            2085: [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30],
            2086: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
            2087: [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
            2088: [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30],
            2089: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
            2090: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
        }
    };

    // Reference date (January 1, 1944 AD = Poush 17, 2000 BS)
    const referenceDate = {
        ad: {
            year: 1944,
            month: 1,
            day: 1
        },
        bs: {
            year: 2000,
            month: 9,
            day: 17
        }
    };

    // Class for Nepali date operations
    class NepaliDate {
        constructor(year, month, day) {
            if (typeof year !== 'number' || typeof month !== 'number' || typeof day !== 'number') {
                throw new Error('Year, month, and day must be numbers');
            }

            // Validate date range
            if (year < calendarData.minBsYear || year > calendarData.maxBsYear) {
                throw new Error(`Year must be between ${calendarData.minBsYear} and ${calendarData.maxBsYear}`);
            }

            if (month < 0 || month > 11) {
                throw new Error('Month must be between 0 and 11');
            }

            const daysInMonth = calendarData.bsMonthData[year][month];
            if (day < 1 || day > daysInMonth) {
                throw new Error(`Day must be between 1 and ${daysInMonth} for year ${year} and month ${month + 1}`);
            }

            this.year = year;
            this.month = month;
            this.day = day;
        }

        // Convert Nepali Date to JavaScript Date (AD)
        toJsDate() {
            // Calculate days from reference date
            let dayDifference = 0;

            // Days before the reference year
            for (let year = calendarData.minBsYear; year < this.year; year++) {
                for (let month = 0; month < 12; month++) {
                    dayDifference += calendarData.bsMonthData[year][month];
                }
            }

            // Days in the reference year before the reference month
            for (let month = 0; month < this.month; month++) {
                dayDifference += calendarData.bsMonthData[this.year][month];
            }

            // Days in the month
            dayDifference += this.day - 1;

            // Days between BS reference date and the target date
            dayDifference -= (referenceDate.bs.day - 1);
            for (let month = 0; month < referenceDate.bs.month - 1; month++) {
                dayDifference -= calendarData.bsMonthData[referenceDate.bs.year][month];
            }

            // Create JS Date from reference date and add day difference
            const jsDate = new Date(
                referenceDate.ad.year,
                referenceDate.ad.month - 1,
                referenceDate.ad.day
            );
            jsDate.setDate(jsDate.getDate() + dayDifference);

            return jsDate;
        }
    }

    // Function to convert AD date to BS
    function adToBS(adDate) {
        if (!(adDate instanceof Date)) {
            throw new Error('Invalid date object');
        }

        // Get date, month, and year from AD date
        const adYear = adDate.getFullYear();
        const adMonth = adDate.getMonth() + 1;
        const adDay = adDate.getDate();

        // Calculate days between reference date and provided date
        const refDate = new Date(referenceDate.ad.year, referenceDate.ad.month - 1, referenceDate.ad.day);
        const daysDifference = Math.floor((adDate - refDate) / (24 * 60 * 60 * 1000));

        // Start from reference BS date
        let bsYear = referenceDate.bs.year;
        let bsMonth = referenceDate.bs.month - 1; // 0-indexed
        let bsDay = referenceDate.bs.day;

        // Add days to BS date
        let remainingDays = daysDifference;
        while (remainingDays !== 0) {
            // Check if date needs to be increased
            if (remainingDays > 0) {
                bsDay++;
                remainingDays--;

                if (bsDay > calendarData.bsMonthData[bsYear][bsMonth]) {
                    bsDay = 1;
                    bsMonth++;

                    if (bsMonth >= 12) {
                        bsMonth = 0;
                        bsYear++;

                        if (bsYear > calendarData.maxBsYear) {
                            throw new Error(`Date out of range: beyond year ${calendarData.maxBsYear}`);
                        }
                    }
                }
            }
            // Check if date needs to be decreased
            else {
                bsDay--;
                remainingDays++;

                if (bsDay < 1) {
                    bsMonth--;

                    if (bsMonth < 0) {
                        bsMonth = 11;
                        bsYear--;

                        if (bsYear < calendarData.minBsYear) {
                            throw new Error(`Date out of range: before year ${calendarData.minBsYear}`);
                        }
                    }

                    bsDay = calendarData.bsMonthData[bsYear][bsMonth];
                }
            }
        }

        return {
            year: bsYear,
            month: bsMonth + 1, // Return 1-indexed month
            day: bsDay
        };
    }

    // Export public API
    exports.NepaliDate = NepaliDate;
    exports.adToBS = adToBS;

    // Add a new method for direct conversion
    exports.bsToAD = function(year, month, day) {
        const nepaliDate = new NepaliDate(year, month - 1, day);
        const jsDate = nepaliDate.toJsDate();
        return {
            year: jsDate.getFullYear(),
            month: jsDate.getMonth() + 1,
            day: jsDate.getDate()
        };
    };

})));