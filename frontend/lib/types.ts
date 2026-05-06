export type CareStatus = 'stable' | 'monitoring' | 'critical' | 'improving';

export interface Patient {
  id: string;
  name: string;
  age: number;
  conditions: string[];
  careStatus: CareStatus;
  lastVisit: string;
  nextVisit?: string;
  primaryNurse: string;
  familyContact: string;
}

export interface HealthMeasurement {
  bloodPressure?: { systolic: number; diastolic: number };
  bloodGlucose?: number;
  oxygenSaturation?: number;
  temperature?: number;
  weight?: number;
  heartRate?: number;
}

export interface Concern {
  type: 'health' | 'medication' | 'psychosocial' | 'safety';
  severity: 'low' | 'medium' | 'high';
  description: string;
}

export interface NextStep {
  action: string;
  deadline: string;
  assignee: 'nurse' | 'doctor' | 'family' | 'supervisor';
}

export type AIActionType =
  | 'update_record'
  | 'flag_concern'
  | 'identify_next_step'
  | 'draft_message'
  | 'update_status'
  | 'notify_supervisor';

export interface AIAction {
  id: string;
  type: AIActionType;
  label: string;
  detail: string;
  status: 'pending' | 'processing' | 'done';
}

export interface ProcessVisitResult {
  measurements: HealthMeasurement;
  concerns: Concern[];
  nextSteps: NextStep[];
  familyMessageDraft: string;
  careStatusUpdate: CareStatus;
  visitSummary: string;
  supervisorAlert: boolean;
  supervisorAlertMessage?: string;
  actions: AIAction[];
}

export interface ActivityFeedItem {
  id: string;
  timestamp: string;
  patientName: string;
  action: string;
  type: 'record' | 'alert' | 'message' | 'schedule' | 'status' | 'notify';
  severity?: 'normal' | 'warning' | 'critical';
}
