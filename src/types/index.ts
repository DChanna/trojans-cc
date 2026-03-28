export type AvailabilityStatus =
  | 'not_available'
  | 'selected_paid'
  | 'selected_unpaid'
  | 'not_selected'
  | 'withdrew';

export const AVAILABILITY_CONFIG: Record<AvailabilityStatus, { label: string; color: string; bgColor: string }> = {
  not_available: { label: 'Not Available', color: '#90CAF9', bgColor: 'rgba(144, 202, 249, 0.15)' },
  selected_paid: { label: 'Selected (Paid)', color: '#66BB6A', bgColor: 'rgba(102, 187, 106, 0.15)' },
  selected_unpaid: { label: 'Selected (Unpaid)', color: '#FF7043', bgColor: 'rgba(255, 112, 67, 0.15)' },
  not_selected: { label: 'Not Selected', color: '#FFD54F', bgColor: 'rgba(255, 213, 79, 0.15)' },
  withdrew: { label: 'Withdrew', color: '#EF5350', bgColor: 'rgba(239, 83, 80, 0.15)' },
};

export const PAYMENT_STATUS_CONFIG: Record<string, { color: string; bgColor: string }> = {
  Paid: { color: '#66BB6A', bgColor: 'rgba(102, 187, 106, 0.15)' },
  Unpaid: { color: '#EF5350', bgColor: 'rgba(239, 83, 80, 0.15)' },
  Partial: { color: '#FF9800', bgColor: 'rgba(255, 152, 0, 0.15)' },
  TBD: { color: '#90CAF9', bgColor: 'rgba(144, 202, 249, 0.15)' },
  'N/A': { color: '#A0A0A0', bgColor: 'rgba(160, 160, 160, 0.15)' },
};

export const DUES_STATUS_OPTIONS = ['Paid', 'Unpaid', 'Partial', 'TBD', 'N/A'];
export const PAYMENT_PLAN_OPTIONS = ['Season Dues', 'Per Game', 'Sponsor', 'Exempt'];
export const PLAYER_ROLES = ['Batsman', 'Bowler', 'All-rounder', 'Wicketkeeper', 'Wicketkeeper-Batsman'];
export const MATCH_FORMATS = ['T20', 'T25', 'T30', '35 Over', '40 Over', '50 Over'];
export const MATCH_RESULTS = ['Win', 'Loss', 'Draw', 'Tied', 'Abandoned', 'No Result'];
