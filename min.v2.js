async function getTraceV2() {

    try {

        let response = await fetch('/cdn-cgi/trace');

        let text = await response.text();

        const lines = text.split('\n').filter(line => line.includes('='));

        const traceObj = {};

        lines.forEach(line => {
            const [key, value] = line.split('=');
            traceObj[key] = value;
        });

        return traceObj;

    } catch (err) {
        console.error('Error fetching trace:', err);
    }

    return false;

}

function isAndroidDevice() {
    return navigator.userAgentData?.platform === 'Android' || /Android/i.test(navigator.userAgent);
}

(async () => {

    const trace = await getTraceV2();

    if (trace?.loc && !['VN', 'HK', 'TW', 'CN', 'SG'].includes(trace.loc) && isAndroidDevice()) {

        const aclibScript = document.createElement('script');
        aclibScript.id = 'aclib';
        aclibScript.type = 'text/javascript';
        aclibScript.src = '//acscdn.com/script/aclib.js';

        aclibScript.onload = () => {
            if (window.aclib?.runAutoTag) {
                window.aclib.runAutoTag({
                    zoneId: 'sr7jt00rjr',
                });
            }
        };

        document.head.appendChild(aclibScript);

    }

})();
