# Loan EMI Calculator WordPress Plugin

A simple yet powerful WordPress plugin that allows users to calculate Loan EMI (Equated Monthly Installment) with a modern, user-friendly interface.

## Features

- Shortcode `[emi_calculator]` to embed the calculator anywhere on your WordPress site
- Calculates EMI, Total Interest Payable, and Total Amount Payable
- User-friendly interface with proper spacing and modern design
- FontAwesome icons for better visual appeal
- AJAX-based calculations (no page refresh)
- Responsive design that works on all devices
- Supports both Years and Months loan tenure options

## Installation

1. Download the `loan-emi-calculator` folder.
2. Upload it to your WordPress site's `/wp-content/plugins/` directory.
3. Activate the plugin through the 'Plugins' menu in WordPress admin.

## Usage

Simply add the shortcode `[emi_calculator]` to any page or post where you want the calculator to appear.

Example:
```
[emi_calculator]
```

## Customization

### CSS Customization

You can customize the appearance by editing the `css/style.css` file. The calculator uses a clean, modern design that should fit most WordPress themes, but you can adjust colors, spacing, and other visual elements to match your site's design.

### Formula

The plugin uses the standard EMI calculation formula:

EMI = [P × R × (1+R)^N] / [(1+R)^N – 1]

Where:
- P = Loan Amount
- R = Monthly Interest Rate (Annual Rate / 12 / 100)
- N = Loan Tenure (in months)

## Demo

For a standalone demo, open the `index.html` file in your browser. This demonstrates how the calculator looks and works outside of WordPress.

## Requirements

- WordPress 5.0 or higher
- PHP 7.0 or higher
- jQuery (included with WordPress)

## License

GPL v2 or later

## Support

For support and feature requests, please open an issue in the plugin's repository.

## Credits

- FontAwesome for the icons
- jQuery for the JavaScript library 