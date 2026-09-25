// ROLES

export const ROLES = {
  SUPER_ADMIN: "super_admin",
  BOOKING_STAFF: "booking_staff",
  CUSTOMER: "customer",
  DRIVER: "driver",
};

// PERMISSIONS

export const PERMISSIONS = {
  // SUPER ADMIN

  SUPER_ADMIN: [
    "full_system_access",
    "manage_all_modules",
    "view_reports",
    "manage_users",
    "manage_settings",
  ],

  // BOOKING STAFF

  BOOKING_STAFF: [
    "create_offline_bookings",
    "manage_passengers",
    "print_tickets",
    "view_trips",
  ],

  // CUSTOMER

  CUSTOMER: [
    "search_buses",
    "book_tickets",
    "cancel_bookings",
    "download_tickets",
    "manage_profile",
  ],

  // DRIVER

  DRIVER: [
    "view_assigned_trips", 
    "view_passenger_list", 
    "view_trip_schedule"
],
};
