var GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxEusNiK-vwWC_hVfWCH6EXyv81D5wyk6ex85y7FRy-D0NJYfQy8mxwZeM9aRdPXz41/exec";
// Google Sheet Link https://docs.google.com/spreadsheets/d/1_gCbMVZExDfz4dVLBfVz1zHin5Zmp87m3m5TFPqEUZQ/edit?gid=0#gid=0
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
    event: "page_view",
    page_path: "/madel",
    page_title: "Home Page"
});

var global_arr = []
function validateDataLayer() {
        fetch(GOOGLE_SHEET_WEBHOOK_URL)
            .then(response => response.json())
            .then(expectedData => {
                //console.log("📢 Running validation with expected data:", expectedData);
                runValidation(expectedData);
            })
            .catch(error => console.error("❌ Error fetching Google Sheet data:", error));
    }


    function runValidation(expectedData) {
        let validationResults = [];
    
        for (let e = 0; e < expectedData.length; e++) {
            let exp_event = expectedData[e]['Event Name'];
            let exp_key = expectedData[e]["Key"];
            let exp_value = expectedData[e]["Expected Value"].toString();
            let matchFound = false;
            let actualValue = "N/A";
    
            for (let c = 0; c < window.dataLayer.length; c++) {
                let dlv_event = window.dataLayer[c]['event'];
    
                // Only compare if the events match
                if (dlv_event !== exp_event) continue;
    
                let dlv_key_exists = window.dataLayer[c].hasOwnProperty(exp_key);
                let dlv_val = dlv_key_exists ? window.dataLayer[c][exp_key] : "N/A";
    
                // Allow wildcard `.*` to match any value, but ONLY if the key exists
                let match = (exp_value === ".*") ? dlv_key_exists : (dlv_val === exp_value);
    
                // Save actual value for reporting
                if (dlv_key_exists) {
                    actualValue = dlv_val;
                }
    
                validationResults.push({
                    "Event Name": exp_event,
                    "Key": exp_key,
                    "Expected Value": exp_value,
                    "Actual Value": actualValue,
                    "Is Match": match ? "Match" : "No Match"
                });
                sendValidationToGoogleSheet({
                    "Event Name": exp_event,
                    "Key": exp_key,
                    "Expected Value": exp_value,
                    "Actual Value": actualValue,
                    "Is Match": match ? "Match" : "No Match"
                })
    
                matchFound = true;
            }
    
            // If no match found, log a failed validation
            if (!matchFound) {
                validationResults.push({
                    "Event Name": exp_event,
                    "Key": exp_key,
                    "Expected Value": exp_value,
                    "Actual Value": "N/A",
                    "Is Match": "No Match"
                });
                sendValidationToGoogleSheet({
                    "Event Name": exp_event,
                    "Key": exp_key,
                    "Expected Value": exp_value,
                    "Actual Value": "N/A",
                    "Is Match": "No Match"
                });
            }
        }
    
        // Send all validation results at once
        //sendValidationToGoogleSheet(validationResults);
        console.log(validationResults)
    }

    

    function runValidation_exp(expectedData) {
        for (let e = 0; e < expectedData.length; e++) {
            let exp_event = expectedData[e]['Event Name'];
            let exp_key = expectedData[e]["Key"];
            let exp_value = expectedData[e]["Expected Value"];
            let matchFound = false;
    
            for (let c = 0; c < window.dataLayer.length; c++) {
                let dlv_event = window.dataLayer[c]['event'];
                
                // Only compare if the events match
                if (dlv_event !== exp_event) continue;
    
                let dlv_key_exists = window.dataLayer[c].hasOwnProperty(exp_key);
                let dlv_val = dlv_key_exists ? window.dataLayer[c][exp_key] : null;
    
                // Allow wildcard `.*` to match any value, but ONLY if the key exists
                let match = (exp_value === ".*") ? dlv_key_exists : (dlv_val === exp_value);
    
                // Log comparison results
                console.log(`Event: ${exp_event} | DataLayer Event: ${dlv_event}`);
                console.log(`Key: ${exp_key} | DataLayer Key Exists: ${dlv_key_exists}`);
                console.log(`Expected: ${exp_value} | Found: ${dlv_val} | Match: ${match}`);
                console.log('-----------');
                
                
                if (match) {
                    matchFound = true;
                }
            }
    
            // If no match found for this expected event, log a warning
            if (!matchFound) {
                console.warn(`⚠️ No match found for expected event: ${exp_event}, key: ${exp_key}`);
            }
        }
    }
    
    function sendValidationToGoogleSheet(validationResults) {
        fetch("https://script.google.com/macros/s/AKfycbwePQ68Tzot-o3G0k-WfWJp-9Pzwzzr31Hqqvp5WE-D-rHWdyMatjjQ_4QsukSXocGbWw/exec", {
            method: "POST",
            mode: "no-cors",  // Important: This bypasses CORS errors
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validationResults)
        })
        .then(() => console.log("✅ Request sent (response hidden due to no-cors mode)"))
        .catch(error => console.error("❌ Error sending request:", error));
    }



// const originalPush = window.dataLayer.push;
//     window.dataLayer.push = function () {
//         originalPush.apply(this, arguments);
//         console.log("🔍 DataLayer Event Captured:", arguments);
//         validateDataLayer();
//     };


validateDataLayer()


