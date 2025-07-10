// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    updateTime();
    setInterval(updateTime, 1000);
    displayBrowserInfo();
});

// Initialize application
function initializeApp() {
    console.log('🚀 Local Dev Hub initialized!');
    
    // Add smooth scrolling to navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add enter key support for todo input
    const todoInput = document.getElementById('todoInput');
    if (todoInput) {
        todoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTodo();
            }
        });
    }
}

// Show current time
function showTime() {
    const now = new Date();
    const timeString = now.toLocaleString();
    alert(`Current Time: ${timeString}`);
}

// Update time display
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = `Current Time: ${timeString}`;
    }
}

// Display browser information
function displayBrowserInfo() {
    const browserInfoElement = document.getElementById('browser-info');
    const screenInfoElement = document.getElementById('screen-info');
    
    if (browserInfoElement) {
        const browserInfo = `${navigator.userAgent.split(' ')[0]} ${navigator.platform}`;
        browserInfoElement.textContent = `Browser: ${browserInfo}`;
    }
    
    if (screenInfoElement) {
        const screenInfo = `Screen: ${screen.width}x${screen.height}`;
        screenInfoElement.textContent = screenInfo;
    }
}

// Calculator functionality
function openCalculator() {
    const calculatorHTML = `
        <h2>Calculator</h2>
        <div class="calculator">
            <input type="text" id="calcDisplay" readonly style="width: 100%; padding: 1rem; font-size: 1.5rem; text-align: right; margin-bottom: 1rem; border: 1px solid #ddd; border-radius: 8px;">
            <div class="calc-buttons" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem;">
                <button onclick="clearCalc()" style="background: #ef4444; color: white; padding: 1rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer;">C</button>
                <button onclick="appendToCalc('/')" style="background: #6b7280; color: white; padding: 1rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer;">÷</button>
                <button onclick="appendToCalc('*')" style="background: #6b7280; color: white; padding: 1rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer;">×</button>
                <button onclick="deleteLast()" style="background: #6b7280; color: white; padding: 1rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer;">⌫</button>
                
                <button onclick="appendToCalc('7')" style="background: #f3f4f6; padding: 1rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer;">7</button>
                <button onclick="appendToCalc('8')" style="background: #f3f4f6; padding: 1rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer;">8</button>
                <button onclick="appendToCalc('9')" style="background: #f3f4f6; padding: 1rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer;">9</button>
                <button onclick="appendToCalc('-')" style="background: #6b7280; color: white; padding: 1rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer;">-</button>
                
                <button onclick="appendToCalc('4')" style="background: #f3f4f6; padding: 1rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer;">4</button>
                <button onclick="appendToCalc('5')" style="background: #f3f4f6; padding: 1rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer;">5</button>
                <button onclick="appendToCalc('6')" style="background: #f3f4f6; padding: 1rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer;">6</button>
                <button onclick="appendToCalc('+')" style="background: #6b7280; color: white; padding: 1rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer;">+</button>
                
                <button onclick="appendToCalc('1')" style="background: #f3f4f6; padding: 1rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer;">1</button>
                <button onclick="appendToCalc('2')" style="background: #f3f4f6; padding: 1rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer;">2</button>
                <button onclick="appendToCalc('3')" style="background: #f3f4f6; padding: 1rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer;">3</button>
                <button onclick="calculateResult()" rowspan="2" style="background: #10b981; color: white; padding: 1rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; grid-row: span 2;">=</button>
                
                <button onclick="appendToCalc('0')" style="background: #f3f4f6; padding: 1rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; grid-column: span 2;">0</button>
                <button onclick="appendToCalc('.')" style="background: #f3f4f6; padding: 1rem; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer;">.</button>
            </div>
        </div>
    `;
    showModal(calculatorHTML);
}

function appendToCalc(value) {
    const display = document.getElementById('calcDisplay');
    if (display) {
        display.value += value;
    }
}

