import { Tooltip, toast } from "@heroui/react";

export const formatEllipsis = (text: string, maxChars: number = 12): React.ReactNode => {
  if (!text) return "-";

  if (text.length <= maxChars) return text;

  const truncated = text.slice(0, maxChars) + "...";

  return (
    <Tooltip>
      <Tooltip.Trigger>{truncated}</Tooltip.Trigger>
      <Tooltip.Content>{text}</Tooltip.Content>
    </Tooltip>
  );
};

export const showSuccessToast = (msg: string) => {
  toast.success(msg, { timeout: 3000 });
};

export const showErrorToast = (msg: string) => {
  toast.danger(msg, { timeout: 3000 });
};
