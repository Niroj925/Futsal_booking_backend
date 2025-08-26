export interface NodemailerConfig {
  getEmailHost(): string;
  getEmailPort(): number;
  getEmailSecure(): boolean;
  getEmailUser(): string;
  getEmailPass(): string;
  getEmailFrom(): string;
}
