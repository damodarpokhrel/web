// Function to convert Nepali date to English using the external libraries
async function convertWithExternalLibrary(year, month, day, isBS) {
    try {
        if (isBS) {
            // Try to use nepali-date-converter if available
            if (typeof NepaliDateConverter !== 'undefined') {
                try {
                    // Use the bsToAD method directly
                    const result = NepaliDateConverter.bsToAD(parseInt(year), parseInt(month), parseInt(day));
                    return result;
                } catch (error) {
                    console.error("Error using NepaliDateConverter for BS to AD:", error);
                    // Fall back to hamroPatroWrapper if available
                }
            }

            // Fall back to hamroPatroWrapper
            if (typeof hamroPatroWrapper !== 'undefined' && typeof hamroPatroWrapper.convertBSToAD === 'function') {
                const result = await hamroPatroWrapper.convertBSToAD(year, month, day);
                if (result) {
                    return result;
                }
            }

            // Last resort - approximation
            return {
                year: year - 57,
                month: month,
                day: day
            };
        } else {
            // Try to use nepali-date-converter if available
            if (typeof NepaliDateConverter !== 'undefined') {
                try {
                    // Create JS date from AD date
                    const jsDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                    // Convert to Nepali date using the correct method
                    const nepaliDate = NepaliDateConverter.adToBS(jsDate);

                    return nepaliDate;
                } catch (error) {
                    console.error("Error using NepaliDateConverter for AD to BS:", error);
                    // Fall back to hamroPatroWrapper if available
                }
            }

            // Fall back to hamroPatroWrapper
            if (typeof hamroPatroWrapper !== 'undefined' && typeof hamroPatroWrapper.convertADToBS === 'function') {
                const result = await hamroPatroWrapper.convertADToBS(year, month, day);
                if (result) {
                    return result;
                }
            }

            // Last resort - approximation
            return {
                year: parseInt(year) + 57,
                month: month,
                day: day
            };
        }
    } catch (error) {
        console.error("Error in date conversion:", error);
        return null;
    }
}

// Function to convert between Nepali and English dates
async function convertDate(year, month, day, isBS) {
    return await convertWithExternalLibrary(year, month, day, isBS);
}

// Function to convert Nepali date to English
async function convertNepaliToEnglish() {
    try {
        // Get values from Nepali date inputs
        const bsYear = parseInt(document.getElementById('bsYear').value);
        const bsMonth = parseInt(document.getElementById('bsMonth').value);
        const bsDay = parseInt(document.getElementById('bsDay').value);

        // Check if inputs are valid
        if (isNaN(bsYear) || isNaN(bsMonth) || isNaN(bsDay)) {
            document.getElementById('nepaliToEnglishResult').innerHTML = 'Please select a valid date.';
            return;
        }

        // Start loading indicator
        document.getElementById('nepaliToEnglishResult').innerHTML = 'Converting...';

        // Convert BS to AD
        const result = await convertDate(bsYear, bsMonth, bsDay, true);

        if (result) {
            const englishMonthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];

            // Format the result
            const formattedResult = `${englishMonthNames[result.month - 1]} ${result.day}, ${result.year} AD`;

            // Display the result
            document.getElementById('nepaliToEnglishResult').innerHTML = formattedResult;
        } else {
            document.getElementById('nepaliToEnglishResult').innerHTML = 'Conversion failed. Please try again.';
        }
    } catch (error) {
        console.error('Error converting Nepali to English:', error);
        document.getElementById('nepaliToEnglishResult').innerHTML = 'Error: ' + error.message;
    }
}

// Function to convert English date to Nepali
async function convertEnglishToNepali() {
    try {
        // Get values from English date inputs
        const adYear = parseInt(document.getElementById('adYear').value);
        const adMonth = parseInt(document.getElementById('adMonth').value);
        const adDay = parseInt(document.getElementById('adDay').value);

        // Check if inputs are valid
        if (isNaN(adYear) || isNaN(adMonth) || isNaN(adDay)) {
            document.getElementById('englishToNepaliResult').innerHTML = 'Please select a valid date.';
            return;
        }

        // Start loading indicator
        document.getElementById('englishToNepaliResult').innerHTML = 'Converting...';

        // Convert AD to BS
        const result = await convertDate(adYear, adMonth, adDay, false);

        if (result) {
            const nepaliMonthNames = [
                'बैशाख', 'जेठ', 'असार', 'श्रावण', 'भदौ', 'आश्विन',
                'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फाल्गुन', 'चैत्र'
            ];

            // Format the result
            const formattedResult = `${nepaliMonthNames[result.month - 1]} ${result.day}, ${result.year} BS`;

            // Display the result
            document.getElementById('englishToNepaliResult').innerHTML = formattedResult;
        } else {
            document.getElementById('englishToNepaliResult').innerHTML = 'Conversion failed. Please try again.';
        }
    } catch (error) {
        console.error('Error converting English to Nepali:', error);
        document.getElementById('englishToNepaliResult').innerHTML = 'Error: ' + error.message;
    }
}