function clearCalc() {
    const display = document.getElementById('calcDisplay');
    if (display) {
        display.value = '';
    }
}

function deleteLast() {
    const display = document.getElementById('calcDisplay');
    if (display) {
        display.value = display.value.slice(0, -1);
    }
}

function calculateResult() {
    const display = document.getElementById('calcDisplay');
    if (display) {
        try {
            // Replace display symbols with actual operators
            let expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
            display.value = eval(expression);
        } catch (error) {
            display.value = 'Error';
        }
    }
}

// Color Picker functionality
function openColorPicker() {
    const colorPickerHTML = `
        <h2>Color Picker</h2>
        <div class="color-picker">
            <div style="margin-bottom: 1rem;">
                <label>Pick a color:</label>
                <input type="color" id="colorInput" value="#667eea" style="width: 100px; height: 50px; border: none; border-radius: 8px; cursor: pointer;">
            </div>
            <div id="colorInfo" style="padding: 1rem; border-radius: 8px; background: #f3f4f6; margin-bottom: 1rem;">
                <p><strong>Hex:</strong> <span id="hexValue">#667eea</span></p>
                <p><strong>RGB:</strong> <span id="rgbValue">rgb(102, 126, 234)</span></p>
            </div>
            <div>
                <h3>Color Palette:</h3>
                <div id="colorPalette" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.5rem; margin-top: 1rem;"></div>
            </div>
        </div>
    `;
    showModal(colorPickerHTML);
    
    // Initialize color picker
    const colorInput = document.getElementById('colorInput');
    if (colorInput) {
        colorInput.addEventListener('input', updateColorInfo);
        updateColorInfo(); // Initial update
        generateColorPalette('#667eea');
    }
}

