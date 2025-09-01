# QuickCalc - Online Converters & Calculators

A comprehensive web application featuring various calculators and converters, built with vanilla HTML, CSS, and JavaScript.

## 🚀 Features

- **📏 Comprehensive Unit Converter** - Convert between all metric and imperial units:
  - **Length/Distance:** mm, cm, m, km ↔ in, ft, yd, mi
  - **Mass/Weight:** mg, g, kg, t ↔ oz, lb, st, US ton, UK ton
  - **Temperature:** °C, K ↔ °F (all combinations)
  - **Area:** m², ha, km² ↔ in², ft², yd², ac, mi²
  - **Volume/Capacity:** mL, cL, L, m³ ↔ tsp, tbsp, fl oz, cup, pint, quart, gal
  - **Energy:** J, kJ, Wh, kWh, cal, kcal ↔ BTU, therm
- **📊 Grade Calculator** - Combined percentage calculator and weighted grade calculator with enhanced interface
- **💱 Currency Converter** - Real-time currency conversion using Frankfurter API

- **💾 Data Storage Converter** - Convert between bytes, KB, MB, GB, TB

## 🛠️ Technologies

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with responsive design, tab interfaces, and enhanced contrast
- **Vanilla JavaScript** - No frameworks, pure JavaScript functionality with comprehensive conversion logic
- **Frankfurter API** - Real-time currency exchange rates

## 📁 File Structure

```
quickcalc/
├── index.html          # Main application page
├── styles.css          # All styling and responsive design
├── script.js           # All calculator logic and functionality
├── about.html          # About page
├── contact.html        # Contact information
├── privacy.html        # Privacy policy
├── robots.txt          # Search engine directives
├── sitemap.xml         # Site structure for search engines
└── README.md           # This file
```

## 🎯 VS Code Compatibility

This project is fully compatible with VS Code and other code editors:

### ✅ **What Works in VS Code:**
- **HTML IntelliSense** - Auto-completion for HTML tags and attributes
- **CSS Support** - Syntax highlighting and validation
- **JavaScript Support** - ES6+ features, error detection
- **Live Server** - Real-time preview with auto-refresh
- **Git Integration** - Version control support
- **Extensions** - All web development extensions work perfectly

### 🔧 **Recommended VS Code Extensions:**
- **Live Server** - For real-time development preview
- **Prettier** - Code formatting
- **ESLint** - JavaScript linting
- **Auto Rename Tag** - HTML tag renaming
- **CSS Peek** - CSS definition navigation

## 🚀 Getting Started

1. **Open in VS Code:**
   ```bash
   code .  # If code command is available
   # Or open VS Code and drag the folder
   ```

2. **Install Live Server Extension:**
   - Open VS Code Extensions (Ctrl+Shift+X)
   - Search for "Live Server"
   - Install and restart VS Code

3. **Start Development Server:**
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Or use the Live Server button in VS Code

4. **Start Coding:**
   - Edit files in VS Code
   - See changes instantly in the browser
   - Use VS Code's debugging tools

## 🎨 Key Features

### **📏 Comprehensive Unit Converter:**
- **Category Selection** - Choose from 6 conversion categories with emojis
- **Dynamic Dropdowns** - Unit options change based on selected category
- **Comprehensive Coverage** - All major metric and imperial units included
- **Quick Reference** - Common conversion factors displayed for each category
- **Professional Interface** - Clean, organized layout with proper labeling
- **No Redundancy** - Single converter handles all unit types efficiently

### **📊 Enhanced Grade Calculator:**
- **Tab Interface** - High-contrast tabs for easy switching between calculators
- **Percentage Calculator** - Simple score/total calculation with letter grades (A-F)
- **Weighted Grade Calculator** - Dynamic assignment management with:
  - **Assignment Names** - Descriptive names for each assignment
  - **Individual Scores & Weights** - Clear input fields for each component
  - **Add/Remove Rows** - Dynamic interface for multiple assignments
  - **Detailed Results** - Shows breakdown of each assignment
  - **Letter Grade Display** - Final grade with letter equivalent
  - **Enhanced Contrast** - Improved visibility and readability

### **💱 Currency Converter:**
- **Real-time Rates** - Uses Frankfurter API for current exchange rates
- **Global Currencies** - Supports all major world currencies
- **Error Handling** - Graceful handling of API failures
- **User-friendly Interface** - Simple dropdown selection

### **🎨 User Experience Improvements:**
- **Enhanced Visual Design** - Better contrast and readability
- **Responsive Design** - Works on all screen sizes
- **Error Handling** - Clear error messages for invalid inputs
- **Visual Feedback** - Hover effects, transitions, and modern styling
- **Accessibility** - Proper form labels and keyboard navigation
- **Emoji Icons** - Visual indicators for different calculator types

## 💰 AdSense Integration

This site is configured for Google AdSense monetization with strategic ad placement:

### **Ad Placement Strategy:**
- **Top Banner Ads** - Above main content for maximum visibility
- **Middle Rectangle Ads** - Between calculator tabs for user engagement
- **Bottom Banner Ads** - Before footer for additional monetization

### **Implementation Details:**
- **HTML Structure** - Ad containers with proper semantic markup
- **Placeholder IDs** - Ready for your AdSense publisher and slot IDs
- **Responsive Design** - Ads scale appropriately on all devices
- **Privacy Compliant** - Updated privacy policy for AdSense requirements

### **Setup Instructions:**
1. Replace `YOUR_PUBLISHER_ID` with your actual AdSense publisher ID
2. Replace `YOUR_BANNER_SLOT` with your actual ad slot IDs
3. Ensure your site complies with AdSense policies
4. Submit for AdSense review and approval

## 🌐 Deployment on GitHub Pages

Deploy your QuickCalc site to GitHub Pages for free hosting:

### **Step-by-Step Deployment:**

1. **Create a GitHub Repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: QuickCalc calculator suite"
   git branch -M main
   git remote add origin https://github.com/yourusername/quickcalc.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** tab
   - Scroll down to **Pages** section
   - Under **Source**, select **Deploy from a branch**
   - Choose **main** branch
   - Click **Save**

3. **Verify Deployment:**
   - Your site will be available at: `https://yourusername.github.io/quickcalc`
   - Initial deployment may take a few minutes
   - Check the **Actions** tab for deployment status

### **Custom Domain (Optional):**
- In Pages settings, add your custom domain
- Update DNS records as instructed
- Enable HTTPS for secure connections

### **Automatic Updates:**
- Every push to main branch triggers automatic deployment
- No manual deployment required
- Perfect for continuous development workflow

## 🎨 Customization

### Adding New Calculators:
1. Add a new menu item in `index.html`
2. Create a new section with unique ID
3. Add JavaScript functionality in `script.js`
4. Style with CSS in `styles.css`

### Styling Changes:
- All styles are in `styles.css`
- Responsive design included
- Easy to customize colors and layout
- Tab interface styles for multi-function calculators
- Enhanced contrast for better accessibility

## 🌐 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔒 Privacy & Security

- No personal data collected
- All calculations performed locally
- Secure currency API calls only

## 📄 License

MIT License - Feel free to use, modify, and distribute this project.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support, contact: quickcalccontact@gmail.com

---

**Built with ❤️ for developers who need quick calculations**
