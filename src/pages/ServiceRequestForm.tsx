import { faBox, faBuilding, faCalendarAlt, faHome, faLocationDot, faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

interface ServiceRequest {
  pickupLocation: string;
  dropoffLocation: string;
  itemType: string;
  itemSize: string;
  preferredDate: string;
  preferredTime: string;
  estimatedValue: string;
  description: string;
  numberOfRooms?: number;
  numberOfFloors?: number;
  propertyType?: 'house' | 'apartment' | 'office';
  hasElevator?: boolean;
  requestType: 'fixed' | 'bidding';
}

const initialValues: ServiceRequest = {
  pickupLocation: '',
  dropoffLocation: '',
  itemType: '',
  itemSize: '',
  preferredDate: '',
  preferredTime: '',
  estimatedValue: '',
  description: '',
  numberOfRooms: 1,
  numberOfFloors: 1,
  propertyType: 'house',
  hasElevator: false,
  requestType: 'fixed', // Defaulting to fixed price; change as needed
};

const ServiceRequestForm: React.FC = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    pickupLocation: Yup.string().required('Pickup location is required'),
    dropoffLocation: Yup.string().required('Dropoff location is required'),
    itemType: Yup.string().required('Item type is required'),
    itemSize: Yup.string().required('Item size is required'),
    preferredDate: Yup.string().required('Preferred date is required'),
    preferredTime: Yup.string().required('Preferred time is required'),
  });

  const handleSubmit = async (values: ServiceRequest, { setSubmitting }: any) => {
    try {
      console.log('Service request values:', values);
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const requestId = `REQ-${Math.floor(10000 + Math.random() * 90000)}`;

      // For a fixed price request, navigate to the providers page.
      // For bidding requests, you may want to post the job first,
      // then later show bids under the posted job.
      if (values.requestType === 'fixed') {
        navigate(`/providers/${requestId}`);
      } else {
        navigate(`/jobs/${requestId}`);
      }
    } catch (error) {
      console.error('Error submitting service request:', error);
    }
    setSubmitting(false);
  };

  const itemTypes = ['Moving', 'Furniture', 'Electronics', 'Boxes', 'Appliances', 'Other'];
  const propertyTypes = ['house', 'apartment', 'office'];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Request a Moving Service</h1>
        <p className="text-gray-600 mt-2">
          Fill out the form below to get matched with providers
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form className="space-y-6">
              {/* Pickup Location */}
              <div>
                <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700">
                  Pickup Location
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faLocationDot} className="text-gray-400" />
                  </div>
                  <Field
                    id="pickupLocation"
                    name="pickupLocation"
                    type="text"
                    className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter pickup address"
                  />
                </div>
                <ErrorMessage name="pickupLocation" component="p" className="text-red-500 text-xs mt-1" />
              </div>

              {/* Dropoff Location */}
              <div>
                <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700">
                  Dropoff Location
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faLocationDot} className="text-gray-400" />
                  </div>
                  <Field
                    id="dropoffLocation"
                    name="dropoffLocation"
                    type="text"
                    className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter dropoff address"
                  />
                </div>
                <ErrorMessage name="dropoffLocation" component="p" className="text-red-500 text-xs mt-1" />
              </div>

              {/* Request Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Request Type
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <Field type="radio" name="requestType" value="fixed" />
                    <span className="ml-2">Fixed Price</span>
                  </label>
                  <label className="flex items-center">
                    <Field type="radio" name="requestType" value="bidding" />
                    <span className="ml-2">Bidding</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Item Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FontAwesomeIcon icon={faBox} className="text-gray-400 mr-2" />
                    Item Type
                  </label>
                  <Field
                    as="select"
                    name="itemType"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Item Type</option>
                    {itemTypes.map((type) => (
                      <option key={type} value={type.toLowerCase()}>
                        {type}
                      </option>
                    ))}
                  </Field>
                </div>

                {/* Item Size */}
                <div>
                  <label htmlFor="itemSize" className="block text-sm font-medium text-gray-700">
                    Item Size
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon icon={faTruck} className="text-gray-400" />
                    </div>
                    <Field
                      as="select"
                      id="itemSize"
                      name="itemSize"
                      className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Size</option>
                      <option value="small">Small (fits in car)</option>
                      <option value="medium">Medium (fits in van)</option>
                      <option value="large">Large (requires truck)</option>
                      <option value="extra_large">Extra Large (multiple items)</option>
                    </Field>
                  </div>
                  <ErrorMessage name="itemSize" component="p" className="text-red-500 text-xs mt-1" />
                </div>
              </div>

              {/* Conditional Fields: Only for "moving" item type */}
              <Field name="itemType">
                {({ field, form }: any) =>
                  field.value.toLowerCase() === 'moving' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FontAwesomeIcon icon={faHome} className="text-gray-400 mr-2" />
                          Property Type
                        </label>
                        <Field
                          as="select"
                          name="propertyType"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                          required
                        >
                          {propertyTypes.map((type) => (
                            <option key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                          ))}
                        </Field>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FontAwesomeIcon icon={faBuilding} className="text-gray-400 mr-2" />
                          Number of Rooms
                        </label>
                        <Field
                          type="number"
                          name="numberOfRooms"
                          min="1"
                          max="20"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <FontAwesomeIcon icon={faBuilding} className="text-gray-400 mr-2" />
                          Number of Floors
                        </label>
                        <Field
                          type="number"
                          name="numberOfFloors"
                          min="1"
                          max="50"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                          required
                        />
                      </div>

                      {(values.propertyType === 'apartment' || values.propertyType === 'office') && (
                        <div className="flex items-center">
                          <label className="flex items-center text-sm font-medium text-gray-700">
                            <Field
                              type="checkbox"
                              name="hasElevator"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                            />
                            Has Elevator Access
                          </label>
                        </div>
                      )}
                    </>
                  )
                }
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Preferred Date */}
                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700">
                    Preferred Date
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
                    </div>
                    <Field
                      id="preferredDate"
                      name="preferredDate"
                      type="date"
                      className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <ErrorMessage name="preferredDate" component="p" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Preferred Time */}
                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700">
                    Preferred Time
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
                    </div>
                    <Field
                      id="preferredTime"
                      name="preferredTime"
                      type="time"
                      className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <ErrorMessage name="preferredTime" component="p" className="text-red-500 text-xs mt-1" />
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Additional Details (Optional)
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your items or any special requirements"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ServiceRequestForm;