// Function to populate year dropdowns
function populateYearDropdowns() {
    // Populate Nepali year dropdown (2000-2090 BS)
    const bsYearSelect = document.getElementById('bsYear');
    if (!bsYearSelect) return; // Safety check

    bsYearSelect.innerHTML = ''; // Clear existing options
    for (let year = 2000; year <= 2090; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.text = year.toString();
        bsYearSelect.appendChild(option);
    }

    // Populate English year dropdown (1944-2033 AD)
    const adYearSelect = document.getElementById('adYear');
    if (!adYearSelect) return; // Safety check

    adYearSelect.innerHTML = ''; // Clear existing options
    for (let year = 1944; year <= 2033; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.text = year.toString();
        adYearSelect.appendChild(option);
    }

    // Set defaults to current year
    const currentYear = new Date().getFullYear();
    if (adYearSelect.querySelector(`option[value="${currentYear}"]`)) {
        adYearSelect.value = currentYear;
    }

    // Set BS year to approximate current year
    const currentBSYear = currentYear + 57; // Approximate conversion
    if (bsYearSelect.querySelector(`option[value="${currentBSYear}"]`)) {
        bsYearSelect.value = currentBSYear;
    }

    // Populate Nepali month dropdown
    const bsMonthSelect = document.getElementById('bsMonth');
    if (!bsMonthSelect) return; // Safety check

    bsMonthSelect.innerHTML = ''; // Clear existing options
    const nepaliMonthNames = [
        'बैशाख', 'जेठ', 'असार', 'श्रावण', 'भदौ', 'आश्विन',
        'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फाल्गुन', 'चैत्र'
    ];

    for (let month = 1; month <= 12; month++) {
        const option = document.createElement('option');
        option.value = month;
        option.text = nepaliMonthNames[month - 1];
        bsMonthSelect.appendChild(option);
    }

    // Set defaults to current month
    const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-indexed
    const adMonthSelect = document.getElementById('adMonth');
    if (adMonthSelect && adMonthSelect.querySelector(`option[value="${currentMonth}"]`)) {
        adMonthSelect.value = currentMonth;
    }

    // Populate Nepali day dropdown (1-32)
    const bsDaySelect = document.getElementById('bsDay');
    if (!bsDaySelect) return; // Safety check

    bsDaySelect.innerHTML = ''; // Clear existing options
    for (let day = 1; day <= 32; day++) {
        const option = document.createElement('option');
        option.value = day;
        option.text = day.toString();
        bsDaySelect.appendChild(option);
    }

    // Set defaults to current day
    const currentDay = new Date().getDate();
    const adDaySelect = document.getElementById('adDay');
    if (adDaySelect && adDaySelect.querySelector(`option[value="${currentDay}"]`)) {
        adDaySelect.value = currentDay;
    }
    if (bsDaySelect.querySelector(`option[value="${currentDay}"]`)) {
        bsDaySelect.value = currentDay;
    }
}

// Initialize the page
document.addEventListener("DOMContentLoaded", function() {
    console.log("Initializing Nepali Date Converter...");

    // Check if libraries are available
    if (typeof NepaliDateConverter !== 'undefined') {
        console.log("NepaliDateConverter library loaded successfully");
    } else {
        console.warn("NepaliDateConverter library not found, will use fallback methods");
    }

    if (typeof hamroPatroWrapper !== 'undefined') {
        console.log("hamroPatroWrapper found, will use for date conversion");
    } else {
        console.warn("hamroPatroWrapper not found, will use fallback methods");
    }

    // Populate year dropdowns
    populateYearDropdowns();

    // Set today's date in both converters
    setTodayAsDefault();
});

// Function to set today's date as default in both converters
async function setTodayAsDefault() {
    try {
        const today = new Date();
        const adYear = today.getFullYear();
        const adMonth = today.getMonth() + 1;
        const adDay = today.getDate();

        // Set English date
        const adYearSelect = document.getElementById('adYear');
        const adMonthSelect = document.getElementById('adMonth');
        const adDaySelect = document.getElementById('adDay');

        if (adYearSelect && adMonthSelect && adDaySelect) {
            adYearSelect.value = adYear;
            adMonthSelect.value = adMonth;
            adDaySelect.value = adDay;

            // Also convert to Nepali date and set it
            if (typeof NepaliDateConverter !== 'undefined') {
                try {
                    const nepaliDate = NepaliDateConverter.adToBS(today);

                    const bsYearSelect = document.getElementById('bsYear');
                    const bsMonthSelect = document.getElementById('bsMonth');
                    const bsDaySelect = document.getElementById('bsDay');

                    if (bsYearSelect && bsMonthSelect && bsDaySelect) {
                        bsYearSelect.value = nepaliDate.year;
                        bsMonthSelect.value = nepaliDate.month;
                        bsDaySelect.value = nepaliDate.day;
                    }

                    // Perform conversions to show results on page load
                    convertNepaliToEnglish();
                    convertEnglishToNepali();
                } catch (error) {
                    console.error("Error setting today's Nepali date:", error);
                }
            }
        }
    } catch (error) {
        console.error("Error setting default dates:", error);
    }
}