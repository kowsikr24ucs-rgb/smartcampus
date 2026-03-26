export type ComplaintStatus = "reported" | "in_progress" | "resolved";
export type ComplaintPriority = "low" | "medium" | "high" | "urgent";
export type ComplaintCategory = "water" | "electricity" | "cleanliness" | "furniture" | "network" | "other";
export type UserRole = "student" | "staff" | "admin";

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  location: string;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  createdAt: string;
  updatedAt: string;
  studentName: string;
  assignedTo?: string;
  rating?: number;
  imageUrl?: string;
}

export const categoryLabels: Record<ComplaintCategory, string> = {
  water: "Water Supply",
  electricity: "Electricity",
  cleanliness: "Cleanliness",
  furniture: "Furniture",
  network: "Network/WiFi",
  other: "Other",
};

export const categoryIcons: Record<ComplaintCategory, string> = {
  water: "💧",
  electricity: "⚡",
  cleanliness: "🧹",
  furniture: "🪑",
  network: "📶",
  other: "📋",
};

export const statusLabels: Record<ComplaintStatus, string> = {
  reported: "Reported",
  in_progress: "In Progress",
  resolved: "Resolved",
};

export const priorityLabels: Record<ComplaintPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

export const mockComplaints: Complaint[] = [
  {
    id: "CMP-001",
    title: "No water supply in Block A",
    description: "Water supply has been cut off since morning. All rooms on 3rd floor affected.",
    category: "water",
    location: "Block A, 3rd Floor",
    status: "in_progress",
    priority: "urgent",
    createdAt: "2026-03-25T08:30:00",
    updatedAt: "2026-03-25T10:15:00",
    studentName: "Rahul Sharma",
    assignedTo: "Maintenance Team A",
  },
  {
    id: "CMP-002",
    title: "Broken lights in Library",
    description: "Three tube lights in the reading section are not working.",
    category: "electricity",
    location: "Central Library, Reading Hall",
    status: "reported",
    priority: "medium",
    createdAt: "2026-03-25T09:00:00",
    updatedAt: "2026-03-25T09:00:00",
    studentName: "Priya Patel",
  },
  {
    id: "CMP-003",
    title: "Unclean washrooms in Hostel B",
    description: "Washrooms on ground floor haven't been cleaned for 2 days.",
    category: "cleanliness",
    location: "Hostel B, Ground Floor",
    status: "resolved",
    priority: "high",
    createdAt: "2026-03-23T14:00:00",
    updatedAt: "2026-03-24T16:00:00",
    studentName: "Amit Kumar",
    assignedTo: "Housekeeping Team",
    rating: 4,
  },
  {
    id: "CMP-004",
    title: "Power outage in Lab 3",
    description: "Complete power failure. Ongoing lab session disrupted.",
    category: "electricity",
    location: "Engineering Block, Lab 3",
    status: "in_progress",
    priority: "urgent",
    createdAt: "2026-03-25T11:00:00",
    updatedAt: "2026-03-25T11:30:00",
    studentName: "Sneha Reddy",
    assignedTo: "Electrical Team",
  },
  {
    id: "CMP-005",
    title: "WiFi not working in Hostel C",
    description: "Internet connectivity is down for all residents since last night.",
    category: "network",
    location: "Hostel C, All Floors",
    status: "reported",
    priority: "high",
    createdAt: "2026-03-25T07:00:00",
    updatedAt: "2026-03-25T07:00:00",
    studentName: "Karan Singh",
  },
  {
    id: "CMP-006",
    title: "Broken desk in Room 204",
    description: "Study desk leg is broken, desk is unusable.",
    category: "furniture",
    location: "Hostel A, Room 204",
    status: "resolved",
    priority: "low",
    createdAt: "2026-03-20T10:00:00",
    updatedAt: "2026-03-22T14:00:00",
    studentName: "Deepa Nair",
    assignedTo: "Carpentry Team",
    rating: 5,
  },
];

export const locations = [
  "Block A", "Block B", "Block C",
  "Hostel A", "Hostel B", "Hostel C",
  "Central Library", "Engineering Block",
  "Science Block", "Admin Building",
  "Cafeteria", "Sports Complex",
  "Auditorium", "Parking Area",
];
