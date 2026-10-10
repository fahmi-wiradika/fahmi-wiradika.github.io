// Chart.js Dark Theme Configuration
const chartColorScheme = {
    background: '#0f172a',
    text: '#ffffff',
    grid: '#333333',
    primary: '#22c55e',
    secondary: '#ef4444',
    accent: '#3b82f6'
};

// Initialize all Chart.js charts
function initializeCharts() {
    const chartElements = document.querySelectorAll('.chart');
    
    chartElements.forEach((element) => {
        try {
            // Get the text content - may be in a code block or direct text
            let configText = element.textContent.trim();
            
            // Try to find and extract JSON from code blocks
            const codeBlock = element.querySelector('code');
            if (codeBlock) {
                configText = codeBlock.textContent.trim();
            }
            
            // Remove any HTML entities that might have been encoded
            configText = configText
                .replace(/&quot;/g, '"')
                .replace(/&apos;/g, "'")
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&');
            
            const config = JSON.parse(configText);
            
            // Set dark theme defaults if not specified
            if (!config.options) config.options = {};
            if (!config.options.plugins) config.options.plugins = {};
            if (!config.options.scales) config.options.scales = {};
            
            // Apply dark theme to plugins (legend, title, tooltip)
            config.options.plugins = {
                ...config.options.plugins,
                legend: {
                    labels: {
                        color: chartColorScheme.text,
                        usePointStyle: true,
                        padding: 20,
                        font: { size: 12 }
                    },
                    ...config.options.plugins.legend
                },
                title: {
                    color: chartColorScheme.text,
                    font: { size: 16, weight: 'bold' },
                    ...config.options.plugins.title
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: chartColorScheme.text,
                    bodyColor: chartColorScheme.text,
                    borderColor: chartColorScheme.grid,
                    borderWidth: 1,
                    ...config.options.plugins.tooltip
                }
            };
            
            // Apply dark theme to scales
            const scaleDefaults = {
                ticks: { color: chartColorScheme.text, font: { size: 11 } },
                grid: { color: chartColorScheme.grid, drawBorder: true, borderColor: chartColorScheme.grid },
                ...config.options.scales.x,
                y: {
                    ...config.options.scales.y,
                    ticks: { color: chartColorScheme.text, font: { size: 11 } },
                    grid: { color: chartColorScheme.grid, drawBorder: true }
                }
            };
            
            config.options.scales = {
                x: { ...scaleDefaults, ...config.options.scales.x },
                y: { ...scaleDefaults, ...config.options.scales.y }
            };
            
            // Create canvas
            const canvas = document.createElement('canvas');
            element.innerHTML = '';
            element.appendChild(canvas);
            element.style.position = 'relative';
            element.style.height = config.options.height || '400px';
            element.style.width = '100%';
            
            // Render chart
            new Chart(canvas, {
                type: config.type || 'bar',
                data: config.data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    ...config.options
                }
            });
            
        } catch (error) {
            console.error('Error initializing chart:', error);
            element.innerHTML = `<p style="color: #ef4444; padding: 20px;">Error loading chart: ${error.message}</p>`;
        }
    });
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initializeCharts, 200);
    });
} else {
    setTimeout(initializeCharts, 200);
}

// Watch for dynamically added charts
const observer = new MutationObserver(() => {
    setTimeout(initializeCharts, 100);
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
