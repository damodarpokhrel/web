<?php
/**
 * Plugin Name: Loan EMI Calculator
 * Description: A simple loan EMI calculator with shortcode [emi_calculator]
 * Version: 1.0.0
 * Author: Developer
 * Text Domain: loan-emi-calculator
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('LOAN_EMI_CALCULATOR_PATH', plugin_dir_path(__FILE__));
define('LOAN_EMI_CALCULATOR_URL', plugin_dir_url(__FILE__));

// Enqueue scripts and styles
function loan_emi_calculator_enqueue_scripts() {
    // Enqueue FontAwesome
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
    
    // Enqueue custom CSS
    wp_enqueue_style('loan-emi-calculator-style', LOAN_EMI_CALCULATOR_URL . 'css/style.css', array(), '1.0.0');
    
    // Enqueue jQuery (already included with WordPress)
    wp_enqueue_script('jquery');
    
    // Enqueue custom JS
    wp_enqueue_script('loan-emi-calculator-script', LOAN_EMI_CALCULATOR_URL . 'js/script.js', array('jquery'), '1.0.0', true);
    
    // Localize script to use WordPress AJAX
    wp_localize_script('loan-emi-calculator-script', 'emi_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('loan_emi_calculator_nonce')
    ));
}
add_action('wp_enqueue_scripts', 'loan_emi_calculator_enqueue_scripts');

// AJAX handler for EMI calculation
function loan_emi_calculator_ajax_handler() {
    // Verify nonce
    check_ajax_referer('loan_emi_calculator_nonce', 'nonce');
    
    // Get values from AJAX request
    $loan_amount = isset($_POST['loan_amount']) ? floatval($_POST['loan_amount']) : 0;
    $interest_rate = isset($_POST['interest_rate']) ? floatval($_POST['interest_rate']) : 0;
    $loan_tenure = isset($_POST['loan_tenure']) ? intval($_POST['loan_tenure']) : 0;
    $tenure_type = isset($_POST['tenure_type']) ? sanitize_text_field($_POST['tenure_type']) : 'years';
    
    // Convert tenure to months if in years
    $loan_tenure_months = ($tenure_type === 'years') ? $loan_tenure * 12 : $loan_tenure;
    
    // Calculate monthly interest rate
    $monthly_interest_rate = ($interest_rate / 12) / 100;
    
    // Calculate EMI using formula: EMI = [P × R × (1+R)^N] / [(1+R)^N – 1]
    $emi = 0;
    if ($monthly_interest_rate > 0 && $loan_tenure_months > 0) {
        $emi = ($loan_amount * $monthly_interest_rate * pow(1 + $monthly_interest_rate, $loan_tenure_months)) / 
               (pow(1 + $monthly_interest_rate, $loan_tenure_months) - 1);
    }
    
    // Calculate total payment and interest
    $total_payment = $emi * $loan_tenure_months;
    $total_interest = $total_payment - $loan_amount;
    
    // Prepare response
    $response = array(
        'emi' => round($emi, 2),
        'total_interest' => round($total_interest, 2),
        'total_payment' => round($total_payment, 2)
    );
    
    // Send JSON response
    wp_send_json_success($response);
}
add_action('wp_ajax_loan_emi_calculator', 'loan_emi_calculator_ajax_handler');
add_action('wp_ajax_nopriv_loan_emi_calculator', 'loan_emi_calculator_ajax_handler');

// Shortcode for EMI Calculator
function loan_emi_calculator_shortcode() {
    ob_start();
    ?>
    <div class="loan-emi-calculator-container">
        <div class="calculator-header">
            <h2><i class="fas fa-calculator"></i> Loan EMI Calculator</h2>
        </div>
        
        <div class="calculator-form">
            <div class="form-group">
                <label for="loan_amount"><i class="fas fa-rupee-sign"></i> Loan Amount (₹)</label>
                <input type="number" id="loan_amount" name="loan_amount" placeholder="Enter loan amount" min="1000" value="100000">
            </div>
            
            <div class="form-group">
                <label for="interest_rate"><i class="fas fa-percentage"></i> Interest Rate (% per annum)</label>
                <input type="number" id="interest_rate" name="interest_rate" placeholder="Enter interest rate" min="1" max="50" step="0.01" value="10">
            </div>
            
            <div class="form-group">
                <label for="loan_tenure"><i class="fas fa-clock"></i> Loan Tenure</label>
                <div class="tenure-inputs">
                    <input type="number" id="loan_tenure" name="loan_tenure" placeholder="Enter loan tenure" min="1" value="5">
                    <div class="tenure-type">
                        <label class="tenure-radio">
                            <input type="radio" name="tenure_type" value="years" checked> Years
                        </label>
                        <label class="tenure-radio">
                            <input type="radio" name="tenure_type" value="months"> Months
                        </label>
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <button id="calculate_emi" class="calculate-btn"><i class="fas fa-calculator"></i> Calculate EMI</button>
            </div>
        </div>
        
        <div class="calculator-results" style="display: none;">
            <div class="result-header">
                <h3>Loan Summary</h3>
            </div>
            
            <div class="result-item">
                <span class="result-label"><i class="fas fa-money-bill-wave"></i> Monthly EMI:</span>
                <span class="result-value" id="monthly_emi">₹ 0</span>
            </div>
            
            <div class="result-item">
                <span class="result-label"><i class="fas fa-coins"></i> Total Interest Payable:</span>
                <span class="result-value" id="total_interest">₹ 0</span>
            </div>
            
            <div class="result-item">
                <span class="result-label"><i class="fas fa-hand-holding-usd"></i> Total Amount Payable:</span>
                <span class="result-value" id="total_payment">₹ 0</span>
            </div>
        </div>
        
        <div id="calculation_error" class="error-message" style="display: none;">
            Please check your inputs and try again.
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('emi_calculator', 'loan_emi_calculator_shortcode'); 