export default interface Tutorial {
  id?: number;
  title: string;
  content: string | TrustedHTML;
  createAt?: string;
  updatedAt?: string;
  group?: string;
}
