// Define the conversion functions globally
function convertNepaliToEnglish() {
    const bsYear = parseInt(document.getElementById('bsYear').value);
    const bsMonth = parseInt(document.getElementById('bsMonth').value);
    const bsDay = parseInt(document.getElementById('bsDay').value);

    // Validate input values
    if (isNaN(bsYear) || isNaN(bsMonth) || isNaN(bsDay) ||
        bsMonth < 1 || bsMonth > 12 || bsDay < 1 || bsDay > 32) {
        alert("Please enter valid values for Nepali Year (1-12 for month, 1-32 for day).");
        return;
    }

    // Show warning for years outside the library's supported range
    if (bsYear < 2000 || bsYear > 2090) {
        document.getElementById('nepaliToEnglishResult').textContent = 
            "Warning: The Nepali date converter library only supports years between 2000 and 2090 BS. Conversion may fail.";
        
        // Still try to convert if the user wants to proceed
        if (!confirm("The date converter library only supports years between 2000 and 2090 BS. Do you want to try conversion anyway?")) {
            return;
        }
    }

    try {
        // Create a NepaliDate object
        const nepaliDate = new NepaliDate(bsYear, bsMonth - 1, bsDay);
        
        // Convert to English date (JavaScript Date object)
        const englishDate = nepaliDate.toJsDate();

        // Display the result
        const resultElement = document.getElementById('nepaliToEnglishResult');
        if (englishDate) {
            resultElement.textContent = `Converted Date: ${englishDate.getFullYear()}-${englishDate.getMonth() + 1}-${englishDate.getDate()} (A.D.)`;
        } else {
            resultElement.textContent = "Conversion failed. Please check your inputs.";
        }
    } catch (error) {
        console.error("Error in converting Nepali to English date:", error);
        document.getElementById('nepaliToEnglishResult').textContent = "Error: " + error.message;
    }
}

function convertEnglishToNepali() {
    const adYear = parseInt(document.getElementById('adYear').value);
    const adMonth = parseInt(document.getElementById('adMonth').value);
    const adDay = parseInt(document.getElementById('adDay').value);

    // Validate input values
    if (isNaN(adYear) || isNaN(adMonth) || isNaN(adDay) ||
        adMonth < 1 || adMonth > 12 || adDay < 1 || adDay > 31) {
        alert("Please enter valid values for English Year (1-12 for month, 1-31 for day).");
        return;
    }

    // Validate date range (Nepali Date library supports AD 1944-2033)
    if (adYear < 1944 || adYear > 2033) {
        document.getElementById('englishToNepaliResult').textContent = 
            "Error: The English year must be between 1944 and 2033 AD.";
        return;
    }

    try {
        // Create a JavaScript Date object (months are 0-indexed)
        const englishDate = new Date(adYear, adMonth - 1, adDay);

        // Convert to Nepali date using the static method
        const nepaliDate = NepaliDate.fromAD(englishDate);

        // Display the result
        const resultElement = document.getElementById('englishToNepaliResult');
        if (nepaliDate) {
            resultElement.textContent = `Converted Date: ${nepaliDate.getYear()}-${nepaliDate.getMonth() + 1}-${nepaliDate.getDate()} (B.S.)`;
        } else {
            resultElement.textContent = "Conversion failed. Please check your inputs.";
        }
    } catch (error) {
        console.error("Error in converting English to Nepali date:", error);
        document.getElementById('englishToNepaliResult').textContent = "Error: " + error.message;
    }
}

// Function to convert English digits to Nepali digits
function toNepaliDigits(number) {
    const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return number.toString().split('').map(digit => 
        isNaN(parseInt(digit)) ? digit : nepaliDigits[parseInt(digit)]
    ).join('');
}

// Function to populate year dropdown options
function populateYearDropdowns() {
    // Nepali month names in Devanagari script
    const nepaliMonths = [
        'बैशाख', 'जेठ', 'असार', 'श्रावण', 'भदौ', 'आश्विन', 
        'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फाल्गुन', 'चैत्र'
    ];
    
    // Populate Nepali Year dropdown (BS) with Nepali digits
    const bsYearSelect = document.getElementById('bsYear');
    bsYearSelect.innerHTML = ''; // Clear existing options
    for (let year = 1900; year <= 2090; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = toNepaliDigits(year);
        
        // Set current year as default selected
        if (year === 2080) { // Current Nepali year (approximate)
            option.selected = true;
        }
        
        bsYearSelect.appendChild(option);
    }
    
    // Populate Nepali Month dropdown with Devanagari script
    const bsMonthSelect = document.getElementById('bsMonth');
    bsMonthSelect.innerHTML = ''; // Clear existing options
    for (let month = 1; month <= 12; month++) {
        const option = document.createElement('option');
        option.value = month;
        option.textContent = nepaliMonths[month - 1];
        bsMonthSelect.appendChild(option);
    }
    
    // Populate Nepali Day dropdown with Nepali digits
    const bsDaySelect = document.getElementById('bsDay');
    bsDaySelect.innerHTML = ''; // Clear existing options
    for (let day = 1; day <= 32; day++) {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = toNepaliDigits(day);
        bsDaySelect.appendChild(option);
    }
    
    // Populate English Year dropdown (AD)
    const adYearSelect = document.getElementById('adYear');
    for (let year = 1944; year <= 2033; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        
        // Set current year as default selected
        if (year === new Date().getFullYear()) {
            option.selected = true;
        }
        
        adYearSelect.appendChild(option);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("NepaliDate library loaded:", typeof NepaliDate !== 'undefined');
    
    // Populate year dropdowns
    populateYearDropdowns();
});