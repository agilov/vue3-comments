/**
 * Displays timecode in HH:MM format
 * @param value - value in seconds
 * @returns {string} HH:MM formatted string
 */
export function displayTimeCodeValue(value) {
    let minutes = Math.floor(value / 60).toString();
    let seconds = (value % 60).toString();

    if (minutes.length < 2) {
        minutes = '0' + minutes;
    }

    if (seconds.length < 2) {
        seconds = '0' + seconds;
    }

    return minutes + ":" + seconds;
}

/**
 * Displays how long ago that was
 * @param seconds
 * @returns {string}
 */
export function displayAgo(seconds) {
    seconds = parseInt(seconds);

    let interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;

    if (interval > 1) {
        const minutes = Math.floor(interval);

        if (minutes > 1) {
            return minutes + " minutes ago";
        }

        return minutes + " minute ago";
    }

    const sec = Math.floor(seconds);

    if (sec < 3) {
        return 'just yet'
    }

    return sec + " seconds ago";
}
