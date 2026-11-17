import Button, { type ButtonProps } from "../atoms/Button";
export default function ActionButton({ disabledReason, ...props }: ButtonProps) {
  return <div><Button variant="primary" {...props} disabledReason={disabledReason} />{disabledReason && <small>{disabledReason}</small>}</div>;
}
