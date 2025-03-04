import { faBell, faBoxOpen, faCalendarAlt, faCreditCard, faEnvelope, faLock, faMapMarker, faPhone, faShieldAlt, faTruckMoving, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

interface UserSettings {
    personal: {
        name: string;
        email: string;
        phone: string;
        address: string;
        company?: string;
    };
    movingPreferences: {
        vehicleType: 'smallVan' | 'mediumVan' | 'largeTruck' | 'specialty';
        packingService: boolean;
        insuranceLevel: 'basic' | 'premium' | 'fullCoverage';
        preferredTime: 'any' | 'morning' | 'afternoon' | 'evening';
    };
    payment: {
        cards: PaymentMethod[];
        defaultPaymentId: string;
        billingAddress: string;
    };
    notifications: {
        bookingConfirmation: boolean;
        driverAssigned: boolean;
        etaUpdate: boolean;
        paymentReceipt: boolean;
        promotions: boolean;
    };
    security: {
        twoFactorEnabled: boolean;
        lastLogin: string;
        trustedDevices: number;
    };
}

interface PaymentMethod {
    id: string;
    last4: string;
    brand: string;
    expiry: string;
}

const AnyVanSettings = () => {
    const [activeSection, setActiveSection] = useState('personal');
    const [settings, setSettings] = useState<UserSettings>({
        personal: {
            name: 'John Moving',
            email: 'john@example.com',
            phone: '+441234567890',
            address: '123 Main St, London',
            company: 'Moving Experts Ltd',
        },
        movingPreferences: {
            vehicleType: 'mediumVan',
            packingService: true,
            insuranceLevel: 'premium',
            preferredTime: 'afternoon',
        },
        payment: {
            cards: [
                {
                    id: '1',
                    last4: '4242',
                    brand: 'Visa',
                    expiry: '12/24',
                },
            ],
            defaultPaymentId: '1',
            billingAddress: '123 Main St, London',
        },
        notifications: {
            bookingConfirmation: true,
            driverAssigned: true,
            etaUpdate: true,
            paymentReceipt: true,
            promotions: false,
        },
        security: {
            twoFactorEnabled: false,
            lastLogin: '2023-07-20T14:23:00',
            trustedDevices: 2,
        },
    });

    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [showFeedback, setShowFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    // Save feedback timeout
    useEffect(() => {
        if (showFeedback) {
            const timer = setTimeout(() => setShowFeedback(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [showFeedback]);

    const handleInputChange = (section: keyof UserSettings, field: string, value: any) => {
        setSettings((prev) => ({
            ...prev,
            [section]: { ...prev[section], [field]: value },
        }));
        setUnsavedChanges(true);
    };

    const handleSave = async () => {
        try {
            // Simulated API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setUnsavedChanges(false);
            setShowFeedback({ type: 'success', message: 'Settings saved successfully!' });
        } catch (error) {
            setShowFeedback({ type: 'error', message: 'Failed to save settings. Please try again.' });
        }
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'personal':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold flex items-center">
                            <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-600" />
                            Personal & Business Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Full Name" icon={faUser} value={settings.personal.name} onChange={(v) => handleInputChange('personal', 'name', v)} />
                            <InputField label="Email" icon={faEnvelope} type="email" value={settings.personal.email} onChange={(v) => handleInputChange('personal', 'email', v)} />
                            <InputField label="Phone Number" icon={faPhone} type="tel" value={settings.personal.phone} onChange={(v) => handleInputChange('personal', 'phone', v)} />
                            <InputField label="Address" icon={faMapMarker} value={settings.personal.address} onChange={(v) => handleInputChange('personal', 'address', v)} />
                            <InputField label="Company Name (Optional)" icon={faUser} value={settings.personal.company || ''} onChange={(v) => handleInputChange('personal', 'company', v)} />
                        </div>
                    </div>
                );

            case 'moving':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold flex items-center">
                            <FontAwesomeIcon icon={faTruckMoving} className="mr-2 text-blue-600" />
                            Moving Preferences
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SelectField
                                label="Preferred Vehicle Type"
                                icon={faTruckMoving}
                                value={settings.movingPreferences.vehicleType}
                                options={[
                                    { value: 'smallVan', label: 'Small Van (up to 1 bedroom)' },
                                    { value: 'mediumVan', label: 'Medium Van (2-3 bedrooms)' },
                                    { value: 'largeTruck', label: 'Large Truck (4+ bedrooms)' },
                                    { value: 'specialty', label: 'Specialty Equipment' },
                                ]}
                                onChange={(v) => handleInputChange('movingPreferences', 'vehicleType', v)}
                            />

                            <SelectField
                                label="Insurance Level"
                                icon={faShieldAlt}
                                value={settings.movingPreferences.insuranceLevel}
                                options={[
                                    { value: 'basic', label: 'Basic Coverage (£500)' },
                                    { value: 'premium', label: 'Premium Coverage (£2000)' },
                                    { value: 'fullCoverage', label: 'Full Coverage (£5000)' },
                                ]}
                                onChange={(v) => handleInputChange('movingPreferences', 'insuranceLevel', v)}
                            />

                            <ToggleField
                                label="Include Professional Packing Service"
                                icon={faBoxOpen}
                                checked={settings.movingPreferences.packingService}
                                onChange={(v) => handleInputChange('movingPreferences', 'packingService', v)}
                            />

                            <SelectField
                                label="Preferred Moving Time"
                                icon={faCalendarAlt}
                                value={settings.movingPreferences.preferredTime}
                                options={[
                                    { value: 'any', label: 'Anytime' },
                                    { value: 'morning', label: 'Morning (8am-12pm)' },
                                    { value: 'afternoon', label: 'Afternoon (12pm-5pm)' },
                                    { value: 'evening', label: 'Evening (5pm-9pm)' },
                                ]}
                                onChange={(v) => handleInputChange('movingPreferences', 'preferredTime', v)}
                            />
                        </div>
                    </div>
                );

            case 'payment':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold flex items-center">
                            <FontAwesomeIcon icon={faCreditCard} className="mr-2 text-blue-600" />
                            Payment & Billing
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="font-medium mb-4">Payment Methods</h3>
                                {settings.payment.cards.map((card) => (
                                    <div key={card.id} className="flex items-center justify-between p-4 bg-white rounded shadow-sm mb-3">
                                        <div className="flex items-center">
                                            <span className={`payment-icon ${card.brand.toLowerCase()} mr-4`} />
                                            <div>
                                                <p className="font-medium">**** **** **** {card.last4}</p>
                                                <p className="text-sm text-gray-500">Expires {card.expiry}</p>
                                            </div>
                                        </div>
                                        <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                    </div>
                                ))}
                                <button className="mt-4 text-blue-600 hover:text-blue-800 flex items-center">
                                    <span className="text-xl mr-2">+</span> Add Payment Method
                                </button>
                            </div>

                            <InputField label="Billing Address" icon={faMapMarker} value={settings.payment.billingAddress} onChange={(v) => handleInputChange('payment', 'billingAddress', v)} />
                        </div>
                    </div>
                );

            case 'notifications':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold flex items-center">
                            <FontAwesomeIcon icon={faBell} className="mr-2 text-blue-600" />
                            Notification Preferences
                        </h2>
                        <div className="space-y-4">
                            <ToggleField
                                label="Booking Confirmations"
                                checked={settings.notifications.bookingConfirmation}
                                onChange={(v) => handleInputChange('notifications', 'bookingConfirmation', v)}
                            />
                            <ToggleField label="Driver Assignment Updates" checked={settings.notifications.driverAssigned} onChange={(v) => handleInputChange('notifications', 'driverAssigned', v)} />
                            <ToggleField label="Real-time ETA Updates" checked={settings.notifications.etaUpdate} onChange={(v) => handleInputChange('notifications', 'etaUpdate', v)} />
                            <ToggleField label="Payment Receipts" checked={settings.notifications.paymentReceipt} onChange={(v) => handleInputChange('notifications', 'paymentReceipt', v)} />
                            <ToggleField label="Special Offers & Promotions" checked={settings.notifications.promotions} onChange={(v) => handleInputChange('notifications', 'promotions', v)} />
                        </div>
                    </div>
                );

            case 'security':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold flex items-center">
                            <FontAwesomeIcon icon={faLock} className="mr-2 text-blue-600" />
                            Security Settings
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Status: {settings.security.twoFactorEnabled ? 'Enabled' : 'Disabled'}</p>
                                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                                    </div>
                                    <button className={`px-4 py-2 rounded-lg ${settings.security.twoFactorEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white`}>
                                        {settings.security.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                                    </button>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="font-medium mb-4">Recent Activity</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <p>Last Login</p>
                                        <p className="text-gray-600">{new Date(settings.security.lastLogin).toLocaleString()}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p>Trusted Devices</p>
                                        <p className="text-gray-600">{settings.security.trustedDevices}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">User Settings</h1>
            <div className="flex space-x-4 mb-6">
                {['personal', 'moving', 'payment', 'notifications', 'security'].map((section) => (
                    <button
                        key={section}
                        onClick={() => setActiveSection(section)}
                        className={`flex-1 py-2 text-center rounded-md transition-colors ${activeSection === section ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        <FontAwesomeIcon
                            icon={section === 'personal' ? faUser : section === 'moving' ? faTruckMoving : section === 'payment' ? faCreditCard : section === 'notifications' ? faBell : faLock}
                            className="mr-2"
                        />
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                ))}
            </div>

            {showFeedback && <div className={`mb-6 p-4 rounded-lg ${showFeedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{showFeedback.message}</div>}

            {/* Main Content */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
                {renderSection()}

                {unsavedChanges && (
                    <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                        <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center font-medium transition-colors">
                            Save Changes
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// Reusable Components
const InputField = ({ label, icon, type = 'text', value, onChange }) => (
    <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 flex items-center">
            <FontAwesomeIcon icon={icon} className="mr-2 text-gray-400" />
            {label}
        </label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
    </div>
);

const SelectField = ({ label, icon, value, options, onChange }) => (
    <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 flex items-center">
            <FontAwesomeIcon icon={icon} className="mr-2 text-gray-400" />
            {label}
        </label>
        <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

const ToggleField = ({ label, checked, onChange, icon }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center">
            {icon && <FontAwesomeIcon icon={icon} className="mr-3 text-gray-400" />}
            <span className="font-medium">{label}</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={checked} onChange={() => onChange(!checked)} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
    </div>
);

export default AnyVanSettings;
