import React, { useState, useRef, useEffect } from "react";
import Swal from 'sweetalert2';
import {
    Clapperboard,
    Play,
    Check,
    X,
    CreditCard as CreditCardIcon,
    DollarSign,
    Lock,
    CreditCard,
    Star,
    AlertCircle,
    Info,
    AlertTriangle,
    SquarePlus,
    ChevronRight,
    CircleDollarSign
} from "lucide-react";

// Modern Alert Component
const ModernAlert = ({
    type = 'info',
    message,
    isVisible,
    onClose,
    duration = 3000
}) => {
    useEffect(() => {
        let timeoutId;
        if (isVisible) {
            timeoutId = setTimeout(onClose, duration);
        }
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [isVisible, onClose, duration]);

    if (!isVisible) return null;

    const alertStyles = {
        info: {
            bg: 'bg-blue-500',
            icon: <Info className="w-6 h-6 text-white" />,
            border: 'border-blue-600'
        },
        success: {
            bg: 'bg-green-500',
            icon: <Check className="w-6 h-6 text-white" />,
            border: 'border-green-600'
        },
        warning: {
            bg: 'bg-yellow-500',
            icon: <AlertTriangle className="w-6 h-6 text-white" />,
            border: 'border-yellow-600'
        },
        error: {
            bg: 'bg-red-500',
            icon: <AlertCircle className="w-6 h-6 text-white" />,
            border: 'border-red-600'
        }
    };

    const { bg, icon, border } = alertStyles[type] || alertStyles.info;

    return (
        <div className={`
            fixed top-4 right-4 z-[200]
            ${bg} text-white
            rounded-xl shadow-2xl
            p-4 border-l-4 ${border}
            animate-slideIn
        `}>
            <div className="flex items-center space-x-3">
                <div className="mr-2">{icon}</div>
                <div className="flex-grow">
                    <p className="font-semibold">{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className="hover:rotate-90 transition-transform duration-300"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

// Success Toast Component
const SuccessToast = ({ isVisible, message, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed top-4 right-4 z-[200] animate-bounce">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-4 shadow-2xl flex items-center space-x-3 transform transition-all duration-300 hover:scale-105">
                <Check className="w-6 h-6 animate-pulse" />
                <span className="font-semibold text-lg">{message}</span>
                <button
                    onClick={onClose}
                    className="ml-2 hover:rotate-90 transition-transform duration-300"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

// Main Subscription App Component
const SubscriptionApp = () => {
    const [isCardModalOpen, setIsCardModalOpen] = useState(true);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isToastVisible, setIsToastVisible] = useState(false);
    const [cardDetails, setCardDetails] = useState(null);
    const [alertConfig, setAlertConfig] = useState({
        isVisible: false,
        message: '',
        type: 'info'
    });

    const subscriptionPlans = [
        {
            title: "Streaming Pro",
            price: 12.99,
            features: [
                "4K Ultra HD Streaming",
                "Unlimited Downloads",
                "Ad-Free Experience"
            ]
        }
    ];

    const showAlert = (message, type = 'info') => {
        setAlertConfig({
            isVisible: true,
            message,
            type
        });
    };

    const hideAlert = () => {
        setAlertConfig({ ...alertConfig, isVisible: false });
    };

    const handleSubmitPayment = (details) => {
        // Simulate payment processing
        console.log("Payment details:", details);

        setCardDetails(details);
        setIsCardModalOpen(false);
        setIsConfirmationModalOpen(true);

        // Show toast after a brief delay
        setTimeout(() => {
            setIsToastVisible(true);
        }, 500);

        // Show success alert
        ModernAlert("Payment Successful! Subscription Activated.", "success");
    };

    const closeConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            {/* Credit Card Input Modal */}
            <CreditCardInputModal
                isOpen={isCardModalOpen}
                onClose={() => setIsCardModalOpen(false)}
                planTitle={subscriptionPlans[0].title}
                planPrice={subscriptionPlans[0].price}
                onSubmitPayment={handleSubmitPayment}
                showAlert={showAlert}
            />

            {/* Subscription Confirmation Modal */}
            <SubscriptionConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={closeConfirmationModal}
                planTitle={subscriptionPlans[0].title}
                planPrice={subscriptionPlans[0].price}
                cardDetails={cardDetails || {}}
            />

            {/* Success Toast */}
            <SuccessToast
                isVisible={isToastVisible}
                message="Subscription Activated Successfully!"
                onClose={() => setIsToastVisible(false)}
            />

            {/* Modern Alert */}
            <ModernAlert
                isVisible={alertConfig.isVisible}
                message={alertConfig.message}
                type={alertConfig.type}
                onClose={hideAlert}
            />
        </div>
    );
};

// Subscription Confirmation Modal Component
const SubscriptionConfirmationModal = ({
    isOpen,
    onClose,
    planTitle,
    planPrice,
    cardDetails
}) => {
    if (!isOpen) return null;

    // Mask credit card number
    const maskedCardNumber = cardDetails.cardNumber
        ? cardDetails.cardNumber.slice(0, 4) + ' **** **** ' + cardDetails.cardNumber.slice(-4)
        : 'N/A';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[100] flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-2xl max-w-md w-full p-8 shadow-2xl border border-gray-700 relative overflow-hidden animate-fadeIn">
                {/* Gradient Background Effect */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 animate-gradientMove"></div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="bg-green-500/20 p-4 rounded-full animate-pulse">
                        <Check className="w-12 h-12 text-green-500" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-center mb-4 text-white">
                    Payment Successful!
                </h2>

                {/* Subscription Details */}
                <div className="bg-gray-700 rounded-xl p-4 mb-6 animate-slideIn">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <Star className="w-5 h-5 text-yellow-500 mr-2" />
                            <span className="font-semibold">Plan</span>
                        </div>
                        <span className="text-white">{planTitle}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <CreditCard className="w-5 h-5 text-blue-500 mr-2" />
                            <span className="font-semibold">Monthly Price</span>
                        </div>
                        <span className="text-white">${planPrice}/month</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <CreditCard className="w-5 h-5 text-purple-500 mr-2" />
                            <span className="font-semibold">Card Used</span>
                        </div>
                        <span className="text-white">{maskedCardNumber}</span>
                    </div>
                </div>

                {/* Confirmation Message */}
                <p className="text-center text-gray-300 mb-6 animate-fadeIn">
                    Your subscription is now active. Enjoy unlimited entertainment with JO BEST!
                </p>

                {/* Continue Button */}
                <button
                    onClick={onClose}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full transition-colors transform hover:scale-105"
                >
                    Continue to Dashboard
                </button>
            </div>
        </div>
    );
};

// Credit Card Input Modal Component
const CreditCardInputModal = ({
    isOpen,
    onClose,
    planTitle,
    planPrice,
    onSubmitPayment,
    ModernAlert,
  }) => {
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [isFlipped, setIsFlipped] = useState(false);
    const [errors, setErrors] = useState({});
    const cardRef = useRef(null);

    // Format card number with spaces every 4 digits
    const formatCardNumber = (value) => {
      return value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19);
    };

    // Format expiry date
    const formatExpiryDate = (value) => {
      value = value.replace(/\//g, "");
      if (value.length >= 2) {
        return `${value.slice(0, 2)}/${value.slice(2, 4)}`;
      }
      return value;
    };

    const handleCardNumberChange = (e) => {
      const formatted = formatCardNumber(e.target.value);
      setCardNumber(formatted);
    };

    const handleExpiryDateChange = (e) => {
      const formatted = formatExpiryDate(e.target.value);
      setExpiryDate(formatted);
    };

    const handleCvvChange = (e) => {
      setCvv(e.target.value.replace(/\D/g, ""));
    };

    // Validate inputs
    const validateForm = () => {
      let valid = true;
      let validationErrors = {};

      // Card number validation (16 digits)
      const cardNumberClean = cardNumber.replace(/\s/g, "");
      if (cardNumberClean.length !== 16) {
        validationErrors.cardNumber = "Please enter a valid 16-digit card number.";
        valid = false;
      }

      // Cardholder name validation
      if (!cardName.trim()) {
        validationErrors.cardName = "Please enter the cardholder's name.";
        valid = false;
      }

      // Expiry date validation (MM/YY format)
      if (expiryDate.length !== 5 || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
        validationErrors.expiryDate = "Please enter a valid expiry date (MM/YY).";
        valid = false;
      } else {
        const [month, year] = expiryDate.split("/").map((item) => parseInt(item));
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits of the year
        const currentMonth = currentDate.getMonth() + 1; // Months are 0-based

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          validationErrors.expiryDate = "The expiry date has already passed.";
          valid = false;
        }
      }

      // CVV validation (3 or 4 digits)
      if (cvv.length < 3 || cvv.length > 4) {
        validationErrors.cvv = "Please enter a valid CVV (3 or 4 digits).";
        valid = false;
      }

      setErrors(validationErrors);
      return valid;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      // Submit payment if all validations pass
      onSubmitPayment({
        cardNumber,
        cardName,
        expiryDate,
        cvv,
      });
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-gray-800 rounded-xl p-8 w-full max-w-md mx-4 relative animate-slideIn">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Card Preview */}
          <div
            ref={cardRef}
            className={`mb-6 mx-auto w-80 h-48 bg-gradient-to-br from-gray-700 to-gray-900
              rounded-xl shadow-2xl transition-transform duration-500
              ${isFlipped ? "rotate-y-180" : ""}`}
          >
            {!isFlipped ? (
              <div className="p-6 relative h-full">
                <div className="flex justify-between items-center mb-4">
                  <CreditCard className="w-12 h-12 text-white opacity-70" />
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Total Monthly</p>
                    <p className="text-xl font-bold text-red-500">${planPrice}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-lg tracking-widest text-white">
                    {cardNumber || "#### #### #### ####"}
                  </p>
                </div>
                <div className="flex justify-between mt-4">
                  <p className="text-sm text-gray-300 uppercase">
                    {cardName || "CARD HOLDER"}
                  </p>
                  <p className="text-sm text-gray-300">{expiryDate || "MM/YY"}</p>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="bg-white w-full h-12 my-4"></div>
                <div className="absolute right-35 bg-gray-800 p-2 rounded">
                  <p className="text-white text-sm">{cvv || "CVV"}</p>
                </div>
              </div>
            )}
          </div>
          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength="19"
                className={`w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.cardNumber ? "border-red-500" : ""}`}
                onFocus={() => setIsFlipped(false)}
              />
              {errors.cardNumber && <p className="text-red-500 text-xs">{errors.cardNumber}</p>}
              <CreditCard className="absolute right-3 top-3 text-gray-400" />
            </div>
            <div>
              <input
                type="text"
                placeholder="Cardholder Name"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className={`w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.cardName ? "border-red-500" : ""}`}
                onFocus={() => setIsFlipped(false)}
              />
              {errors.cardName && <p className="text-red-500 text-xs">{errors.cardName}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  maxLength="5"
                  className={`w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.expiryDate ? "border-red-500" : ""}`}
                  onFocus={() => setIsFlipped(false)}
                />
                {errors.expiryDate && <p className="text-red-500 text-xs">{errors.expiryDate}</p>}
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="CVV"
                  value={cvv}
                  onChange={handleCvvChange}
                  maxLength="4"
                  className={`w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.cvv ? "border-red-500" : ""}`}
                  onFocus={() => setIsFlipped(true)}
                />
                {errors.cvv && <p className="text-red-500 text-xs">{errors.cvv}</p>}
                <Lock className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full flex items-center justify-center transform hover:scale-105 transition-transform"
            >
              <CircleDollarSign className="mr-2" /> Complete Payment
            </button>
          </form>
        </div>
      </div>
    );
  };

// Payment Method Modal Component
const PaymentMethodModal = ({
    isOpen,
    onClose,
    planTitle,
    planPrice,
    onSelectPayment,
}) => {
    if (!isOpen) return null;

    const paymentMethods = [
        {
            id: "credit-card",
            name: "Credit Card",
            icon: <CreditCardIcon className="w-8 h-8 text-blue-500" />,
        },
        {
            id: "paypal",
            name: "PayPal",
            icon: <DollarSign className="w-8 h-8 text-blue-600" />,
        },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-gray-800 rounded-xl p-8 w-full max-w-md mx-4">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Choose Payment Method for {planTitle}
                </h2>
                <p className="text-center mb-6 text-gray-400">
                    Total Monthly:{" "}
                    <span className="text-red-500 font-bold">${planPrice}</span>
                </p>
                <div className="space-y-4">
                    {paymentMethods.map((method) => (
                        <button
                            key={method.id}
                            onClick={() => onSelectPayment(method.id)}
                            className="w-full flex items-center justify-between bg-gray-700 hover:bg-gray-600 rounded-lg p-4 transition-colors"
                        >
                            <div className="flex items-center space-x-4">
                                {method.icon}
                                <span className="text-lg">{method.name}</span>
                            </div>
                            <ChevronRight className="w-6 h-6 text-white" />
                        </button>
                    ))}
                </div>
                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-transparent border border-white hover:bg-white/20 text-white py-3 rounded-full"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};
// Subscription Card Component
const SubscriptionCard = ({
    title,
    price,
    features,
    recommended = false,
    onChoosePlan,
}) => {
    return (
        <div
            className={`
      bg-gray-800 bg-opacity-70 rounded-xl p-6 transform transition-all duration-300 relative
      ${
          recommended
              ? "scale-105 border-2 border-red-500 shadow-2xl"
              : "hover:scale-105 hover:shadow-xl"
      }
    `}
        >
            {recommended && (
                <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 rounded-bl-xl">
                    Most Popular
                </div>
            )}
            <h3 className="text-3xl font-bold mb-4 text-center">{title}</h3>
            <div className="text-center mb-6">
                <span className="text-5xl font-extrabold text-red-500">
                    ${price}
                </span>
                <span className="text-gray-400 ml-2">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                        {feature.included ? (
                            <Check className="w-5 h-5 text-green-500 mr-3" />
                        ) : (
                            <X className="w-5 h-5 text-red-500 mr-3" />
                        )}
                        {feature.text}
                    </li>
                ))}
            </ul>
            <button
                onClick={() => onChoosePlan(title, price)}
                className={`
          w-full block text-center py-3 rounded-full transition-colors
          ${
              recommended
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-transparent border border-white hover:bg-white/20 text-white"
          }
        `}
            >
                Choose Plan <SquarePlus className="ml-2 inline" />
            </button>
        </div>
    );
};

// Main Subscription Page Component
const SubscriptionPage = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isCreditCardModalOpen, setIsCreditCardModalOpen] = useState(false);
    const movieBackground = "/images/background.jpg";
    const subscriptionPlans = [
        {
            title: "Basic Plan",
            price: 9.99,
            features: [
                { text: "HD Available", included: true },
                { text: "Limited Originals", included: true },
                { text: "1 Device Stream", included: true },
                { text: "No Ads", included: false },
                { text: "4K Content", included: false },
            ],
        },
        {
            title: "Pro Plan",
            price: 14.99,
            features: [
                { text: "HD Available", included: true },
                { text: "All Originals", included: true },
                { text: "2 Device Stream", included: true },
                { text: "No Ads", included: true },
                { text: "4K Content", included: false },
            ],
            recommended: true,
        },
        {
            title: "Ultra Plan",
            price: 19.99,
            features: [
                { text: "HD Available", included: true },
                { text: "All Originals", included: true },
                { text: "4 Device Stream", included: true },
                { text: "No Ads", included: true },
                { text: "4K Content", included: true },
            ],
        },
    ];

    const handleChoosePlan = (title, price) => {
        setSelectedPlan({ title, price });
        setIsPaymentModalOpen(true);
    };

    const handleSelectPayment = (paymentMethod) => {
        if (paymentMethod === "paypal") {
            // Redirect to PayPal for payment
            window.location.href = `https://www.paypal.com/paypalme/HamzaTalJo?plan=${selectedPlan.title}`;
        } else if (paymentMethod === "credit-card") {
            // Close payment method modal and open credit card input modal
            setIsPaymentModalOpen(false);
            setIsCreditCardModalOpen(true);
        }
    };

    const handleCreditCardPayment = (cardDetails) => {
        console.log("Processing credit card payment:", cardDetails);

        // SweetAlert2 Alert for Payment Completion
        Swal.fire({
            title: "Purchase Completed!",
            html: `
                <div>
                    <strong>Thank you for your purchase!</strong>
                    <p>You have successfully subscribed to the <strong>${selectedPlan.title}</strong>.</p>
                    <p>Enjoy unlimited access to your favorite content.</p>
                </div>
            `,
            icon: "success",
            confirmButtonText: "Go to Home Page",
            confirmButtonColor: "#22c55e", // Green for success
            background: "#1a1a1a",
            color: "#fff",
        }).then(() => {
            window.location.href = "/home";
        });

        // Close the credit card modal
        setIsCreditCardModalOpen(false);
    };


    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Background with Opacity */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40 z-0"
                style={{ backgroundImage: `url(${movieBackground})` }}
            ></div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

            {/* Payment Method Modal */}
            {selectedPlan && (
                <PaymentMethodModal
                    isOpen={isPaymentModalOpen}
                    onClose={() => setIsPaymentModalOpen(false)}
                    planTitle={selectedPlan.title}
                    planPrice={selectedPlan.price}
                    onSelectPayment={handleSelectPayment}
                />
            )}

            {/* Credit Card Input Modal */}
            {selectedPlan && (
                <CreditCardInputModal
                    isOpen={isCreditCardModalOpen}
                    onClose={() => setIsCreditCardModalOpen(false)}
                    planTitle={selectedPlan.title}
                    planPrice={selectedPlan.price}
                    onSubmitPayment={handleCreditCardPayment}
                />
            )}

            {/* Content */}
            <div className="relative z-10">
                {/* Navbar */}
                <nav className="flex justify-between items-center p-6">
                    <div className="flex items-center">
                        <Clapperboard className="w-10 h-10 text-red-500 mr-3" />
                        <h1 className="text-3xl font-bold">
                            JO <span className="text-red-500">BEST</span>
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => (window.location.href = "/login")}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-colors flex items-center"
                        >
                            Login <Play className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </nav>

                {/* Subscription Content */}
                <div className="container mx-auto px-6 py-16">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-6xl font-black mb-6 leading-tight">
                            Choose Your{" "}
                            <span className="text-red-500">Plan</span>
                        </h1>
                        <p className="text-xl mb-8 leading-relaxed">
                            Unlock the full potential of JO BEST. Select a plan
                            that fits your entertainment needs and start your
                            cinematic journey today.
                        </p>
                    </div>

                    {/* Subscription Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {subscriptionPlans.map((plan, index) => (
                            <SubscriptionCard
                                key={index}
                                title={plan.title}
                                price={plan.price}
                                features={plan.features}
                                recommended={plan.recommended}
                                onChoosePlan={handleChoosePlan}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPage;
