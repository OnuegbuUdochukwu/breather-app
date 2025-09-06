// Geolocation utility functions for handling browser location services

/**
 * Geolocation error types and messages
 */
export const LocationError = {
  PERMISSION_DENIED: 1,
  POSITION_UNAVAILABLE: 2,
  TIMEOUT: 3
};

/**
 * Get user-friendly error message based on geolocation error code
 * @param {number} errorCode - The geolocation error code
 * @returns {string} User-friendly error message
 */
export const getLocationErrorMessage = (errorCode) => {
  switch (errorCode) {
    case LocationError?.PERMISSION_DENIED:
      return 'Location access denied. Please enable location permissions in your browser settings.';
    case LocationError?.POSITION_UNAVAILABLE:
      return 'Location unavailable. Please check your GPS settings or try again later.';
    case LocationError?.TIMEOUT:
      return 'Location request timed out. Please try again.';
    default:
      return 'Unable to get your current location. Please select a location manually.';
  }
};

/**
 * Get current user location with proper error handling
 * @param {Object} options - Geolocation options
 * @param {Function} onSuccess - Success callback
 * @param {Function} onError - Error callback
 * @param {Function} onNotSupported - Not supported callback
 */
export const getCurrentLocation = ({
  onSuccess,
  onError,
  onNotSupported,
  timeout = 10000,
  enableHighAccuracy = true,
  maximumAge = 300000 // 5 minutes
} = {}) => {
  // Check if geolocation is supported
  if (!navigator.geolocation) {
    const error = {
      code: 'NOT_SUPPORTED',
      message: 'Geolocation is not supported by this browser.'
    };
    console.warn('Geolocation not supported:', error?.message);
    onNotSupported?.(error);
    return;
  }

  const options = {
    enableHighAccuracy,
    timeout,
    maximumAge
  };

  navigator.geolocation?.getCurrentPosition(
    (position) => {
      const locationData = {
        latitude: position?.coords?.latitude,
        longitude: position?.coords?.longitude,
        accuracy: position?.coords?.accuracy,
        timestamp: position?.timestamp
      };
      console.log('Location obtained:', locationData);
      onSuccess?.(locationData);
    },
    (error) => {
      const errorData = {
        code: error?.code,
        message: error?.message,
        userMessage: getLocationErrorMessage(error?.code)
      };
      console.error('Geolocation error:', errorData);
      onError?.(errorData);
    },
    options
  );
};

/**
 * Watch user location with proper error handling
 * @param {Object} options - Watch options
 * @returns {number} Watch ID for clearing the watch
 */
export const watchLocation = ({
  onSuccess,
  onError,
  onNotSupported,
  timeout = 10000,
  enableHighAccuracy = false,
  maximumAge = 600000 // 10 minutes
} = {}) => {
  // Check if geolocation is supported
  if (!navigator.geolocation) {
    const error = {
      code: 'NOT_SUPPORTED',
      message: 'Geolocation is not supported by this browser.'
    };
    console.warn('Geolocation not supported:', error?.message);
    onNotSupported?.(error);
    return null;
  }

  const options = {
    enableHighAccuracy,
    timeout,
    maximumAge
  };

  const watchId = navigator.geolocation?.watchPosition(
    (position) => {
      const locationData = {
        latitude: position?.coords?.latitude,
        longitude: position?.coords?.longitude,
        accuracy: position?.coords?.accuracy,
        timestamp: position?.timestamp
      };
      onSuccess?.(locationData);
    },
    (error) => {
      const errorData = {
        code: error?.code,
        message: error?.message,
        userMessage: getLocationErrorMessage(error?.code)
      };
      console.error('Geolocation watch error:', errorData);
      onError?.(errorData);
    },
    options
  );

  return watchId;
};

/**
 * Clear location watch
 * @param {number} watchId - The watch ID to clear
 */
export const clearLocationWatch = (watchId) => {
  if (watchId && navigator.geolocation) {
    navigator.geolocation?.clearWatch(watchId);
  }
};

/**
 * Calculate distance between two coordinates (Haversine formula)
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
};

/**
 * Format distance for display
 * @param {number} distance - Distance in kilometers
 * @returns {string} Formatted distance string
 */
export const formatDistance = (distance) => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance}km`;
};

/**
 * Reverse geocoding - convert coordinates to address (requires geocoding service)
 * This is a placeholder for future implementation with a geocoding service
 * @param {number} latitude 
 * @param {number} longitude 
 * @returns {Promise<string>} Address string
 */
export const reverseGeocode = async (latitude, longitude) => {
  // TODO: Implement with a geocoding service like Google Maps or Nominatim
  console.log(`Reverse geocoding for ${latitude}, ${longitude} - Not implemented`);
  return 'Current Location';
};

export default {
  LocationError,
  getLocationErrorMessage,
  getCurrentLocation,
  watchLocation,
  clearLocationWatch,
  calculateDistance,
  formatDistance,
  reverseGeocode
};