function updateColorInfo() {
    const colorInput = document.getElementById('colorInput');
    const hexValue = document.getElementById('hexValue');
    const rgbValue = document.getElementById('rgbValue');
    
    if (colorInput && hexValue && rgbValue) {
        const hex = colorInput.value;
        const rgb = hexToRgb(hex);
        
        hexValue.textContent = hex;
        rgbValue.textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        
        generateColorPalette(hex);
    }
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function generateColorPalette(baseColor) {
    const palette = document.getElementById('colorPalette');
    if (!palette) return;
    
    palette.innerHTML = '';
    
    // Generate 10 related colors
    const variations = [0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 0.5, 0.6, 1.4];
    
    variations.forEach(factor => {
        const rgb = hexToRgb(baseColor);
        const newR = Math.min(255, Math.floor(rgb.r * factor));
        const newG = Math.min(255, Math.floor(rgb.g * factor));
        const newB = Math.min(255, Math.floor(rgb.b * factor));
        
        const newColor = `rgb(${newR}, ${newG}, ${newB})`;
        const colorBox = document.createElement('div');
        colorBox.style.cssText = `
            background: ${newColor};
            height: 50px;
            border-radius: 8px;
            cursor: pointer;
            border: 2px solid #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            color: ${(newR + newG + newB) / 3 > 128 ? '#000' : '#fff'};
        `;
        colorBox.textContent = rgbToHex(newR, newG, newB);
        colorBox.onclick = () => navigator.clipboard.writeText(rgbToHex(newR, newG, newB));
        palette.appendChild(colorBox);
    });
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// JSON Formatter functionality
function openJsonFormatter() {
    const jsonFormatterHTML = `
        <h2>JSON Formatter</h2>
        <div class="json-formatter">
            <textarea id="jsonInput" placeholder="Paste your JSON here..." style="width: 100%; height: 200px; padding: 1rem; border: 1px solid #ddd; border-radius: 8px; font-family: monospace; resize: vertical;"></textarea>
            <div style="margin: 1rem 0; display: flex; gap: 1rem;">
                <button onclick="formatJson()" style="background: #10b981; color: white; padding: 0.5rem 1rem; border: none; border-radius: 8px; cursor: pointer;">Format</button>
                <button onclick="validateJson()" style="background: #3b82f6; color: white; padding: 0.5rem 1rem; border: none; border-radius: 8px; cursor: pointer;">Validate</button>
                <button onclick="minifyJson()" style="background: #6b7280; color: white; padding: 0.5rem 1rem; border: none; border-radius: 8px; cursor: pointer;">Minify</button>
            </div>
            <div id="jsonOutput" style="background: #f3f4f6; padding: 1rem; border-radius: 8px; min-height: 100px; font-family: monospace; white-space: pre-wrap;"></div>
        </div>
    `;
    showModal(jsonFormatterHTML);
}

function formatJson() {
    const input = document.getElementById('jsonInput');
    const output = document.getElementById('jsonOutput');
    
    if (input && output) {
        try {
            const parsed = JSON.parse(input.value);
            output.textContent = JSON.stringify(parsed, null, 2);
            output.style.color = '#000';
        } catch (error) {
            output.textContent = `Error: ${error.message}`;
            output.style.color = '#ef4444';
        }
    }
}

function validateJson() {
    const input = document.getElementById('jsonInput');
    const output = document.getElementById('jsonOutput');
    
    if (input && output) {
        try {
            JSON.parse(input.value);
            output.textContent = '✅ Valid JSON!';
            output.style.color = '#10b981';
        } catch (error) {
            output.textContent = `❌ Invalid JSON: ${error.message}`;
            output.style.color = '#ef4444';
        }
    }
}

function minifyJson() {
    const input = document.getElementById('jsonInput');
    const output = document.getElementById('jsonOutput');
    
    if (input && output) {
        try {
            const parsed = JSON.parse(input.value);
            output.textContent = JSON.stringify(parsed);
            output.style.color = '#000';
        } catch (error) {
            output.textContent = `Error: ${error.message}`;
            output.style.color = '#ef4444';
        }
    }
}

// Lorem Generator
function generateLorem() {
    const loremTexts = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
    ];
    
    const randomText = loremTexts[Math.floor(Math.random() * loremTexts.length)];
    navigator.clipboard.writeText(randomText).then(() => {
        alert(`Lorem text copied to clipboard:\n\n"${randomText}"`);
    });
}

// Todo List functionality
function addTodo() {
    const input = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');
    
    if (input && todoList && input.value.trim()) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <span>${input.value}</span>
            <button class="delete-btn" onclick="deleteTodo(this)">Delete</button>
        `;
        todoList.appendChild(li);
        input.value = '';
    }
}

function deleteTodo(button) {
    button.parentElement.remove();
}

// Random Quote Generator
function getRandomQuote() {
    const quotes = [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Innovation distinguishes between a leader and a follower. - Steve Jobs",
        "Code is poetry. - WordPress",
        "First, solve the problem. Then, write the code. - John Johnson",
        "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
        "In order to be irreplaceable, one must always be different. - Coco Chanel",
        "The best way to predict the future is to create it. - Peter Drucker",
        "Life is what happens to you while you're busy making other plans. - John Lennon",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "It is during our darkest moments that we must focus to see the light. - Aristotle"
    ];
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const quoteElement = document.getElementById('quote');
    
    if (quoteElement) {
        quoteElement.style.opacity = '0';
        setTimeout(() => {
            quoteElement.textContent = randomQuote;
            quoteElement.style.opacity = '1';
        }, 150);
    }
}

// Modal functionality
function showModal(content) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    if (modal && modalBody) {
        modalBody.innerHTML = content;
        modal.style.display = 'block';
        
        // Close modal when clicking outside
        modal.onclick = function(event) {
            if (event.target === modal) {
                closeModal();
            }
        };
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Smooth scrolling behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some console messages for developers
console.log('🚀 Welcome to Local Dev Hub!');
console.log('💻 This website is running locally on your machine');
console.log('🔧 Check out the interactive tools and features');
console.log('📱 The design is fully responsive');
console.log('🎨 Built with modern HTML, CSS, and JavaScript');