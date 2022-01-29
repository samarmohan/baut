export interface Roles {
  career: string[];
  pronouns: Pronouns;
  location: Location;
  experience: Experience;
  notifications: Notifications;
  eligible: string;
  not_eligible: string;
  member: string;
}

export interface Experience {
  '1-2': string;
  '3-5': string;
  '6-8': string;
  '9+': string;
}

export interface Location {
  north_america: string;
  south_america: string;
  europe: string;
  oceania: string;
  asia: string;
  africa: string;
  antartica: string;
}

export interface Notifications {
  event_ping: string;
  inactivity_ping: string;
  assistance_ping: string;
  poll_ping: string;
  announcement_ping: string;
}

export interface Pronouns {
  he: string;
  she: string;
  they: string;
  ask: string;
}
