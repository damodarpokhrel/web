/**
 * Loan EMI Calculator JavaScript
 * 
 * Handles form validation, AJAX requests, and updating the UI
 */

(function($) {
    'use strict';
    
    // Initialize when document is ready
    $(document).ready(function() {
        
        // Cache DOM elements
        const $calculator = $('.loan-emi-calculator-container');
        const $loanAmount = $('#loan_amount');
        const $interestRate = $('#interest_rate');
        const $loanTenure = $('#loan_tenure');
        const $tenureType = $('input[name="tenure_type"]');
        const $calculateBtn = $('#calculate_emi');
        const $resultsSection = $('.calculator-results');
        const $errorMessage = $('#calculation_error');
        const $monthlyEmi = $('#monthly_emi');
        const $totalInterest = $('#total_interest');
        const $totalPayment = $('#total_payment');
        
        // Format currency function (Indian Rupee format)
        function formatCurrency(amount) {
            // Convert to Indian format (2 decimal places, commas for thousands)
            const formatter = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            
            return formatter.format(amount);
        }
        
        // Validate form inputs
        function validateInputs() {
            const loanAmount = parseFloat($loanAmount.val());
            const interestRate = parseFloat($interestRate.val());
            const loanTenure = parseInt($loanTenure.val());
            
            // Check if inputs are valid numbers
            if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTenure)) {
                return false;
            }
            
            // Check if inputs are within reasonable ranges
            if (loanAmount <= 0 || interestRate <= 0 || interestRate > 100 || loanTenure <= 0) {
                return false;
            }
            
            return true;
        }
        
        // Handle calculate button click
        $calculateBtn.on('click', function(e) {
            e.preventDefault();
            
            // Hide any previous results or errors
            $resultsSection.hide();
            $errorMessage.hide();
            
            // Validate inputs
            if (!validateInputs()) {
                $errorMessage.show();
                return;
            }
            
            // Get form values
            const loanAmount = parseFloat($loanAmount.val());
            const interestRate = parseFloat($interestRate.val());
            const loanTenure = parseInt($loanTenure.val());
            const tenureType = $('input[name="tenure_type"]:checked').val();
            
            // Show loading state
            $calculateBtn.prop('disabled', true);
            $calculateBtn.html('<i class="fas fa-spinner fa-spin"></i> Calculating...');
            
            // Make AJAX request to calculate EMI
            $.ajax({
                url: emi_ajax.ajax_url,
                type: 'POST',
                data: {
                    action: 'loan_emi_calculator',
                    nonce: emi_ajax.nonce,
                    loan_amount: loanAmount,
                    interest_rate: interestRate,
                    loan_tenure: loanTenure,
                    tenure_type: tenureType
                },
                success: function(response) {
                    if (response.success) {
                        // Update results
                        $monthlyEmi.text(formatCurrency(response.data.emi));
                        $totalInterest.text(formatCurrency(response.data.total_interest));
                        $totalPayment.text(formatCurrency(response.data.total_payment));
                        
                        // Show results section
                        $resultsSection.fadeIn(300);
                    } else {
                        $errorMessage.show();
                    }
                },
                error: function() {
                    $errorMessage.show();
                },
                complete: function() {
                    // Reset button state
                    $calculateBtn.prop('disabled', false);
                    $calculateBtn.html('<i class="fas fa-calculator"></i> Calculate EMI');
                }
            });
        });
        
        // Add input validation for better UX
        $loanAmount.on('input', function() {
            const value = $(this).val();
            if (value < 0) {
                $(this).val(0);
            }
        });
        
        $interestRate.on('input', function() {
            const value = $(this).val();
            if (value < 0) {
                $(this).val(0);
            } else if (value > 100) {
                $(this).val(100);
            }
        });
        
        $loanTenure.on('input', function() {
            const value = $(this).val();
            if (value < 0) {
                $(this).val(0);
            } else if (value > 50 && $('input[name="tenure_type"]:checked').val() === 'years') {
                $(this).val(50);
            } else if (value > 600 && $('input[name="tenure_type"]:checked').val() === 'months') {
                $(this).val(600);
            }
        });
    });
    
})(jQuery); 