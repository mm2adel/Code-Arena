(function() {
    var eventName = "add_to_cart_custom_session";
    var sessionKey = "ga4_session_timestamp"; 
    var sessionTriggeredKey = "ga4_session_event_triggered";
    var sessionTimeout = 30 * 60 * 1000; // 30 minutes in milliseconds

    function getLastActivityTime() {
        return parseInt(localStorage.getItem(sessionKey), 10) || 0;
    }

    function updateActivityTimestamp() {
        localStorage.setItem(sessionKey, new Date().getTime());
    }

    function isNewSession() {
        var lastActivityTime = getLastActivityTime();
        var currentTime = new Date().getTime();

        return (currentTime - lastActivityTime) > sessionTimeout;
    }

    function triggerEventOncePerSession() {
        if (isNewSession() || !localStorage.getItem(sessionTriggeredKey)) {
            // Push event to dataLayer (or modify for your analytics platform)
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': eventName,
                'timestamp': new Date().toISOString()
            });

            // Mark that the event was triggered for this session
            localStorage.setItem(sessionTriggeredKey, "true");
        }
    }

    // Update session timestamp on user activity (mouse, keyboard, touch)
    function trackUserActivity() {
        updateActivityTimestamp();
        localStorage.removeItem(sessionTriggeredKey); // Allow new event in next session
    }

    // Listen for user activity
    document.addEventListener("click", trackUserActivity);
    document.addEventListener("keydown", trackUserActivity);
    document.addEventListener("mousemove", trackUserActivity);
    document.addEventListener("touchstart", trackUserActivity);

    // Run session logic on page load
    triggerEventOncePerSession();
})();
