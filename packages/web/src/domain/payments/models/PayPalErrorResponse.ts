export type PayPalErrorResponse = {
  error: string;
  error_description: string;
  details?: Array<{
    field: string;
    issue: string;
    description: string;
  }>;
}; 